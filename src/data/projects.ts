export interface Project {
  id: string;
  title: string;
  category: string;
  timeline: string;
  status: string;
  summary: string;
  problemStatement: string;
  architecture: string[];
  keyDecisions: string[];
  tradeoffsAndChallenges: string[];
  technologies: string[];
  isLabExperiment?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "treasury-credit-framework",
    title: "Treasury Management System & Credit Limit Framework",
    category: "Enterprise Financial Infrastructure",
    timeline: "2025 – Present",
    status: "Production Enterprise Platform",
    summary:
      "Enterprise-grade treasury operations and credit limit management platform designed for rigorous financial accuracy, regulatory adherence, and real-time counterparty exposure tracking.",
    problemStatement:
      "Financial institutions require continuous, deterministic synchronization of cross-border treasury balances and multi-entity credit exposures without risking transactional divergence, data loss, or race conditions during peak settlement windows.",
    architecture: [
      "Modular .NET Core microservices isolating treasury accounting from credit limit evaluation",
      "Azure Service Bus message broker providing guaranteed at-least-once message delivery and dead-letter queue isolation",
      "Event-driven data ingestion pipeline sanitizing and normalizing financial feeds from upstream partners",
      "React and TypeScript administrative interface deployed via Azure Static Web Apps with strict role-based access"
    ],
    keyDecisions: [
      "Implemented idempotent message processing across all asynchronous consumers to prevent duplicate ledger transactions",
      "Decoupled state evaluation from synchronous HTTP requests by offloading heavy risk calculations to Azure Function workers",
      "Maintained a comprehensive audit trail with immutable change capture at the database layer"
    ],
    tradeoffsAndChallenges: [
      "Trade-off: Chose eventual consistency across reporting projections to preserve sub-100ms response times for active operational trades",
      "Challenge: Handling erratic network disconnects from legacy financial core systems without stalling processing pipelines"
    ],
    technologies: [
      ".NET",
      "C#",
      "Azure Service Bus",
      "Azure Functions",
      "React",
      "TypeScript",
      "SQL Server",
      "xUnit"
    ]
  },
  {
    id: "credit-guarantee-los",
    title: "Agricultural Credit Guarantee & Loan Origination Platform",
    category: "Fintech & Lending Systems",
    timeline: "2023 – 2025",
    status: "Production Fintech System",
    summary:
      "Two interconnected production fintech solutions: an end-to-end Loan Origination System (LOS) and a specialized Credit Guarantee Platform facilitating institutional lending compliance in agriculture.",
    problemStatement:
      "Agricultural lending workflows involve heterogeneous documentation, complex statutory eligibility rules, and seasonal surges in application volume across distributed branch networks with intermittent connectivity.",
    architecture: [
      "High-availability ASP.NET web farm coordinated via IIS ARR (Application Request Routing) and Web Gardens",
      "Domain-driven workflow engine modeling borrower onboarding, document verification, and sanctioning stages",
      "Automated unit and integration test suites validating credit scoring logic and compliance thresholds",
      "Optimized relational data access layer using stored procedures, indexed views, and execution plan tuning"
    ],
    keyDecisions: [
      "Standardized multi-stage rule evaluation pipelines into clean state machine transitions to prevent illegal workflow jumps",
      "Optimized critical database queries and index coverage to withstand 3x peak loan application spikes without lock escalation",
      "Integrated automated CI/CD deployment pipelines on Azure VMs with automated rollback safeguards"
    ],
    tradeoffsAndChallenges: [
      "Trade-off: Prioritized strict database constraint validations over purely in-memory validation to guarantee financial compliance records",
      "Challenge: Scaling monolithic legacy components across IIS web farms while maintaining session persistence and cache coherence"
    ],
    technologies: [
      ".NET Core",
      "ASP.NET",
      "ReactJS",
      "Razor Pages",
      "IIS Web Farms",
      "ARR",
      "Azure VMs",
      "SQL Server"
    ]
  },
  {
    id: "rag-financial-copilot",
    title: "Enterprise RAG & Domain Knowledge Assistant",
    category: "Applied AI & Vector Search",
    timeline: "2025 – Present",
    status: "Enterprise Applied AI System",
    summary:
      "Secure retrieval-augmented generation platform providing grounded financial policy insights and automated workflow assistance with strict domain guardrails.",
    problemStatement:
      "Enterprise analysts lose hours navigating hundreds of disparate financial circulars, internal credit policy manuals, and compliance documentation without deterministic citation backing.",
    architecture: [
      "Document ingestion and chunking pipeline utilizing LangChain with semantic sentence boundaries",
      "Vector store backends using Milvus and PostgreSQL pgvector for high-dimensional similarity lookups",
      "LangGraph orchestration graph controlling tool selection, query reformulation, and human-in-the-loop review",
      "Strict Pydantic-based response validation ensuring all citations map directly to ingested corporate documents"
    ],
    keyDecisions: [
      "Enforced multi-tenant document isolation at the vector query filter stage to prevent unauthorized data exposure",
      "Configured automated confidence scoring thresholds to trigger fallback disclosures whenever source context is ambiguous"
    ],
    tradeoffsAndChallenges: [
      "Trade-off: Accepted marginal retrieval latency overhead to run re-ranking models that significantly cut hallucination rates",
      "Challenge: Preserving tabular data context across PDF circulars during chunking and vectorization"
    ],
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "Milvus",
      "pgvector",
      "PostgreSQL",
      "FastAPI",
      "Guardrails"
    ]
  }
];

export const engineeringLabNote = {
  title: "Engineering Lab & Technical Notes",
  description:
    "A continuous repository of benchmark experiments, system design explorations, and proof-of-concepts exploring distributed consensus, high-throughput caching patterns, and deterministic AI agents. New technical post-mortems and open-source experiments are added here as they mature beyond experimental stages."
};
