import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    let rafId: number;
    const animateRing = () => {
      ringXRef.current += (mouseXRef.current - ringXRef.current) * 0.12;
      ringYRef.current += (mouseYRef.current - ringYRef.current) * 0.12;
      ring.style.left = ringXRef.current + "px";
      ring.style.top = ringYRef.current + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const onEnter = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1.5)";
      ring.style.width = "54px";
      ring.style.height = "54px";
    };
    const onLeave = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.width = "38px";
      ring.style.height = "38px";
    };

    const interactables = document.querySelectorAll("a, button, .hof-card, .project-card, .skill-item");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMouseMove);

    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((r) => observer.observe(r));

    const onParallax = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const frame = document.querySelector(".hero-img-frame") as HTMLElement;
      if (frame) frame.style.transform = `perspective(900px) rotateY(${x * 0.25}deg) rotateX(${-y * 0.25}deg)`;
    };
    document.addEventListener("mousemove", onParallax);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", onParallax);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
    if (!btn) return;
    btn.textContent = "Message Sent! ✓";
    btn.style.background = "#059669";
    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.style.background = "";
      (e.target as HTMLFormElement).reset();
    }, 3000);
  }

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">AY<span style={{ color: "var(--white)", opacity: 0.4 }}>.</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#achievements">Security</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="mailto:Yadavabhisekh442@gmail.com" className="nav-cta">Hire Me</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            Available for Opportunities
          </div>
          <h1 className="hero-name">
            Abhishek<br />
            <span data-text="Yadav">Yadav</span>
          </h1>
          <p className="hero-role">
            <em>Security Researcher</em>&nbsp;&nbsp;·&nbsp;&nbsp;Full-Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;Ethical Hacker
          </p>
          <p className="hero-desc">
            Breaking web apps by night, building them by day. Hall of Fame @ PhonePe, Quizlet, Fivetran, Viator & more.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-avatar-wrap">
            <div className="hero-avatar-ring"></div>
            <div className="hero-avatar-ring hero-avatar-ring-2"></div>
            <img
              src="/abhishek.png"
              alt="Abhishek Yadav"
              className="hero-avatar-img"
            />
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-num">10+</div>
              <div className="stat-label">Hall of Fame</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">2</div>
              <div className="stat-label">Live Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">45+</div>
              <div className="stat-label">Vulns Reported</div>
            </div>
          </div>
        </div>
      </section>

      <div className="deco-line"></div>

      {/* ABOUT — dual identity */}
      <section id="about">
        <div className="section-tag">About Me</div>
        <h2 className="section-title">Developer | Hacker</h2>
        <div className="dual-identity reveal">
          <div className="identity-card identity-dev">
            <div className="identity-label identity-label-dev">
              <span className="identity-dot identity-dot-gold"></span>Developer
            </div>
            <p>
              I build things people actually use. <span className="about-highlight-gold">CourierBuddy</span> is a live student-driven delivery network connecting campus communities, from parcel sharing to peer-to-peer logistics. I care about products that solve real problems for real people.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Full-stack with <span className="about-highlight-gold">JavaScript, Node.js, Express, and MongoDB</span>. I ship end-to-end, from UI to DNS mapping to production infrastructure.
            </p>
          </div>
          <div className="identity-divider"></div>
          <div className="identity-card identity-sec">
            <div className="identity-label identity-label-cyan">
              <span className="identity-dot identity-dot-cyan"></span>Security Researcher
            </div>
            <p>
              I find what others miss. Hall of Fame recognitions at <span className="about-highlight">PhonePe, Quizlet, PDQ, theFork, MDH, Fivetran & Viator</span>, reporting critical flaws like authentication bypasses, CSRF, IDOR, and broken access control.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Active on <span className="about-highlight">Bugcrowd, HackerOne, and Intigriti</span>. Building gives me the mindset to break, and breaking makes me build more securely.
            </p>
          </div>
        </div>

        {/* Skills — two columns clearly split */}
        <div className="skills-two-col reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="skills-col">
            <div className="skills-col-header skills-col-header-gold">Development Stack</div>
            <div className="skills-inner-grid">
              {[
                { label: "JavaScript / Node.js", dot: "gold" },
                { label: "Express.js", dot: "gold" },
                { label: "MongoDB", dot: "gold" },
                { label: "Python", dot: "gold" },
                { label: "HTML / CSS", dot: "gold" },
                { label: "C++ / Java", dot: "gold" },
              ].map(({ label, dot }) => (
                <div className="skill-item" key={label}>
                  <span className={`skill-dot ${dot}`}></span>{label}
                </div>
              ))}
            </div>
          </div>
          <div className="skills-col">
            <div className="skills-col-header skills-col-header-cyan">Security Arsenal</div>
            <div className="skills-inner-grid">
              {[
                { label: "Burp Suite", dot: "" },
                { label: "Shodan / FOFA", dot: "" },
                { label: "Bug Hunter", dot: "red" },
                { label: "Red Teamer", dot: "red" },
                { label: "Bugcrowd", dot: "" },
                { label: "HackerOne / Intigriti", dot: "" },
              ].map(({ label, dot }) => (
                <div className="skill-item" key={label}>
                  <span className={`skill-dot${dot ? " " + dot : ""}`}></span>{label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="deco-line"></div>

      {/* PROJECTS — CourierBuddy FEATURED */}
      <section id="projects">
        <div className="section-tag">Work</div>
        <h2 className="section-title">Featured Projects</h2>

        {/* CourierBuddy — hero project card */}
        <div className="project-card project-card-featured reveal">
          <div className="featured-banner">Featured Project</div>
          <div className="project-featured-inner">
            <div className="project-featured-content">
              <div className="project-num">01 / FLAGSHIP</div>
              <h3 className="project-title project-title-lg">CourierBuddy</h3>
              <div className="project-date">
                February 2026&nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="https://www.courierbuddy.in/" target="_blank" rel="noreferrer" className="live-pill">● Live</a>
              </div>
              <p className="project-desc">
                A student-driven delivery network that transforms how campus communities connect and help each other. Students can post delivery requests, find peers heading the same way, and build new connections along the route; not just packages, but people.
              </p>
              <p className="project-desc" style={{ marginTop: "0.75rem" }}>
                Features real college ID verification, a live dashboard for request tracking, peer-to-peer parcel handoff, DNS mapping, and a full authentication flow built from scratch.
              </p>
              <div className="project-stack" style={{ marginBottom: "2rem" }}>
                {["HTML/CSS", "JavaScript", "Express.js", "MongoDB", "DNS Mapping", "JWT Auth"].map((t) => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href="https://www.courierbuddy.in/" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.8rem 1.75rem" }}>
                  Visit Live Site →
                </a>
                <a href="https://github.com/Abhiishek010" target="_blank" rel="noreferrer" className="btn-secondary" style={{ fontSize: "0.75rem", padding: "0.8rem 1.75rem" }}>
                  View Repository
                </a>
              </div>
            </div>
            <div className="project-featured-preview">
              <div className="preview-window">
                <div className="preview-bar">
                  <span className="preview-dot r"></span>
                  <span className="preview-dot y"></span>
                  <span className="preview-dot g"></span>
                  <span className="preview-url">courierbuddy.in</span>
                </div>
                <div className="preview-body">
                  <div className="preview-hero-mock">
                    <div className="preview-logo-mock">CourierBuddy</div>
                    <div className="preview-tagline-mock">Student-driven delivery network</div>
                    <div className="preview-btn-mock">Get Started</div>
                    <div className="preview-stats-row">
                      <div className="preview-stat-mock"><span>500+</span><small>Students</small></div>
                      <div className="preview-stat-mock"><span>Live</span><small>Platform</small></div>
                      <div className="preview-stat-mock"><span>Campus</span><small>Focused</small></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary project */}
        <div className="projects-grid" style={{ marginTop: "1.5rem" }}>
          <div className="project-card reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="project-num">02 / PROJECT</div>
            <h3 className="project-title">Legal Advice AI Chat-Bot</h3>
            <div className="project-date">December 2025</div>
            <p className="project-desc">
              An AI-powered chatbot providing guidance on legal topics: contracts, consumer rights, property matters, and workplace law. Built with NLP-based responses for clear, plain-language answers.
            </p>
            <div className="project-stack">
              {["HTML/CSS/JS", "Python", "Node.js", "Google API", "NLP"].map((t) => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            <a href="https://github.com/Abhiishek010" target="_blank" rel="noreferrer" className="project-link">View Repository</a>
          </div>
        </div>
      </section>

      <div className="deco-line"></div>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="section-tag">Bug Bounty</div>
        <h2 className="section-title">Hall of Fame</h2>
        <div className="hof-grid">
          {[
            { company: "PhonePe", desc: "Critical security vulnerabilities identified in India's leading digital payments platform.", delay: "0s" },
            { company: "Quizlet.com", desc: "Security loopholes discovered in the global study platform used by millions worldwide.", delay: "0.08s" },
            { company: "PDQ.com", desc: "Vulnerabilities reported and acknowledged in PDQ's web security infrastructure.", delay: "0.16s" },
            { company: "theFork.com", desc: "Security flaws identified in TripAdvisor's restaurant reservation platform.", delay: "0.24s" },
            { company: "MDH.com", desc: "Critical vulnerabilities found and responsibly disclosed to MDH's security team.", delay: "0.32s" },
            { company: "Fivetran.com", desc: "Security vulnerabilities identified and responsibly disclosed to Fivetran's data pipeline infrastructure.", delay: "0.40s" },
            { company: "Viator.com", desc: "Security flaws discovered in Viator's global travel experience and booking platform.", delay: "0.48s" },
          ].map(({ company, desc, delay }) => (
            <div className="hof-card reveal" key={company} style={{ transitionDelay: delay }}>
              <div className="hof-company">{company}</div>
              <div className="hof-badge">★ Hall of Fame</div>
              <p className="hof-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="vuln-types reveal">
          <div className="section-tag" style={{ width: "100%", marginBottom: "1.25rem" }}>Vulnerability Types Discovered</div>
          {["Authentication Bypass", "CSRF", "Unrestricted File Upload", "No Rate Limiting on Sensitive APIs", "Broken Access Control", "Information Disclosure", "IDOR", "Session Management Flaws"].map((v) => (
            <span className="vuln-tag" key={v}>{v}</span>
          ))}
        </div>
      </section>

      <div className="deco-line"></div>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-tag">Background</div>
        <h2 className="section-title">Education & Training</h2>
        <div className="edu-grid reveal">
          <div className="edu-card">
            <div className="edu-badge-row"><span className="edu-badge-type">University</span></div>
            <div className="edu-inst">Lovely Professional University</div>
            <div className="edu-degree">B.Tech in Computer Science &amp; Engineering</div>
            <div className="edu-meta">
              <span className="edu-score">CGPA: 6.78</span>
              <span className="edu-date">Aug 2023 - Present · Phagwara</span>
            </div>
          </div>
          <div className="edu-card">
            <div className="edu-badge-row"><span className="edu-badge-type">School</span></div>
            <div className="edu-inst">Mother Teresa Mission Higher Secondary School</div>
            <div className="edu-degree">Intermediate (Class XII)</div>
            <div className="edu-meta">
              <span className="edu-score">75%</span>
              <span className="edu-date">Apr 2020 - Mar 2022 · Kanpur</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3.5rem" }}>
          <div className="section-tag">Training &amp; Certifications</div>
        </div>
        <div className="certs-grid">
          {[
            { name: "NextGen Networking: Advanced Computer Networks", org: "Summer Training · Network Topologies, Packet Tracer", delay: "0s" },
            { name: "Computational Theory: Language Principles & Finite Automata", org: "Infosys · August 2025", delay: "0.1s" },
            { name: "OOP's with C++", org: "Cipher School · June 2025", delay: "0.2s" },
            { name: "Java Programming", org: "Neocolab · April 2024", delay: "0.3s" },
          ].map(({ name, org, delay }) => (
            <div className="cert-item reveal" key={name} style={{ transitionDelay: delay }}>
              <div className="cert-icon">◈</div>
              <div>
                <div className="cert-name">{name}</div>
                <div className="cert-org">{org}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="deco-line"></div>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-tag">Say Hello</div>
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          <div className="reveal">
            <p className="contact-desc">
              Whether you have a security project, a product idea, or just want to connect, I'm always open to interesting conversations and new collaborations. Let's build something great together.
            </p>
            <div className="contact-links">
              <a href="mailto:Yadavabhisekh442@gmail.com" className="contact-link">
                <div className="contact-link-icon">✉</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-val">Yadavabhisekh442@gmail.com</div>
                </div>
                <div className="contact-link-arrow">→</div>
              </a>
              <a href="https://github.com/Abhiishek010" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">⌥</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-val">github.com/Abhiishek010</div>
                </div>
                <div className="contact-link-arrow">→</div>
              </a>
              <a href="https://linkedin.com/in/abhishek-k31" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">◉</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-val">linkedin.com/in/abhishek-k31</div>
                </div>
                <div className="contact-link-arrow">→</div>
              </a>
              <a href="https://www.courierbuddy.in/" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">◈</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">CourierBuddy</div>
                  <div className="contact-link-val">courierbuddy.in</div>
                </div>
                <div className="contact-link-arrow">→</div>
              </a>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <form className="contact-form-area" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" placeholder="Project / Opportunity / Collab" required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell me about your project..." required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", border: "none", cursor: "pointer" }}>
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">© 2026 Abhishek Yadav · Breaking &amp; Building</div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="https://www.courierbuddy.in/" target="_blank" rel="noreferrer" className="footer-link">CourierBuddy</a>
          <a href="https://linkedin.com/in/abhishek-k31" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://github.com/Abhiishek010" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
          <a href="#" className="footer-back">↑ Top</a>
        </div>
      </footer>
    </>
  );
}
