export interface ApproachStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

export const approachData: ApproachStep[] = [
  {
    step: "01",
    title: "Investigate",
    subtitle: "Observation before intervention",
    description:
      "Understand the failure mode in detail before proposing changes. Reproduce the conditions in controlled environments, inspect Application Insights telemetry, error stacks, and audit logs to capture concrete empirical evidence rather than guessing.",
    practices: [
      "Capture reproducible edge-case payloads and system state",
      "Inspect distributed traces across HTTP boundaries and queues",
      "Analyze execution logs, deadlock graphs, and server metrics"
    ]
  },
  {
    step: "02",
    title: "Isolate",
    subtitle: "Delineating layer boundaries",
    description:
      "Trace the defect across multi-tier boundaries: user interface state, API validation, asynchronous message queues (Azure Service Bus), domain business logic, or database query execution plans.",
    practices: [
      "Distinguish between transport-level latency and compute bottlenecks",
      "Evaluate stored procedure and execution plan bottlenecks under load",
      "Isolate concurrency race conditions and asynchronous out-of-order delivery"
    ]
  },
  {
    step: "03",
    title: "Resolve",
    subtitle: "Pragmatic, durable remediation",
    description:
      "Implement a minimal, well-encapsulated fix. Ensure transactional atomicity, backward compatibility, and defensive error boundaries so edge-case failures do not corrupt state or cascade across downstream dependencies.",
    practices: [
      "Preserve database schema integrity and transaction boundaries",
      "Implement idempotent retry mechanisms with dead-letter queue handling",
      "Refactor domain logic with explicit exception classification"
    ]
  },
  {
    step: "04",
    title: "Validate",
    subtitle: "Regression defense and observation",
    description:
      "Verify the resolution against the original failing test case and boundary scenarios. Deploy through automated CI/CD stages, observe real-world metrics, and document operational learnings to prevent repeat incidents.",
    practices: [
      "Write automated unit and integration tests (xUnit) simulating edge cases",
      "Validate zero regression on dependent downstream consumers",
      "Configure proactive alert thresholds in Application Insights"
    ]
  }
];
