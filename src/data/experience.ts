export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "yodaplus",
    role: "Senior Software Engineer",
    company: "Yodaplus Technologies Pvt. Ltd.",
    period: "Oct 2025 – Present",
    location: "Mumbai, India",
    summary:
      "Leading architecture and development for enterprise financial platforms, secure data pipelines, and AI-enabled business workflows across .NET and Azure ecosystems.",
    highlights: [
      "Architected enterprise financial platforms using .NET and Azure, translating complex requirements for Treasury Management System (TMS) and Credit Limit Framework (CLF) into robust domain models and backend services.",
      "Engineered secure financial data pipelines handling acquisition, validation, transformation, and reliable distribution across downstream systems.",
      "Designed and developed REST APIs and backend services with a focus on data integrity, robust error handling, performance, and maintainability, using Azure Service Bus for asynchronous messaging and decoupled service integration.",
      "Developed full-stack applications using React, TypeScript, and .NET, seamlessly connecting modern frontends with Azure cloud backends and deploying via Azure SWA and Function Apps.",
      "Wrote thorough unit and integration test suites using xUnit to safeguard domain logic, data layers, and API reliability.",
      "Owned features end-to-end through the entire lifecycle—from technical design and implementation to automated CI/CD, production debugging, and documentation.",
      "Accelerated development workflows by leveraging AI-assisted tools for rapid prototyping, code generation, refactoring, and automated testing.",
      "Developed AI-powered enterprise applications and RAG systems using LLMs, embeddings, vector search, LangChain, LangGraph, tool calling, and guardrails."
    ],
    technologies: [
      ".NET",
      "C#",
      "Azure",
      "Azure Service Bus",
      "React",
      "TypeScript",
      "Azure Functions",
      "Azure SWA",
      "xUnit",
      "LangChain",
      "LangGraph",
      "RAG"
    ]
  },
  {
    id: "knight-fintech",
    role: "Software Engineer",
    company: "Knight Fintech Pvt. Ltd.",
    period: "Aug 2023 – Sep 2025",
    location: "Mumbai, India",
    summary:
      "Core engineer for high-volume lending systems, credit guarantee evaluation platforms, and resilient IIS farm infrastructure in the fintech and agricultural lending domain.",
    highlights: [
      "Designed and developed two production fintech products: a Loan Origination System covering applicant onboarding, eligibility, and sanctioning, and a Credit Guarantee Platform provisioning lending workflows, rule evaluation, and compliance in the agricultural sector.",
      "Owned full-stack development across both products, designing domain-driven business workflows, REST APIs, integrations, and data-access layers around core lending and guarantee capabilities.",
      "Architected and developed the Loan Origination System using .NET Core and ReactJS, hosted via Azure VMs.",
      "Built the Credit Guarantee Platform using ASP.NET Framework and Razor Pages, scaling across IIS Web Farms, Web Gardens, and ARR.",
      "Improved product reliability through automated unit/integration testing, CI/CD, production troubleshooting, and performance-focused database optimization.",
      "Contributed across the full product lifecycle, from requirements and technical design through development, deployment, and production support, while mentoring junior engineers."
    ],
    technologies: [
      ".NET Core",
      "ReactJS",
      "ASP.NET",
      "Razor Pages",
      "IIS Web Farms",
      "ARR",
      "Azure VMs",
      "SQL Server",
      "CI/CD",
      "REST APIs"
    ]
  },
  {
    id: "uneecops",
    role: "Junior Software Engineer",
    company: "Uneecops Technologies Ltd.",
    period: "Jun 2022 – Jul 2023",
    location: "Mumbai, India",
    summary:
      "Engineered full-stack enterprise modules, optimized complex data layers, and diagnosed multi-tier production issues across SQL Server and SAP HANA environments.",
    highlights: [
      "Developed and enhanced .NET and AngularJS-based enterprise modules using Dapper/ADO.NET for data access with MS SQL and SAP HANA databases.",
      "Designed and optimized SQL queries, stored procedures, functions, views, and joins to support reporting, validations, and backend data workflows.",
      "Diagnosed and resolved production issues across the UI, backend, and database layers by analyzing query behavior, data inconsistencies, and application-flow defects."
    ],
    technologies: [
      ".NET",
      "AngularJS",
      "Dapper",
      "ADO.NET",
      "MS SQL Server",
      "SAP HANA",
      "Stored Procedures",
      "Query Optimization"
    ]
  }
];
