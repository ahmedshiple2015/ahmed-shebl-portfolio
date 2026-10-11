import React, {Suspense, lazy, useEffect, useRef, useState} from 'react';
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
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111114' : '#f7f5fa';
    try { localStorage.setItem('ahmed-theme', theme); } catch {}
  }, [theme]);
  const target = theme === 'dark' ? 'light' : 'dark';
  return <button className="theme-button" onClick={() => setTheme(target)} aria-label={`Switch to ${target} mode`} aria-pressed={theme === 'light'}>
    <Icon name={theme === 'dark' ? 'sun' : 'moon'} /><span>{target === 'light' ? 'Light' : 'Dark'}</span>
  </button>;
}

const views = [
  {name:'Architecture',nodes:['Host / API','CQRS handlers','Domain modules','PostgreSQL'],detail:'Nine bounded modules connected through Host adapters, MediatR, and Outbox integration events.'},
  {name:'Payments',nodes:['Rent due','Stripe Checkout','Outbox event','Wallet credit'],detail:'Stripe checkout and webhooks connect rent, subscriptions, and wallet workflows.'},
  {name:'AI integrations',nodes:['Property data','Embeddings','Qdrant search','Similarity check'],detail:'Property similarity with Qdrant, chat with Semantic Kernel, and maintenance routing through n8n.'}
];
function ArchitectureCanvas(){
  const [active,setActive]=useState(0);
  const canvasRef=useRef(null);
  const [entered,setEntered]=useState(false);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)){setEntered(true);return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setEntered(true);observer.disconnect();}
    },{threshold:0.25});
    observer.observe(canvasRef.current);
    return()=>observer.disconnect();
  },[]);
  return <><div ref={canvasRef} className={`project-canvas estate-canvas${entered ? ' flow-entered' : ''}`}><div className="canvas-heading"><span>Real estate, connected.</span><span>Workflow overview</span></div><ol key={active} className="architecture-flow" aria-label={`${views[active].name} overview`}>{views[active].nodes.map(node=><li key={node}>{node}</li>)}</ol><div className="canvas-tabs" role="group" aria-label="Explore the real estate project">{views.map((view,i)=><button key={view.name} onClick={()=>setActive(i)} aria-pressed={active===i}>{view.name}<Icon name="arrow"/></button>)}</div></div><div className="showcase-caption"><div><h3>Real Estate Management Platform</h3><p className="role">Backend Architect &amp; Team Lead · ITI team project</p></div><a className="text-link" href="https://github.com/kandeel11/Real-Estate-ITI-Graduation-Project">View team repository <Icon name="arrow"/></a></div><div className="project-summary"><p>A modular .NET 10 application connecting property listings, leases, maintenance, and payments.</p><p aria-live="polite">{views[active].detail}</p></div><p className="project-stack">.NET 10 · EF Core · CQRS · Azure · Angular</p></>;
}
function CommerceShowcase(){return <article className="showcase commerce"><div className="project-canvas"><div className="canvas-heading"><span>From catalog to checkout.</span><span>Layered API</span></div><div className="api-visual"><div className="api-route"><span>Catalog &amp; carts</span><i/><span>Checkout</span><i/><span>Stripe</span></div><div className="api-layers"><span>API</span><span>Application</span><span>Domain</span><span>Infrastructure</span></div></div></div><div className="showcase-caption"><div><h3>E-Commerce API</h3><p className="role">Backend development</p></div><a className="text-link" href={github+'/E-Commerce-API'}>View source <Icon name="arrow"/></a></div><div className="project-summary"><p>Catalog, guest carts, checkout, and seller workflows in a layered ASP.NET Core API.</p><p>JWT and Identity, user ownership checks, and guest access tokens connect browsing to checkout.</p></div><p className="project-stack">.NET 8 · EF Core · JWT · SQL Server · Stripe</p></article>;}
const smallerProjects=[
 {title:'Educational Management',role:'Full Stack .NET Developer',description:'Students, instructors, courses, and departments connected through an MVC application.',detail:'EF Core maps enrollments and instructor assignments. Identity separates Admin and Student roles; Razor views present the workflows.',tags:'ASP.NET Core MVC · Identity · SQL Server',url:github+'/MVCProject',nodes:['Students','Courses','Instructors'],style:'education'},
 {title:'Ecobazar',role:'Front-End Architect & Developer · Team demo',description:'Customer, seller, and admin journeys in an object-oriented grocery commerce demo.',detail:'ES6 modules and shared storage services connect carts, wishlists, and orders. This educational demo uses browser storage; the repository is a team-project fork.',tags:'JavaScript · ES6 modules · Bootstrap',url:github+'/CST-E-commerce-Project',nodes:['Browse','Cart','Order'],style:'ecobazar'}
];
function SmallProject({project}){return <article className={`small-project ${project.style}`}><div className="small-canvas" aria-label={`${project.title} workflow overview`}><div className="mini-flow">{project.nodes.map(node=><span key={node}>{node}</span>)}</div></div><h3>{project.title}</h3><p className="role">{project.role}</p><p>{project.description}</p><p className="project-stack">{project.tags}</p><details><summary>Project details <Icon name="chevron"/></summary><p>{project.detail}</p></details><a className="text-link" href={project.url}>View source <Icon name="arrow"/></a></article>;}
function Contact(){
 const [status,setStatus]=useState('');
 useEffect(()=>{if(!status)return;const timer=setTimeout(()=>setStatus(''),4500);return()=>clearTimeout(timer);},[status]);
 async function copy(){try{await navigator.clipboard.writeText(email);setStatus('Email copied');}catch{setStatus('Select the email address to copy it, or use the email link.');}}
 return <section id="contact" className="contact"><h2>Let's work together.</h2><p>Have a backend role or a .NET project in mind? I'd like to hear about it.</p><a className="contact-email" href={`mailto:${email}`}>{email}<Icon name="arrow"/></a><div className="contact-actions"><button onClick={copy}><Icon name={status==='Email copied'?'check':'copy'}/>{status==='Email copied'?'Copied':'Copy email'}</button><a href={linkedin}>LinkedIn <Icon name="arrow"/></a><a href={github}>GitHub <Icon name="arrow"/></a></div><p className="copy-status" role="status">{status}</p></section>;
}
function App(){return <>
 <a className="skip" href="#main">Skip to content</a><header><a className="brand" href="#" aria-label="Ahmed Shebl home">Ahmed Shebl<span>.</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav><ThemeButton/></header>
 <main id="main" tabIndex="-1"><section className="hero" aria-labelledby="intro-heading"><h1 id="intro-heading">Ahmed Shebl<span>.NET backend developer.</span></h1><div className="hero-bottom"><p>I build APIs and connected applications with C# and ASP.NET Core. Currently a Backend Developer Intern at AppsSquare.</p><div className="hero-actions"><a className="button primary" href="#work">Explore my work <Icon name="down"/></a><a className="text-link" href="./Ahmed-Shebl-CV.pdf" download>Download CV <Icon name="down"/></a></div></div></section>
 <section id="work" className="work"><div className="section-header"><h2>Selected projects</h2><p>Architecture, APIs, and the workflows behind them.</p></div><article className="showcase"><ArchitectureCanvas/></article><CommerceShowcase/><div className="smaller-projects">{smallerProjects.map(project=><SmallProject key={project.title} project={project}/>)}</div></section>
 <section id="about" className="about"><h2>A little about me.</h2><div><p className="about-lead">Business minded. Backend focused.</p><p>My Business Information Systems background helps me understand the workflow behind a feature. ITI gave me the foundation to turn that understanding into full stack .NET applications and practical AI integrations.</p><div className="current-role"><h3>Now at AppsSquare</h3><p>Backend Developer Intern · September 2026–present</p><p>A three-month internship, working on Paymob integration and Kamakan.</p></div><details><summary>Education &amp; background <Icon name="chevron"/></summary><ul><li>ITI — Full Stack &amp; Generative AI Intensive Code Camp, January–July 2026.</li><li>Tanta University — Business Information Systems, July 2025. GPA 3.22/4.00.</li><li>Tanta, Egypt · Ready to relocate.</li></ul></details><p className="cv-note">The downloadable CV predates my current internship.</p></div></section>
 <Contact/><Suspense fallback={<p>Loading the mini arcade…</p>}><Games/></Suspense></main><footer><span>© 2026 Ahmed Shebl</span><a href="#">Back to top <Icon name="down" className="up"/></a></footer>
 </>;}
createRoot(document.getElementById('root')).render(<App/>);


