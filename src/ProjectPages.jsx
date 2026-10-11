import React, {useEffect} from 'react';

export const projects = [
  {
    slug:'real-estate', title:'Real Estate Management Platform',
    role:'Backend Architect & Team Lead · ITI team project',
    description:'Property listings, leases, maintenance, and payments connected through a modular backend.',
    stack:'.NET 10 · Angular 21 · PostgreSQL · CQRS · MediatR',
    repository:'https://github.com/kandeel11/Real-Estate-ITI-Graduation-Project',
    contribution:'https://github.com/kandeel11/Real-Estate-ITI-Graduation-Project/commit/755788d601c52e0e6815a73fbf1cc6f83d322f5d',
    contributionText:'My role on the graduation team was Backend Architect & Team Lead. An authored contribution adds free-subscription backfill for seeded accounts in Host startup and property seeding. The repository contains the shared work of the full team.',
    overview:'A real estate platform with bounded modules for properties, identity, maintenance, subscriptions, payments, wallets, documents, and AI workflows. The Angular frontend connects to a .NET Host API; adapters and Outbox events coordinate module boundaries.',
    flow:['Angular frontend','Host API','CQRS handlers','PostgreSQL'],
    highlights:['Module boundaries organize the domain and its application handlers.','Stripe checkout and webhooks connect rent, subscriptions, and wallet workflows.','AI integrations include Qdrant property similarity, Semantic Kernel chat, and n8n maintenance routing.'],
    validation:'The backend and production frontend builds pass. Existing Angular tests currently include 43 failures, mainly missing test providers; build success does not imply the full test suite passes.',
    demoNote:'Public frontend preview only. These screenshots do not demonstrate live API results, payments, or AI responses. Displayed marketing counts belong to the sample UI.',
    gallery:[['01-home.png','Public home and property search interface'],['02-services.png','Rental services section'],['04-faq.png','Frequently asked questions']],
    previewAlt:'Real estate frontend home with property search controls',
  },
  {
    slug:'commerce-api', title:'E-Commerce API', role:'Backend development',
    description:'A layered API for catalog browsing, guest carts, seller workflows, orders, and checkout.',
    stack:'.NET 8 · EF Core · SQL Server · Identity / JWT · Stripe',
    repository:'https://github.com/ahmedshiple2015/E-Commerce-API',
    contribution:'https://github.com/ahmedshiple2015/E-Commerce-API/commit/719aeb849e44a4aae6931b097809352b79bcd895',
    contributionText:'My backend work includes catalog, cart, seller, order, and payment controller changes, API contracts, payment services, and sample-data migrations. The linked commit shows the implementation changes together.',
    overview:'An ASP.NET Core API organized into API, Application, Domain, and Infrastructure layers. Catalog queries support filtering and pagination; guest tokens and ownership checks connect cart and order access to the correct visitor.',
    flow:['API controllers','Application contracts','Domain entities','EF Core / SQL Server'],
    highlights:['Catalog filtering and pagination expose a browsable product collection.','Identity and JWT protect user and seller workflows; guest access uses scoped tokens.','Stripe services support payment intents, checkout sessions, and webhook processing.'],
    validation:'Four integration tests pass for catalog filtering/pagination, missing products, anonymous seller access, and guest cart ownership/stock checks. Tests use EF InMemory; SQL constraints, concurrent stock updates, and webhook replay remain outside their scope.',
    demoNote:'Swagger running against a separate local SQL Server database with mock products. The screenshots show a real successful catalog request; no payment transaction is demonstrated.',
    gallery:[['02-query.png','Catalog pagination query in Swagger'],['03-response.png','Successful filtered request'],['04-result.png','Returned product data']],
    previewAlt:'Swagger interface showing the commerce catalog endpoint',
  },
  {
    slug:'education', title:'Educational Management', role:'Full Stack .NET Developer',
    description:'An MVC application connecting students, instructors, departments, courses, and enrollments.',
    stack:'.NET 10 · ASP.NET Core MVC · EF Core · SQL Server · Identity',
    repository:'https://github.com/ahmedshiple2015/MVCProject',
    contribution:'https://github.com/ahmedshiple2015/MVCProject/commit/67cb264690af10ad899d303144b8cbadc10c3400',
    contributionText:'My full stack changes cover management controllers, view models, Razor interfaces, and styling for courses, departments, instructors, students, and account screens.',
    overview:'EduFlow presents academic management workflows through Razor views and MVC controllers. Repositories and EF Core model courses, enrollments, instructor assignments, and departments; Identity separates Admin and Student access.',
    flow:['Razor views','MVC controllers','Repositories','SQL Server'],
    highlights:['Connected student, instructor, department, and course management screens.','Enrollment and grade workflows use dedicated view models.','Configurable database connection supports a separate local development setup.'],
    validation:'Three integration tests pass for dashboard rendering, anonymous profile redirects, and the login form. The test host uses EF InMemory. The current startup creates public demo accounts, so this remains a local learning/demo app pending further hardening.',
    demoNote:'Authenticated local admin walkthrough using seeded sample records, captured in a separate demonstration database.',
    gallery:[['02-students.png','Student directory'],['03-departments.png','Academic departments'],['04-courses.png','Course management']],
    previewAlt:'EduFlow academic management dashboard',
  },
  {
    slug:'ecobazar', title:'Ecobazar', role:'Front-End Architect & Developer · Team demo',
    description:'Customer, seller, and admin journeys in an object-oriented grocery commerce frontend.',
    stack:'JavaScript · ES6 modules · HTML / CSS · Bootstrap · Browser storage',
    repository:'https://github.com/ahmedshiple2015/CST-E-commerce-Project',
    contribution:'https://github.com/ahmedshiple2015/CST-E-commerce-Project/commit/6806a7d0f187040a66d2d18ff4aba495c4d609b1',
    contributionText:'My team contribution includes seller/admin product behavior, product details, home, navigation, and product controller changes. This repository is a fork of the shared team project.',
    overview:'An educational storefront using ES modules, object-oriented models, and shared storage services. Browser storage connects product browsing, wishlists, carts, and order state across the customer and management interfaces.',
    flow:['HTML pages','ES module controllers','Models / services','Browser storage'],
    highlights:['Category filtering and product details make the sample catalog browsable.','Shared services connect cart, wishlist, and order data.','Role-specific customer, seller, and admin interfaces share the same demo state.'],
    validation:'JavaScript syntax checks and three storage tests pass: seller revenue isolation, seller removal isolation, and authenticated/deduplicated wishlist behavior. Browser-side roles are demonstration behavior, not secure backend authentication.',
    demoNote:'Actual local storefront with sample products. The walkthrough covers browsing, category filtering, and product details; it does not demonstrate real checkout or payment processing.',
    gallery:[['02-catalog.png','Product catalog'],['03-filter.png','Fruit category filter'],['04-detail.png','Product details']],
    previewAlt:'Ecobazar grocery storefront with fresh produce',
  },
];

const projectUrl=slug=>`?project=${slug}`;
export function ProjectPreview({project}){
  return <article className="project-preview">
    <a className="project-photo project-canvas" href={projectUrl(project.slug)} aria-label={`See ${project.title} details`}>
      <img src={`./projects/${project.slug}/preview.png`} alt={project.previewAlt} width="1200" height="800" loading="lazy" decoding="async"/>
      <span className="photo-action">Explore project <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
    </a>
    <div className="showcase-caption"><div><h3>{project.title}</h3><p className="role">{project.role}</p></div><a className="text-link" href={projectUrl(project.slug)}>Project details <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></div>
    <p className="preview-description">{project.description}</p><p className="project-stack">{project.stack}</p>
  </article>;
}

export function ProjectDetails({slug,ThemeButton,ArchitectureCanvas}){
  const project=projects.find(p=>p.slug===slug);
  useEffect(()=>{document.title=project?`${project.title} | Ahmed Shebl`:'Project not found | Ahmed Shebl';},[project]);
  if(!project)return <main className="project-page"><h1>Project not found.</h1><p>This project link is unavailable.</p><a className="text-link" href="./#work">Back to selected work</a></main>;
  const next=projects[(projects.indexOf(project)+1)%projects.length];
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="detail-header"><a className="brand" href="./">Ahmed Shebl<span>.</span></a><a className="text-link" href="./#work">All projects</a><ThemeButton/></header>
    <main id="main" className="project-page" tabIndex="-1">
      <section className="project-intro"><h1>{project.title}</h1><p className="detail-role">{project.role}</p><p className="detail-lead">{project.description}</p><div className="detail-links"><a className="button primary" href={project.repository}>View repository</a><a className="text-link" href={project.contribution}>See my contribution</a></div></section>
      <figure className="detail-cover"><img src={`./projects/${slug}/preview.png`} alt={project.previewAlt} width="1200" height="800"/><figcaption>{project.demoNote}</figcaption></figure>
      <section className="detail-section"><h2>The project</h2><div><p>{project.overview}</p><h3>Built with</h3><p>{project.stack}</p></div></section>
      <section className="detail-section"><h2>My contribution</h2><div><p>{project.contributionText}</p><a className="text-link" href={project.contribution}>Browse the authored changes</a></div></section>
      <section className="detail-section"><h2>How it connects</h2><div><ol className="detail-flow">{project.flow.map(step=><li key={step}>{step}</li>)}</ol><ul className="detail-highlights">{project.highlights.map(item=><li key={item}>{item}</li>)}</ul></div></section>
      {slug==='real-estate'&&<section className="detail-explorer" aria-label="Interactive real estate workflows"><ArchitectureCanvas/></section>}
      <section className="detail-gallery"><h2>A closer look</h2>{project.gallery.map(([file,caption])=><figure key={file}><img src={`./projects/${slug}/${file}`} alt={caption} width="1200" height="800" loading="lazy" decoding="async"/><figcaption>{caption}</figcaption></figure>)}<p className="gallery-note">Actual application screenshots captured on 11 October 2026 using local sample data.</p></section>
      <section className="detail-section"><h2>Verification & scope</h2><div><p>{project.validation}</p><a className="text-link" href={project.repository}>Setup instructions and project documentation</a></div></section>
      <nav className="next-project" aria-label="Project navigation"><a className="text-link" href="./#work">Back to all projects</a><a href={projectUrl(next.slug)}><span>Next project</span><strong>{next.title}</strong></a></nav>
    </main><footer><span>© 2026 Ahmed Shebl</span><a href="./#contact">Get in touch</a></footer>
  </>;
}
