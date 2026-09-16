/**
 * Muhammad Farhan - Personal Portfolio Scripts
 * Handles: Bilingual toggling (ID/EN), Case Study Modal, Mobile Nav, and Contact Form submission
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("portfolio_lang") || "id";

  // Elements
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const caseStudyModal = document.getElementById("case-study-modal");
  const openCaseStudyBtn = document.getElementById("open-case-study-btn");
  const closeCaseStudyBtn = document.getElementById("close-case-study-btn");
  const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-alert");

  // Initialize Language
  applyLanguage(currentLang);

  // Language Toggle Click
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

    // Close nav on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileNavToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Case Study Modal
  if (openCaseStudyBtn && caseStudyModal) {
    openCaseStudyBtn.addEventListener("click", () => {
      openModal();
    });
  }

  if (closeCaseStudyBtn && caseStudyModal) {
    closeCaseStudyBtn.addEventListener("click", () => {
      closeModal();
    });
  }

  // Close modal when clicking backdrop
  if (caseStudyModal) {
    caseStudyModal.addEventListener("click", (e) => {
      if (e.target === caseStudyModal) {
        closeModal();
      }
    });

    // Escape key listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && caseStudyModal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function openModal() {
    caseStudyModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
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
        // Attempt to post to local or deployed Express backend endpoint
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
          throw new Error("Server responded with error");
        }
      } catch (err) {
        // Fallback for static GitHub Pages deployment where backend is not running on same origin
        // Open default mail client directly with prefilled parameters
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

  // Language Swapping Engine
  function applyLanguage(lang) {
    const data = window.portfolioData ? window.portfolioData[lang] : null;
    if (!data) return;

    // Update Language Toggle Indicator
    if (langToggleBtn) {
      langToggleBtn.innerHTML = `<span>LANG:</span> <strong class="active-lang">${lang.toUpperCase()}</strong>`;
    }

    // Update Navigation
    updateText("nav-about", data.nav.about);
    updateText("nav-skills", data.nav.skills);
    updateText("nav-projects", data.nav.projects);
    updateText("nav-experience", data.nav.experience);
    updateText("nav-education", data.nav.education);
    updateText("nav-contact", data.nav.contact);
    updateText("nav-cv-btn", data.nav.downloadCv);

    // Update Hero
    updateText("hero-badge", data.hero.badge);
    updateText("hero-headline", data.hero.headline);
    updateText("hero-view-projects", data.hero.viewProjects);
    updateText("hero-download-cv", data.hero.downloadCv);
    updateText("hero-summary", data.personal.summary);

    if (data.hero.metrics) {
      updateText("metric-val-1", data.hero.metrics[0].value);
      updateText("metric-lbl-1", data.hero.metrics[0].label);
      updateText("metric-val-2", data.hero.metrics[1].value);
      updateText("metric-lbl-2", data.hero.metrics[1].label);
      updateText("metric-val-3", data.hero.metrics[2].value);
      updateText("metric-lbl-3", data.hero.metrics[2].label);
    }

    // Update About
    updateText("about-title", data.about.title);
    updateText("about-subtitle", data.about.subtitle);
    updateText("about-bio-text", data.about.bio);

    // Update Skills
    updateText("skills-title", data.skills.title);
    updateText("skills-subtitle", data.skills.subtitle);
    renderSkills(data.skills.categories);

    // Update Projects
    updateText("projects-title", data.projects.title);
    updateText("projects-subtitle", data.projects.subtitle);
    renderFeaturedProject(data.projects.item, data.projects.featuredTag, data.projects.caseStudyBtn);

    // Update Experience
    updateText("experience-title", data.experience.title);
    updateText("experience-subtitle", data.experience.subtitle);
    renderExperience(data.experience.items);

    // Update Education
    updateText("education-title", data.education.title);
    updateText("education-subtitle", data.education.subtitle);
    renderEducation(data.education);

    // Update Contact
    updateText("contact-title", data.contact.title);
    updateText("contact-subtitle", data.contact.subtitle);
    updateText("contact-pitch", data.contact.pitch);
    updateText("contact-info-title", data.contact.infoTitle);
    updateText("contact-email-label", data.contact.emailLabel);
    updateText("contact-phone-label", data.contact.phoneLabel);
    updateText("contact-location-label", data.contact.locationLabel);
    updateText("contact-form-title", data.contact.formTitle);
    updateText("contact-submit-btn", data.contact.submitBtn);
    updateText("contact-email-btn", data.contact.emailDirectBtn);
    updateText("contact-linkedin-btn", data.contact.linkedinBtn);

    // Update Form Placeholders
    setPlaceholder("form-name", data.contact.namePlaceholder);
    setPlaceholder("form-email", data.contact.emailPlaceholder);
    setPlaceholder("form-subject", data.contact.subjectPlaceholder);
    setPlaceholder("form-message", data.contact.messagePlaceholder);
  }

  function updateText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el && text) el.textContent = text;
  }

  function setPlaceholder(elementId, text) {
    const el = document.getElementById(elementId);
    if (el && text) el.setAttribute("placeholder", text);
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

  function renderFeaturedProject(item, featuredTag, caseStudyBtnText) {
    const container = document.getElementById("featured-project-container");
    if (!container || !item) return;

    container.innerHTML = `
      <div class="project-card">
        <div class="project-card-header">
          <div class="project-meta-bar">
            <span class="project-featured-badge">${featuredTag}</span>
            <span class="project-period">${item.period}</span>
          </div>
          <h3 class="project-title">${item.title}</h3>
          <p class="project-summary">${item.summary}</p>
          <div class="project-tags-row">
            ${item.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
        
        <div class="project-card-body">
          <div class="case-block">
            <h4 class="case-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Problem Statement
            </h4>
            <p class="case-block-text">${item.problem}</p>
          </div>
          <div class="case-block">
            <h4 class="case-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              My Role & Impact
            </h4>
            <p class="case-block-text">${item.role}</p>
            <p class="case-block-text" style="margin-top: 0.5rem; color: var(--brand-lime);">${item.result}</p>
          </div>
        </div>

        <div class="pipeline-section">
          <h4 class="pipeline-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            System Pipeline & Decision Architecture
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
        </div>

        <div class="project-card-footer">
          <div class="roles-wrapper">
            <span>Tingkat Hak Akses:</span>
            ${item.rolesList.map(r => `<span class="role-badge">${r}</span>`).join("")}
          </div>
          <button id="open-case-study-btn" class="btn btn-outline btn-sm">
            ${caseStudyBtnText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    `;

    // Reattach modal open event
    const newBtn = document.getElementById("open-case-study-btn");
    if (newBtn && caseStudyModal) {
      newBtn.addEventListener("click", openModal);
    }
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
        <span class="card-tag">Pendidikan Formal</span>
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
