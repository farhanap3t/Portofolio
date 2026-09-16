const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load portfolio data from js/data.js
let portfolioData = null;
try {
  portfolioData = require("../js/data.js");
} catch (err) {
  console.warn("Notice: Loading static data fallback.");
}

// REST API Endpoints

/**
 * @route   GET /api/health
 * @desc    Check API health and status
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Muhammad Farhan Portfolio API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * @route   GET /api/profile
 * @desc    Get profile and credentials data (Supports ?lang=id or ?lang=en)
 */
app.get("/api/profile", (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "id";
  if (!portfolioData || !portfolioData[lang]) {
    return res.status(500).json({ error: "Portfolio data unavailable" });
  }

  const { personal, hero, about, skills, education, experience } = portfolioData[lang];
  res.json({
    language: lang,
    personal,
    hero,
    about,
    skills,
    education,
    experience
  });
});

/**
 * @route   GET /api/projects
 * @desc    Get featured projects and case studies
 */
app.get("/api/projects", (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "id";
  if (!portfolioData || !portfolioData[lang]) {
    return res.status(500).json({ error: "Portfolio data unavailable" });
  }

  res.json({
    language: lang,
    projects: portfolioData[lang].projects
  });
});

/**
 * @route   POST /api/contact
 * @desc    Receive contact form submission with validation
 */
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Nama wajib diisi / Name is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Format email tidak valid / Invalid email format" });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Pesan wajib diisi / Message is required" });
  }

  const newInquiry = {
    id: Date.now().toString(),
    receivedAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : "Terkait Peluang / Diskusi Proyek",
    message: message.trim()
  };

  // Log message to server console
  console.log("----------------------------------------");
  console.log("📨 PESAN MASUK BARU (NEW CONTACT INQUIRY)");
  console.log(`Tanggal : ${newInquiry.receivedAt}`);
  console.log(`Pengirim: ${newInquiry.name} <${newInquiry.email}>`);
  console.log(`Subjek  : ${newInquiry.subject}`);
  console.log(`Pesan   : ${newInquiry.message}`);
  console.log("----------------------------------------");

  // Optionally persist inquiries to a local json log file
  try {
    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logPath = path.join(logsDir, "inquiries.json");
    let currentLogs = [];
    if (fs.existsSync(logPath)) {
      const content = fs.readFileSync(logPath, "utf-8");
      currentLogs = JSON.parse(content || "[]");
    }
    currentLogs.push(newInquiry);
    fs.writeFileSync(logPath, JSON.stringify(currentLogs, null, 2));
  } catch (logErr) {
    console.warn("Could not write to inquiries.json:", logErr.message);
  }

  return res.status(200).json({
    success: true,
    message: "Pesan berhasil diterima / Message successfully received",
    data: {
      inquiryId: newInquiry.id,
      receivedAt: newInquiry.receivedAt
    }
  });
});

// Serve frontend static files from parent folder in fullstack mode
const rootPath = path.join(__dirname, "..");
app.use(express.static(rootPath));

// Fallback to index.html for SPA / client routes
app.get("*", (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Muhammad Farhan Portfolio Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📄 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

