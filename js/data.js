/**
 * Muhammad Farhan - Personal Portfolio Data
 * Comprehensive Bilingual Content (Bahasa Indonesia & English)
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
      github: "https://github.com/farhanap3t",
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
      downloadCv: "Unduh CV (PDF)",
      metrics: [
        { label: "IPK Sarjana", value: "3.33" },
        { label: "Spesialisasi", value: "Sistem & IT Infra" },
        { label: "Pendidikan", value: "Teknik Informatika" }
      ],
      card: {
        title: "profile.config.json",
        almamaterKey: "Almamater:",
        almamaterVal: "Univ. Pamulang",
        focusKey: "Fokus Studi:",
        focusVal: "Rekayasa Perangkat Lunak & SPK",
        domicileKey: "Domisili:",
        domicileVal: "Pamulang, Tangerang Selatan",
        statusKey: "Status:",
        statusVal: "Tersedia untuk Peluang Baru"
      }
    },
    about: {
      title: "Tentang Saya",
      subtitle: "Latar Belakang & Fokus Profesional",
      bioP1: "Lulusan Teknik Informatika dengan minat kuat di bidang pengembangan sistem dan pemeliharaan infrastruktur TI. Memiliki pengalaman dalam merancang Sistem Pendukung Keputusan (SPK) serta terbiasa melakukan troubleshooting perangkat keras dan lunak untuk mengoptimalkan performa sistem.",
      bioP2: "Dengan latar belakang akademik yang kokoh di bidang ilmu komputer dan pengalaman praktis dalam perancangan algoritma serta administrasi jaringan, saya berkomitmen untuk menghadirkan solusi teknologi yang terstruktur, efisien, dan berdampak nyata bagi instansi maupun bisnis.",
      stats: {
        eduTitle: "Pendidikan Terakhir",
        eduDegree: "Sarjana Teknik Informatika (S.Kom)",
        eduSchool: "Universitas Pamulang",
        gpaTitle: "Indeks Prestasi Kumulatif (IPK)",
        gpaValue: "3.33 / 4.00",
        gpaScale: "Skala 4.00",
        locTitle: "Lokasi Saat Ini",
        locValue: "Pamulang, Tangerang Selatan",
        locSub: "Banten, Indonesia"
      }
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
      problemTitle: "Problem Statement",
      roleTitle: "Peran & Dampak",
      pipelineTitle: "System Pipeline & Decision Architecture",
      accessLevels: "Tingkat Hak Akses:",
      item: {
        title: "Sistem Pendukung Keputusan (SPK) — SDN Lebak Bulus 04",
        period: "Mei 2025 — Des 2025",
        summary: "Aplikasi web Sistem Pendukung Keputusan (SPK) untuk mendigitalisasi sistem penilaian kinerja guru di SDN Lebak Bulus 04, mengeliminasi bias subjektivitas dan mempercepat proses evaluasi berkala.",
        role: "Pengembang Sistem — Merancang alur komputasi algoritma dan logika sistem.",
        problem: "Kebutuhan akan sistem evaluasi kinerja tenaga pengajar di instansi pendidikan yang lebih terotomatisasi, transparan, dan bebas dari bias subjektivitas penilaian manual.",
        result: "Model SPK berhasil memberikan rekomendasi peringkat kinerja guru secara akurat dan objektif serta membantu proses pengambilan keputusan pihak manajemen sekolah.",
        tags: ["Metode SAW", "Metode TOPSIS", "Relational Database", "Multi-user Auth", "Mandatory Evidence"],
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
      },
      modal: {
        title: "Studi Kasus Teknis: SPK SDN Lebak Bulus 04",
        section1Title: "Ringkasan & Latar Belakang Masalah",
        section1Body: "SDN Lebak Bulus 04 membutuhkan mekanisme evaluasi kinerja tenaga pengajar yang terotomatisasi, transparan, dan terbebas dari bias subjektivitas. Proses penilaian manual sebelumnya memakan waktu audit yang lama dan rentan terhadap ketidaksesuaian pembobotan indikator penilaian.",
        section2Title: "Peran & Kontribusi Utama",
        section2Intro: "Sebagai <strong>Pengembang Sistem</strong>, tanggung jawab utama berfokus pada:",
        section2Points: [
          "Merancang arsitektur basis data relasional untuk integritas data penilaian dan bukti dukung fisik.",
          "Mengimplementasikan alur komputasi algoritma Multi-Criteria Decision Making (MCDM) menggunakan metode SAW (Simple Additive Weighting) dan TOPSIS.",
          "Membangun manajemen hak akses berlapis (Multi-user Authentication: Admin, Penilai, Guest) untuk menjaga kerahasiaan dan akuntabilitas data.",
          "Menyusun modul validasi berkas penilaian wajib (Mandatory Evidence)."
        ],
        section3Title: "Alur Komputasi Keputusan",
        section3Steps: [
          "[1] Input Data Guru & Kriteria Penilaian",
          " ↓",
          "[2] Pembentukan Matriks Keputusan (X)",
          " ↓",
          "[3] Normalisasi Matriks (SAW / TOPSIS)",
          " ↓",
          "[4] Matriks Ternormalisasi Terbobot (V)",
          " ↓",
          "[5] Penentuan Solusi Ideal Positif (A+) & Negatif (A-)",
          " ↓",
          "[6] Kalkulasi Jarak & Nilai Preferensi Akhir",
          " ↓",
          "[7] Perangkingan Otomatis & Hasil Laporan Manajemen"
        ],
        section4Title: "Hasil & Dampak Implementasi",
        section4Body: "Model SPK berhasil memberikan rekomendasi peringkat kinerja guru secara akurat dan objektif, memangkas durasi rekapitulasi evaluasi, serta menjadi acuan berbasis data yang valid bagi pihak manajemen sekolah dalam pengambilan keputusan."
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
      degreeTag: "Pendidikan Formal",
      degree: {
        title: "Sarjana Teknik Informatika (S.Kom)",
        institution: "Universitas Pamulang",
        period: "Sep 2020 — Feb 2026",
        gpa: "IPK 3.33 / 4.00",
        description: "Menyelesaikan studi komputasi, algoritma, rekayasa perangkat lunak, sistem basis data, dan jaringan komputer dengan tugas akhir perancangan Sistem Pendukung Keputusan."
      },
      certTag: "Sertifikasi & Lisensi",
      certifications: [
        {
          title: "Network Administrator",
          issuer: "LSP Universitas Pamulang (BNSP)",
          type: "Kompetensi Kejuruan",
          desc: "Validasi kompetensi konfigurasi topologi jaringan, routing, pengelolaan subnet, dan troubleshooting konektivitas."
        },
        {
          title: "TOEFL Prediction",
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
      formLabels: {
        name: "Nama Lengkap *",
        email: "Email Anda *",
        subject: "Subjek / Topik",
        message: "Pesan *"
      },
      namePlaceholder: "Nama Lengkap Anda",
      emailPlaceholder: "alamat.email@anda.com",
      subjectPlaceholder: "Terkait Peluang / Diskusi Proyek",
      messagePlaceholder: "Tuliskan pesan atau penawaran Anda di sini...",
      submitBtn: "Kirim Pesan",
      emailDirectBtn: "Email Me",
      linkedinBtn: "Profil LinkedIn"
    },
    footer: {
      copy: "Sarjana Teknik Informatika — Universitas Pamulang. All rights reserved.",
      backToTop: "Kembali ke Atas ↑"
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
      github: "https://github.com/farhanap3t",
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
      downloadCv: "Download CV (PDF)",
      metrics: [
        { label: "Bachelor GPA", value: "3.33" },
        { label: "Specialization", value: "Systems & IT Infra" },
        { label: "Major", value: "Informatics Eng." }
      ],
      card: {
        title: "profile.config.json",
        almamaterKey: "Alma Mater:",
        almamaterVal: "Univ. Pamulang",
        focusKey: "Study Focus:",
        focusVal: "Software Engineering & DSS",
        domicileKey: "Location:",
        domicileVal: "Pamulang, South Tangerang",
        statusKey: "Status:",
        statusVal: "Open for Opportunities"
      }
    },
    about: {
      title: "About Me",
      subtitle: "Background & Professional Focus",
      bioP1: "Informatics Engineering graduate with a strong interest in information systems engineering and IT infrastructure maintenance. Experienced in architecting Decision Support Systems (DSS) and proficient in hardware and software troubleshooting to optimize overall system performance.",
      bioP2: "With a solid academic foundation in computer science and hands-on experience in algorithmic computational modeling and network administration, I am committed to delivering structured, efficient, and measurable technology solutions for institutions and businesses.",
      stats: {
        eduTitle: "Highest Degree",
        eduDegree: "Bachelor of Informatics Engineering (S.Kom)",
        eduSchool: "Universitas Pamulang",
        gpaTitle: "Grade Point Average (GPA)",
        gpaValue: "3.33 / 4.00",
        gpaScale: "Scale 4.00",
        locTitle: "Current Location",
        locValue: "Pamulang, South Tangerang",
        locSub: "Banten, Indonesia"
      }
    },
    skills: {
      title: "Technical & Core Skills",
      subtitle: "Structured competencies grounded in practical engineering practice",
      categories: [
        {
          name: "Web Development",
          icon: "code",
          description: "Front-end engineering and foundational server-side web scripting.",
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
          description: "Methodical problem-solving and structured technical execution.",
          items: ["Web Development", "Information System Development", "Problem Solving", "Technical Communication", "Analytical Thinking", "Time Management"]
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Real-world engineering case studies with measurable outcomes",
      featuredTag: "Featured Case Study",
      caseStudyBtn: "Explore Full Case Study",
      problemTitle: "Problem Statement",
      roleTitle: "Role & Impact",
      pipelineTitle: "System Pipeline & Decision Architecture",
      accessLevels: "Access Levels:",
      item: {
        title: "Decision Support System (DSS) — SDN Lebak Bulus 04",
        period: "May 2025 — Dec 2025",
        summary: "Web-based Decision Support System designed to digitize teacher performance evaluations at SDN Lebak Bulus 04, eliminating subjective evaluation bias and automating periodic reviews.",
        role: "System Developer — Designed algorithmic computational pipelines and system logic.",
        problem: "Need for an automated, transparent, and objective faculty evaluation system within educational institutions, removing manual evaluation bias.",
        result: "The DSS model accurately provides objective performance rankings and assists educational administration in decisive human resource reviews.",
        tags: ["SAW Method", "TOPSIS Method", "Relational Database", "Multi-user Auth", "Mandatory Evidence"],
        rolesList: ["Admin", "Evaluator", "Guest"],
        pipeline: [
          { step: "01", title: "Faculty Data", desc: "Registration and profile master indexing." },
          { step: "02", title: "Evaluation Criteria", desc: "Weight configuration across performance indicators." },
          { step: "03", title: "Data Input", desc: "Periodic score entry & mandatory evidence attachment." },
          { step: "04", title: "SAW / TOPSIS", desc: "Matrix normalization and preference weighting." },
          { step: "05", title: "Computation", desc: "Ideal solution distance calculations." },
          { step: "06", title: "Ranking", desc: "Objective multi-criteria performance ordering." },
          { step: "07", title: "Reporting", desc: "Executive reports generated for administration." }
        ]
      },
      modal: {
        title: "Technical Case Study: DSS SDN Lebak Bulus 04",
        section1Title: "Summary & Problem Statement",
        section1Body: "SDN Lebak Bulus 04 required an automated, transparent, and bias-free performance evaluation mechanism for teaching personnel. Previous manual evaluation workflows were time-consuming and vulnerable to discrepancies in indicator weighting.",
        section2Title: "Key Roles & Contributions",
        section2Intro: "As <strong>System Developer</strong>, primary responsibilities included:",
        section2Points: [
          "Architecting relational database schemas to ensure evaluation data integrity and physical evidence traceability.",
          "Implementing Multi-Criteria Decision Making (MCDM) algorithms using SAW (Simple Additive Weighting) and TOPSIS methods.",
          "Establishing multi-role access control (Admin, Evaluator, Guest) to safeguard confidentiality and enforce auditing.",
          "Designing verification modules for mandatory documentary evidence."
        ],
        section3Title: "Decision Computational Pipeline",
        section3Steps: [
          "[1] Input Faculty Data & Criteria Weights",
          " ↓",
          "[2] Decision Matrix Generation (X)",
          " ↓",
          "[3] Matrix Normalization (SAW / TOPSIS)",
          " ↓",
          "[4] Weighted Normalized Matrix (V)",
          " ↓",
          "[5] Identification of Positive (A+) & Negative (A-) Ideal Solutions",
          " ↓",
          "[6] Relative Closeness & Preference Calculation",
          " ↓",
          "[7] Automated Ranking & Administrative Report Export"
        ],
        section4Title: "Results & Implementation Impact",
        section4Body: "The system successfully delivered objective and accurate teacher performance rankings, significantly reduced review recap time, and provided a trustworthy data-driven foundation for administrative decision-making."
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
          description: "Handled cargo logistics under strict delivery SLAs, mapped out optimal routes, communicated proactively with clients, and maintained shipment punctuality."
        },
        {
          period: "Dec 2021 — Jul 2022",
          role: "Packaging Staff (Freelance)",
          company: "Classicalita",
          description: "Conducted pre-distribution quality control inspections, managed packaging materials inventory, and maintained order fulfillment accuracy."
        }
      ]
    },
    education: {
      title: "Education & Certifications",
      subtitle: "Academic qualifications and verified vocational credentials",
      degreeTag: "Formal Education",
      degree: {
        title: "Bachelor of Informatics Engineering (S.Kom)",
        institution: "Universitas Pamulang",
        period: "Sep 2020 — Feb 2026",
        gpa: "GPA 3.33 / 4.00",
        description: "Completed comprehensive curriculum in computing, software engineering, relational database systems, computer networks, and multi-criteria decision systems."
      },
      certTag: "Certifications & Licenses",
      certifications: [
        {
          title: "Network Administrator",
          issuer: "LSP Universitas Pamulang (BNSP)",
          type: "Vocational Qualification",
          desc: "Validated competence in network topology planning, routing, subnet configuration, and connectivity troubleshooting."
        },
        {
          title: "TOEFL Prediction",
          issuer: "Accredited Language Institution",
          type: "Language Proficiency",
          desc: "Demonstrated proficiency in technical English literature comprehension and professional communication."
        }
      ]
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's Work Together",
      pitch: "I am eager to contribute through internship programs or professional IT roles where I can make a tangible impact through system engineering and IT infrastructure reliability.",
      infoTitle: "Direct Contact Channels",
      emailLabel: "Email",
      phoneLabel: "Phone / WhatsApp",
      locationLabel: "Location",
      formTitle: "Send a Message",
      formLabels: {
        name: "Full Name *",
        email: "Your Email *",
        subject: "Subject / Topic",
        message: "Message *"
      },
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "Opportunity / Project Inquiry",
      messagePlaceholder: "Write your message or inquiry here...",
      submitBtn: "Send Message",
      emailDirectBtn: "Email Me",
      linkedinBtn: "LinkedIn Profile"
    },
    footer: {
      copy: "Bachelor of Informatics Engineering — Universitas Pamulang. All rights reserved.",
      backToTop: "Back to Top ↑"
    }
  }
};

if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
