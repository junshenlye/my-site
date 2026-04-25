/**
 * lib/github.ts
 *
 * Server-only. Fetches contribution data from the GitHub GraphQL API.
 * Reads GITHUB_TOKEN and GITHUB_USERNAME from environment variables.
 *
 * Returns an empty array if the token is missing or the request fails —
 * GitHubGraph falls back to seed-based rendering automatically.
 */

const GH_API = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export type ContributionData = {
  /** Raw contribution count per day, oldest → newest */
  days: number[];
  /** Total contributions in the period */
  total: number;
};

/**
 * Fetches the past `weeks` weeks of contribution data for the configured user.
 * Cached by Next.js for 1 hour (revalidate: 3600).
 *
 * Returns null if GITHUB_TOKEN is not set or the request fails.
 */
export async function getContributions(weeks: number = 32): Promise<ContributionData | null> {
  const token    = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "junshenlye";

  if (!token) {
    console.warn("[github] GITHUB_TOKEN not set — falling back to placeholder graph");
    return null;
  }

  const to   = new Date();
  const from = new Date();
  from.setDate(from.getDate() - weeks * 7);

  let res: Response;
  try {
    res = await fetch(GH_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username,
          from: from.toISOString(),
          to:   to.toISOString(),
        },
      }),
      // ISR: revalidate every hour so the graph stays reasonably fresh
      next: { revalidate: 3600 },
    });
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return null;
  }

  if (!res.ok) {
    console.error("[github] API error:", res.status, await res.text());
    return null;
  }

  const json = await res.json();

  if (json.errors) {
    console.error("[github] GraphQL errors:", JSON.stringify(json.errors));
    return null;
  }

  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    console.error("[github] Unexpected response shape:", JSON.stringify(json));
    return null;
  }

  const days: number[] = (calendar.weeks as { contributionDays: { contributionCount: number }[] }[])
    .flatMap((w) => w.contributionDays.map((d) => d.contributionCount));

  return {
    days,
    total: calendar.totalContributions as number,
  };
}
