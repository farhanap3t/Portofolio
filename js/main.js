/**
 * Muhammad Farhan - Personal Portfolio Scripts
 * Complete Bilingual Engine (ID/EN), Case Study Modal, Mobile Nav, and Contact Form
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("portfolio_lang") || "id";

  // Check if custom data exists in localStorage from Admin CMS
  try {
    const savedCustomData = localStorage.getItem("portfolio_custom_data");
    if (savedCustomData) {
      window.portfolioData = JSON.parse(savedCustomData);
    }
  } catch (err) {
    console.warn("Could not load custom portfolio data from localStorage:", err);
  }

  // Elements
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const caseStudyModal = document.getElementById("case-study-modal");
  const closeCaseStudyBtn = document.getElementById("close-case-study-btn");
  const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-alert");

  // Initial Language Setup
  applyLanguage(currentLang);

  // Language Toggle Click Listener
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "id" ? "en" : "id";
      localStorage.setItem("portfolio_lang", currentLang);
      applyLanguage(currentLang);
    });
  }

  // Mobile Navigation Toggle
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isExpanded = navLinks.classList.contains("open");
      mobileNavToggle.setAttribute("aria-expanded", isExpanded);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileNavToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Case Study Modal Handlers
  if (closeCaseStudyBtn && caseStudyModal) {
    closeCaseStudyBtn.addEventListener("click", closeModal);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener("click", (e) => {
      if (e.target === caseStudyModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && caseStudyModal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function openModal() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const message = document.getElementById("form-message").value.trim();
      const submitBtn = contactForm.querySelector("button[type='submit']");

      if (!name || !email || !message) {
        showFormAlert(
          currentLang === "id" ? "Mohon lengkapi semua kolom wajib." : "Please fill in all required fields.",
          "error"
        );
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = currentLang === "id" ? "Mengirim..." : "Sending...";

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          showFormAlert(
            currentLang === "id"
              ? "Pesan Anda berhasil terkirim. Terima kasih atas ketertarikan Anda!"
              : "Your message has been sent successfully. Thank you!",
            "success"
          );
          contactForm.reset();
        } else {
          throw new Error("Server error");
        }
      } catch (err) {
        // Fallback for static GitHub Pages
        const mailtoUrl = `mailto:farhn.mhmmad@gmail.com?subject=${encodeURIComponent(
          subject || `Inquiry from ${name} via Portfolio`
        )}&body=${encodeURIComponent(
          `Halo Muhammad Farhan,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
        )}`;

        showFormAlert(
          currentLang === "id"
            ? "Membuka email client Anda untuk mengirimkan pesan langsung ke farhn.mhmmad@gmail.com..."
            : "Opening your mail client to send message directly to farhn.mhmmad@gmail.com...",
          "success"
        );

        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 800);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showFormAlert(message, type) {
    if (!formAlert) return;
    formAlert.textContent = message;
    formAlert.className = `form-alert ${type}`;
    formAlert.style.display = "block";
    setTimeout(() => {
      formAlert.style.display = "none";
    }, 6000);
  }

  // Complete Language Swapping Function
  function applyLanguage(lang) {
    const data = window.portfolioData ? window.portfolioData[lang] : null;
    if (!data) return;

    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // Toggle Button Label
    if (langToggleBtn) {
      langToggleBtn.innerHTML = `<span>LANG:</span> <strong class="active-lang">${lang.toUpperCase()}</strong>`;
    }

    // 1. Navigation
    updateText("nav-about", data.nav.about);
    updateText("nav-skills", data.nav.skills);
    updateText("nav-projects", data.nav.projects);
    updateText("nav-experience", data.nav.experience);
    updateText("nav-education", data.nav.education);
    updateText("nav-contact", data.nav.contact);
    updateHtml("nav-cv-btn", `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      ${data.nav.downloadCv}
    `);

    // 2. Hero Section
    updateHtml("hero-badge", `<span class="status-dot"></span> ${data.hero.badge}`);
    updateText("hero-summary", data.hero.headline + " " + data.personal.summary);
    updateHtml("hero-view-projects", `
      ${data.hero.viewProjects}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    `);
    updateHtml("hero-download-cv", `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      ${data.hero.downloadCv}
    `);

    if (data.hero.metrics) {
      updateText("metric-val-1", data.hero.metrics[0].value);
      updateText("metric-lbl-1", data.hero.metrics[0].label);
      updateText("metric-val-2", data.hero.metrics[1].value);
      updateText("metric-lbl-2", data.hero.metrics[1].label);
      updateText("metric-val-3", data.hero.metrics[2].value);
      updateText("metric-lbl-3", data.hero.metrics[2].label);
    }

    // Hero Technical Identity Card
    if (data.hero.card) {
      updateText("hero-card-almamater-key", data.hero.card.almamaterKey);
      updateText("hero-card-almamater-val", data.hero.card.almamaterVal);
      updateText("hero-card-focus-key", data.hero.card.focusKey);
      updateText("hero-card-focus-val", data.hero.card.focusVal);
      updateText("hero-card-domicile-key", data.hero.card.domicileKey);
      updateText("hero-card-domicile-val", data.hero.card.domicileVal);
      updateText("hero-card-status-key", data.hero.card.statusKey);
      updateText("hero-card-status-val", data.hero.card.statusVal);
    }

    // 3. About Me Section
    updateText("about-title", data.about.title);
    updateText("about-subtitle", data.about.subtitle);
    updateText("about-bio-p1", data.about.bioP1);
    updateText("about-bio-p2", data.about.bioP2);

    if (data.about.stats) {
      updateText("about-stat-edu-title", data.about.stats.eduTitle);
      updateText("about-stat-edu-val", data.about.stats.eduDegree);
      updateText("about-stat-edu-sub", data.about.stats.eduSchool);

      updateText("about-stat-gpa-title", data.about.stats.gpaTitle);
      updateText("about-stat-gpa-val", data.about.stats.gpaValue);
      updateText("about-stat-gpa-sub", data.about.stats.gpaScale);

      updateText("about-stat-loc-title", data.about.stats.locTitle);
      updateText("about-stat-loc-val", data.about.stats.locValue);
      updateText("about-stat-loc-sub", data.about.stats.locSub);
    }

    // 4. Skills Section
    updateText("skills-title", data.skills.title);
    updateText("skills-subtitle", data.skills.subtitle);
    renderSkills(data.skills.categories);

    // 5. Projects Section & Case Study
    updateText("projects-title", data.projects.title);
    updateText("projects-subtitle", data.projects.subtitle);
    renderFeaturedProject(data.projects);

    // 6. Case Study Modal Content
    if (data.projects.modal) {
      updateText("modal-title-text", data.projects.modal.title);
      updateText("modal-sec1-title", data.projects.modal.section1Title);
      updateText("modal-sec1-body", data.projects.modal.section1Body);
      updateText("modal-sec2-title", data.projects.modal.section2Title);
      updateHtml("modal-sec2-intro", data.projects.modal.section2Intro);
      
      const modalPointsList = document.getElementById("modal-sec2-points");
      if (modalPointsList && data.projects.modal.section2Points) {
        modalPointsList.innerHTML = data.projects.modal.section2Points
          .map(pt => `<li>${pt}</li>`)
          .join("");
      }

      updateText("modal-sec3-title", data.projects.modal.section3Title);
      const modalStepsEl = document.getElementById("modal-sec3-steps");
      if (modalStepsEl && data.projects.modal.section3Steps) {
        modalStepsEl.innerHTML = data.projects.modal.section3Steps.join("<br>");
      }

      updateText("modal-sec4-title", data.projects.modal.section4Title);
      updateText("modal-sec4-body", data.projects.modal.section4Body);
    }

    // 7. Experience Section
    updateText("experience-title", data.experience.title);
    updateText("experience-subtitle", data.experience.subtitle);
    renderExperience(data.experience.items);

    // 8. Education & Certifications Section
    updateText("education-title", data.education.title);
    updateText("education-subtitle", data.education.subtitle);
    updateText("education-tag", data.education.degreeTag);
    updateText("certifications-tag", data.education.certTag);
    renderEducation(data.education);

    // 9. Contact Section
    updateText("contact-title", data.contact.title);
    updateText("contact-subtitle", data.contact.subtitle);
    updateText("contact-pitch", data.contact.pitch);
    updateText("contact-info-title", data.contact.infoTitle);
    updateText("contact-email-label", data.contact.emailLabel);
    updateText("contact-phone-label", data.contact.phoneLabel);
    updateText("contact-location-label", data.contact.locationLabel);
    updateText("contact-location-val", data.personal.location);
    updateHtml("contact-email-btn", `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      ${data.contact.emailDirectBtn}
    `);
    updateHtml("contact-linkedin-btn", `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      ${data.contact.linkedinBtn}
    `);
    updateHtml("contact-form-title", `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
      ${data.contact.formTitle}
    `);

    // Form field labels
    if (data.contact.formLabels) {
      updateText("label-form-name", data.contact.formLabels.name);
      updateText("label-form-email", data.contact.formLabels.email);
      updateText("label-form-subject", data.contact.formLabels.subject);
      updateText("label-form-message", data.contact.formLabels.message);
    }
    setPlaceholder("form-name", data.contact.namePlaceholder);
    setPlaceholder("form-email", data.contact.emailPlaceholder);
    setPlaceholder("form-subject", data.contact.subjectPlaceholder);
    setPlaceholder("form-message", data.contact.messagePlaceholder);
    updateHtml("contact-submit-btn", `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      ${data.contact.submitBtn}
    `);

    // 10. Footer
    updateText("footer-copy", data.footer.copy);
    updateText("footer-back-to-top", data.footer.backToTop);
  }

  function updateText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el && text !== undefined) el.textContent = text;
  }

  function updateHtml(elementId, html) {
    const el = document.getElementById(elementId);
    if (el && html !== undefined) el.innerHTML = html;
  }

  function setPlaceholder(elementId, text) {
    const el = document.getElementById(elementId);
    if (el && text !== undefined) el.setAttribute("placeholder", text);
  }

  function renderSkills(categories) {
    const container = document.getElementById("skills-container");
    if (!container || !categories) return;

    container.innerHTML = categories.map(cat => `
      <div class="skill-category-card">
        <div class="category-header">
          <div class="category-icon-wrapper">
            ${getCategorySvg(cat.icon)}
          </div>
          <h3 class="category-title">${cat.name}</h3>
        </div>
        <p class="category-desc">${cat.description}</p>
        <div class="skill-pills">
          ${cat.items.map(item => `<span class="skill-pill">${item}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderFeaturedProject(projectsData) {
    const container = document.getElementById("featured-project-container");
    if (!container || !projectsData) return;

    const items = projectsData.items && projectsData.items.length > 0
      ? projectsData.items
      : (projectsData.item ? [projectsData.item] : []);

    container.innerHTML = items.map((item, idx) => `
      <div class="project-card" style="margin-bottom: 2.5rem;">
        <div class="project-card-header">
          <div class="project-meta-bar">
            <span class="project-featured-badge">${projectsData.featuredTag} ${items.length > 1 ? `#${idx + 1}` : ''}</span>
            <span class="project-period">${item.period}</span>
          </div>
          <h3 class="project-title">${item.title}</h3>
          <p class="project-summary">${item.summary}</p>
          <div class="project-tags-row">
            ${(item.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
        
        <div class="project-card-body">
          <div class="case-block">
            <h4 class="case-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ${projectsData.problemTitle}
            </h4>
            <p class="case-block-text">${item.problem}</p>
          </div>
          <div class="case-block">
            <h4 class="case-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              ${projectsData.roleTitle}
            </h4>
            <p class="case-block-text">${item.role}</p>
            <p class="case-block-text" style="margin-top: 0.5rem; color: var(--brand-lime);">${item.result}</p>
          </div>
        </div>

        ${item.pipeline && item.pipeline.length > 0 ? `
        <div class="pipeline-section">
          <h4 class="pipeline-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            ${projectsData.pipelineTitle}
          </h4>
          <div class="pipeline-steps">
            ${item.pipeline.map(p => `
              <div class="pipeline-step-item">
                <span class="step-number">${p.step}</span>
                <span class="step-label">${p.title}</span>
                <span class="step-subtext">${p.desc}</span>
              </div>
            `).join("")}
          </div>
        </div>` : ''}

        <div class="project-card-footer">
          <div class="roles-wrapper">
            <span>${projectsData.accessLevels}</span>
            ${(item.rolesList || []).map(r => `<span class="role-badge">${r}</span>`).join("")}
          </div>
          <button class="btn btn-outline btn-sm open-case-study-btn" data-idx="${idx}">
            ${projectsData.caseStudyBtn}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    `).join("");

    // Attach click event for each project's modal
    container.querySelectorAll(".open-case-study-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        openProjectModal(items[idx], projectsData);
      });
    });
  }

  function openProjectModal(item, projectsData) {
    if (!caseStudyModal || !item) return;

    const modalData = item.modal || {
      title: item.title,
      section1Title: projectsData.problemTitle,
      section1Body: item.problem,
      section2Title: projectsData.roleTitle,
      section2Intro: `<strong>${item.role}</strong>`,
      section2Points: [item.result],
      section3Title: projectsData.pipelineTitle,
      section3Steps: (item.pipeline || []).map(p => `[${p.step}] ${p.title} - ${p.desc}`),
      section4Title: "Hasil & Dampak / Result & Impact",
      section4Body: item.result
    };

    updateText("modal-title-text", modalData.title);
    updateText("modal-sec1-title", modalData.section1Title);
    updateText("modal-sec1-body", modalData.section1Body);
    updateText("modal-sec2-title", modalData.section2Title);
    updateHtml("modal-sec2-intro", modalData.section2Intro);

    const modalPointsList = document.getElementById("modal-sec2-points");
    if (modalPointsList) {
      modalPointsList.innerHTML = (modalData.section2Points || []).map(pt => `<li>${pt}</li>`).join("");
    }

    updateText("modal-sec3-title", modalData.section3Title);
    const modalStepsEl = document.getElementById("modal-sec3-steps");
    if (modalStepsEl) {
      modalStepsEl.innerHTML = (modalData.section3Steps || []).join("<br>");
    }

    updateText("modal-sec4-title", modalData.section4Title);
    updateText("modal-sec4-body", modalData.section4Body);

    openModal();
  }

  function renderExperience(items) {
    const container = document.getElementById("experience-container");
    if (!container || !items) return;

    container.innerHTML = items.map(exp => `
      <div class="experience-card">
        <div class="exp-period">${exp.period}</div>
        <div class="exp-content">
          <h3 class="exp-role-title">${exp.role}</h3>
          <div class="exp-company">${exp.company}</div>
          <p class="exp-desc">${exp.description}</p>
        </div>
      </div>
    `).join("");
  }

  function renderEducation(eduData) {
    const degEl = document.getElementById("education-details");
    if (degEl && eduData.degree) {
      degEl.innerHTML = `
        <h3 class="edu-degree">${eduData.degree.title}</h3>
        <div class="edu-school">${eduData.degree.institution}</div>
        <div class="edu-meta">
          <span>${eduData.degree.period}</span>
          <span class="edu-gpa-badge">${eduData.degree.gpa}</span>
        </div>
        <p class="exp-desc">${eduData.degree.description}</p>
      `;
    }

    const certEl = document.getElementById("certifications-list");
    if (certEl && eduData.certifications) {
      certEl.innerHTML = eduData.certifications.map(c => `
        <div class="cert-item">
          <span class="cert-name">${c.title}</span>
          <span class="cert-issuer">${c.issuer} • ${c.type}</span>
          <p class="cert-desc">${c.desc}</p>
        </div>
      `).join("");
    }
  }

  function getCategorySvg(iconName) {
    switch (iconName) {
      case "code":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      case "database":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`;
      case "server":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
      case "cpu":
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
    }
  }
});
