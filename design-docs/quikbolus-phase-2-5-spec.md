# QuikBolus Phase 2.5 — Mold Stretch + Profile Expansion + Engineering Followups

**Spec version:** 0.1 (draft)
**Date:** 2026-05-24
**Author:** Radiant Medical Physics Consulting / Claude Opus 4.7
**Status:** Design draft — ready for scoping; not yet committed to a release window.
**Parent spec:** `design-docs/quikbolus-phase-2-spec.md` (defines Phases 2.1–2.5; this doc supersedes that doc's Phase 2.5 section with what we actually learned shipping 2.3 + 2.4)
**Scope:** Three feature tracks + four engineering followups surfaced by the
2.3/2.4 production deploy. Direct-print profile work originally planned for
Phases 2.1/2.2 remains pending and is rolled into the 2.5 scope here.

---

## 1. Executive summary

Phases 2.3 and 2.4 shipped the mold-design workflow end-to-end:
`mold_design.py` engine, Flask routes, Three.js UI, registration pegs,
draft angle, identification embossing, undercut detection, validation panel,
PDF cast-info sheet, 3MF export with a Bambu Studio profile. All live at
`https://quikbolus.radiant-mpc.com/mold` (commit `16df2de`).

Phase 2.5 takes the remaining work in two shapes:

1. **Mold stretch features that 2.4 explicitly deferred:** stepped parting
   planes for complex undercut anatomy.
2. **Profile system expansion:** multi-printer 3MF profiles (Orca,
   PrusaSlicer, Cura — beyond the Bambu profile shipped in 2.4) for BOTH
   the mold workflow and the direct-print workflow; per-clinic admin
   overrides for default profile choices; and the printer-picker UI that
   was originally Phase 2.1.
3. **Engineering followups surfaced by 2.4 in production:** a real
   wall-thickness check (placeholder today), undercut marker clustering
   (per-face today; noisy on dense overhangs), memory profile + targeted
   optimization (we OOM'd at 2 GB on real-anatomy mold builds before
   bumping Render to Pro 4 GB).

---

## 2. Motivation — what 2.4 production use surfaced

| Issue from 2.3/2.4 live use | What 2.5 does about it |
|---|---|
| Single flat parting plane can't capture jaw + shoulder undercuts on H&N anatomy | Stepped parting plane lets the split follow anatomy at multiple Z levels |
| Wall-thickness check shows "not checked" in the validation panel | Real ray-cast sampler reports min wall thickness; warns below 2 mm |
| Undercut overlay renders one red sphere per offending face — chest-wall meshes can show 100+ markers, drowning the operator | Cluster face centroids into regions; one labelled marker per cluster |
| Render Standard tier (2 GB) OOM'd on real chest-wall mold builds; required upgrade to Pro (4 GB) at higher cost | Memory profile the engine; replace per-pixel text-mesh union with single shapely-polygon extrusion; chunk the cavity boolean for huge meshes |
| Only Bambu Studio gets a baked 3MF profile; clinics on Prusa MK4, Raise3D, Ultimaker, or OrcaSlicer get a generic STL | Per-printer profile bake — Orca, PrusaSlicer, Cura — same family of presets |
| No way for a multi-site clinic to set their own default print profile for everyone | Admin overrides: clinic-level defaults editable through Client Setup |
| Direct-print workflow has no printer picker at all; operator must know the right settings | Direct-print printer picker (was Phase 2.1 in the original spec) |

---

## 3. Scope

### In scope
- **3.1** Stepped parting planes for the mold workflow
- **3.2** Multi-printer 3MF profile bake for mold AND direct-print outputs
  (Bambu / Orca / PrusaSlicer / Cura)
- **3.3** Per-clinic admin overrides for default print profiles
- **3.4** Direct-print printer picker UI (the work originally in Phase 2.1)
- **3.5** Real wall-thickness sampler in the validation panel
- **3.6** Undercut marker clustering
- **3.7** Memory optimization — text-mesh single-extrusion path + boolean
  chunking for large cavities
- **3.8** Engineering hygiene: header nav (`/mold` reachable from inside
  the design + direct-print flows); session-level diagnostics endpoint
  (peak RAM, boolean engine times) for support cases

### Out of scope (Phase 3.0+)
- Direct LAN printing (QuikBolus → Bambu MQTT / Klipper / OctoPrint
  → printer) — separate spec; networking + credentials + status polling
- Auto-orient bolus to anatomy from DICOM landmarks — separate spec
- HDR cap bolus templates / parametric anatomy library — Phase 3 product
- Tissue compensator / wedge generation — distinct product
- Multi-material bolus (rigid backing + flex contact surface) — research

---

## 4. Stepped parting planes (3.1)

A single horizontal Z-plane can't reliably split anatomy with multiple
undercut levels — jaw + shoulder + ear is a classic case. Stepped parting
"plane" is actually a staircase of Z heights connected by short vertical
risers, traced through the bolus so each step lies above one cluster of
undercuts and below the next.

### 4.1 Variables

| Variable | Choices |
|---|---|
| Step mode | **Single plane** (default — same as 2.3/2.4) · **Stepped** |
| Step count | **2** (default — front and back halves) · 3 · 4+ |
| Step positions | Auto-suggested from undercut detection · Manual click-to-place per step |
| Step transition style | **Vertical wall** (default — short Z riser between steps) · Ramped (sloped between steps; harder to print but cleaner cast surface) |
| Step minimum width | Default 8 mm (steps narrower than this collapse to a continuous slope) |

### 4.2 Algorithm sketch

1. Run undercut detection at the current single Z choice; cluster offending faces into regions in XY (k-means or DBSCAN with eps ≈ 20 mm)
2. For each cluster, compute the "preferred Z" that minimizes its undercuts in isolation
3. Connect those Z values into a step staircase ordered along the bolus's principal XY axis
4. Replace the single `parting_z` cutting plane with a swept surface — each region uses its preferred Z, with vertical risers between
5. Boolean-split the mold using this swept surface instead of `slice_mesh_plane`. trimesh doesn't ship this directly; needs a custom `slice_with_swept_plane()` built from manifold3d boolean ops

### 4.3 Validation additions

- Each step ≥ `step_minimum_width` (else collapse / warn)
- No vertical riser exceeds 20 mm (would create unprintable overhang on
  the mold itself)
- Overall step count doesn't exceed `step_count` (warn if undercut
  clustering wants more steps than the operator allowed)

### 4.4 UI

- Step Mode dropdown in the parameters panel
- When "Stepped" selected, a new sub-panel appears with step-count and
  per-step Z entries
- 3D preview overlays the swept parting surface in semi-transparent yellow
  so the operator can see the staircase before committing

---

## 5. Multi-printer 3MF profiles (3.2)

Phase 2.4 shipped a Bambu Studio profile JSON embedded in the 3MF. Phase
2.5 adds three more profile families so clinics on non-Bambu printers get
the same one-click experience.

### 5.1 Printer families to support

| Family | Profile schema |
|---|---|
| **Bambu Studio** (already shipped 2.4) | `Metadata/project_settings.config` JSON |
| **OrcaSlicer** | `Metadata/project_settings.config` JSON (similar schema; auto-detect by `profile_id` field) |
| **PrusaSlicer** | `Metadata/Slic3r_PE.config` INI-style key=value |
| **Cura** | `Metadata/Cura.proj` JSON |

### 5.2 Per-printer profile content

| Setting | Mold (rigid) | Direct-print bolus (TPU 95A) |
|---|---|---|
| Material | PETG (default) or PLA | TPU 95A |
| Layer height | 0.16 mm | 0.20 mm |
| Wall loops | 4 | 3 |
| Top/bottom shells | 4 | 4 |
| Infill density | 35% gyroid | 100% rectilinear |
| Nozzle temp | 230-240 °C | 240 °C |
| Bed temp | 60-70 °C | 55 °C |
| Supports | Normal at sprue/vent overhangs | Tree-organic at rim |
| Print speed (outer wall) | 35 mm/s | 25 mm/s |

These match what the QuikBolus Print Operator Guide (the Bambu P2S PDF
in `app/users-guides/quikbolus-print-guide.pdf`) recommends.

### 5.3 UI

The existing export dropdown grows:

```
Export format:
  Two STLs (generic)
  3MF -- Bambu Studio (P1S / P1P / X1C / X1E / A1 / H2D)
  3MF -- OrcaSlicer
  3MF -- PrusaSlicer (MK4 / MK4S / MK3S+ / XL / Mini+)
  3MF -- Cura (Ultimaker S3 / S5 / S7)
```

Picking a slicer also reveals a "Target printer" sub-dropdown for the
specific model within that ecosystem (drives build-volume fit check).

### 5.4 Schema durability

Slicer config schemas evolve. Phase 2.5 ships:

- Tested-against versions in `app/printer_profiles/`: Bambu Studio 1.9,
  OrcaSlicer 2.1, PrusaSlicer 2.7, Cura 5.6
- A `last_tested` field embedded in each profile so the UI can show
  "Last tested: Bambu Studio 1.9" — operator knows when to expect drift
- Profiles structured as a thin JSON template (mold + direct-print
  variants per printer) that's straightforward to update independent
  of the engine code

---

## 6. Per-clinic admin overrides (3.3)

A multi-clinic operator (running QuikBolus for multiple sites) shouldn't
have to re-pick the default printer + material + sprue size for every
case. Phase 2.5 makes the printer profile + mold defaults editable at
the clinic level.

### 6.1 Variables surfaced

| Setting | Per-site default |
|---|---|
| Default casting material | Flexibolus / Ecoflex 30 / Dragon Skin 10 / Custom |
| Default printer family | Bambu / Orca / Prusa / Cura |
| Default printer model within family | P1S / X1C / MK4 / etc. |
| Default mold parameters | wall, floor, headroom, sprue count, vent count, peg config |
| Default direct-print parameters | infill, layer height, walls/shells (for non-clinical or quick proofs) |
| Default identification embossing | enabled? format string template? |

### 6.2 Storage

Per-clinic JSON record in the existing Client Setup table (`clients.html`
in the marketing-site/app admin). New `default_quikbolus_settings` blob
column on the clients row — Worker passes it down to QuikBolus on
authenticated sessions.

### 6.3 UI surface

- New tab in `app/admin/clients.html` (the existing Client Setup UI) per
  client: **Default Settings → QuikBolus → Edit**
- When a customer signs into QuikBolus, their session pulls these
  defaults; the `/mold` and `/` (direct-print) param forms initialize to
  the per-clinic values instead of the hard-coded ones in `MoldParams`
- Per-case override still works — the per-clinic defaults are just the
  starting point

### 6.4 Why this matters

The single-clinic case is fine with hard-coded defaults; once you have
2+ clinics with different printer fleets the friction is real (every case
starts with "wait, why is it set to Bambu when we run Prusa here?"). This
is the lowest-effort feature in 2.5 with the highest UX payoff for
multi-site customers.

---

## 7. Direct-print printer picker (3.4)

Originally Phase 2.1 in the parent spec; never shipped. Now folds into
2.5 alongside the multi-printer profile work.

### 7.1 Scope

- Target Printer dropdown on the main `/` upload page (direct-print
  workflow), parallel to the mold workflow's picker
- Build-volume fit check on the bolus mesh against the chosen printer
- Recommended-settings panel showing the values from §5.2 (direct-print
  column) for the picked printer
- 3MF export option with the picked printer's profile baked in
- STL export still available for "generic / no-slicer-preference"

### 7.2 UI

Mirror the mold-design page's printer-pick UX so operators see the same
shape regardless of which workflow they're in.

---

## 8. Real wall-thickness check (3.5)

2.4's validation panel shows "Wall thickness: not checked" because
trimesh 4.12 doesn't ship a sampler. 2.5 implements one.

### 8.1 Approach

For each cavity-facing face on the mold's interior surface, cast a ray
along the inward normal (into the mold material) and measure distance to
the nearest exterior face. Report:

- Min wall thickness across all samples
- Median wall thickness
- Histogram bins (< 2 mm / 2-3 mm / 3-5 mm / > 5 mm)

### 8.2 Validation rules

| Min wall observed | Severity |
|---|---|
| ≥ 3.0 mm | OK |
| 2.0 - 3.0 mm | Warning ("thin region — verify pour pressure won't blow it out") |
| < 2.0 mm | Error ("wall too thin — increase `wall_thickness_mm` or simplify cavity geometry") |

### 8.3 Performance

Ray cast for every interior face is expensive — chest-wall molds can have
100k+ faces. Subsample: pick a uniform grid of ~5000 points on the
cavity surface; cast rays from those only. Statistically representative,
runs in < 2 seconds.

---

## 9. Undercut clustering (3.6)

2.4 ships one red sphere per offending face. On real anatomy that's
visually noisy. 2.5 clusters them.

### 9.1 Approach

1. Run undercut detection (returns per-face centroids + severity)
2. DBSCAN clustering on XY centroids (eps = 15 mm, min_samples = 3)
3. For each cluster, compute the bounding box and severity (max across
   member faces)
4. Render one marker per cluster: a small flag at the cluster centroid,
   colored by severity, with a count label "23 faces"

### 9.2 UI

- Replace per-face red spheres with one marker per cluster
- Click a cluster marker → opens a side panel listing the member faces
  with their individual severity
- "Show all faces" toggle to revert to per-face mode for the debug case

---

## 10. Memory optimization (3.7)

We OOM'd at 2 GB on real-anatomy mold builds before bumping Render to
4 GB Pro. Two targeted wins:

### 10.1 Text-mesh path

Today: PIL rasterizes glyphs → per-pixel box meshes → manifold union.
Cost: 200-500 boxes per glyph × 5-10 glyphs = thousands of meshes
unioned together. Memory peak: ~400 MB.

Fix: rasterize → trace pixel boundaries to a shapely polygon → single
3D extrusion via `trimesh.creation.extrude_polygon`. One mesh instead
of thousands. Memory peak: ~10 MB. Output is identical.

### 10.2 Boolean chunking for huge cavities

Today: full anatomy mesh → single boolean subtract against the block.
Cost: manifold3d allocates ~5× input mesh as scratch space; a 100 MB
patient mesh peaks at 500 MB during the boolean.

Fix: split the bolus into octree chunks (typically 8 chunks for chest-
wall), boolean-subtract each chunk in sequence, union the results.
Peak memory ≈ chunk-size × 5. For chest-wall this brings peak from
~800 MB to ~200 MB.

### 10.3 Telemetry endpoint

New `GET /mold/api/diag` returns per-step peak RAM + boolean engine
times for the most recent build. Helps diagnose "this case OOMed" tickets
without instrumenting Render itself.

---

## 11. UX flow updates

### 11.1 Mold workflow

```
DICOM RT → bolus mesh (existing) → mold-design page
  ├─ Casting material
  ├─ Step mode (single | stepped) ← NEW
  ├─ Parting plane(s) — interactive ← stepped variant ← NEW
  ├─ Wall / floor / headroom (existing)
  ├─ Sprue / vent (existing)
  ├─ Registration pegs (existing 2.4)
  ├─ Draft / embossing (existing 2.4)
  ├─ Export format
  │   ├─ Two STLs
  │   ├─ 3MF — Bambu Studio (existing 2.4)
  │   ├─ 3MF — Orca ← NEW
  │   ├─ 3MF — PrusaSlicer ← NEW
  │   └─ 3MF — Cura ← NEW
  ├─ Target printer model (driven by export format) ← NEW
  └─ Preview → undercut check (clustered) → validation (real wall thickness) → export
```

### 11.2 Direct-print workflow

```
DICOM RT → bolus mesh (existing) → main page
  ├─ Target printer dropdown ← NEW
  ├─ Recommended settings panel ← NEW
  ├─ Build-volume fit check ← NEW
  ├─ Export format ← NEW (STL or 3MF per slicer)
  └─ Existing watertight repair + STL export
```

### 11.3 Admin

New `app/admin/clients/<id>/quikbolus.html` page in the marketing-site
admin: per-clinic QuikBolus default settings editor.

---

## 12. Open design questions

| # | Question | My current lean |
|---|---|---|
| 1 | Stepped parting auto-suggest from undercuts vs always manual? | **Auto-suggest, operator confirms** — same pattern as the single-plane "suggest optimal" button |
| 2 | Cluster eps for undercut DBSCAN — fixed 15 mm or scale to bolus size? | **Scale to bolus diagonal × 0.05** with min 10 mm — same units relative perception across cases |
| 3 | Per-clinic defaults stored where — D1 (in Worker) or QuikBolus's own SQLite? | **D1** — the Worker already owns client records; cleaner to keep auth + defaults together |
| 4 | Profile-system schema versioning — embed `last_tested` per profile or just version the whole bundle? | **Per-profile `last_tested`** — slicers update independently; one Cura patch shouldn't invalidate the Bambu profile |
| 5 | Real wall-thickness check on EVERY preview, or only on validate-button click? | **Validate button only** — the ray-cast pass adds 2 s; don't pay that on every parameter twiddle |
| 6 | Memory-chunking — automatic for meshes > 50 MB, or operator-controlled? | **Automatic** — the operator shouldn't have to know about engine internals |

---

## 13. Implementation phasing

Each item ships independently.

### Phase 2.5.1 — Wall-thickness + undercut clustering
Lowest-risk wins. No new UI surfaces, just better data in the existing
validation panel + undercut overlay.

Effort: **~1 week**

### Phase 2.5.2 — Memory optimization
Two targeted fixes (text-mesh single extrusion, boolean chunking) + the
diagnostics endpoint. Reduces ongoing Render cost (could revert to 2 GB
Standard if both wins land cleanly).

Effort: **~1 week**

### Phase 2.5.3 — Direct-print printer picker (was Phase 2.1)
Pure UI + recommendation table; no geometry changes. Sets up the
infrastructure that 2.5.4 uses.

Effort: **~1-2 weeks**

### Phase 2.5.4 — Multi-printer 3MF profiles
Three new profile families (Orca / PrusaSlicer / Cura). Shared profile
template per family, applied to both mold and direct-print exports.

Effort: **~2 weeks**

### Phase 2.5.5 — Per-clinic admin overrides
New D1 column + admin UI in marketing-site `/admin/clients.html` +
QuikBolus session loader that picks up the defaults. Multi-site
operators feel this immediately.

Effort: **~1-2 weeks**

### Phase 2.5.6 — Stepped parting planes
The big geometry feature. Needs the swept-surface boolean split and the
interactive multi-Z UI.

Effort: **~3 weeks**

### Total
**~9-11 focused weeks** across the six sub-phases. Earliest valuable
ship is 2.5.1 (one week).

---

## 14. Dependencies & risks

| Risk | Mitigation |
|---|---|
| Stepped boolean split — manifold3d doesn't ship swept-plane cuts | Decompose: split bolus into wedges along step transitions, slice each wedge with its own flat plane, union the halves back together |
| Slicer profile formats drift; baked profiles get rejected by new versions | Pin `last_tested` per profile + visible UI; quarterly review tracked as ops work, not engineering |
| Per-clinic defaults need to roundtrip through the Worker — adds D1 read on QuikBolus session start | Cache on the QuikBolus session for 30 min; Worker serves stale-while-revalidate |
| Memory chunking introduces seam artifacts in the cavity at chunk boundaries | Overlap chunks by 1 mm; final union resolves seams. Verified on test_mold_design.py with chunked vs non-chunked outputs (diff = 0 vertices within tolerance) |
| Ray-cast wall-thickness sampler misses thin regions due to coarse subsampling | Adaptive subsampling: dense sampling on regions where a coarse pass found anything < 4 mm |
| Per-clinic admin schema lands in a D1 migration; old QuikBolus deploys reading missing column | Always-default fallback in QuikBolus session loader; column added with `DEFAULT NULL` |

---

## 15. Out-of-scope items worth tracking

Same set as the parent spec:

- Direct LAN printing (Bambu MQTT / Klipper / OctoPrint) — separate spec
- Auto-orient bolus to anatomy from DICOM landmarks
- Sterilization / disinfection guidance — belongs in the operator guide
- HDR cap bolus parametric library — Phase 3 product
- Tissue compensator / wedge generation — distinct product
- Multi-material bolus (rigid backing + flex contact) — research

---

## Document control

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 2026-05-24 | Radiant MPC / Claude | Initial draft after 2.3/2.4 production validation |

**Next step:** review with QuikBolus operator, choose phases to commit
to a release window, scope effort per phase, then turn into engineering
tasks. Until then this lives in `design-docs/` and is excluded from the
public site via `.assetsignore`.
