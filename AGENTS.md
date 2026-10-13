# Agent guide: sketch → freeze → attempt

Instructions for an agent helping a researcher contribute to the [ai-safety-claims](https://github.com/aintelope/ai-safety-claims) registry. Command details live in [README.md](README.md), [sketches/README.md](sketches/README.md), and the [workbench README](https://github.com/aintelope/ai-safety-claims-workbench).

A **sketch** is a successful contribution. It does not resolve a research question. A **bar preview** is not YES or NO.

Work in **small steps**. Stop after each step and report to the researcher before continuing.

## Steps

### 1. Idea only (URL or description)

- Name the closest frozen market (1–18 in the catalog), or say none fit.
- Do **not** run `workbench new`, `validator new`, or freeze anything yet.
- If none fit, offer a [registry issue](https://github.com/aintelope/ai-safety-claims/issues/new/choose) — proposing a new contract is optional and larger than filing against an existing question.

### 2. Pilot sketch

- Pick the market the researcher agrees on.
- **Smallest run** that produces a dry-run report. A handful of episodes or cases is enough.
- Do **not** target sample-size floors or red-team budgets in this step.
- **Markets 1, 4, 8, 11, 12:** workbench scaffolds exist (Inspect for 1 and 4; custom for 8, 11, 12): `workbench new`, `freeze`, `run`, `export`.
- **Other catalog markets:** `workbench new --market market-NN --type custom`, or `python -m validator new` in the registry when the researcher already has results to file.

### 3. Freeze before results

- **Workbench:** `workbench freeze <id> --commit`, push tag `freeze/<id>` before any run that scores cases.
- **Registry-only:** commit `freeze.yaml` and `freeze-cases.jsonl` before adding `trials.jsonl` or a score table.

### 4. Run, export, dry-run, interpret

- Export to `sketches/<id>/` and run `python -m validator dry-run sketches/<id>`.
- **Do not** `submit` unless the researcher explicitly asks and machine checks pass.

## Read the dry run for the researcher

| Section | Meaning for the researcher |
|--------|----------------------------|
| **Fix before submitting** | Not a valid record yet. Give the first blocking item and one concrete fix. |
| **Missing for a qualifying attempt** | Separate **what the run already contains** (coverage, evidence lines) from **floors still missed**. Missing a floor = does not qualify. Not a method failure. Not NO. |
| **Bar preview** | Whether rates would meet or miss bars **if** the attempt qualified. Does not move the market. |
| **Maintainer checks** | Human calls after submission. The agent cannot satisfy these. |
| **Completeness %** (on the site) | Share of machine checks met. 100% ≠ YES on the question. |

After each step, tell the researcher:

1. Which contract this informs and why.
2. What the run already covers.
3. One next feasible step.
4. What it does **not** establish.

## Submitting an attempt

Only when the researcher asks, blocking items are zero, and qualification machine checks pass:

```bash
python -m validator submit sketches/<id>
```

Use `--allow-not-qualifying` only when they want a published miss on record.

Never write `qualifying`, `barsMet`, `outcome`, or `reason` in submitted files.

While `registry.yaml` has `resolutionSource: false`, do **not** file attempts submitted or authored by aintelope or Gunnar Zarncke ([GOVERNANCE.md](GOVERNANCE.md)). Sketches from those authors may still be merged for gap analysis.

Do not propose a new contract unless none of the seventeen catalog questions fit and the researcher asks for one.
