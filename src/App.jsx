import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const SKILLS = [
  { category: "Frontend", color: "blue", icon: "🖥️", items: ["React", "TypeScript", "Next.js", "Angular", "Redux", "GraphQL"] },
  { category: "Backend", color: "indigo", icon: "⚙️", items: ["Java", "Spring Boot", "Spring Cloud", "Spring Security", "Node.js", "REST APIs"] },
  { category: "Database", color: "violet", icon: "🗄️", items: ["PostgreSQL", "MongoDB", "Cassandra", "DynamoDB", "Oracle", "Redis"] },
  { category: "Cloud & DevOps", color: "sky", icon: "☁️", items: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"] },
  { category: "Messaging & Streaming", color: "purple", icon: "📨", items: ["Apache Kafka", "RabbitMQ", "AWS SQS", "AWS SNS"] },
  { category: "Security", color: "blue", icon: "🔒", items: ["OAuth 2.0", "JWT", "RBAC", "AWS KMS", "Spring Security"] },
];

const BADGE_COLORS = {
  blue: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  violet: "bg-violet-100 text-violet-700",
  sky: "bg-sky-100 text-sky-700",
  purple: "bg-purple-100 text-purple-700",
};

const EXPERIENCE = [
  {
    title: "Sr. Full Stack Developer",
    company: "Volkswagen",
    location: "Rochester, MI, USA",
    period: "October 2024 – Present",
    bullets: [
      "Built a reusable React component library using TypeScript and Storybook, standardizing UI patterns across 12 teams.",
      "Engineered a real-time vehicle telemetry notification system using Apache Kafka with exactly-once processing semantics.",
      "Optimized critical PostgreSQL queries, reducing p99 API response times from 850ms to under 120ms.",
      "Led migration from EC2-based deployments to AWS EKS using Helm charts with Kafka consumer lag-based autoscaling.",
      "Containerized all services using Docker with multi-stage builds, reducing final image sizes by 60%.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Delta Dental Insurance",
    location: "San Francisco, CA, USA",
    period: "November 2022 – September 2024",
    bullets: [
      "Built provider search in ReactJS with debounced API calls and React Query client-side caching.",
      "Optimized Spring Boot application startup time by 40% through lazy bean initialization.",
      "Replaced synchronous claims adjudication with an event-driven Apache Kafka + AWS Lambda pipeline.",
      "Designed HIPAA-compliant audit trail system with field-level encryption using AWS KMS.",
      "Implemented distributed tracing using AWS X-Ray for end-to-end claims processing visibility.",
    ],
  },
  {
    title: "Software Developer",
    company: "Ulta Beauty",
    location: "Bolingbrook, IL, USA",
    period: "January 2021 – October 2022",
    bullets: [
      "Implemented server-side rendering with Next.js, improving LCP scores by 45% for SEO.",
      "Led migration from legacy Oracle monolith to Spring Boot + MongoDB, reducing search latency by 70%.",
      "Built real-time inventory sync pipeline using Apache Kafka with end-to-end latency under 500ms.",
      "Implemented GraphQL federation using Apollo Gateway, enabling single-request composite data fetching.",
      "Configured AWS CloudFront distributions achieving 92% CDN cache hit ratio during peak traffic.",
    ],
  },
  {
    title: "Java Developer",
    company: "Iprism Technologies",
    location: "Hyderabad, India",
    period: "July 2019 – December 2020",
    bullets: [
      "Built Angular agent portal with reactive forms and real-time field-level validation.",
      "Developed premium calculation engine using Java EE and Spring MVC with in-memory Ehcache.",
      "Implemented Spring Batch partitioned jobs for parallel processing of policy renewal notifications.",
      "Replaced SOAP endpoints with versioned RESTful APIs, reducing integration response time significantly.",
      "Designed and tuned Oracle stored procedures, reducing nightly renewal job execution time dramatically.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Drought Monitoring Platform",
    description: "Cloud-integrated AI platform for drought severity classification and forecasting. Uses AWS Lambda, API Gateway, and S3 for infrastructure, with Random Forest and LSTM models for prediction.",
    tech: ["AWS Lambda", "S3", "Python", "Random Forest", "LSTM"],
    github: "https://github.com/karunkumarsomu321-bot",
    demo: null,
  },
  {
    title: "AI Recruitment Analytics Platform",
    description: "AI-powered recruitment system handling candidate screening, job matching, and analytics dashboards. Features intelligent recommendations to streamline hiring workflows.",
    tech: ["React", "FastAPI", "LangChain", "PostgreSQL", "OpenAI"],
    github: "https://github.com/karunkumarsomu321-bot",
    demo: null,
  },
];

const EDUCATION = [
  { school: "University of Maryland Baltimore County", degree: "Master of Science in Computer Science", detail: null, icon: "🎓" },
  { school: "Sathyabama Institute of Science and Technology", degree: "Bachelor of Engineering in Computer Science", detail: null, icon: "🎓" },
];

const FORMSPREE_ID = "YOUR_FORM_ID";

function useTypingEffect(words) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (display.length < words[wordIndex].length) {
        timeout = setTimeout(() => setDisplay(words[wordIndex].slice(0, display.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 60);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, wordIndex, words]);

  return display;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <div className="w-16 h-1 bg-blue-600 mt-3 rounded-full" />
    </div>
  );
}

function HeroSection() {
  const text = useTypingEffect(["Full Stack Developer", "Java & React Engineer", "Cloud & AI Engineer"]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <img src="/karun-Portfolio/Hero.jpg" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          I am Karun Kumar Somu
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-blue-400 mb-8 h-10">
          {text}<span className="animate-pulse">|</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/karun-Portfolio/Karun Kumar Somu - Resume.pdf" target="_blank" rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors shadow-lg">
            📄 View Resume
          </a>
          <a href="https://github.com/karunkumarsomu321-bot" target="_blank" rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/karun-kumar-somu" target="_blank" rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const handleChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) { setStatus("success"); setFields({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
      <p className="text-2xl mb-2">✅</p>
      <p className="text-green-700 font-semibold text-lg">Message sent!</p>
      <button onClick={() => setStatus("idle")} className="mt-4 text-blue-600 underline text-sm">Send another message</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input type="text" name="name" value={fields.name} onChange={handleChange} placeholder="Your Name" required className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder="Your Email" required className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <input type="text" name="subject" value={fields.subject} onChange={handleChange} placeholder="Subject" required className="border border-gray-300 p-4 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea name="message" value={fields.message} onChange={handleChange} rows={6} placeholder="Message" required className="border border-gray-300 p-4 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {status === "error" && <p className="text-red-600 text-sm mb-4">Something went wrong. Please try again.</p>}
      <div className="text-center">
        <button type="submit" disabled={status === "sending"} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors">
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      {/* Nav */}
      <nav className="bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl tracking-tight text-white">Karun Portfolio</span>
          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}
                className={`transition-colors font-medium pb-1 border-b-2 ${active === href.slice(1) ? "text-blue-400 border-blue-400" : "text-gray-300 border-transparent hover:text-blue-400"}`}>
                {label}
              </a>
            ))}
          </div>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-700 text-white" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {menuOpen
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gray-700 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-blue-400 transition-colors font-medium">{label}</a>
            ))}
          </div>
        )}
      </nav>

      <HeroSection />

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-12">
        <FadeSection>
          <div className="flex flex-col items-center mb-8">
            <img src="/karun-Portfolio/profile.jpg" alt="Karun Kumar Somu"
              className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white ring-4 ring-blue-500 mb-6" />
            <SectionHeading title="About Me" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 leading-8">
              Senior Full Stack Developer with 7+ years of experience delivering production-grade applications across Banking, Healthcare, Retail, and Insurance domains. Hands-on expertise in React, TypeScript, Java, Spring Boot, and cloud-native AWS architectures. I specialize in building scalable microservices, event-driven systems with Apache Kafka, and high-performance frontends with modern React patterns.
            </p>
          </div>
        </FadeSection>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-8">
        <FadeSection>
          <SectionHeading title="Technical Skills" />
          <div className="grid md:grid-cols-3 gap-5">
            {SKILLS.map(({ category, color, icon, items }) => (
              <div key={category} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-600 mb-3 flex items-center gap-2"><span>{icon}</span>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className={`text-sm font-medium px-3 py-1 rounded-full ${BADGE_COLORS[color]}`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-8">
        <FadeSection>
          <SectionHeading title="Work Experience" />
          <div className="space-y-5">
            {EXPERIENCE.map(({ title, company, location, period, bullets }) => (
              <div key={title + company} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-blue-600 font-medium">{company} · <span className="text-gray-500 text-sm font-normal">{location}</span></p>
                <p className="text-gray-400 text-sm mb-3">{period}</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  {bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-8">
        <FadeSection>
          <SectionHeading title="Featured Projects" />
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map(({ title, description, tech, github, demo }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col">
                <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
                <p className="text-gray-700 leading-7 mb-4 flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {tech.map((t) => <span key={t} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{t}</span>)}
                </div>
                <div className="flex gap-3 mt-auto">
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {demo && (
                    <a href={demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Education */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-8">
        <FadeSection>
          <SectionHeading title="Education" />
          <div className="space-y-5">
            {EDUCATION.map(({ school, degree, detail, icon }) => (
              <div key={school} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow flex items-start gap-4">
                <span className="text-3xl">{icon}</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">{school}</h3>
                  <p className="text-gray-700">{degree}</p>
                  {detail && <p className="text-blue-600 font-medium mt-1">{detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-10">
        <FadeSection>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Contact</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "📍", label: "Location", value: "Maryland, United States" },
                { icon: "📞", label: "Phone", value: "+1 (943) 238-4119" },
                { icon: "✉️", label: "Email", value: "Karunkumarsomu1228@gmail.com" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-2xl flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{label}</h3>
                    <p className="text-gray-600 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </FadeSection>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 mt-10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Karun Kumar Somu · Built with React & Tailwind CSS</p>
          <div className="flex gap-5">
            <a href="https://github.com/karunkumarsomu321-bot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/karun-k-0843a5422" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:Karunkumarsomu1228@gmail.com" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
