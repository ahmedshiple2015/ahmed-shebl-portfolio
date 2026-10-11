import React, {Suspense, lazy, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const Games = lazy(() => import('./Games.jsx'));

const github = 'https://github.com/ahmedshiple2015';
const email = 'ahmed.shiple2015@gmail.com';
const linkedin = 'https://www.linkedin.com/in/ahmed-shebl1912/';

function Icon({name, className = ''}) {
  const paths = {
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
    down: <path d="M12 4v16m-6-6 6 6 6-6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function ThemeButton() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101116' : '#f5f5f8';
    try { localStorage.setItem('ahmed-theme', theme); } catch {}
  }, [theme]);
  const target = theme === 'dark' ? 'light' : 'dark';
  return <button className="theme-button" onClick={() => setTheme(target)} aria-label={`Switch to ${target} mode`} aria-pressed={theme === 'light'}>
    <Icon name={theme === 'dark' ? 'sun' : 'moon'} /><span>{target === 'light' ? 'Light' : 'Dark'}</span>
  </button>;
}

const projectViews = [
  {name: 'Architecture', title: 'One application. Clear boundaries.', nodes: ['Host / API', 'CQRS handlers', 'Domain modules', 'SQL Server'], body: 'Nine bounded modules, with Host adapters and MediatR connecting responsibilities inside a modular monolith.', note: '.NET 10 · EF Core · MediatR'},
  {name: 'Payments', title: 'A payment is a workflow.', nodes: ['Rent due', 'Stripe Checkout', 'Outbox event', 'Wallet credit'], body: 'Rent and subscription payments connect to wallet workflows through Stripe Checkout, webhooks, and persisted integration events.', note: 'Stripe · Outbox · Wallet ledger'},
  {name: 'AI integrations', title: 'AI connected to a real task.', nodes: ['Property data', 'Embeddings', 'Qdrant search', 'Similarity check'], body: 'Property similarity with Qdrant, chat with Semantic Kernel, and maintenance routing through n8n.', note: 'Semantic Kernel · Qdrant · n8n'}
];

function ProjectExplorer() {
  const [active, setActive] = useState(0);
  const item = projectViews[active];
  return <aside className="project-explorer" aria-label="Explore the real estate project">
    <div className="explorer-title"><span className="project-label">Real Estate Platform</span><a href="#work" aria-label="Read about the real estate project"><Icon name="arrow" /></a></div>
    <div className="explorer-switcher" role="group" aria-label="Project focus">{projectViews.map((view, index) => <button key={view.name} aria-pressed={active === index} onClick={() => setActive(index)}>{view.name}</button>)}</div>
    <div className="explorer-body" aria-live="polite" aria-atomic="true">
      <h2>{item.title}</h2>
      <ol className="flow" aria-label={`${item.name} overview`}>{item.nodes.map(node => <li key={node}>{node}</li>)}</ol>
      <p>{item.body}</p><span className="explorer-note">{item.note}</span>
    </div>
    <div className="explorer-footer"><span>ITI graduation project</span><span>Team repository</span></div>
  </aside>;
}

const projects = [
  {title: 'E-Commerce API', role: 'Backend development', description: 'Catalog, guest carts, checkout, and seller workflows in a layered ASP.NET Core API.', tags: ['.NET 8', 'EF Core', 'JWT', 'Stripe'], url: github + '/E-Commerce-API', detail: 'API, Application, Domain, and Infrastructure layers organize the implementation. Identity, user ownership checks, and guest access tokens connect browsing to checkout.'},
  {title: 'Educational Management', role: 'Full Stack .NET Developer', description: 'Students, instructors, courses, and departments connected through an MVC application.', tags: ['MVC', 'Identity', 'SQL Server'], url: github + '/MVCProject', detail: 'EF Core maps course enrollments and instructor assignments. ASP.NET Core Identity separates Admin and Student roles; repositories organize data access and Razor views present the workflows.'},
  {title: 'Ecobazar', role: 'Front-End Architect & Developer', description: 'Customer, seller, and admin journeys in an object-oriented grocery commerce demo.', tags: ['JavaScript', 'ES6 modules', 'Bootstrap'], url: github + '/CST-E-commerce-Project', detail: 'Shared storage services synchronize carts, wishlists, and orders. This educational frontend demo uses browser storage. The linked repository is a fork of the team project.'}
];

function Tags({items}) { return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
function ProjectRow({project}) {
  return <article className="project-row">
    <div className="project-heading"><h3>{project.title}</h3><p>{project.role}</p></div>
    <div className="project-description"><p>{project.description}</p><Tags items={project.tags}/><details><summary>How it works <Icon name="chevron"/></summary><p>{project.detail}</p></details></div>
    <a className="repository-link" href={project.url} aria-label={`View ${project.title} source`}>View source <Icon name="arrow"/></a>
  </article>;
}

function Contact() {
  const [status, setStatus] = useState('');
  useEffect(() => { if (!status) return; const timer = setTimeout(() => setStatus(''), 4500); return () => clearTimeout(timer); }, [status]);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setStatus('Email copied'); }
    catch { setStatus('Select the email address to copy it, or use the email link.'); }
  }
  return <section id="contact" className="contact">
    <div><h2>Let's build something<br/>worth using.</h2><p>Have a backend role or a .NET project in mind?<br/>I'd like to hear about it.</p><a className="button primary" href={`mailto:${email}`}><Icon name="mail"/> Email Ahmed</a></div>
    <div className="contact-details"><a className="email-address" href={`mailto:${email}`}>{email}</a><button className="copy-button" onClick={copyEmail}><Icon name={status === 'Email copied' ? 'check' : 'copy'}/>{status === 'Email copied' ? 'Copied' : 'Copy email'}</button><p className="copy-status" role="status">{status}</p><p>Tanta, Egypt<br/>Ready to relocate</p><a className="inline-link" href={linkedin}>Connect on LinkedIn <Icon name="arrow"/></a></div>
  </section>;
}

function App() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header><a className="brand" href="#" aria-label="Ahmed Shebl home"><span className="monogram">as<span>.</span></span><span>Ahmed Shebl</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="header-right"><ThemeButton/><a className="header-github" href={github}>GitHub <Icon name="arrow"/></a></div></header>
    <main id="main" tabIndex="-1">
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-copy"><p className="status"><span className="status-dot"/> Backend Developer Intern at AppsSquare</p><h1 id="intro-heading">Thoughtful code.<br/>Powerful backends.</h1><p className="hero-description">I'm <strong>Ahmed Shebl</strong>, a .NET backend developer turning complex workflows into connected applications.</p><div className="hero-buttons"><a className="button primary" href="#work">Explore my projects <Icon name="down"/></a><a className="button secondary" href="Ahmed-Shebl-CV.pdf" download>Download CV <Icon name="down"/></a></div><p className="hero-location">Tanta, Egypt <span aria-hidden="true">/</span> C# &amp; ASP.NET Core</p></div>
        <ProjectExplorer/>
      </section>
      <div className="tech-strip" aria-label="Core technology toolkit">{['C#', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Angular', 'Azure'].map(item => <span key={item}>{item}</span>)}</div>
      <section id="work" className="work"><div className="section-header"><h2>Selected work</h2><p>Architecture, APIs, and the workflows behind them.</p></div>
        <article className="featured-project"><div className="featured-heading"><span className="project-label">ITI graduation project</span><h3>Real Estate<br/>{' '}Management Platform</h3><p className="project-role">Backend Architect &amp; Team Lead</p><Tags items={['.NET 10', 'CQRS', 'Stripe', 'Azure', 'Angular']}/><a className="inline-link" href="https://github.com/kandeel11/Real-Estate-ITI-Graduation-Project">View team repository <Icon name="arrow"/></a></div><div className="featured-story"><p className="project-intro">Property operations involve more than listings. This team project connects leases, maintenance, rent payments, and wallet ledgers in one modular application.</p><dl><div><dt>Architecture</dt><dd>Nine bounded modules, with CQRS, Host adapters, and Outbox events connecting workflows.</dd></div><div><dt>Payments</dt><dd>Stripe checkout and webhooks connect rent, subscriptions, and wallet credits.</dd></div><div><dt>AI integrations</dt><dd>Semantic Kernel chat, Qdrant property similarity, and n8n maintenance routing.</dd></div></dl><p className="team-note">My role is shown above; the linked repository contains the team's shared implementation.</p></div></article>
        <div className="project-list">{projects.map(project => <ProjectRow key={project.title} project={project}/>)}</div>
      </section>
      <section id="about" className="about"><div className="about-copy"><h2>Business minded.<br/>Backend focused.</h2><p>My background in Business Information Systems helps me see the workflow behind a feature. ITI gave me the foundation to turn that understanding into full stack .NET applications and practical AI integrations.</p><p>Now at AppsSquare, I'm working on Paymob integration and Kamakan as part of a three-month backend internship.</p><a className="inline-link" href={linkedin}>More about me on LinkedIn <Icon name="arrow"/></a><p className="cv-note">The downloadable CV predates my current internship.</p></div><ol className="timeline"><li><time>September 2026 — Present</time><h3>AppsSquare</h3><p>Backend Developer Intern</p><span>Paymob integration and Kamakan</span></li><li><time>January — July 2026</time><h3>Information Technology Institute</h3><p>Full Stack &amp; Generative AI</p><span>Intensive Code Camp</span></li><li><time>Graduated July 2025</time><h3>Tanta University</h3><p>Business Information Systems</p><span>Bachelor's degree · GPA 3.22 / 4.00</span></li></ol></section>
      <Suspense fallback={<p>Loading the mini arcade…</p>}><Games/></Suspense>
      <Contact/>
    </main>
    <footer><span>© 2026 Ahmed Shebl</span><div><a href={github}>GitHub <Icon name="arrow"/></a><a href={linkedin}>LinkedIn <Icon name="arrow"/></a><a href="#">Back to top <Icon name="down" className="up"/></a></div></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
