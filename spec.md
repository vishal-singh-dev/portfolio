refer the pdf to extract information about the Subject's profile and build as per the instructions below:
# Build: Vishal Singh — The Engineer's Road

## 1. Your role

Act as a senior frontend engineer, product designer, and creative developer.

Build a production-quality personal portfolio for Vishal Singh, a Software Engineer with 4.5 years of experience in enterprise applications, fintech, backend architecture, full-stack development, database engineering, cloud systems, and production support.

This is not a conventional portfolio template.

The design concept combines an understated engineering publication with a continuous road journey. A minimal 3D car follows the visitor's scroll progress through the portfolio. Each professional section is a checkpoint.

At the very end, visitors discover an embedded, playable 3D driving game inspired by Indian roads.

The game is an optional reward for visitors who explore the complete portfolio. It must never dominate the professional experience.

## 2. Design reference and creative direction

Reference:
https://engineering-atlas.in/system-design/location/design-strava/

Study the reference to understand its content presentation, typography, spacing, restrained styling, and engineering-oriented aesthetic.

Do not reproduce its exact layout or copy its branding.

Translate the reference's content-first philosophy into a dark, monochromatic portfolio.

The result should feel like a carefully designed engineering publication that happens to have an interactive road running through it.

### Visual hierarchy

Priority 1: Professional content and career experience.

Priority 2: Typography, spacing, and page composition.

Priority 3: The subtle scrolling car and checkpoint indicators.

Priority 4: The final driving game.

The game must never compete with the hero section, experience, skills, or engineering accomplishments for attention.

## 3. Colour system

Create a restrained monochromatic palette.

Suggested CSS variables:

--background: #111111;
--surface: #191919;
--surface-secondary: #202020;
--text-primary: #F2F2F2;
--text-secondary: #B0B0B0;
--text-muted: #858585;
--border: #333333;
--road-surface: #242424;
--road-marking: #D5D5D5;
--checkpoint-active: #E5E5E5;

These are starting values. Refine them for contrast and consistency during implementation.

Rules:

- Do not use saturated colours in the portfolio or game.
- Do not use neon green, electric blue, vivid orange, purple gradients, or colourful arcade effects.
- Avoid gradients altogether unless a subtle lighting effect is genuinely necessary.
- Use white and grey to distinguish interactive states.
- Use thin borders and tonal contrast instead of heavy shadows.
- Avoid glowing outlines and excessive bloom.
- Keep the road, car, animals, and obstacles within the same monochromatic visual language.
- Use subtle differences in material roughness and lighting to make 3D objects distinguishable.
- Never use colour alone to communicate game states.

The game may have slightly more visual contrast than the rest of the page, but it must remain subdued.

## 4. Typography and layout

Use a clean sans-serif typeface with a professional, editorial feel.

A suitable starting point is Inter or a comparable open-source font.

Use:
- Large, restrained headings.
- Readable body text.
- Short paragraphs.
- Generous vertical spacing.
- Small uppercase section labels.
- Thin horizontal dividers.
- Simple rectangular buttons.
- Consistent spacing based on an 8px scale.

Avoid:
- Excessive rounded cards.
- Floating glassmorphism panels.
- Excessive iconography.
- Large decorative statistics.
- Unnecessary animations on text.
- Technology-logo walls.
- Generic startup landing-page patterns.

The page should look composed, deliberate, and confident.

## 5. Professional identity

Use the following verified information.

Name: Vishal Singh

Title: Software Engineer

Experience: 4.5 years

Location: Mumbai, Maharashtra, India

Email: iamvishal.2811@gmail.com

LinkedIn: https://www.linkedin.com/in/vishalsingh3306/

Education: Bachelor of Engineering, University of Mumbai, 2022.

Use the supplied resume as the source of truth.

### Hero section

Suggested copy:

SOFTWARE ENGINEER / 4.5 YEARS OF EXPERIENCE

# I build software systems that work beyond the happy path.

I design and build frontend experiences, backend services, and data-intensive applications. My work spans system design, enterprise architecture, database engineering, and production troubleshooting.

Primary actions:
- Explore my experience
- Download resume

Secondary navigation:
- LinkedIn
- Email

Treat this as initial copy. Refine it if a better version communicates the same verified experience more effectively.

The hero must be understandable immediately, without scrolling.

Do not display a giant animated car or a full-screen racing scene.

The car should be a small, understated visual element positioned on a narrow road running alongside or beneath the introduction.

The visitor's first impression should be of an experienced engineer, not a game developer.

## 6. Overall page architecture

Implement these sections in order:

1. Introduction
2. Professional experience
3. Engineering capabilities
4. Engineering approach and production problem-solving
5. Applied AI and technical exploration
6. Projects and engineering lab
7. Contact and finish line
8. Optional embedded driving game

Keep the game out of the primary navigation.

Do not display game controls, obstacle previews, scores, racing instructions, or prominent game-related calls to action before the final section.

The road and car may appear throughout the journey, but the game itself should be revealed only at the end.

The visitor should feel that they have reached a destination after exploring the portfolio.

## 7. The scrolling road

Create one continuous, understated 3D road.

The car represents progress through the engineer's career.

Use:
- A minimal low-poly vehicle.
- Dark asphalt.
- Subtle white lane markings.
- Restrained directional lighting.
- Simple road boundaries.
- Small checkpoint markers.

The road should occupy a supporting visual area rather than taking over the viewport.

On desktop, use a balanced composition with professional content in the main reading area and the road scene occupying a narrower supporting column.

The road may become sticky within the journey region, but it must not obstruct text, links, or navigation.

On mobile, simplify the scene and reduce its visual footprint.

### Scroll behaviour

The car must move in response to the actual scroll position.

Map the progress of the portfolio journey to the car's position along the road.

Requirements:
- Smooth forward movement.
- Smooth backward movement when scrolling upwards.
- Correct checkpoint alignment.
- No scroll hijacking.
- No forced section-by-section snapping.
- No artificial waiting periods.
- No independent timer causing the car to drift away from the page position.

Use one source of truth for scroll progress.

Use actual section positions to determine checkpoint activation rather than relying entirely on fixed percentages.

### Checkpoint presentation

Each section should have a small, consistent checkpoint marker.

An inactive checkpoint is represented by a muted grey marker.

An active checkpoint becomes white or slightly brighter.

Do not introduce colourful achievements, large badges, animated explosions, or arcade-style effects.

The checkpoint is a navigational aid, not the central content.

## 8. Section: Professional experience

Use a restrained editorial timeline.

Each role should include:
- Job title.
- Company.
- Employment period.
- A concise summary.
- Three to five selected contributions.

Prioritise outcomes, responsibilities, and engineering decisions over generic job descriptions.

### Senior Software Engineer — Yodaplus Technologies Pvt. Ltd.

October 2025 – Present

Emphasise verified experience in:
- Enterprise financial platforms using .NET and Azure.
- Treasury Management System and Credit Limit Framework development.
- Backend services and REST API design.
- Financial data acquisition, validation, transformation, and distribution.
- Azure Service Bus and asynchronous service integration.
- Full-stack development using React, TypeScript, and .NET.
- CI/CD, production debugging, and end-to-end feature ownership.
- AI-powered enterprise applications and RAG systems.

### Software Engineer — Knight Fintech Pvt. Ltd.

August 2023 – September 2025

Emphasise verified experience in:
- Production fintech products.
- Loan Origination System workflows.
- Credit Guarantee Platform development.
- Domain-driven business workflows.
- REST APIs and data-access layers.
- .NET Core, React, ASP.NET Framework, and Razor Pages.
- IIS Web Farms, Web Gardens, and ARR.
- Production troubleshooting, testing, and database optimisation.

### Junior Software Engineer — Uneecops Technologies Ltd.

June 2022 – July 2023

Emphasise verified experience in:
- .NET and AngularJS enterprise applications.
- Dapper and ADO.NET.
- Microsoft SQL Server and SAP HANA.
- SQL queries, stored procedures, functions, and views.
- Production debugging across frontend, backend, and database layers.

Do not simply paste the complete resume into the website.

Select the strongest details, remove repetition, and retain the substance of the actual experience.

Do not invent performance improvements, scale figures, revenue impact, or other achievements that are not documented.

## 9. Section: Engineering capabilities

Present four major areas in a simple grid or editorial layout.

### Backend and system design

.NET, C#, REST APIs, microservices, API design, asynchronous messaging, and application architecture.

### Full-stack engineering

React, TypeScript, JavaScript, HTML, CSS, frontend-backend integration, and application workflows.

### Database engineering

SQL Server, PostgreSQL, MongoDB, Redis, stored procedures, views, indexing, and query optimisation.

### Cloud and production engineering

Azure Functions, Azure App Services, Azure VMs, Azure Service Bus, Azure SQL, Azure DevOps, CI/CD, Docker, monitoring, and troubleshooting.

Display technology names as readable text.

Do not turn this section into a colourful logo gallery.

Group technologies according to what they help accomplish rather than presenting a long, undifferentiated list.

## 10. Section: Engineering approach

This section should communicate engineering judgement.

Present four stages:

01 — Investigate

Understand the failure, reproduce the problem, and collect evidence.

02 — Isolate

Trace the problem through the relevant application, service, integration, or database layer.

03 — Resolve

Implement an appropriate fix while considering data integrity, failure scenarios, and maintainability.

04 — Validate

Verify the resolution and consider regression risks and preventive improvements.

Keep the descriptions concise and grounded in the user's actual experience.

Use typography, thin dividers, and a subtle progression along the road.

Avoid large diagrams unless they provide genuine explanatory value.

The section should demonstrate a methodical approach without claiming expertise that the resume does not establish.

## 11. Section: Applied AI and technical exploration

Create a dedicated but restrained section for the AI work already supported by the resume.

Highlight:
- Retrieval-augmented generation.
- LLM integrations.
- Embeddings and vector search.
- LangChain and LangGraph.
- AI agents and tool calling.
- Guardrails.

Explain the work in plain English where possible.

Do not claim that these systems achieved particular accuracy, cost savings, or production scale unless that information is provided.

## 12. Section: Projects and engineering lab

The portfolio must look complete even if there are initially few public projects.

Do not fabricate projects.

Create a flexible project section that can later contain:
- Project overview.
- Problem statement.
- Architecture.
- Important engineering decisions.
- Implementation details.
- Trade-offs and challenges.
- Outcomes.
- Repository or live-demo links.

If there are no ready-to-publish projects, show a minimal Engineering Lab section explaining that technical projects and experiments will be documented here.

Do not make an empty grid of placeholder cards.

Keep project information in a central data file so new projects can be added without changing the page layout.

## 13. Final professional section

Display a concise closing message:

# Good software is built one decision at a time.

I'm interested in engineering problems that require thoughtful design, reliable implementation, and practical problem-solving.

Let's connect.

Buttons:
- Email
- LinkedIn
- Download resume

The wording can be refined, but the tone must remain professional and direct.

Place the finish line at the end of this section.

Only after the visitor reaches this point should the driving game become available.

## 14. The hidden reward: Survive the Commute

The game is the final optional experience.

It should not be the hero of the website.

### Reveal behaviour

When the visitor reaches the finish line:
- The car reaches the final road marker.
- A subtle finish-line transition occurs.
- The game panel is revealed beneath the professional contact section.
- A small heading introduces the game.
- The visitor can choose whether to play.

Suggested introduction:

SURVIVE THE COMMUTE

You've explored the engineering journey.

Now, one final challenge.

[Start engine]

Do not autoplay the game.

Do not interrupt the portfolio with a modal or force the visitor to interact with the game.

### Game appearance

Create a monochromatic, low-poly 3D Indian road.

Use:
- Near-black asphalt.
- White or grey lane markings.
- Dark grey vehicles.
- Desaturated animal models.
- Subtle lighting.
- Minimal shadows.
- Restrained road details.

The road, cars, potholes, cows, buffaloes, and dogs should be visually distinguishable through geometry, lighting, and material contrast.

Avoid vibrant textures, neon effects, colourful environments, exaggerated cartoon proportions, and arcade-style UI.

The overall visual style should match the rest of the website.

### Game mechanics

Create a three-lane driving game.

The player controls a car moving forward while avoiding:
- Potholes.
- Other vehicles.
- Cows.
- Buffaloes.
- Dogs.

Controls:
- Left arrow or A: steer left.
- Right arrow or D: steer right.
- Touch controls for mobile.

The game must include:
- Start state.
- Active gameplay.
- Collision detection.
- Scoring.
- Distance travelled.
- Lives or another clearly defined failure mechanic.
- Gradually increasing difficulty.
- Game-over state.
- Victory state.
- Restart button.

Spawn obstacles procedurally.

Randomness must remain fair: never generate an unavoidable obstacle combination.

Use lightweight low-poly geometry or appropriately licensed local assets. Avoid depending on external 3D models loading from third-party websites at runtime.

### Game interface

Use a simple HUD containing score, distance, and remaining lives.

Use typography and thin dividers rather than colourful panels.

Keep the controls visible but unobtrusive.

The game should feel like a small, polished browser game rather than a separate gaming website.

### Fictional finish-line reward

At the finish line, show:

CONGRATULATIONS, ROAD WARRIOR.

You've survived the Indian commute.

Your fictional reward: 1 litre of ethanol-blended petrol.

Clearly state that the prize is fictional, no fuel will actually be delivered, and the game is not endorsed by the government or any public official.

Do not imply that a named official personally sponsors the game or awards the prize.

Provide a replay option.

## 15. Technology stack

Use:
- React.
- TypeScript.
- Vite.
- Three.js.
- React Three Fiber.
- Drei where useful.
- GSAP with ScrollTrigger, or an appropriate scroll-linked animation implementation.
- Plain CSS or CSS Modules.

Use the existing project configuration if a repository already exists.

Do not introduce a backend, database, authentication, or unnecessary application infrastructure.

Keep the portfolio scene and the game in separate modules.

They may share assets, but the game must be independently initialised and disposed of.

## 16. Performance requirements

The portfolio must remain fast and responsive.

- Load the primary page content before nonessential 3D assets.
- Load the portfolio road scene independently of the game.
- Lazy-load the game.
- Do not run a continuous game-rendering loop before the visitor starts playing.
- Pause or reduce rendering when the relevant scene is not visible.
- Dispose of unused geometries, materials, and event listeners.
- Limit draw calls and expensive lighting effects.
- Avoid unnecessarily large 3D assets.
- Respect reduced-motion preferences.
- Provide a usable fallback when WebGL is unavailable.
- Ensure the text and navigation remain usable if 3D rendering fails.

Do not sacrifice performance to make the road more elaborate.

## 17. Responsive design

Desktop:
- Content-first editorial layout.
- Subtle road scene alongside the content.
- Generous spacing.
- Game contained within a defined frame at the end.

Tablet:
- Reduce scene complexity and road width.
- Maintain readable text and clear section boundaries.

Mobile:
- Prioritise the content.
- Simplify or reduce the persistent 3D scene.
- Avoid covering the text with the car.
- Use touch controls for the game.
- Prevent horizontal scrolling.
- Keep the game frame usable without requiring a large viewport.

The entire portfolio must work without relying on hover interactions.

## 18. Maintainability

Keep profile information separate from the UI.

Suggested files:

src/data/profile.ts
src/data/experience.ts
src/data/skills.ts
src/data/projects.ts

Separate modules should handle:
- Portfolio layout.
- Scroll progress.
- Road and car rendering.
- Checkpoint activation.
- Game state.
- Obstacle spawning.
- Collision detection.
- Scoring.
- Game UI.

Avoid unnecessary abstractions.

Do not duplicate the same professional information across multiple components.

## 19. Implementation workflow

Before coding:
1. Inspect the repository.
2. Read the supplied resume.
3. Review the design reference.
4. Identify the current application structure.
5. Produce a brief implementation plan.

Then implement in stages.

Stage 1:
Build the complete portfolio with accurate content and final visual styling. Use a static placeholder for the road if needed.

Stage 2:
Implement the persistent road scene and scroll-linked car movement.

Stage 3:
Implement checkpoint activation and responsive behaviour.

Stage 4:
Build the embedded driving game and its complete gameplay loop.

Stage 5:
Polish typography, spacing, transitions, performance, and mobile behaviour.

Stage 6:
Verify the production build and document how to update the resume, profile, experience, and projects.

After each stage, run the available build checks and inspect the application in a browser.

Fix actual problems rather than merely reporting them.

Do not stop after generating a static mockup.

## 20. Acceptance criteria

The finished application must satisfy these conditions:

1. The first screen clearly communicates the engineer's identity and professional experience.
2. The visual style is dark, restrained, and monochromatic.
3. Professional content is more visually prominent than the 3D scene.
4. The car moves according to scroll progress.
5. Every major section has a checkpoint.
6. Scrolling remains natural in both directions.
7. The experience, technical capabilities, production problem-solving, and applied AI sections use verified information.
8. The project section does not invent accomplishments.
9. The game is located at the end of the journey.
10. The game is optional and never interrupts the professional experience.
11. The game uses muted monochromatic 3D assets.
12. The specified Indian-road obstacles and gameplay mechanics work.
13. The finish-line reward is clearly fictional.
14. The website remains usable on mobile and when 3D rendering is unavailable.
15. The production build succeeds.
16. New projects can be added without redesigning the website.
17. No unnecessary backend infrastructure is introduced.

## Final design rule

When deciding between a more impressive animation and a clearer professional presentation, choose the clearer professional presentation.

When deciding between more detailed game graphics and better performance, choose better performance.

When deciding whether an element belongs on the page, ask whether it improves professional understanding, navigation, or the final reward.

The finished product should be remembered first as an excellent software engineer's portfolio and second as a surprisingly fun website to explore.
