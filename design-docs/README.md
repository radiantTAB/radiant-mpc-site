# `design-docs/` — internal design specs

Living drafts of future-feature designs for the Radiant suite. Not customer-
facing. Excluded from the deployed site via `.assetsignore` so nothing in
here is served at `radiant-mpc.com/design-docs/...` even though it's in the
public Git repo for convenience.

| File | Status | Description |
|---|---|---|
| `business-expansion-proposal.md` (+ `.pdf`) | Draft v0.1 | Suite-wide productization, distribution, and storage strategy (covers all app.radiant-mpc.com modules) |
| `pricing-and-roi-2027.md` (+ `.pdf`) | Draft v0.1 | Recommended pricing structure per module + 3-year revenue / cost / profit projections starting Jan 2027 |
| `quikbolus-phase-2-spec.md` (+ `.pdf`) | Phases 2.3 + 2.4 **shipped** | Mold-design workflow + per-printer profile system for QuikBolus. Phase 2.5 work tracked in the next entry. |
| `quikbolus-phase-2-5-spec.md` (+ `.pdf`) | Draft v0.1 | Stepped parting planes, multi-printer 3MF profiles (Orca / Prusa / Cura), per-clinic admin overrides, direct-print printer picker, wall-thickness sampler, undercut clustering, memory optimization |

Each spec is paired: the markdown file is the source of truth; the PDF is a
rendered, printable companion (built via `C:\demo_videos\users_guides\build_*.py`).
Edit the `.md`, re-run the matching build script to refresh the `.pdf`.

When a spec is committed to a release, move it into the relevant product's
repo (e.g. `C:\Radiant_QuikBolus\docs\`) and replace the entry here with a
pointer.
