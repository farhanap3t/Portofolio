/**
 * Muhammad Farhan - Admin CMS Engine
 * Handles Login, Multi-Project Management, CRUD for all sections, LocalStorage persistence, Exporting, and Backend Sync
 */

(function() {
  // Default Credentials
  const DEFAULT_USER = "admin";
  const DEFAULT_PASS = "farhan2026";

  // State
  let activeData = null;
  let editingLang = "id"; // Default edit Indonesian, can toggle to 'en'

  // DOM Elements
  const loginView = document.getElementById("login-view");
  const adminApp = document.getElementById("admin-app");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");
  const saveAllBtn = document.getElementById("save-all-btn");
  const exportBtn = document.getElementById("export-btn");
  const resetBtn = document.getElementById("reset-btn");
  const toastEl = document.getElementById("toast-msg");
  const adminLangSelect = document.getElementById("admin-lang-select");

  // Check Session on load
  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("portfolio_admin_auth") === "true";
    if (isLoggedIn) {
      showAdminDashboard();
    } else {
      showLogin();
    }
    setupEventListeners();
  });

  function showLogin() {
    if (loginView) loginView.style.display = "flex";
    if (adminApp) adminApp.style.display = "none";
  }

  function showAdminDashboard() {
    if (loginView) loginView.style.display = "none";
    if (adminApp) adminApp.style.display = "flex";
    loadData();
    populateAllForms();
  }

  function setupEventListeners() {
    // Login Form Submit
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();

        if (username === DEFAULT_USER && password === DEFAULT_PASS) {
          sessionStorage.setItem("portfolio_admin_auth", "true");
          if (loginError) loginError.style.display = "none";
          showAdminDashboard();
        } else {
          if (loginError) {
            loginError.textContent = "Username atau password salah / Invalid credentials";
            loginError.style.display = "block";
          }
        }
      });
    }

    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("portfolio_admin_auth");
        showLogin();
      });
    }

    // Language switcher in Admin
    if (adminLangSelect) {
      adminLangSelect.addEventListener("change", (e) => {
        editingLang = e.target.value;
        populateAllForms();
        showToast(`Beralih mengedit bahasa: ${editingLang.toUpperCase()}`);
      });
    }

    // Tab Navigation
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        const panel = document.getElementById(targetTab);
        if (panel) panel.classList.add("active");
      });
    });

    // Save All Button
    if (saveAllBtn) {
      saveAllBtn.addEventListener("click", saveAllChanges);
    }

    // Export Button
    if (exportBtn) {
      exportBtn.addEventListener("click", exportDataJs);
    }

    // Reset Button
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Kembalikan semua konten ke data awal PRD? Perubahan Anda di browser akan dihapus.")) {
          localStorage.removeItem("portfolio_custom_data");
          loadData(true);
          populateAllForms();
          showToast("Data berhasil di-reset ke standar PRD.");
        }
      });
    }

    // Add Project Button
    const addProjBtn = document.getElementById("add-project-btn");
    if (addProjBtn) {
      addProjBtn.addEventListener("click", () => {
        ensureProjectArray();
        const newProj = {
          title: editingLang === "id" ? "Proyek Baru" : "New Project",
          period: "2025 — 2026",
          summary: editingLang === "id" ? "Deskripsi singkat tentang proyek baru..." : "Brief summary of the new project...",
          role: editingLang === "id" ? "Pengembang Sistem" : "System Developer",
          problem: editingLang === "id" ? "Kebutuhan atau masalah yang diselesaikan..." : "Problem addressed by this project...",
          result: editingLang === "id" ? "Dampak dan hasil terukur dari implementasi..." : "Outcomes and measurable impact...",
          tags: ["HTML5", "CSS3", "JavaScript", "MySQL"],
          rolesList: ["Admin", "User"],
          pipeline: [
            { step: "01", title: "Input Data", desc: "Pendataan awal" },
            { step: "02", title: "Pemrosesan", desc: "Komputasi logika sistem" },
            { step: "03", title: "Hasil & Laporan", desc: "Penyajian keluaran" }
          ]
        };
        activeData[editingLang].projects.items.push(newProj);
        renderProjectEditor();
        showToast("Proyek baru berhasil ditambahkan! Silakan lengkapi informasinya.");
      });
    }

    // Add Skill Category
    const addSkillCatBtn = document.getElementById("add-skill-cat-btn");
    if (addSkillCatBtn) {
      addSkillCatBtn.addEventListener("click", () => {
        const catName = prompt("Nama Kategori Keahlian Baru:");
        if (catName && catName.trim()) {
          activeData[editingLang].skills.categories.push({
            name: catName.trim(),
            icon: "cpu",
            description: "Kategori keahlian teknis tambahan.",
            items: ["Keahlian 1"]
          });
          renderSkillsEditor();
        }
      });
    }

    // Add Experience Button
    const addExpBtn = document.getElementById("add-exp-btn");
    if (addExpBtn) {
      addExpBtn.addEventListener("click", () => {
        activeData[editingLang].experience.items.push({
          period: "2024 — Sekarang",
          role: "Posisi Pekerjaan / Jabatan",
          company: "Nama Perusahaan / Instansi",
          description: "Deskripsi tanggung jawab dan pencapaian kerja..."
        });
        renderExperienceEditor();
      });
    }

    // Add Certification Button
    const addCertBtn = document.getElementById("add-cert-btn");
    if (addCertBtn) {
      addCertBtn.addEventListener("click", () => {
        activeData[editingLang].education.certifications.push({
          title: "Nama Sertifikasi Baru",
          issuer: "Lembaga Penerbit",
          type: "Kompetensi",
          desc: "Keterangan kompetensi dan validasi..."
        });
        renderEducationEditor();
      });
    }
  }

  // Ensure Project Array exists
  function ensureProjectArray() {
    if (!activeData || !activeData[editingLang]) return;
    const curProj = activeData[editingLang].projects;
    if (!curProj.items || !Array.isArray(curProj.items)) {
      if (curProj.item) {
        curProj.items = [curProj.item];
      } else {
        curProj.items = [];
      }
    }
  }

  // Load Data
  function loadData(forceDefault = false) {
    if (!forceDefault) {
      const saved = localStorage.getItem("portfolio_custom_data");
      if (saved) {
        try {
          activeData = JSON.parse(saved);
          return;
        } catch (e) {}
      }
    }
    // Fallback to window.portfolioData
    activeData = JSON.parse(JSON.stringify(window.portfolioData || {}));
  }

  // Populate All Forms
  function populateAllForms() {
    if (!activeData || !activeData[editingLang]) return;
    const cur = activeData[editingLang];
    ensureProjectArray();

    // 1. Profile & Hero Form
    setVal("input-name", cur.personal.name);
    setVal("input-role", cur.personal.role);
    setVal("input-tagline", cur.personal.tagline);
    setVal("input-summary", cur.personal.summary);
    setVal("input-location", cur.personal.location);
    setVal("input-email", cur.personal.email);
    setVal("input-phone", cur.personal.phone);
    setVal("input-linkedin", cur.personal.linkedin);
    setVal("input-hero-badge", cur.hero.badge);
    setVal("input-hero-headline", cur.hero.headline);
    setVal("input-hero-status-val", cur.hero.card ? cur.hero.card.statusVal : "");

    if (cur.hero.metrics) {
      setVal("input-metric-val-1", cur.hero.metrics[0].value);
      setVal("input-metric-lbl-1", cur.hero.metrics[0].label);
      setVal("input-metric-val-2", cur.hero.metrics[1].value);
      setVal("input-metric-lbl-2", cur.hero.metrics[1].label);
      setVal("input-metric-val-3", cur.hero.metrics[2].value);
      setVal("input-metric-lbl-3", cur.hero.metrics[2].label);
    }

    // 2. About Me Form
    setVal("input-about-bio-p1", cur.about.bioP1);
    setVal("input-about-bio-p2", cur.about.bioP2);
    if (cur.about.stats) {
      setVal("input-about-degree", cur.about.stats.eduDegree);
      setVal("input-about-school", cur.about.stats.eduSchool);
      setVal("input-about-gpa", cur.about.stats.gpaValue);
      setVal("input-about-loc", cur.about.stats.locValue);
    }

    // 3. Project Form
    renderProjectEditor();

    // 4. Skills Form
    renderSkillsEditor();

    // 5. Experience Form
    renderExperienceEditor();

    // 6. Education Form
    renderEducationEditor();
  }

  // Render Multi-Project Editor
  function renderProjectEditor() {
    const container = document.getElementById("project-editor-container");
    if (!container) return;

    ensureProjectArray();
    const items = activeData[editingLang].projects.items;

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Belum ada proyek. Klik tombol <strong>"+ Tambah Proyek Baru"</strong> di atas untuk membuat proyek pertama Anda.
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((proj, pIdx) => `
      <div class="item-card project-edit-card" data-pidx="${pIdx}" style="margin-bottom: 2rem; border-left: 3px solid var(--brand-lime);">
        <div class="item-card-header" style="border-bottom: 1px solid var(--border-admin); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-family: var(--font-mono); font-weight: bold; color: var(--brand-lime); font-size: 0.85rem;">PROYEK #${pIdx + 1}</span>
            <span class="item-card-title">${escapeHtml(proj.title || "Proyek")}</span>
          </div>
          <button class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteProject(${pIdx})">Hapus Proyek</button>
        </div>

        <div class="form-grid">
          <div class="form-group form-grid-full">
            <label class="form-label">Judul Proyek</label>
            <input type="text" class="form-input proj-input-title" value="${escapeHtml(proj.title)}">
          </div>
          <div class="form-group">
            <label class="form-label">Periode Pengerjaan</label>
            <input type="text" class="form-input proj-input-period" value="${escapeHtml(proj.period)}">
          </div>
          <div class="form-group">
            <label class="form-label">Peran & Tanggung Jawab</label>
            <input type="text" class="form-input proj-input-role" value="${escapeHtml(proj.role)}">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Ringkasan Proyek</label>
            <textarea class="form-textarea proj-input-summary">${escapeHtml(proj.summary)}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Problem Statement (Masalah yang dihadapi)</label>
            <textarea class="form-textarea proj-input-problem">${escapeHtml(proj.problem)}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Hasil / Impact</label>
            <textarea class="form-textarea proj-input-result">${escapeHtml(proj.result)}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Tag Teknologi (Pisahkan dengan koma)</label>
            <input type="text" class="form-input proj-input-tags" value="${escapeHtml((proj.tags || []).join(", "))}">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Tingkat Hak Akses (Pisahkan dengan koma)</label>
            <input type="text" class="form-input proj-input-roles" value="${escapeHtml((proj.rolesList || []).join(", "))}">
          </div>
        </div>

        <div style="margin-top: 1.25rem; border-top: 1px dashed var(--border-admin); padding-top: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <label class="form-label">Alur Pipeline Keputusan (Langkah Komputasi):</label>
            <button class="btn btn-secondary btn-sm" onclick="window.adminCMS.addPipelineStep(${pIdx})">+ Tambah Step</button>
          </div>
          <div class="proj-pipeline-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${(proj.pipeline || []).map((step, sIdx) => `
              <div style="display: grid; grid-template-columns: 50px 160px 1fr 32px; gap: 0.5rem; align-items: center;">
                <input type="text" class="form-input step-input-num" value="${escapeHtml(step.step)}" placeholder="01">
                <input type="text" class="form-input step-input-title" value="${escapeHtml(step.title)}" placeholder="Nama Tahap">
                <input type="text" class="form-input step-input-desc" value="${escapeHtml(step.desc)}" placeholder="Keterangan alur...">
                <button class="btn btn-danger btn-sm" style="padding: 0.4rem; height: 100%; display: flex; align-items: center; justify-content: center;" onclick="window.adminCMS.deletePipelineStep(${pIdx}, ${sIdx})" title="Hapus step">&times;</button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  // Render Skills Editor
  function renderSkillsEditor() {
    const container = document.getElementById("skills-editor-container");
    if (!container) return;

    const cats = activeData[editingLang].skills.categories;
    container.innerHTML = cats.map((cat, catIdx) => `
      <div class="item-card">
        <div class="item-card-header">
          <input type="text" class="form-input" style="font-weight: bold; width: auto; min-width: 200px;" value="${escapeHtml(cat.name)}" onchange="window.adminCMS.updateSkillCatName(${catIdx}, this.value)">
          <button class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteSkillCat(${catIdx})">Hapus Kategori</button>
        </div>
        <input type="text" class="form-input" style="font-size: 0.85rem;" value="${escapeHtml(cat.description)}" onchange="window.adminCMS.updateSkillCatDesc(${catIdx}, this.value)">
        <div>
          <label class="form-label" style="margin-bottom: 0.35rem; display: block;">Daftar Item Keahlian:</label>
          <div class="tags-container">
            ${cat.items.map((item, itemIdx) => `
              <span class="tag-chip">
                ${escapeHtml(item)}
                <span class="tag-remove" onclick="window.adminCMS.removeSkillTag(${catIdx}, ${itemIdx})">&times;</span>
              </span>
            `).join("")}
            <input type="text" class="tag-add-input" placeholder="+ Tambah skill (Tekan Enter)" onkeydown="if(event.key==='Enter'){event.preventDefault(); window.adminCMS.addSkillTag(${catIdx}, this.value); this.value='';}">
          </div>
        </div>
      </div>
    `).join("");
  }

  // Render Experience Editor
  function renderExperienceEditor() {
    const container = document.getElementById("experience-editor-container");
    if (!container) return;

    const items = activeData[editingLang].experience.items;
    container.innerHTML = items.map((exp, idx) => `
      <div class="item-card">
        <div class="item-card-header">
          <span class="item-card-title">Pengalaman #${idx + 1}</span>
          <button class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteExp(${idx})">Hapus</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Periode</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.period)}" onchange="window.adminCMS.updateExp(${idx}, 'period', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Posisi / Jabatan</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.role)}" onchange="window.adminCMS.updateExp(${idx}, 'role', this.value)">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Perusahaan / Institusi</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.company)}" onchange="window.adminCMS.updateExp(${idx}, 'company', this.value)">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Deskripsi Pekerjaan</label>
            <textarea class="form-textarea" onchange="window.adminCMS.updateExp(${idx}, 'description', this.value)">${escapeHtml(exp.description)}</textarea>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Render Education & Certifications Editor
  function renderEducationEditor() {
    const edu = activeData[editingLang].education;
    setVal("input-edu-degree", edu.degree.title);
    setVal("input-edu-school", edu.degree.institution);
    setVal("input-edu-period", edu.degree.period);
    setVal("input-edu-gpa", edu.degree.gpa);
    setVal("input-edu-desc", edu.degree.description);

    const certContainer = document.getElementById("cert-editor-container");
    if (certContainer) {
      certContainer.innerHTML = edu.certifications.map((c, idx) => `
        <div class="item-card">
          <div class="item-card-header">
            <span class="item-card-title">Sertifikasi #${idx + 1}</span>
            <button class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteCert(${idx})">Hapus</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nama Sertifikasi</label>
              <input type="text" class="form-input" value="${escapeHtml(c.title)}" onchange="window.adminCMS.updateCert(${idx}, 'title', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Penerbit</label>
              <input type="text" class="form-input" value="${escapeHtml(c.issuer)}" onchange="window.adminCMS.updateCert(${idx}, 'issuer', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Kategori / Tipe</label>
              <input type="text" class="form-input" value="${escapeHtml(c.type)}" onchange="window.adminCMS.updateCert(${idx}, 'type', this.value)">
            </div>
            <div class="form-group form-grid-full">
              <label class="form-label">Keterangan</label>
              <input type="text" class="form-input" value="${escapeHtml(c.desc)}" onchange="window.adminCMS.updateCert(${idx}, 'desc', this.value)">
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  // Collect and Save All Changes
  function saveAllChanges() {
    const cur = activeData[editingLang];

    // 1. Collect Profile
    cur.personal.name = getVal("input-name");
    cur.personal.role = getVal("input-role");
    cur.personal.tagline = getVal("input-tagline");
    cur.personal.summary = getVal("input-summary");
    cur.personal.location = getVal("input-location");
    cur.personal.email = getVal("input-email");
    cur.personal.phone = getVal("input-phone");
    cur.personal.linkedin = getVal("input-linkedin");
    cur.hero.badge = getVal("input-hero-badge");
    cur.hero.headline = getVal("input-hero-headline");
    if (cur.hero.card) {
      cur.hero.card.statusVal = getVal("input-hero-status-val");
    }

    if (cur.hero.metrics) {
      cur.hero.metrics[0].value = getVal("input-metric-val-1");
      cur.hero.metrics[0].label = getVal("input-metric-lbl-1");
      cur.hero.metrics[1].value = getVal("input-metric-val-2");
      cur.hero.metrics[1].label = getVal("input-metric-lbl-2");
      cur.hero.metrics[2].value = getVal("input-metric-val-3");
      cur.hero.metrics[2].label = getVal("input-metric-lbl-3");
    }

    // 2. Collect About
    cur.about.bioP1 = getVal("input-about-bio-p1");
    cur.about.bioP2 = getVal("input-about-bio-p2");
    if (cur.about.stats) {
      cur.about.stats.eduDegree = getVal("input-about-degree");
      cur.about.stats.eduSchool = getVal("input-about-school");
      cur.about.stats.gpaValue = getVal("input-about-gpa");
      cur.about.stats.locValue = getVal("input-about-loc");
    }

    // 3. Collect Projects (Loop through all project cards)
    ensureProjectArray();
    const projCards = document.querySelectorAll(".project-edit-card");
    const updatedProjects = [];

    projCards.forEach((card, idx) => {
      const existing = cur.projects.items[idx] || {};
      const title = card.querySelector(".proj-input-title")?.value.trim() || "Proyek";
      const period = card.querySelector(".proj-input-period")?.value.trim() || "";
      const role = card.querySelector(".proj-input-role")?.value.trim() || "";
      const summary = card.querySelector(".proj-input-summary")?.value.trim() || "";
      const problem = card.querySelector(".proj-input-problem")?.value.trim() || "";
      const result = card.querySelector(".proj-input-result")?.value.trim() || "";
      const tags = (card.querySelector(".proj-input-tags")?.value || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
      const rolesList = (card.querySelector(".proj-input-roles")?.value || "")
        .split(",")
        .map(r => r.trim())
        .filter(Boolean);

      // Collect pipeline steps for this card
      const stepNums = card.querySelectorAll(".step-input-num");
      const stepTitles = card.querySelectorAll(".step-input-title");
      const stepDescs = card.querySelectorAll(".step-input-desc");
      const pipeline = [];
      stepNums.forEach((sNum, sIdx) => {
        pipeline.push({
          step: sNum.value.trim(),
          title: stepTitles[sIdx] ? stepTitles[sIdx].value.trim() : "",
          desc: stepDescs[sIdx] ? stepDescs[sIdx].value.trim() : ""
        });
      });

      updatedProjects.push({
        ...existing,
        title,
        period,
        role,
        summary,
        problem,
        result,
        tags,
        rolesList,
        pipeline
      });
    });

    cur.projects.items = updatedProjects;
    if (updatedProjects.length > 0) {
      cur.projects.item = updatedProjects[0];
    }

    // 4. Collect Education
    cur.education.degree.title = getVal("input-edu-degree");
    cur.education.degree.institution = getVal("input-edu-school");
    cur.education.degree.period = getVal("input-edu-period");
    cur.education.degree.gpa = getVal("input-edu-gpa");
    cur.education.degree.description = getVal("input-edu-desc");

    // Save to LocalStorage
    localStorage.setItem("portfolio_custom_data", JSON.stringify(activeData));

    // Try to sync to backend if running
    fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: activeData })
    }).catch(() => {});

    showToast("✓ Semua perubahan (termasuk proyek) berhasil disimpan!");
  }

  // Export data.js
  function exportDataJs() {
    const code = `/**\n * Muhammad Farhan - Personal Portfolio Data\n * Generated via Admin CMS\n */\n\nconst portfolioData = ${JSON.stringify(activeData, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.portfolioData = portfolioData;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = portfolioData;\n}\n`;
    const blob = new Blob([code], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Berkas data.js berhasil diunduh.");
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 4000);
  }

  // Helper functions
  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/"/g, "&quot;");
  }

  // Global methods for inline handlers
  window.adminCMS = {
    deleteProject(idx) {
      ensureProjectArray();
      if (confirm("Yakin ingin menghapus proyek ini?")) {
        activeData[editingLang].projects.items.splice(idx, 1);
        renderProjectEditor();
        showToast("Proyek berhasil dihapus.");
      }
    },
    addPipelineStep(pIdx) {
      ensureProjectArray();
      const proj = activeData[editingLang].projects.items[pIdx];
      if (!proj.pipeline) proj.pipeline = [];
      const nextNum = String(proj.pipeline.length + 1).padStart(2, '0');
      proj.pipeline.push({ step: nextNum, title: "Tahap Baru", desc: "Keterangan tahap..." });
      renderProjectEditor();
    },
    deletePipelineStep(pIdx, sIdx) {
      ensureProjectArray();
      const proj = activeData[editingLang].projects.items[pIdx];
      if (proj && proj.pipeline) {
        proj.pipeline.splice(sIdx, 1);
        renderProjectEditor();
      }
    },
    updateSkillCatName(catIdx, val) {
      activeData[editingLang].skills.categories[catIdx].name = val.trim();
    },
    updateSkillCatDesc(catIdx, val) {
      activeData[editingLang].skills.categories[catIdx].description = val.trim();
    },
    deleteSkillCat(catIdx) {
      if (confirm("Hapus kategori keahlian ini?")) {
        activeData[editingLang].skills.categories.splice(catIdx, 1);
        renderSkillsEditor();
      }
    },
    removeSkillTag(catIdx, itemIdx) {
      activeData[editingLang].skills.categories[catIdx].items.splice(itemIdx, 1);
      renderSkillsEditor();
    },
    addSkillTag(catIdx, val) {
      if (val && val.trim()) {
        activeData[editingLang].skills.categories[catIdx].items.push(val.trim());
        renderSkillsEditor();
      }
    },
    deleteExp(idx) {
      if (confirm("Hapus riwayat pengalaman ini?")) {
        activeData[editingLang].experience.items.splice(idx, 1);
        renderExperienceEditor();
      }
    },
    updateExp(idx, field, val) {
      activeData[editingLang].experience.items[idx][field] = val.trim();
    },
    deleteCert(idx) {
      if (confirm("Hapus sertifikasi ini?")) {
        activeData[editingLang].education.certifications.splice(idx, 1);
        renderEducationEditor();
      }
    },
    updateCert(idx, field, val) {
      activeData[editingLang].education.certifications[idx][field] = val.trim();
    }
  };
})();
