import { getRepoFile } from "@/lib/github";

export type Hazard = {
  id: string;
  date: string;
  type: string;
  description: string;
  location?: string;
  severity?: string;
  controls?: string[];
  status?: string;
};

export type TrainingRow = {
  worker_id: string;
  name: string;
  certifications?: Array<{
    name: string;
    issued?: string;
    expires?: string;
    status?: string;
  }>;
};

export type ActionItem = {
  id: string;
  source?: string;
  description: string;
  assigned_to?: string;
  due_date?: string;
  priority?: "high" | "medium" | "low";
  status?: "open" | "closed";
  age_days?: number;
};

function parseJsonArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function readHazards() {
  return parseJsonArray<Hazard>(await getRepoFile("hazard-register.json"));
}

export async function readTrainingMatrix() {
  return parseJsonArray<TrainingRow>(await getRepoFile("training-matrix.json"));
}

export async function readActionItems() {
  return parseJsonArray<ActionItem>(await getRepoFile("action-items.json"));
}

export async function readWorkers() {
  return parseJsonArray<Record<string, unknown>>(await getRepoFile("workers.json"));
}
