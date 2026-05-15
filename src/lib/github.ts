type GithubFileResponse = {
  content: string;
  encoding: string;
};

type GithubDirectoryEntry = {
  name: string;
  path: string;
  sha: string;
  type: "file" | "dir";
  size: number;
  download_url: string | null;
};

function getRepoCoordinates() {
  const owner = process.env.GITHUB_REPO_OWNER;
  const name = process.env.GITHUB_REPO_NAME;
  const combined = process.env.GITHUB_REPO;

  if (owner && name) {
    return { owner, name };
  }

  if (combined && combined.includes("/")) {
    const [combinedOwner, combinedName] = combined.split("/");
    if (combinedOwner && combinedName) {
      return { owner: combinedOwner, name: combinedName };
    }
  }

  return null;
}

function buildHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch(path: string) {
  const repo = getRepoCoordinates();
  if (!repo) return null;

  const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${path}`;
  const response = await fetch(url, {
    headers: buildHeaders(),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return null;
  }

  return response;
}

export async function getRepoFile(path: string) {
  const response = await githubFetch(path);
  if (!response) return null;

  const payload = (await response.json()) as GithubFileResponse;
  if (payload.encoding !== "base64" || !payload.content) return null;
  return Buffer.from(payload.content, "base64").toString("utf-8");
}

export async function getRepoDirectory(path: string) {
  const response = await githubFetch(path);
  if (!response) return [];
  const payload = (await response.json()) as GithubDirectoryEntry[];
  return Array.isArray(payload) ? payload : [];
}

export async function getRepoLastSync() {
  const repo = getRepoCoordinates();
  if (!repo) return null;

  const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/commits?per_page=1`;
  const response = await fetch(url, {
    headers: buildHeaders(),
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as Array<{
    commit?: { author?: { date?: string } };
  }>;
  return payload[0]?.commit?.author?.date ?? null;
}
