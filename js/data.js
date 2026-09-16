/**
 * Muhammad Farhan - Personal Portfolio Data
 * Sesuai dengan spesifikasi PRD (Product Requirements Document)
 */

const portfolioData = {
  id: {
    personal: {
      name: "Muhammad Farhan",
      role: "Informatics Engineering Graduate",
      tagline: "Web Development • Information Systems • IT Infrastructure",
      summary: "Lulusan Teknik Informatika dengan minat kuat di bidang pengembangan sistem dan pemeliharaan infrastruktur TI. Memiliki pengalaman dalam merancang Sistem Pendukung Keputusan (SPK) serta terbiasa melakukan troubleshooting perangkat keras dan lunak untuk mengoptimalkan performa sistem.",
      location: "Pamulang, Tangerang Selatan",
      email: "farhn.mhmmad@gmail.com",
      phone: "+62 895-3312-84320",
      linkedin: "https://www.linkedin.com/in/muhammad-farhan",
      github: "https://github.com/",
      cvFile: "assets/docs/CV_Muhammad_Farhan.pdf"
    },
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      experience: "Pengalaman",
      education: "Pendidikan",
      contact: "Kontak",
      downloadCv: "Unduh CV"
    },
    hero: {
      badge: "Tersedia untuk Peluang Baru & Magang",
      headline: "Membangun sistem informasi yang terukur dan infrastruktur yang andal.",
      viewProjects: "Lihat Proyek",
      downloadCv: "Unduh CV",
      metrics: [
        { label: "IPK Sarjana", value: "3.33" },
        { label: "Spesialisasi", value: "Sistem & IT Infra" },
        { label: "Pendidikan", value: "Teknik Informatika" }
      ]
    },
    about: {
      title: "Tentang Saya",
      subtitle: "Latar Belakang & Fokus Profesional",
      bio: "Saya adalah lulusan Teknik Informatika dari Universitas Pamulang yang berfokus pada perancangan logika sistem informasi, komputasi algoritma keputusan, dan pemeliharaan infrastruktur TI. Pendekatan saya berakar pada pemecahan masalah teknis secara metodis—mulai dari struktur basis data hingga stabilitas sistem operasi dan jaringan.",
      stats: [
        { label: "Gelar", value: "S.Kom (Sarjana Komputer)" },
        { label: "Institusi", value: "Universitas Pamulang" },
        { label: "IPK", value: "3.33" },
        { label: "Domisili", value: "Pamulang, Tangerang Selatan" }
      ]
    },
    skills: {
      title: "Keahlian Teknis & Inti",
      subtitle: "Pengelompokan kompetensi berdasarkan ranah kerja nyata",
      categories: [
        {
          name: "Web Development",
          icon: "code",
          description: "Pengembangan front-end dan pemrograman web sisi server dasar.",
          items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Basic PHP", "Responsive Web Design", "REST API Integration"]
        },
        {
          name: "Database",
          icon: "database",
          description: "Perancangan skema relasional, normalisasi data, dan manajemen query.",
          items: ["MySQL", "Relational Database Design", "SQL Querying", "Data Normalization", "Database Maintenance"]
        },
        {
          name: "IT Infrastructure",
          icon: "server",
          description: "Pemeliharaan keandalan sistem operasi, perangkat keras, dan konektivitas jaringan.",
          items: ["Troubleshooting Hardware", "Troubleshooting Software / OS", "Network Management", "TCP/IP & Subnetting", "Containerization (Docker Basics)", "System Administration"]
        },
        {
          name: "Core Skills",
          icon: "cpu",
          description: "Kecakapan metodologis, pemecahan masalah terstruktur, dan eksekusi tim.",
          items: ["Web Development", "Information System Development", "Problem Solving", "Technical Communication", "Analytical Thinking", "Time Management"]
        }
      ]
    },
    projects: {
      title: "Proyek Pilihan",
      subtitle: "Studi kasus implementasi sistem nyata dengan dampak terukur",
      featuredTag: "Featured Case Study",
      caseStudyBtn: "Buka Studi Kasus Lengkap",
      item: {
        title: "Sistem Pendukung Keputusan (SPK) — SDN Lebak Bulus 04",
        period: "Mei 2025 — Des 2025",
        summary: "Aplikasi web Sistem Pendukung Keputusan (SPK) untuk mendigitalisasi sistem penilaian kinerja guru di SDN Lebak Bulus 04, mengeliminasi bias subjektivitas dan mempercepat proses evaluasi berkala.",
        role: "Pengembang Sistem — Merancang alur komputasi algoritma dan logika sistem.",
        problem: "Kebutuhan akan sistem evaluasi kinerja tenaga pengajar di instansi pendidikan yang lebih terotomatisasi, transparan, dan bebas dari bias subjektivitas penilaian manual.",
        result: "Model SPK berhasil memberikan rekomendasi peringkat kinerja guru secara akurat dan objektif serta membantu proses pengambilan keputusan pihak manajemen sekolah.",
        tags: ["SAW Method", "TOPSIS Method", "Relational Database", "Multi-user Auth", "Mandatory Evidence"],
        rolesList: ["Admin", "Penilai", "Guest"],
        pipeline: [
          { step: "01", title: "Data Guru", desc: "Inventarisasi data induk dan identitas guru." },
          { step: "02", title: "Kriteria Penilaian", desc: "Konfigurasi pembobotan indikator performa kerja." },
          { step: "03", title: "Input Data", desc: "Pengisian nilai berkala & unggah dokumen bukti dukung." },
          { step: "04", title: "SAW / TOPSIS", desc: "Normalisasi matriks dan pembobotan preferensi." },
          { step: "05", title: "Perhitungan", desc: "Kalkulasi jarak solusi ideal dan skor akhir." },
          { step: "06", title: "Ranking", desc: "Penyusunan urutan peringkat objektif." },
          { step: "07", title: "Laporan", desc: "Hasil audit yang dapat diunduh manajemen sekolah." }
        ]
      }
    },
    experience: {
      title: "Pengalaman Kerja",
      subtitle: "Rekam jejak operasional, tanggung jawab kerja, dan ketepatan waktu",
      items: [
        {
          period: "Mar 2023 — Sep 2023",
          role: "Delivery Partner (Freelance)",
          company: "Lalamove",
          description: "Mengelola logistik pengantaran barang dengan SLA ketat, koordinasi rute optimal, komunikasi proaktif dengan klien, dan penanganan ketepatan waktu pengiriman barang."
        },
        {
          period: "Des 2021 — Jul 2022",
          role: "Packaging Staff (Freelance)",
          company: "Classicalita",
          description: "Bertanggung jawab atas pengecekan kualitas barang sebelum distribusi (quality control), manajemen stok pengemasan, dan ketelitian alur pemrosesan pesanan."
        }
      ]
    },
    education: {
      title: "Pendidikan & Sertifikasi",
      subtitle: "Kualifikasi akademik formal dan validasi kompetensi kejuruan",
      degree: {
        title: "Sarjana Teknik Informatika (S.Kom)",
        institution: "Universitas Pamulang",
        period: "Sep 2020 — Feb 2026",
        gpa: "IPK 3.33 / 4.00",
        description: "Menyelesaikan studi komputasi, algoritma, rekayasa perangkat lunak, sistem basis data, dan jaringan komputer dengan tugas akhir perancangan Sistem Pendukung Keputusan."
      },
      certifications: [
        {
          title: "Network Administrator",
          issuer: "LSP Universitas Pamulang (BNSP)",
          type: "Kompetensi Kejuruan",
          desc: "Validasi kompetensi konfigurasi topologi jaringan, routing, pengelolaan subnet, dan troubleshooting konektivitas."
        },
        {
          title: "TOFL / TOEFL Prediction",
          issuer: "Lembaga Bahasa Terakreditasi",
          type: "Kemampuan Bahasa",
          desc: "Pengukuran kemahiran pemahaman literatur teknis berbahasa Inggris dan komunikasi profesional."
        }
      ]
    },
    contact: {
      title: "Hubungi Saya",
      subtitle: "Let's Work Together",
      pitch: "Saya sangat antusias untuk berkontribusi melalui program magang maupun peran profesional lainnya yang memungkinkan saya memberikan dampak positif melalui pengembangan sistem dan pemeliharaan infrastruktur TI.",
      infoTitle: "Saluran Komunikasi Langsung",
      emailLabel: "Email",
      phoneLabel: "Telepon / WhatsApp",
      locationLabel: "Lokasi",
      formTitle: "Kirim Pesan Langsung",
      namePlaceholder: "Nama Lengkap Anda",
      emailPlaceholder: "alamat.email@anda.com",
      subjectPlaceholder: "Terkait Peluang / Diskusi Proyek",
      messagePlaceholder: "Tuliskan pesan atau penawaran Anda di sini...",
      submitBtn: "Kirim Pesan",
      emailDirectBtn: "Kirim Email via Mail Client",
      linkedinBtn: "Profil LinkedIn"
    }
  },
  en: {
    personal: {
      name: "Muhammad Farhan",
      role: "Informatics Engineering Graduate",
      tagline: "Web Development • Information Systems • IT Infrastructure",
      summary: "Informatics Engineering graduate with a strong interest in information systems engineering and IT infrastructure maintenance. Experienced in architecting Decision Support Systems (DSS) and proficient in hardware/software troubleshooting for peak system performance.",
      location: "Pamulang, South Tangerang, Indonesia",
      email: "farhn.mhmmad@gmail.com",
      phone: "+62 895-3312-84320",
      linkedin: "https://www.linkedin.com/in/muhammad-farhan",
      github: "https://github.com/",
      cvFile: "assets/docs/CV_Muhammad_Farhan.pdf"
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
      downloadCv: "Download CV"
    },
    hero: {
      badge: "Available for Internships & Full-time Roles",
      headline: "Building scalable information systems and dependable IT infrastructure.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      metrics: [
        { label: "Bachelor GPA", value: "3.33" },
        { label: "Specialization", value: "Systems & IT Infra" },
        { label: "Major", value: "Informatics Eng." }
      ]
    },
    about: {
      title: "About Me",
      subtitle: "Background & Professional Focus",
      bio: "I am an Informatics Engineering graduate from Universitas Pamulang focused on information system logic, multi-criteria decision algorithms, and enterprise IT infrastructure maintenance. My engineering approach is grounded in structured troubleshooting—from relational schemas to OS stability and network topologies.",
      stats: [
        { label: "Degree", value: "B.Sc. in Computer Science" },
        { label: "Institution", value: "Universitas Pamulang" },
        { label: "GPA", value: "3.33 / 4.00" },
        { label: "Location", value: "Pamulang, South Tangerang" }
      ]
    },
    skills: {
      title: "Technical & Core Skills",
      subtitle: "Structured competencies grounded in practical engineering practice",
      categories: [
        {
          name: "Web Development",
          icon: "code",
          description: "Front-end engineering and fundamental server-side web scripting.",
          items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Basic PHP", "Responsive Web Design", "REST API Integration"]
        },
        {
          name: "Database",
          icon: "database",
          description: "Relational schema design, data normalization, and query handling.",
          items: ["MySQL", "Relational Database Design", "SQL Querying", "Data Normalization", "Database Maintenance"]
        },
        {
          name: "IT Infrastructure",
          icon: "server",
          description: "Maintaining OS reliability, physical hardware, and network routing.",
          items: ["Hardware Troubleshooting", "OS / Software Troubleshooting", "Network Management", "TCP/IP & Subnetting", "Containerization (Docker Basics)", "System Administration"]
        },
        {
          name: "Core Skills",
          icon: "cpu",
          description: "Methodical problem-solving and technical execution.",
          items: ["Web Development", "Information System Development", "Problem Solving", "Technical Communication", "Analytical Thinking", "Time Management"]
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Real-world engineering case studies with measurable outcomes",
      featuredTag: "Featured Case Study",
      caseStudyBtn: "Explore Full Case Study",
      item: {
        title: "Decision Support System (SPK) — SDN Lebak Bulus 04",
        period: "May 2025 — Dec 2025",
        summary: "Web-based Decision Support System designed to digitize teacher performance evaluations at SDN Lebak Bulus 04, eliminating subjective evaluation bias and automating reporting.",
        role: "System Developer — Designed algorithm computational pipelines and system logic.",
        problem: "Need for an automated, transparent, and objective faculty evaluation system within educational institutions, removing manual evaluation discrepancies.",
        result: "The DSS model accurately provides objective performance rankings and assists educational administration in decisive human resource reviews.",
        tags: ["SAW Method", "TOPSIS Method", "Relational Database", "Multi-user Auth", "Mandatory Evidence"],
        rolesList: ["Admin", "Evaluator (Penilai)", "Guest"],
        pipeline: [
          { step: "01", title: "Faculty Data", desc: "Registration and profile master indexing." },
          { step: "02", title: "Evaluation Criteria", desc: "Weight configuration across performance indicators." },
          { step: "03", title: "Data Input", desc: "Periodic score entry & mandatory evidence attachment." },
          { step: "04", title: "SAW / TOPSIS", desc: "Matrix normalization and preference weighting." },
          { step: "05", title: "Computation", desc: "Ideal solution distance calculations." },
          { step: "06", title: "Ranking", desc: "Objective multi-criteria performance ordering." },
          { step: "07", title: "Reporting", desc: "Executive reports generated for administration." }
        ]
      }
    },
    experience: {
      title: "Work Experience",
      subtitle: "Operational history demonstrating discipline, punctuality, and accountability",
      items: [
        {
          period: "Mar 2023 — Sep 2023",
          role: "Delivery Partner (Freelance)",
          company: "Lalamove",
          description: "Handled timely cargo dispatch under strict SLAs, planned optimal transit routes, maintained proactive client communication, and preserved delivery integrity."
        },
        {
          period: "Dec 2021 — Jul 2022",
          role: "Packaging Staff (Freelance)",
          company: "Classicalita",
          description: "Conducted pre-distribution quality control checks, managed packing inventories, and adhered to systematic dispatch workflows."
        }
      ]
    },
    education: {
      title: "Education & Certifications",
      subtitle: "Academic qualifications and verified vocational credentials",
      degree: {
        title: "Bachelor of Informatics Engineering (S.Kom)",
        institution: "Universitas Pamulang",
        period: "Sep 2020 — Feb 2026",
        gpa: "GPA 3.33 / 4.00",
        description: "Completed comprehensive curriculum in computing, software architecture, relational databases, computer networks, and multi-criteria decision systems."
      },
      certifications: [
        {
          title: "Network Administrator",
          issuer: "LSP Universitas Pamulang (BNSP Certification)",
          type: "Vocational Qualification",
          desc: "Validated competence in network topology planning, routing, subnetting, and connectivity troubleshooting."
        },
        {
          title: "TOEFL Prediction",
          issuer: "Accredited Language Institution",
          type: "Language Proficiency",
          desc: "Proficiency in technical literature comprehension and professional English communication."
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Let's Work Together",
      pitch: "I am eager to contribute through internship programs or professional IT roles where I can make a tangible impact through system engineering and IT infrastructure reliability.",
      infoTitle: "Direct Contact Channels",
      emailLabel: "Email",
      phoneLabel: "Phone / WhatsApp",
      locationLabel: "Location",
      formTitle: "Send a Message",
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "Opportunity / Project Inquiry",
      messagePlaceholder: "Write your message or inquiry here...",
      submitBtn: "Send Message",
      emailDirectBtn: "Email via Mail Client",
      linkedinBtn: "LinkedIn Profile"
    }
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

// Export for Node.js if required
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
