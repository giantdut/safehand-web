import { getRepoDirectory, getRepoFile } from "@/lib/github";
import { readActionItems, readHazards, readTrainingMatrix, readWorkers } from "@/lib/safety-data";

const HEALTH_CHECKS = [
  { key: "hazard-identification", points: 12 },
  { key: "risk-controls", points: 11 },
  { key: "worker-competency", points: 12 },
  { key: "expired-certs", points: 11 },
  { key: "safe-work-procedures", points: 11 },
  { key: "worker-roster", points: 11 },
  { key: "action-items-tracked", points: 11 },
  { key: "no-open-high-priority", points: 11 },
  { key: "management-review", points: 10 },
] as const;

export async function computeProgramHealthScore() {
  const [hazards, training, workers, actions, sops, weekly] = await Promise.all([
    readHazards(),
    readTrainingMatrix(),
    readWorkers(),
    readActionItems(),
    getRepoDirectory("sops"),
    getRepoDirectory("weekly-summaries"),
  ]);

  const today = new Date();
  const hasHazards = hazards.length > 0;
  const hasRiskControls = hazards.some((hazard) => Array.isArray(hazard.controls) && hazard.controls.length > 0);
  const hasTraining = training.length > 0;
  const hasNoExpiredCerts = training.every((row) =>
    (row.certifications ?? []).every((cert) => {
      if (!cert.expires) return true;
      return new Date(cert.expires) >= today;
    }),
  );
  const hasSops = sops.some((entry) => entry.type === "file");
  const hasWorkerRoster = workers.length > 0;
  const hasActionItemsTracked = Boolean(await getRepoFile("action-items.json"));
  const noOpenHighPriority = !actions.some(
    (item) => item.priority === "high" && (item.status ?? "open") === "open",
  );
  const hasManagementReview = weekly.some((entry) => entry.type === "file");

  const checks = [
    hasHazards,
    hasRiskControls,
    hasTraining,
    hasNoExpiredCerts,
    hasSops,
    hasWorkerRoster,
    hasActionItemsTracked,
    noOpenHighPriority,
    hasManagementReview,
  ];

  const score = checks.reduce(
    (total, passed, index) => total + (passed ? HEALTH_CHECKS[index].points : 0),
    0,
  );

  return {
    score,
    total: 100,
    checks: HEALTH_CHECKS.map((check, index) => ({
      key: check.key,
      points: check.points,
      passed: checks[index],
    })),
  };
}
