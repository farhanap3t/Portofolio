/**
 * Muhammad Farhan - Admin CMS Engine (v1.0.3 - Bulletproof)
 * Handles Login, Multi-Project CRUD, LocalStorage persistence, Exporting, and Backend Sync
 */

(function() {
  const DEFAULT_USER = "admin";
  const DEFAULT_PASS = "farhan2026";

  let activeData = null;
  let editingLang = "id";

  // Elements
  let loginView, adminApp, loginForm, loginError, toastEl;

  document.addEventListener("DOMContentLoaded", () => {
    initCMS();
  });

  function initCMS() {
    loginView = document.getElementById("login-view");
    adminApp = document.getElementById("admin-app");
    loginForm = document.getElementById("login-form");
    loginError = document.getElementById("login-error");
    toastEl = document.getElementById("toast-msg");

    const isLoggedIn = sessionStorage.getItem("portfolio_admin_auth") === "true";
    if (isLoggedIn) {
      showAdminDashboard();
    } else {
      showLogin();
    }
  }

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

  // Load Data with fallback & recovery
  function loadData(forceDefault = false) {
    if (!forceDefault) {
      try {
        const saved = localStorage.getItem("portfolio_custom_data");
        if (saved) {
          activeData = JSON.parse(saved);
          ensureStructures();
          return;
        }
      } catch (e) {
        console.warn("Error parsing saved custom data:", e);
      }
    }
    activeData = JSON.parse(JSON.stringify(window.portfolioData || {}));
    ensureStructures();
  }

  // Ensure items arrays exist on activeData for both languages
  function ensureStructures() {
    if (!activeData) activeData = {};
    ["id", "en"].forEach(lang => {
      if (!activeData[lang]) activeData[lang] = {};
      const cur = activeData[lang];

      // Ensure projects
      if (!cur.projects) cur.projects = {};
      if (!cur.projects.items || !Array.isArray(cur.projects.items)) {
        if (cur.projects.item) {
          cur.projects.items = [cur.projects.item];
        } else {
          cur.projects.items = [];
        }
      }

      // Ensure skills
      if (!cur.skills) cur.skills = { categories: [] };
      if (!cur.skills.categories) cur.skills.categories = [];

      // Ensure experience
      if (!cur.experience) cur.experience = { items: [] };
      if (!cur.experience.items) cur.experience.items = [];

      // Ensure education
      if (!cur.education) cur.education = { degree: {}, certifications: [] };
      if (!cur.education.degree) cur.education.degree = {};
      if (!cur.education.certifications) cur.education.certifications = [];
    });
  }

  // Populate All Forms
  function populateAllForms() {
    if (!activeData || !activeData[editingLang]) return;
    ensureStructures();
    const cur = activeData[editingLang];

    // 1. Profile
    setVal("input-name", cur.personal?.name || "");
    setVal("input-role", cur.personal?.role || "");
    setVal("input-tagline", cur.personal?.tagline || "");
    setVal("input-summary", cur.personal?.summary || "");
    setVal("input-location", cur.personal?.location || "");
    setVal("input-email", cur.personal?.email || "");
    setVal("input-phone", cur.personal?.phone || "");
    setVal("input-linkedin", cur.personal?.linkedin || "");
    setVal("input-hero-badge", cur.hero?.badge || "");
    setVal("input-hero-headline", cur.hero?.headline || "");
    setVal("input-hero-status-val", cur.hero?.card?.statusVal || "");

    if (cur.hero?.metrics && cur.hero.metrics.length >= 3) {
      setVal("input-metric-val-1", cur.hero.metrics[0].value);
      setVal("input-metric-lbl-1", cur.hero.metrics[0].label);
      setVal("input-metric-val-2", cur.hero.metrics[1].value);
      setVal("input-metric-lbl-2", cur.hero.metrics[1].label);
      setVal("input-metric-val-3", cur.hero.metrics[2].value);
      setVal("input-metric-lbl-3", cur.hero.metrics[2].label);
    }

    // 2. About
    setVal("input-about-bio-p1", cur.about?.bioP1 || "");
    setVal("input-about-bio-p2", cur.about?.bioP2 || "");
    if (cur.about?.stats) {
      setVal("input-about-degree", cur.about.stats.eduDegree || "");
      setVal("input-about-school", cur.about.stats.eduSchool || "");
      setVal("input-about-gpa", cur.about.stats.gpaValue || "");
      setVal("input-about-loc", cur.about.stats.locValue || "");
    }

    // 3. Projects
    renderProjectEditor();

    // 4. Skills
    renderSkillsEditor();

    // 5. Experience
    renderExperienceEditor();

    // 6. Education
    renderEducationEditor();
  }

  // Render Multi-Project Cards
  function renderProjectEditor() {
    const container = document.getElementById("project-editor-container");
    if (!container) return;

    ensureStructures();
    const items = activeData[editingLang].projects.items;

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: var(--bg-admin-input); border: 1px dashed var(--border-admin); border-radius: var(--radius);">
          <p style="color: var(--text-sub); margin-bottom: 1rem;">Belum ada proyek yang terdaftar.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.adminCMS.addNewProject()">+ Buat Proyek Pertama</button>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((proj, pIdx) => `
      <div class="item-card project-edit-card" data-pidx="${pIdx}" style="margin-bottom: 2rem; border-left: 3px solid var(--brand-lime);">
        <div class="item-card-header" style="border-bottom: 1px solid var(--border-admin); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-family: var(--font-mono); font-weight: bold; color: var(--brand-lime); font-size: 0.85rem;">PROYEK #${pIdx + 1}</span>
            <span class="item-card-title">${escapeHtml(proj.title || "Proyek")}</span>
          </div>
          <button type="button" class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteProject(${pIdx})">Hapus Proyek</button>
        </div>

        <div class="form-grid">
          <div class="form-group form-grid-full">
            <label class="form-label">Judul Proyek *</label>
            <input type="text" class="form-input proj-input-title" value="${escapeHtml(proj.title || "")}" placeholder="Judul Proyek">
          </div>
          <div class="form-group">
            <label class="form-label">Periode Pengerjaan</label>
            <input type="text" class="form-input proj-input-period" value="${escapeHtml(proj.period || "")}" placeholder="e.g. Mei 2025 — Des 2025">
          </div>
          <div class="form-group">
            <label class="form-label">Peran & Tanggung Jawab</label>
            <input type="text" class="form-input proj-input-role" value="${escapeHtml(proj.role || "")}" placeholder="e.g. Pengembang Sistem">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Ringkasan Singkat Proyek</label>
            <textarea class="form-textarea proj-input-summary" placeholder="Ringkasan tentang proyek ini...">${escapeHtml(proj.summary || "")}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Problem Statement (Kebutuhan / Masalah)</label>
            <textarea class="form-textarea proj-input-problem" placeholder="Masalah yang diselesaikan...">${escapeHtml(proj.problem || "")}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Hasil / Impact</label>
            <textarea class="form-textarea proj-input-result" placeholder="Dampak dan hasil terukur...">${escapeHtml(proj.result || "")}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Tag Teknologi (Pisahkan dengan koma)</label>
            <input type="text" class="form-input proj-input-tags" value="${escapeHtml((proj.tags || []).join(", "))}" placeholder="e.g. HTML5, CSS3, MySQL">
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Tingkat Hak Akses (Pisahkan dengan koma)</label>
            <input type="text" class="form-input proj-input-roles" value="${escapeHtml((proj.rolesList || []).join(", "))}" placeholder="e.g. Admin, Penilai, Guest">
          </div>
        </div>

        <div style="margin-top: 1.25rem; border-top: 1px dashed var(--border-admin); padding-top: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <label class="form-label">Alur Pipeline / Tahapan Keputusan:</label>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.adminCMS.addPipelineStep(${pIdx})">+ Tambah Langkah Step</button>
          </div>
          <div class="proj-pipeline-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${(proj.pipeline || []).map((step, sIdx) => `
              <div style="display: grid; grid-template-columns: 50px 160px 1fr 34px; gap: 0.5rem; align-items: center;">
                <input type="text" class="form-input step-input-num" value="${escapeHtml(step.step || "")}" placeholder="01">
                <input type="text" class="form-input step-input-title" value="${escapeHtml(step.title || "")}" placeholder="Nama Tahap">
                <input type="text" class="form-input step-input-desc" value="${escapeHtml(step.desc || "")}" placeholder="Deskripsi tahapan...">
                <button type="button" class="btn btn-danger btn-sm" style="padding: 0.4rem; height: 100%; display: flex; align-items: center; justify-content: center;" onclick="window.adminCMS.deletePipelineStep(${pIdx}, ${sIdx})" title="Hapus step">&times;</button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  // Synchronize unsaved input values from the DOM into activeData
  function syncProjectsFromDom() {
    ensureStructures();
    const projCards = document.querySelectorAll(".project-edit-card");
    if (!projCards || projCards.length === 0) return;

    const cur = activeData[editingLang];
    const updated = [];

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

      const stepNums = card.querySelectorAll(".step-input-num");
      const stepTitles = card.querySelectorAll(".step-input-title");
      const stepDescs = card.querySelectorAll(".step-input-desc");
      const pipeline = [];
      stepNums.forEach((sNum, sIdx) => {
        pipeline.push({
          step: sNum.value.trim() || String(sIdx + 1).padStart(2, "0"),
          title: stepTitles[sIdx] ? stepTitles[sIdx].value.trim() : "",
          desc: stepDescs[sIdx] ? stepDescs[sIdx].value.trim() : ""
        });
      });

      updated.push({
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

    cur.projects.items = updated;
    if (updated.length > 0) cur.projects.item = updated[0];
  }

  // Render Skills Editor
  function renderSkillsEditor() {
    const container = document.getElementById("skills-editor-container");
    if (!container) return;

    ensureStructures();
    const cats = activeData[editingLang].skills.categories;
    container.innerHTML = cats.map((cat, catIdx) => `
      <div class="item-card">
        <div class="item-card-header">
          <input type="text" class="form-input" style="font-weight: bold; width: auto; min-width: 200px;" value="${escapeHtml(cat.name)}" onchange="window.adminCMS.updateSkillCatName(${catIdx}, this.value)">
          <button type="button" class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteSkillCat(${catIdx})">Hapus Kategori</button>
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

    ensureStructures();
    const items = activeData[editingLang].experience.items;
    container.innerHTML = items.map((exp, idx) => `
      <div class="item-card">
        <div class="item-card-header">
          <span class="item-card-title">Pengalaman #${idx + 1}</span>
          <button type="button" class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteExp(${idx})">Hapus</button>
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

  // Render Education Editor
  function renderEducationEditor() {
    ensureStructures();
    const edu = activeData[editingLang].education;
    setVal("input-edu-degree", edu.degree?.title || "");
    setVal("input-edu-school", edu.degree?.institution || "");
    setVal("input-edu-period", edu.degree?.period || "");
    setVal("input-edu-gpa", edu.degree?.gpa || "");
    setVal("input-edu-desc", edu.degree?.description || "");

    const certContainer = document.getElementById("cert-editor-container");
    if (certContainer) {
      certContainer.innerHTML = edu.certifications.map((c, idx) => `
        <div class="item-card">
          <div class="item-card-header">
            <span class="item-card-title">Sertifikasi #${idx + 1}</span>
            <button type="button" class="btn btn-danger btn-sm" onclick="window.adminCMS.deleteCert(${idx})">Hapus</button>
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

  // Save All Changes
  function saveAllChanges() {
    ensureStructures();
    const cur = activeData[editingLang];

    // 1. Profile
    if (cur.personal) {
      cur.personal.name = getVal("input-name");
      cur.personal.role = getVal("input-role");
      cur.personal.tagline = getVal("input-tagline");
      cur.personal.summary = getVal("input-summary");
      cur.personal.location = getVal("input-location");
      cur.personal.email = getVal("input-email");
      cur.personal.phone = getVal("input-phone");
      cur.personal.linkedin = getVal("input-linkedin");
    }
    if (cur.hero) {
      cur.hero.badge = getVal("input-hero-badge");
      cur.hero.headline = getVal("input-hero-headline");
      if (cur.hero.card) {
        cur.hero.card.statusVal = getVal("input-hero-status-val");
      }
      if (cur.hero.metrics && cur.hero.metrics.length >= 3) {
        cur.hero.metrics[0].value = getVal("input-metric-val-1");
        cur.hero.metrics[0].label = getVal("input-metric-lbl-1");
        cur.hero.metrics[1].value = getVal("input-metric-val-2");
        cur.hero.metrics[1].label = getVal("input-metric-lbl-2");
        cur.hero.metrics[2].value = getVal("input-metric-val-3");
        cur.hero.metrics[2].label = getVal("input-metric-lbl-3");
      }
    }

    // 2. About
    if (cur.about) {
      cur.about.bioP1 = getVal("input-about-bio-p1");
      cur.about.bioP2 = getVal("input-about-bio-p2");
      if (cur.about.stats) {
        cur.about.stats.eduDegree = getVal("input-about-degree");
        cur.about.stats.eduSchool = getVal("input-about-school");
        cur.about.stats.gpaValue = getVal("input-about-gpa");
        cur.about.stats.locValue = getVal("input-about-loc");
      }
    }

    // 3. Projects
    syncProjectsFromDom();

    // 4. Education
    if (cur.education && cur.education.degree) {
      cur.education.degree.title = getVal("input-edu-degree");
      cur.education.degree.institution = getVal("input-edu-school");
      cur.education.degree.period = getVal("input-edu-period");
      cur.education.degree.gpa = getVal("input-edu-gpa");
      cur.education.degree.description = getVal("input-edu-desc");
    }

    // Persist to LocalStorage
    try {
      localStorage.setItem("portfolio_custom_data", JSON.stringify(activeData));
    } catch (e) {
      console.error("LocalStorage write failed:", e);
    }

    // Persist to Backend if running
    fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: activeData })
    }).catch(() => {});

    showToast("✓ Semua perubahan berhasil disimpan dan langsung aktif!");
  }

  function showToast(msg) {
    if (!toastEl) toastEl = document.getElementById("toast-msg");
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 4000);
  }

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

  // Expose global controller on window.adminCMS
  window.adminCMS = {
    submitLogin(e) {
      if (e) e.preventDefault();
      const user = document.getElementById("login-username")?.value.trim();
      const pass = document.getElementById("login-password")?.value.trim();

      if (user === DEFAULT_USER && pass === DEFAULT_PASS) {
        sessionStorage.setItem("portfolio_admin_auth", "true");
        if (loginError) loginError.style.display = "none";
        showAdminDashboard();
      } else {
        if (loginError) {
          loginError.textContent = "Username atau password salah / Invalid credentials";
          loginError.style.display = "block";
        }
      }
    },

    logout() {
      sessionStorage.removeItem("portfolio_admin_auth");
      showLogin();
    },

    switchLanguage(lang) {
      editingLang = lang;
      populateAllForms();
      showToast(`Beralih mengedit bahasa: ${editingLang.toUpperCase()}`);
    },

    switchTab(tabId, btnEl) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      if (btnEl) btnEl.classList.add("active");
      const target = document.getElementById(tabId);
      if (target) target.classList.add("active");
    },

    addNewProject() {
      syncProjectsFromDom();
      const newProj = {
        title: editingLang === "id" ? "Proyek Baru" : "New Project",
        period: "2025 — 2026",
        summary: editingLang === "id" ? "Deskripsi ringkas proyek..." : "Summary of the project...",
        role: editingLang === "id" ? "Pengembang Sistem" : "System Developer",
        problem: editingLang === "id" ? "Masalah yang dipecahkan..." : "Problem addressed...",
        result: editingLang === "id" ? "Hasil dan pencapaian implementasi..." : "Outcomes and impact...",
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
      showToast("Proyek baru berhasil ditambahkan! Silakan lengkapi.");
    },

    deleteProject(pIdx) {
      syncProjectsFromDom();
      if (confirm("Yakin ingin menghapus proyek ini?")) {
        activeData[editingLang].projects.items.splice(pIdx, 1);
        renderProjectEditor();
        showToast("Proyek berhasil dihapus.");
      }
    },

    addPipelineStep(pIdx) {
      syncProjectsFromDom();
      const proj = activeData[editingLang].projects.items[pIdx];
      if (!proj.pipeline) proj.pipeline = [];
      const nextNum = String(proj.pipeline.length + 1).padStart(2, "0");
      proj.pipeline.push({ step: nextNum, title: "Tahap Baru", desc: "Deskripsi alur..." });
      renderProjectEditor();
    },

    deletePipelineStep(pIdx, sIdx) {
      syncProjectsFromDom();
      const proj = activeData[editingLang].projects.items[pIdx];
      if (proj && proj.pipeline) {
        proj.pipeline.splice(sIdx, 1);
        renderProjectEditor();
      }
    },

    addNewSkillCat() {
      const name = prompt("Nama Kategori Keahlian Baru:");
      if (name && name.trim()) {
        activeData[editingLang].skills.categories.push({
          name: name.trim(),
          icon: "cpu",
          description: "Kategori keahlian teknis tambahan.",
          items: ["Keahlian 1"]
        });
        renderSkillsEditor();
      }
    },

    deleteSkillCat(catIdx) {
      if (confirm("Hapus kategori keahlian ini?")) {
        activeData[editingLang].skills.categories.splice(catIdx, 1);
        renderSkillsEditor();
      }
    },

    updateSkillCatName(catIdx, val) {
      activeData[editingLang].skills.categories[catIdx].name = val.trim();
    },

    updateSkillCatDesc(catIdx, val) {
      activeData[editingLang].skills.categories[catIdx].description = val.trim();
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

    addNewExp() {
      activeData[editingLang].experience.items.push({
        period: "2024 — Sekarang",
        role: "Posisi Pekerjaan",
        company: "Nama Perusahaan",
        description: "Deskripsi tanggung jawab kerja..."
      });
      renderExperienceEditor();
    },

    deleteExp(idx) {
      if (confirm("Hapus pengalaman ini?")) {
        activeData[editingLang].experience.items.splice(idx, 1);
        renderExperienceEditor();
      }
    },

    updateExp(idx, field, val) {
      activeData[editingLang].experience.items[idx][field] = val.trim();
    },

    addNewCert() {
      activeData[editingLang].education.certifications.push({
        title: "Nama Sertifikasi Baru",
        issuer: "Lembaga Penerbit",
        type: "Kompetensi",
        desc: "Keterangan kompetensi..."
      });
      renderEducationEditor();
    },

    deleteCert(idx) {
      if (confirm("Hapus sertifikasi ini?")) {
        activeData[editingLang].education.certifications.splice(idx, 1);
        renderEducationEditor();
      }
    },

    updateCert(idx, field, val) {
      activeData[editingLang].education.certifications[idx][field] = val.trim();
    },

    saveAll() {
      saveAllChanges();
    },

    exportData() {
      const code = `/**\n * Muhammad Farhan - Personal Portfolio Data\n * Generated via Admin CMS\n */\n\nconst portfolioData = ${JSON.stringify(activeData, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.portfolioData = portfolioData;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = portfolioData;\n}\n`;
      const blob = new Blob([code], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.js";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Berkas data.js berhasil diunduh.");
    },

    resetDefaults() {
      if (confirm("Kembalikan semua konten ke data awal PRD? Perubahan custom Anda akan dibersihkan.")) {
        localStorage.removeItem("portfolio_custom_data");
        loadData(true);
        populateAllForms();
        showToast("Data berhasil di-reset ke standar PRD.");
      }
    }
  };
})();
