export interface AiCapability {
  title: string;
  category: string;
  summary: string;
  technicalDetails: string[];
}

export const appliedAiData: AiCapability[] = [
  {
    title: "Retrieval-Augmented Generation (RAG)",
    category: "Information Grounding",
    summary:
      "Augmenting LLMs with verified enterprise data repositories to deliver hallucination-resistant answers with precise citations.",
    technicalDetails: [
      "Chunking, preprocessing, and semantic tokenization of structured and unstructured documents",
      "Hybrid dense and sparse vector retrieval strategies for financial and technical domains",
      "Context injection pipelines with relevance scoring and prompt deduplication"
    ]
  },
  {
    title: "Vector Embeddings & Semantic Search",
    category: "Vector Infrastructure",
    summary:
      "Storing and querying high-dimensional vectors to support sub-second semantic retrieval across enterprise catalogs.",
    technicalDetails: [
      "Vector database management using Milvus and PostgreSQL pgvector extensions",
      "Cosine and Euclidean similarity indexing tailored to production query load",
      "Metadata filtering to enforce multi-tenant authorization during retrieval"
    ]
  },
  {
    title: "Orchestration with LangChain & LangGraph",
    category: "Workflow Graphs",
    summary:
      "Building stateful, multi-turn cognitive architectures with deterministic branching, cyclic loops, and state persistence.",
    technicalDetails: [
      "State machines with typed graph nodes for complex decision pipelines",
      "Checkpointing and rollback mechanisms for multi-step tasks",
      "Graceful degradation when individual model steps exceed timeout budgets"
    ]
  },
  {
    title: "AI Agents & Deterministic Tool Calling",
    category: "Action Execution",
    summary:
      "Equipping models with structured function declarations to interact safely with external REST APIs and backend microservices.",
    technicalDetails: [
      "Typed JSON schema contracts for reliable parameter extraction",
      "Human-in-the-loop validation checkpoints for state-altering transactions",
      "Defensive error handling for unexpected or malformed tool arguments"
    ]
  },
  {
    title: "Enterprise Guardrails & Output Validation",
    category: "Safety & Compliance",
    summary:
      "Implementing deterministic verification layers around inputs and generated outputs to maintain regulatory and business standards.",
    technicalDetails: [
      "Strict schema enforcement via Pydantic and JSON validation layers",
      "Prompt injection mitigation and confidential data sanitization filters",
      "Deterministic policy evaluation prior to downstream execution"
    ]
  }
];
