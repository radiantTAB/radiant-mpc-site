# Radiant Suite — Pricing Structure & ROI Projections

**Subject:** Recommended pricing model for the Quik suite and 3-year revenue / profit projection
**Effective date assumed:** January 1, 2027
**Scope:** All 15 modules surfaced at `app.radiant-mpc.com` plus the optional Cloud Storage add-on described in `business-expansion-proposal.md`
**Status:** Draft v0.1
**Author:** Radiant Medical Physics Consulting LLC
**Date:** 2026-05-24

---

## 1. Executive summary

Radiant should adopt a **mixed pricing model** rather than a single dimension, because the modules deliver value along three different axes:

- Some scale with **linacs/treatment machines** (QA, machine logging).
- Some scale with **physicists using them** (calculators, scripting, reference tools).
- Some are **per-site infrastructure** that everyone at a facility shares (bolus, shielding, RAM tracking, file transfer).

Forcing all 15 modules into one pricing dimension (e.g., "per user across the board") would either undercharge multi-linac shops (where QuikQA delivers compounding value per machine) or overcharge solo practices (where QuikRef being priced per machine makes no sense). A mixed model maps price to value and is standard practice in the clinical-physics software market.

**Headline numbers — Base scenario, conservative assumptions:**

| Year | Revenue | Operating costs | Net profit | Margin |
|---|---|---|---|---|
| 2027 | $221K | $27K | $194K | 88% |
| 2028 | $540K | $80K | $460K | 85% |
| 2029 | $980K | $130K | $850K | 87% |
| **3-yr total** | **$1.74M** | **$237K** | **$1.50M** | **86%** |

Break-even on annual operating costs is reached at ~2 paying customers, achievable within 90 days of January 2027 launch. The margin profile is characteristic of founder-led vertical SaaS sold into a niche the founder knows intimately — extremely high gross margin, modest fixed costs, the constraint is sales velocity not unit economics.

---

## 2. Pricing philosophy

Three principles, in priority order:

1. **Price each module on the dimension that actually drives value for the buyer.** A 4-linac shop gets 4× the value from QuikQA as a 1-linac shop, so QuikQA is priced per linac. A 4-linac shop with 3 physicists gets ~3× the value from QuikCalc, not 4×, so QuikCalc is priced per user. Misaligning the dimension forces awkward sales conversations and leaves money on the table.
2. **Anchor 40–60% below incumbent quotes.** The competitive set (PIPSpro, RIT, Doselab Pro, SunCheck) prices QA modules in the $5K–$15K/machine/year range. Radiant should enter at the low end of that range to win switching deals on price, then expand wallet share via the suite breadth advantage. As a solo-founder business with very low fixed costs, Radiant can sustain margins at prices that would be loss-leaders for the incumbents.
3. **Annual subscription, not perpetual.** The clinical software market has largely transitioned from perpetual + maintenance to annual subscriptions. Subscriptions give Radiant predictable cash flow, an annual touchpoint for relationship maintenance, and immediate revenue recognition. Perpetual licenses are increasingly perceived as a buyer's-market relic and weaken negotiating leverage.

A fourth principle is operational: **don't publish detailed price lists on the public site.** Publish *starting at* prices on the marketing site, gate the full price list behind a quote inquiry. This (a) keeps competitors from undercutting on specific SKUs, (b) creates a sales touchpoint that drives conversion, and (c) preserves room for archetype-specific bundling.

---

## 3. Pricing dimension by module

The 15 modules cleanly group into four pricing categories. Each module's dimension is chosen by asking: *what real-world quantity, in this customer's facility, most strongly correlates with the value the module delivers?*

### 3.1 Clinical / per-linac (machine-scaling)

The value of these modules grows in direct proportion to the number of treatment machines being maintained. A 6-linac center has 6× the QA workload of a 1-linac center; pricing should reflect that.

| Module | Why per-linac |
|---|---|
| QuikQA | Daily/monthly/annual QA is performed per machine. Workload is linear in linac count. |
| QuikLog | Machine event logs are kept per machine. |

### 3.2 Clinical / per-physicist user (user-scaling)

These are professional tools each physicist uses individually. A 2-physicist practice and a 4-physicist practice get proportionally different value.

| Module | Why per-user |
|---|---|
| QuikCalc | Dose/MU calculator — used by each physicist for their own cases. |
| QuikDose | Dose calculation tool — same logic. |
| QuikScript | Eclipse / TPS scripting — each physicist has their own scripts. |
| QuikRef | Reference data lookup — individual use. |

### 3.3 Clinical / per-site flat (facility-scaling)

These tools deliver site-wide value that doesn't meaningfully scale with linac count or user count. A practice either needs shielding calculations done or it doesn't; charging per linac would be arbitrary.

| Module | Why flat-per-site |
|---|---|
| QuikBolus | Bolus design — used per-patient-need, not per-machine. |
| QuikShield | Shielding design — facility-level activity. |
| QuikRAM | Radioactive Material accounting — one facility license. |
| QuikCare | Patient care workflow — facility-level workflow tool. |
| QuikShare | File transfer — facility-level utility. |

### 3.4 Business / per-practice (operations, non-clinical)

These modules support the practice's own back-office and are likely sold to a different buyer (practice administrator) than the clinical modules (chief physicist).

| Module | Pricing dimension | Why |
|---|---|---|
| QuikPay | per practice | One billing setup per legal entity. |
| QuikXpense | per user | Each employee tracks their own expenses. |
| QuikFlow | per user | Workflow tool used individually. |
| QuikBusiness | per practice | Practice management is a singleton. |

---

## 4. Module pricing table

All prices are **annual subscription, USD, list**, and include software updates plus standard email support during business hours. Prices are designed to anchor Radiant clearly below market-leading incumbents while remaining defensible against future commoditization attempts.

| Module | Dimension | List price | Notes |
|---|---|---|---|
| **QuikQA** | per linac/yr | **$3,600** | Flagship clinical product. Tiered: 2nd linac at 70% ($2,520), 3rd+ at 50% ($1,800). |
| **QuikLog** | per linac/yr | **$1,200** | Frequently bundled with QuikQA at 50% off when co-purchased. |
| **QuikCalc** | per user/yr | **$1,200** | 5+ users: 20% volume discount on additional seats. |
| **QuikDose** | per user/yr | **$1,800** | 5+ users: 20% volume discount. |
| **QuikScript** | per user/yr | **$900** | TPS scripting tools; lower price reflects narrower audience. |
| **QuikRef** | per user/yr | **$600** | Reference data; priced as a loss-leader to seed suite adoption. |
| **QuikBolus** | per site/yr | **$2,400** | + $300/yr per 3D printer profile (Phase 2 spec). |
| **QuikShield** | per site/yr | **$3,600** | Specialty premium — highly skilled-labor replacement. |
| **QuikRAM** | per site/yr | **$1,800** | Required-by-regulation; sticky once installed. |
| **QuikCare** | per site/yr | **$1,800** | Pricing TBD pending scope clarification. |
| **QuikShare** | per site/yr | **$900** | Utility tool. |
| **QuikPay** | per practice/yr | **$900** | Business / non-clinical. |
| **QuikXpense** | per user/yr | **$600** | Business / non-clinical. |
| **QuikFlow** | per user/yr | **$600** | Business / non-clinical. |
| **QuikBusiness** | per practice/yr | **$1,800** | Business / non-clinical. |

### 4.1 Sanity-check against competitive comps

| Competitor module | Approximate market price | Radiant equivalent | Radiant price | % below market |
|---|---|---|---|---|
| PIPSpro QA Suite | $6,000–$10,000/linac/yr | QuikQA | $3,600 | 40–64% |
| Doselab Pro | $5,000–$8,000/linac/yr | QuikQA | $3,600 | 28–55% |
| SunCheck DoseCHECK | $8,000–$15,000/linac/yr | QuikQA + QuikDose | ~$5,400/linac + 1 user | ~45–65% |
| RIT Complete | $6,000–$12,000/linac/yr | QuikQA | $3,600 | 40–70% |

Radiant's pricing leaves room to (a) win deals on cost, (b) raise prices over time as the suite matures, and (c) sustain healthy margins even at the discount end.

### 4.2 QuikBolus competitive position vs Adaptiiv and .decimal

QuikBolus competes in a different market than the QA modules — bolus design has two distinct incumbents addressing the same clinical need with very different business models. Understanding both is essential to pricing QuikBolus correctly.

#### 4.2.1 The competitive set

**Adaptiiv 3D Bolus** (Adaptiiv Medical Technologies, Halifax, Nova Scotia)
- Software-only product. Customer prints the bolus on their own 3D printer.
- FDA 510(k) cleared as a Class II medical device — a meaningful trust signal for hospital procurement.
- Deep DICOM-RT integration with major TPSs (Eclipse, RayStation, Pinnacle).
- Pricing not publicly published. Industry-typical quote range from physicist conversations: **~$15K–$30K/year per site subscription**, sometimes higher with multi-site or enterprise tiers.
- Strengths: clinical maturity, FDA clearance, established reference customers, TPS integration depth.
- Weaknesses: premium pricing, slower release cadence, limited per-printer customization.

**.decimal (dot decimal)** (Sanford, Florida)
- Custom-device manufacturer. Customer uploads a DICOM-RT structure, .decimal mills/prints the bolus and ships it.
- Per-unit pricing — there is no software subscription; the cost is the device.
- Industry-typical per-bolus price: **~$300–$600 per bolus** depending on size, complexity, and turnaround.
- Turnaround: typically 2–5 business days from upload to delivery.
- Strengths: zero in-house labor, no printer capex, no software learning curve, regulatory compliance handled, quality consistency.
- Weaknesses: per-bolus cost compounds quickly at volume, lead time blocks same-day workflow, customers don't own the IP or the design files for re-prints.

QuikBolus is positioned **between** these two: software-only like Adaptiiv, but at a fraction of the price, targeting the clinic that already owns a 3D printer (or is willing to buy a $3K–$15K printer to amortize over many bolus).

#### 4.2.2 Total cost of ownership comparison

The honest question every prospective customer asks is: *"How does this actually compare to what I'm paying today?"* The math depends on bolus volume per year. Below: fully-loaded annual cost across three case-volume scenarios.

**Assumptions used in the math:**

- QuikBolus list price: $2,400/site/year + $300/printer/year (1 printer assumed).
- Adaptiiv quoted at midpoint: $22,500/site/year (typical mid-range quote).
- .decimal quoted at midpoint: $450/bolus.
- In-house printing cost (materials + 30 min staff time @ $75/hr loaded): ~$50/bolus for both QuikBolus and Adaptiiv workflows.
- One-time printer capex: ~$8,000 (mid-range FDM, e.g., Prusa or Bambu enterprise tier), amortized over 4 years = $2,000/yr. Included only in the "no printer today" scenario.

| Annual bolus volume | QuikBolus (already own printer) | Adaptiiv (already own printer) | .decimal (no printer, no software) |
|---|---|---|---|
| **Low — 10 bolus/yr** | $2,700 + $500 = **$3,200** | $22,500 + $500 = **$23,000** | $450 × 10 = **$4,500** |
| **Medium — 50 bolus/yr** | $2,700 + $2,500 = **$5,200** | $22,500 + $2,500 = **$25,000** | $450 × 50 = **$22,500** |
| **High — 150 bolus/yr** | $2,700 + $7,500 = **$10,200** | $22,500 + $7,500 = **$30,000** | $450 × 150 = **$67,500** |

| Annual bolus volume | QuikBolus (printer capex amortized) | Adaptiiv (printer capex amortized) |
|---|---|---|
| **Low — 10 bolus/yr** | $3,200 + $2,000 = **$5,200** | $23,000 + $2,000 = **$25,000** |
| **Medium — 50 bolus/yr** | $5,200 + $2,000 = **$7,200** | $25,000 + $2,000 = **$27,000** |
| **High — 150 bolus/yr** | $10,200 + $2,000 = **$12,200** | $30,000 + $2,000 = **$32,000** |

#### 4.2.3 Per-bolus unit economics

The same data normalized to per-bolus cost (most procurement teams ultimately reduce the comparison to this):

| Annual volume | QuikBolus + in-house | Adaptiiv + in-house | .decimal |
|---|---|---|---|
| 10 bolus/yr | **$320/bolus** | $2,300/bolus | $450/bolus |
| 50 bolus/yr | **$104/bolus** | $500/bolus | $450/bolus |
| 150 bolus/yr | **$68/bolus** | $200/bolus | $450/bolus |

#### 4.2.4 Break-even and crossover points

The interesting strategic question: at what bolus volume does each option win?

- **vs .decimal:** QuikBolus is cheaper than .decimal at **≥7 bolus/year** (assuming customer already owns a printer). With printer amortization included, the crossover moves to **~11 bolus/year**. Essentially: any clinic that does monthly bolus cases is better off with QuikBolus on pure cost — and gains same-day turnaround on top.
- **vs Adaptiiv:** QuikBolus is cheaper than Adaptiiv at **every volume level** by a factor of ~3× to ~30×. The only reasons to choose Adaptiiv over QuikBolus are (a) FDA clearance is a hard procurement requirement, (b) deeper TPS integration is essential to workflow, or (c) the customer specifically wants the brand credibility of a more established vendor.
- **vs both:** A site doing 50+ bolus/year with a printer already in-house saves **$17K–$23K per year** by choosing QuikBolus over Adaptiiv, and **$17K per year** over .decimal — while gaining same-day workflow and full IP ownership of the designs.

#### 4.2.5 Positioning recommendation

Three distinct customer segments emerge from this analysis, each with a different sales pitch:

| Customer profile | Current state | QuikBolus pitch |
|---|---|---|
| **Light bolus user** (< 10/yr) | Probably ordering from .decimal | "Cheaper than .decimal, same-day turnaround, you keep the design files." |
| **Mid-volume user** (10–50/yr) | Mix of .decimal + occasional in-house | "Roll all your bolus in-house at ~$100/case. Pays for itself in 6 cases." |
| **High-volume user** (50+/yr) | Likely on Adaptiiv or considering it | "Adaptiiv-class workflow at ~1/4 the price. Save $20K+/yr on the software alone." |

The light-bolus segment is the easiest sell (low risk, clear savings). The high-volume segment has the biggest dollar savings but the longest sales cycle (they need to validate against an already-trusted product). Mid-volume is the sweet spot for marketing.

#### 4.2.6 Caveats on this comparison

- **Competitor pricing is not publicly published.** Adaptiiv and .decimal price quote-by-quote. The ranges used above are mid-points from physicist-community conversations; actual quotes for any given customer may be ±30%.
- **FDA clearance is a real differentiator.** Adaptiiv being Class II-cleared is meaningful for hospital procurement at academic centers and large IDNs. QuikBolus is a planning aid, not a regulated medical device — this should be clearly stated in marketing copy. Some prospects will eliminate QuikBolus on this criterion alone; that's acceptable, they aren't the target segment.
- **Workflow depth is not modeled here.** Adaptiiv has years of feature development in DICOM-RT handling, OAR avoidance, and clinical workflow that QuikBolus has not yet matched. QuikBolus competes on price + simplicity, not on feature parity.
- **.decimal's value is service, not pricing.** A clinic that doesn't want to operate a 3D printer at all has a legitimate reason to keep using .decimal regardless of unit cost. Don't try to win those deals.

#### 4.2.7 Pricing implication

Current QuikBolus list price ($2,400/site/yr + $300/printer/yr) is well-positioned for the mid-volume segment and aggressively positioned for the high-volume segment. The competitive analysis supports a future price increase to **$3,000–$3,600/site/year** once QuikBolus has 5+ reference customers and at least one published case study — at that price it still beats Adaptiiv by 5× and beats .decimal at modest volume, while delivering materially more margin to Radiant.

Recommend holding 2027 launch pricing at $2,400/$300 to maximize early adoption, then revisiting upward in Q4 2027 based on win-rate data.

---

## 5. Bundle pricing

À la carte pricing is the published anchor. Most paying customers should end up on a bundle because the discount is significant and the simplicity of "one SKU per site" is genuinely valuable to procurement.

| Bundle | Contents | Discount | Use case |
|---|---|---|---|
| **Clinical Core** | QuikQA + QuikLog + QuikCalc + QuikDose + QuikRef | 30% off sum | Standard 1–2 linac private practice |
| **Clinical Pro** | Core + QuikScript + QuikBolus + QuikShield + QuikRAM + QuikCare + QuikShare | 40% off sum | Full clinical workflow, hospital or academic |
| **Radiant Complete** | All 15 modules | 45% off sum | Enterprise / multi-site / consulting groups |
| **Business Pack** | QuikPay + QuikXpense + QuikFlow + QuikBusiness | 25% off sum | Sold independently to practice administrators |

The Pro and Complete bundles are deliberately discounted hard enough that the per-module math always favors bundling — this drives total contract value and reduces support friction (one renewal, one invoice, one user list).

---

## 6. Cloud Storage add-on (Phase 3 product)

From the business expansion proposal, layered on top of any desktop license:

| Tier | Price | Includes |
|---|---|---|
| **Backup** | $25/site/month ($300/yr) | Daily backup of QA records, 1-year retention, single-site web access |
| **Multi-Site Rollup** | $75/site/month ($900/yr) | Backup + cross-site dashboard, 7-year retention, audit trail, multi-physicist web access |

Cloud is sold as an *attach*, not a replacement. Conservative attach-rate assumption: 20% of sites in Y1, 35% by Y3.

---

## 7. Customer archetypes — worked pricing examples

Four representative customers, with realistic configurations, showing both à la carte and bundled outcomes. These are the personas the sales model assumes.

### 7.1 Archetype A — Solo private practice (1 linac, 1 physicist)

Typical customer profile: independent radiation oncologist, single linac, one part-time or full-time physicist, $5–10M practice revenue.

| Line item | Qty | Unit | Total |
|---|---|---|---|
| QuikQA | 1 linac | $3,600 | $3,600 |
| QuikLog | 1 linac | $1,200 | $1,200 |
| QuikCalc | 1 user | $1,200 | $1,200 |
| QuikDose | 1 user | $1,800 | $1,800 |
| QuikRef | 1 user | $600 | $600 |
| **À la carte total** | | | **$8,400** |
| **Clinical Core bundle (30% off)** | | | **$5,880** |
| + Cloud Backup add-on | 1 site | $300 | $300 |
| **Final ARR** | | | **$6,180** |

### 7.2 Archetype B — Community hospital radonc department (3 linacs, 3 physicists)

Typical profile: mid-sized community hospital with a radonc service line, 3 linacs, full physics team of 3, modest specialty needs.

| Line item | Qty | Unit | Total |
|---|---|---|---|
| QuikQA | 1st linac | $3,600 | $3,600 |
| QuikQA | 2nd linac (70%) | $2,520 | $2,520 |
| QuikQA | 3rd linac (50%) | $1,800 | $1,800 |
| QuikLog | 3 linacs (tiered same way) | — | $2,640 |
| QuikCalc | 3 users | $1,200 | $3,600 |
| QuikDose | 3 users | $1,800 | $5,400 |
| QuikScript | 3 users | $900 | $2,700 |
| QuikRef | 3 users | $600 | $1,800 |
| QuikBolus | 1 site | $2,400 | $2,400 |
| QuikShield | 1 site | $3,600 | $3,600 |
| QuikRAM | 1 site | $1,800 | $1,800 |
| **À la carte total** | | | **$31,860** |
| **Clinical Pro bundle (40% off)** | | | **$19,116** |
| + Cloud Multi-Site Rollup | 1 site | $900 | $900 |
| **Final ARR** | | | **$20,016** |

### 7.3 Archetype C — Academic medical center (8 linacs, 12 physicists)

Typical profile: university-affiliated cancer center, busy 8-linac fleet, 10–15 physicists including residents, full specialty workload.

| Line item | Qty | Unit | Total |
|---|---|---|---|
| QuikQA | 1st linac | $3,600 | $3,600 |
| QuikQA | 2nd linac (70%) | $2,520 | $2,520 |
| QuikQA | 3rd–8th linacs (50% each × 6) | $1,800 | $10,800 |
| QuikLog | 8 linacs tiered | — | $7,560 |
| QuikCalc | 12 users (20% vol disc after 5) | — | $12,480 |
| QuikDose | 12 users (20% vol disc after 5) | — | $18,720 |
| QuikScript | 12 users | $900 | $10,800 |
| QuikRef | 12 users | $600 | $7,200 |
| QuikBolus + QuikShield + QuikRAM + QuikCare + QuikShare | 1 site each | — | $10,500 |
| **À la carte total** | | | **$84,180** |
| **Radiant Complete bundle (45% off)** | | | **$46,299** |
| + Cloud Multi-Site Rollup | 1 site | $900 | $900 |
| **Final ARR** | | | **$47,199** |

### 7.4 Archetype D — Consulting physics group (5 satellite sites, 4 physicists)

Typical profile: physics consulting practice covering multiple community hospital sites; physicists rotate across sites; each site needs its own QA and infrastructure.

| Line item | Qty | Unit | Total |
|---|---|---|---|
| QuikQA | 5 sites × 1 linac each | $3,600 | $18,000 |
| QuikLog | 5 sites × 1 linac | $1,200 | $6,000 |
| QuikCalc | 4 users (floating) | $1,200 | $4,800 |
| QuikDose | 4 users (floating) | $1,800 | $7,200 |
| QuikScript | 4 users | $900 | $3,600 |
| QuikRef | 4 users | $600 | $2,400 |
| QuikBolus | 5 sites | $2,400 | $12,000 |
| QuikShield | 5 sites | $3,600 | $18,000 |
| QuikRAM | 5 sites | $1,800 | $9,000 |
| **À la carte total** | | | **$81,000** |
| **Radiant Complete (45% off)** | | | **$44,550** |
| + Cloud Multi-Site Rollup | 5 sites | $900 | $4,500 |
| **Final ARR** | | | **$49,050** |

---

## 8. Adoption model and assumptions

### 8.1 Lead-source assumptions

- **Founder network / direct outreach** — Todd's existing professional relationships in medical physics. Highest-conversion channel. ~50% of Y1 leads.
- **AAPM annual meeting + 1 regional meeting** — booth and/or speaking slot. ~25% of Y1 leads.
- **Inbound from `radiant-mpc.com`** — trial sandbox + content. ~15% of Y1 leads.
- **Referral from existing customers** — kicks in starting Y2. ~10% Y2, ~30% Y3+.

### 8.2 Sales-cycle assumptions

- Average sales cycle from first contact to signed PO: **90 days** for Archetype A/B, **180 days** for C/D (hospital procurement is slow).
- Pilot/trial-to-paid conversion: **35%** of pilots convert (medical software industry benchmark for vertical-niche tools).
- Annual logo retention: **92%** (clinical software is sticky once integrated into workflow).
- Net revenue retention (NRR): **110%** by Y3 as customers add modules over time.

### 8.3 Customer mix assumption

The lead mix across archetypes, used to derive a blended Average Contract Value (ACV):

| Archetype | Share of new customers | ARR per customer |
|---|---|---|
| A — Solo practice | 50% | $6,180 |
| B — Community hospital | 35% | $20,016 |
| C — Academic | 10% | $47,199 |
| D — Consulting group | 5% | $49,050 |

**Blended ACV: $15,750.**

### 8.4 Three scenarios

| Scenario | New customers Y1 | Y2 | Y3 | Rationale |
|---|---|---|---|---|
| **Conservative** | 7 | 12 | 18 | Founder-only sales, no contract help, slow procurement |
| **Base** | 14 | 21 | 28 | Founder + AAPM presence, 1 contract dev in Y2 |
| **Optimistic** | 28 | 42 | 56 | Strong inbound, referral flywheel, contract dev + part-time SDR |

These are deliberately modest. The US has ~2,200 radiation oncology centers; capturing even 10% (220 sites) over 5 years implies <50 new logos/year on average. Y3 base case (28 new logos) is well below that pace.

---

## 9. 3-year revenue projection

Computed as: cumulative customers × blended ACV × NRR adjustment + cloud attach revenue.

| | 2027 Conservative | 2027 Base | 2027 Optimistic |
|---|---|---|---|
| New customers | 7 | 14 | 28 |
| Cumulative customers | 7 | 14 | 28 |
| Subscription revenue | $110K | $221K | $441K |
| Cloud attach (20% of sites, blended) | included | included | included |
| **Total revenue** | **$110K** | **$221K** | **$441K** |

| | 2028 Conservative | 2028 Base | 2028 Optimistic |
|---|---|---|---|
| New customers | 12 | 21 | 42 |
| Retained from Y1 (92%) | 6 | 13 | 26 |
| Cumulative customers | 18 | 34 | 68 |
| Subscription revenue (+NRR 105%) | $258K | $537K | $1,156K |
| **Total revenue** | **$258K** | **$540K** | **$1,160K** |

| | 2029 Conservative | 2029 Base | 2029 Optimistic |
|---|---|---|---|
| New customers | 18 | 28 | 56 |
| Retained from Y2 (92%) | 17 | 31 | 63 |
| Cumulative customers | 35 | 59 | 119 |
| Subscription revenue (+NRR 110%) | $471K | $983K | $2,179K |
| **Total revenue** | **$471K** | **$980K** | **$2,180K** |

### 9.1 3-year cumulative revenue summary

| Scenario | 2027 | 2028 | 2029 | **3-yr total** |
|---|---|---|---|---|
| Conservative | $110K | $258K | $471K | **$839K** |
| **Base** | **$221K** | **$540K** | **$980K** | **$1.74M** |
| Optimistic | $441K | $1,160K | $2,180K | **$3.78M** |

---

## 10. Cost structure

Annual operating costs across the three years. These exclude founder compensation (which is essentially all of the net profit in Y1–Y2).

| Cost line | 2027 | 2028 | 2029 |
|---|---|---|---|
| Cloudflare infrastructure (Workers + D1 + R2) | $60 | $300 | $720 |
| Code-signing certificate (OV) | $300 | $300 | $300 |
| Stripe / Paddle processing (2.9% blended) | $6,400 | $15,700 | $28,400 |
| Cyber insurance ($1M coverage) | $2,000 | $2,500 | $3,000 |
| Anthropic API + dev tooling | $3,000 | $4,000 | $5,000 |
| Legal (terms, DPA, contracts) + accounting | $5,000 | $7,000 | $8,000 |
| AAPM + 1 regional conference (booth, travel) | $10,000 | $12,000 | $15,000 |
| Contract dev help (part-time) | $0 | $35,000 | $65,000 |
| Marketing (web, content, ads) | $0 | $3,000 | $5,000 |
| **Total operating costs** | **$26,760** | **$79,800** | **$130,420** |

### 10.1 Notes on cost lines

- **Cloudflare** scales by cloud-tier site count. Even at 100 cloud-tier sites by Y3, infrastructure is rounding-error money.
- **Stripe/Paddle**: 2.9% of revenue is a hard cost; built into the model. Paddle (Merchant of Record) is recommended once international sales appear — its take rate is ~5% but it absorbs VAT/sales-tax compliance, which is a real burden otherwise.
- **Contract dev help** is the biggest variable. The model assumes Todd remains primary developer through 2029, with a part-time contractor (10–20 hours/week) handling installer maintenance, support tickets, and per-customer customization starting in Y2. This is the most important risk-management line item in the budget — it directly addresses the single-founder bus-factor risk.
- **Founder salary is not modeled.** Net profit in this model accrues to the founder personally; salary structure (W-2 vs distribution) is a tax question, not a unit-economics question.

---

## 11. Net profit projection

| | 2027 Base | 2028 Base | 2029 Base |
|---|---|---|---|
| Revenue | $221,000 | $540,000 | $980,000 |
| Operating costs | $26,760 | $79,800 | $130,420 |
| **Net profit** | **$194,240** | **$460,200** | **$849,580** |
| **Margin** | **87.9%** | **85.2%** | **86.7%** |

### 11.1 Why margins are so high

Vertical SaaS sold by the founder, with software that's already built, into a market the founder knows by name. No sales team. No marketing agency. Infrastructure costs on Cloudflare are < 1% of revenue. The only real costs are payment processing, conferences, and (starting Y2) contract dev help.

These margins are *common* in this category. They are not aspirational — they are characteristic of the business model. The reason this market isn't dominated by founder-led vertical SaaS already is that the founders capable of building it (clinical medical physicists who can ship software) are rare. Radiant has that combination.

---

## 12. ROI and break-even

### 12.1 Investment baseline

All current development work (existing Quik modules, license manager, web app, installer scaffolding) is sunk cost. Forward-looking investment to launch Jan 2027:

| Investment line | Cost | Timing |
|---|---|---|
| Phase 1 web app reposition (trial flow, copy updates) | $0 cash, ~2 wk dev time | 2026 Q3 |
| Phase 2 desktop installer GA — first 4 modules | $0 cash, ~16 wk dev time | 2026 Q4 |
| Code-signing certificate purchase | $300 | 2026 Q4 |
| Stripe account + DPA + terms drafting | $3,000 | 2026 Q4 |
| Initial marketing site + content | $2,000 | 2026 Q4 |
| **Total launch investment (cash)** | **~$5,300** | |

Compared to projected Y1 net profit of $194K, payback on cash investment is essentially Day 1 — the first paying customer covers it.

### 12.2 Break-even points

- **Annual operating-cost break-even (Base, 2027):** $26,760 / $15,750 ACV = **1.7 customers**. Realistically: the first 2 customers cover the year's costs.
- **Time-to-break-even from Jan 1, 2027:** under the Base scenario with 14 new customers in Y1, the cumulative revenue crosses cumulative costs in **late Q1 / early Q2 2027**.
- **ROI on cash investment (Y1 only, Base):** $194,240 net profit / $5,300 cash invested = **3,665% Y1 cash-on-cash return.**

### 12.3 5-year extrapolation (informational, less reliable)

If the Y3 trajectory continues with NRR maintained, modest new-logo growth, and one full-time engineer hired in Y4:

| Year | Revenue | Costs | Net profit |
|---|---|---|---|
| 2030 | ~$1.6M | ~$280K | ~$1.32M |
| 2031 | ~$2.4M | ~$420K | ~$1.98M |

By 2031 Radiant is either (a) a $2M/yr lifestyle business with very few moving parts, or (b) an acquisition target for Sun Nuclear / Standard Imaging / IBA at a likely 4–8× revenue multiple ($8M–$16M).

---

## 13. Sensitivity analysis

The Base model is moderately optimistic in some dimensions (referral flywheel kicks in by Y2) and conservative in others (no enterprise upsells beyond the modeled archetypes). Stress-testing the inputs:

### 13.1 What if adoption is 50% of Base?

- Y1: 7 customers, ~$110K revenue. Still net-profitable after costs.
- Y3: 30 customers, ~$471K revenue. Still net-profitable; founder still well-paid.
- **Conclusion: half-speed Base is still a viable business.**

### 13.2 What if prices have to be cut 30% to win deals?

- Y3 revenue: $980K × 0.70 = $686K
- Y3 costs essentially unchanged: $130K
- Y3 net profit: $556K, 81% margin
- **Conclusion: price compression hurts but doesn't break the model.**

### 13.3 What if a major competitor (Sun Nuclear, RIT) drops prices 50%?

This is the worst-case competitive scenario. Two responses available:

1. Compete on suite breadth — Radiant's 15-module suite is materially broader than any single competitor's offering. Pivot pricing to bundle-only and emphasize "one vendor, one renewal, one suite."
2. Compete on service — founder-led support beats outsourced helpdesk. Increase touch with each customer.

Neither response saves the most price-sensitive segment (Archetype A, solo practices), but both protect the higher-ACV segments (B/C/D) which are 50%+ of revenue.

### 13.4 What if Cloud Storage demand is absent?

Cloud is modeled as a modest revenue contributor (~$15K Y1, ~$80K Y3 in Base). Losing it entirely:

- Y3 revenue: $980K - $80K = $900K
- Y3 net profit: ~$770K, 86% margin
- **Conclusion: cloud is upside, not foundation.** The desktop channel carries the business.

### 13.5 What if Todd is sick / unavailable for 3 months?

This is the single biggest unmodeled risk. Mitigations:

- Contract dev help (modeled starting Y2) provides immediate continuity for installer builds and support tickets.
- Documentation: every module has a build script, deploy pattern, and operational runbook. Continue and expand this discipline.
- Cyber insurance includes a "key person" rider option — worth pricing.
- Long-term: consider a co-founder or first hire by late 2028 if revenue trajectory holds.

---

## 14. Pricing levers and discount strategy

The following are sanctioned discount paths; anything outside this list should be re-priced from list.

| Lever | Discount | Use when |
|---|---|---|
| Annual prepay | 5% off | Standard offering for any customer |
| 3-year prepay | 15% off | Customer wants budget certainty; Radiant wants cash + retention |
| AAPM member referral | 10% off Y1 | Referral source can be verified by membership |
| Education / residency program | 20% off | Accredited residency or fellowship; builds future relationships |
| Multi-site discount (5+ sites) | 10% off bundle | Consulting groups, IDN customers |
| Beta / case-study customer | 25% off Y1 | Customer agrees to written case study + reference call |
| Launch-month special (Jan 2027) | 15% off Y1 | First 10 customers; expires Feb 1, 2027 |

Discounts do not stack beyond two layers. Renewals reset to list less the long-term prepay discount only.

### 14.1 Annual price escalator

Build a **3% annual price increase** into the contract from day one. This is industry standard, customers expect it, and it materially compounds NRR over time. After 5 years, prices are ~16% higher than launch — meaningful margin tailwind with zero customer friction.

---

## 15. Risks to the model

| Risk | Probability | Impact on model | Mitigation |
|---|---|---|---|
| Adoption slower than Base | Medium | Revenue down, margins intact | Conservative scenario still profitable |
| Procurement cycles longer than 90/180 days | Medium-High | Revenue timing shifts right ~1 quarter | Build pipeline early; expect realized revenue lags pipeline |
| Major competitor price cut | Medium | Margin compression in segment A | Pivot to bundle pricing; emphasize suite breadth |
| Sun Nuclear or IBA acquires a competitor | High by 2029 | Potential cross-sell competition | Compete on breadth and founder-led service |
| Cloudflare service/pricing change | Low | Cost line variability | Schema is portable SQL; <2 wk migration to alt |
| Solo-founder unavailability | Medium | Existential if uncovered | Contract dev help Y2+; documentation discipline |
| Customer demands BAA Radiant can't provide | Medium | Lose 1–2% of pipeline | Document non-PHI scope clearly; offer to refer or partner |
| Regulatory change (FDA Class II) | Low-Medium | Could require submission for QA-related modules | Monitor FDA software-as-medical-device guidance; budget $20–50K if triggered |
| Customer concentration (one logo > 20% of revenue) | Medium by Y2 | Loss of any one customer is material | Spread sales effort across archetypes; cap any one customer at 15% of revenue if possible |

---

## 16. Recommendations

1. **Adopt the mixed pricing model.** Per-linac for QuikQA and QuikLog; per-user for QuikCalc/Dose/Script/Ref; per-site flat for QuikBolus/Shield/RAM/Care/Share; per-practice for the business modules.
2. **Launch annual-subscription only.** No perpetual licenses. No month-to-month at launch.
3. **Publish "starting at" prices on the website.** Full price list lives behind a quote request. Use the quote step as a sales touchpoint.
4. **Offer the three clinical bundles aggressively.** Build the website CTA flow around bundle selection, not à la carte. Discount math should always favor the bundle.
5. **Build the 90-day full-feature desktop trial.** Web sandbox is the demo; the desktop trial is the actual evaluation.
6. **Bake in a 3% annual price escalator** to every contract from day one.
7. **Stand up Cloud as an attach SKU starting Q3 2027,** only after Phase 2 desktop has shipped at least 4 modules to paying customers.
8. **Plan for AAPM 2027 presence** — booth or speaking slot. This is the single best lead-generation event for the suite's target market.
9. **Re-evaluate pricing in Q4 2027** with real conversion data. The first 14 customers will reveal whether prices are too low (fast close rate, low pushback) or too high (long cycles, frequent discount asks).
10. **Document the bus-factor mitigation plan** before Q4 2026 ends. Identify candidate contract developers, codify deployment runbooks, build the "what to do if Todd is offline for 30 days" playbook.
11. **Don't model 5+ years out as committed forecast.** Use the 3-year window for planning and the 5-year extrapolation only for strategic optionality (acquisition vs. lifestyle business).

---

## Appendix A — Pricing comparison cheat sheet

For quick reference during sales conversations:

| Module | Per | Price | Bundled in |
|---|---|---|---|
| QuikQA | Linac | $3,600 (1st), $2,520 (2nd), $1,800 (3rd+) | Core, Pro, Complete |
| QuikLog | Linac | $1,200 (tiered) | Core, Pro, Complete |
| QuikCalc | User | $1,200 (20% off after 5) | Core, Pro, Complete |
| QuikDose | User | $1,800 (20% off after 5) | Core, Pro, Complete |
| QuikScript | User | $900 | Pro, Complete |
| QuikRef | User | $600 | Core, Pro, Complete |
| QuikBolus | Site | $2,400 + $300/printer | Pro, Complete |
| QuikShield | Site | $3,600 | Pro, Complete |
| QuikRAM | Site | $1,800 | Pro, Complete |
| QuikCare | Site | $1,800 | Pro, Complete |
| QuikShare | Site | $900 | Pro, Complete |
| QuikPay | Practice | $900 | Business Pack |
| QuikXpense | User | $600 | Business Pack |
| QuikFlow | User | $600 | Business Pack |
| QuikBusiness | Practice | $1,800 | Business Pack |
| Cloud Backup | Site | $300/yr | — |
| Cloud Multi-Site | Site | $900/yr | — |

---

## Appendix B — Model assumptions summary

Quick reference for anyone validating or stress-testing the model:

- **Currency:** USD throughout
- **Pricing:** Annual subscription only
- **Blended ACV (Base):** $15,750/customer
- **Customer archetype mix:** 50% A / 35% B / 10% C / 5% D
- **Sales cycle:** 90 days (A/B), 180 days (C/D)
- **Pilot → paid conversion:** 35%
- **Logo retention:** 92% annually
- **NRR:** 100% Y1, 105% Y2, 110% Y3
- **Cloud attach rate:** 20% Y1, 30% Y2, 35% Y3
- **Annual price escalator:** 3%
- **Stripe / payment processing:** 2.9% of revenue
- **Founder is primary developer through 2029**
- **No PHI in cloud tier** — supports avoiding BAA-mandatory Enterprise tier costs
- **All projections in US market only** — international expansion not modeled
