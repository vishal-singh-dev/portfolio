export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  competencies: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "backend-system-design",
    category: "Backend & System Design",
    description:
      "Architecting modular, event-driven, and type-safe server architectures resilient to concurrency and network anomalies.",
    competencies: [
      {
        name: "Service Architecture & Core",
        description: "Domain modeling, clean separation of concerns, and robust execution pipelines.",
        technologies: [".NET", ".NET Core", "C#", "Python", "FastAPI", "Entity Framework Core", "Dapper"]
      },
      {
        name: "API Design & Distributed Messaging",
        description: "Idempotent REST APIs, decoupled communication patterns, and queue-driven pipelines.",
        technologies: ["REST APIs", "Microservices", "Azure Service Bus", "Kafka", "Asynchronous Messaging"]
      }
    ]
  },
  {
    id: "fullstack-engineering",
    category: "Full-Stack Engineering",
    description:
      "Crafting performant user interfaces tightly integrated with transactional backends and cloud runtimes.",
    competencies: [
      {
        name: "Frontend Architecture",
        description: "Component modularity, predictable state management, and strict TypeScript contracts.",
        technologies: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "TailwindCSS"]
      },
      {
        name: "Workflow & Cloud Integration",
        description: "Connecting user interfaces seamlessly with microservices and serverless endpoints.",
        technologies: ["Azure Static Web Apps", "Azure Function Apps", "Razor Pages", "AngularJS"]
      }
    ]
  },
  {
    id: "database-engineering",
    category: "Database Engineering & Performance",
    description:
      "Managing structured, semi-structured, and caching layers with strict data integrity guarantees.",
    competencies: [
      {
        name: "Relational & Columnar Systems",
        description: "ACID transactions, execution plan analysis, index optimization, and high-load schema design.",
        technologies: ["SQL Server", "PostgreSQL", "SAP HANA", "pgvector"]
      },
      {
        name: "Caching, NoSQL & Data Logic",
        description: "Low-latency key-value stores, distributed documents, and stored procedures.",
        technologies: ["Redis", "MongoDB", "Milvus", "Stored Procedures", "Views", "Indexing"]
      }
    ]
  },
  {
    id: "cloud-production",
    category: "Cloud & Production Engineering",
    description:
      "Deploying, scaling, and maintaining mission-critical enterprise systems under production demands.",
    competencies: [
      {
        name: "Azure Infrastructure & Hosting",
        description: "Multi-instance web farms, ARR load balancing, compute instances, and serverless compute.",
        technologies: ["Azure App Services", "Azure VMs", "Azure Functions", "Azure APIM", "IIS Web Farms", "ARR"]
      },
      {
        name: "DevOps & Observability",
        description: "Automated delivery pipelines, containerization, structured logging, and anomaly tracing.",
        technologies: ["Azure DevOps", "CI/CD", "Docker", "Git", "Azure Storage", "Application Insights"]
      }
    ]
  }
];
