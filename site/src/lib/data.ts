// The registry export (python -m validator export) and small helpers for links and thresholds.
import raw from "../data/registry.json";

const data: any = raw;
export default data;

const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/** Site-internal link, with the deploy base and a trailing slash. */
export function href(path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return base + (clean && !clean.endsWith("/") && !clean.includes("#") ? clean + "/" : clean);
}

/** The repository file at the commit the site was built from. */
export function source(file: string): string {
  return `${data.repository}/blob/${data.commit ?? "main"}/${file}`;
}

export function tree(dir: string): string {
  return `${data.repository}/tree/${data.commit ?? "main"}/${dir}`;
}

export function marketNumber(market: string): number {
  return parseInt(market.split("-")[1], 10);
}

export function versionPath(market: string, version: number): string {
  return `markets/${market}/v${version}/`;
}

/** "at least 50", "at most 0.10", "= true" */
export function threshold(item: any): string {
  if ("equals" in item) return `= ${item.equals}`;
  const parts: string[] = [];
  if ("min" in item) parts.push(`at least ${item.min}`);
  if ("max" in item) parts.push(`at most ${item.max}`);
  return parts.join(" and ");
}

export function humanize(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

export function sketchesFor(market: string): any[] {
  return data.sketches.filter((s: any) => s.market === market);
}

export type OutcomeDisplay = { label: string; className: string; fileReason?: string };

/** Human label for a market outcome file before/after the filing window closes. */
export function displayMarketOutcome(outcome: any): OutcomeDisplay {
  if (!outcome?.outcome) return { label: "–", className: "" };
  const raw = outcome.outcome as string;
  const reason = outcome.reason as string | undefined;
  if (raw === "OTHER" && reason === "no-qualifying-attempt" && outcome.windowCloses) {
    const closes = Date.parse(`${outcome.windowCloses}T23:59:59Z`);
    if (!Number.isNaN(closes) && Date.now() < closes) {
      return { label: "Open", className: "OPEN", fileReason: reason };
    }
  }
  return { label: raw, className: raw, fileReason: reason };
}
