---
verified: 2026-10-10
reference: "Banksalad Reference Design System (뱅크샐러드) — https://www.banksalad.com"
runtime_deps:
  icons: lucide-react
  fonts: [Pretendard]
---

# 데일리롤 (Daily Roll) Design System

<!--
Conversion note
Reference: Banksalad Reference Design System (뱅크샐러드), https://www.banksalad.com
Converted 2026-10-10 with design-brandfit against docs/VOICE.md.
- Visual tokens kept from the reference: all color values, type scale/weight/line-height, radii, spacing, shadows, motion values, component measurements. Meta, voice and copy rewritten from VOICE.md.
- Removed: Brand Narrative, Personas (covered by VOICE.md and PRODUCT.md).
- Added: frontmatter (runtime_deps), Usage Boundaries, Iconography, current-token Do's/Don'ts and Agent Prompt Guide.
- Fonts: Pretendard kept (Korean coverage, OFL); no substitution. Icons: Lucide (`lucide-react`) recommended because the reference defines no icon spec.
- Color decision: values unchanged. The accent is deliberately scarce so photos carry the color; a color change was not requested.
- Voice samples are unverified planning copy (new service, no shipped UI yet).
Known inconsistencies in the reference:
1. Value-bearing prose (old Do's/Don'ts, Quick Color Reference, Example Prompts, Iteration Guide) used superseded values (`#04c584`, 2px radius, body 500) that contradict the current tokens. Per "tokens win", that prose was moved into superseded blocks and replaced by current-token guidance.
2. The Border Radius Scale in §5, Elevation levels L1–L5 and the legacy component snapshot still carry legacy values; they are history, not current tokens.
3. Measured gap: the reference shows no visible keyboard focus indication on any probed control. Left unchanged; to be decided at build time.
4. Contrast: `#13bd7e` text on white is about 2.4:1 and white text on `#06a96c` is about 3.0:1, both below WCAG AA for 16px text.
5. No palette exists for the four frame states (photo / 안 한 날 / 쉬는 날 / check-only) or for success/warning; these are decided in the flow and build steps.
-->

<!-- design-md:section experience -->
## 1. Experience

### Visual Theme & Atmosphere

데일리롤 (Daily Roll) is a mobile-first web service where each habit is a strip of frames (칸) filled with photos, reviewed weekly and monthly. The interface should feel like a quiet photo studio: a white `#ffffff` canvas, near-black `#111111` text, Pretendard throughout, and one green, `#13bd7e`, that appears sparingly so the photos carry the color. The deeper `#06a96c` is reserved for the single full-width primary action on a screen.

The mood is quiet because the product speaks quietly: it states what happened in a frame and never judges or pushes (see Voice & Tone). A loud interface would contradict that voice, so surfaces stay white, borders stay thin `#f0f2f5`, and nothing around the tile board competes with the photos.

Geometry is role-specific rather than governed by one default: 6px chips, 16px actions, 24px containers with a `#f0f2f5` border, and a full pill only for page indicators and landing CTAs. Plain lists and disclosure rows remain square. Typography is Pretendard on every measured surface of the reference (603 elements), with a hierarchy that relies on 16px body and labels, 14px supporting copy, and 18–20px headings at 400/500/700.

These visual tokens were measured from the public web surfaces of the Banksalad reference and are kept unchanged. BM JUA is not part of this system.

**Key Characteristics:**
- Pretendard everywhere, with the full Korean fallback stack
- Accent `#13bd7e`, used once per screen; deeper action green `#06a96c`
- White `#ffffff` canvas with `#111111` foreground, `#555c68` secondary text, `#9fa4b0` muted metadata
- Role-specific 6px / 16px / 24px / full-pill geometry
- 8px, 12px, 16px, and 24px as recurring spacing values
- Reference evidence covers buttons, cards, and list/disclosure rows; inputs, charts, dialogs, and the four frame states remain unresolved

<!-- design-md:claim primary-tasks kind=user-outcomes count=5 lang=en -->
### Primary tasks

- Create a habit with a name and a cycle (daily, N times a week, chosen weekdays)
- Fill a frame (칸) by picking or taking a photo that lands on its shooting date
- See several habits as stacked photo strips on one board
- Look back on the week on Sunday night
- Turn a month of photos into a card to share
<!-- design-md:claim-end -->

### Do's and Don'ts

### Do
- Use `#13bd7e` sparingly as the accent: one primary action or selected state per screen
- Use `#06a96c` with `#ffffff` text for the full-width primary action
- Use `#111111` for text, `#555c68` / `#606874` for supporting copy, `#9fa4b0` for muted metadata only
- Use Pretendard with the full Korean fallback stack; 400 for reading, 700 for headings and decisions
- Keep radii role-specific: 6px chips, 16px actions, 24px containers
- Keep shadows neutral and single-layer
- Let photos carry the color; keep the UI around them white and quiet
- Show 안 한 날 and 쉬는 날 in neutral tones, never in alert colors

### Don't
- Don't use the superseded `#04c584` / `#10df99`, a 2px default radius, or a weight-500 body
- Don't use the accent as a background fill, frame fill, or decoration
- Don't use `#fe493d` or warning orange for empty or skipped frames
- Don't use the carousel purple `#877af5` or yellow `#ffbe4c`
- Don't use spring or bounce motion, and don't celebrate a filled frame with animation
- Don't use emoji in the UI
- Don't let accent-colored text alone carry meaning (about 2.4:1 on white)

<details>
<summary>Superseded legacy guidance — values predate the current tokens, kept for audit history</summary>

### Do
- Use `#04c584` for every interactive moment — CTAs, links, focus accents, "your data point" on charts
- Use `#10df99` for hover (it's *brighter* than `#04c584` — the reference lightens on interaction)
- Use `#f3fdfa` mint tint on input focus background — the only branded surface tint in the system
- Keep border-radius at 2px for buttons, inputs, cards, badges — the system's geometric signature
- Use Pretendard with the full Korean fallback stack; 700 as default weight for headings and CTAs
- Use `#2b2b2b`/`#434444` warm near-blacks for type instead of `#000000`
- Use the teal-slate family (`#34464b`/`#5c818a`/`#1c6c73`/`#a7c7cf`) for chart series — cooler than brand green by design
- Use `#04c584` only for "your value" on a chart — never as a generic data fill
- Right-align financial amounts in tables; use 700 weight for amounts even at 14px
- Use comma-separated won amounts with the currency unit in 500 weight (`12,400,000원`)

### Don't
- Don't use Toss's 12px+ rounded corners — the reference is 2px; 8px is the soft-marketing exception
- Don't use Kakao yellow, KakaoPay yellow, or any warm accent for primary interaction — green is the sole interactive hue
- Don't use BM JUA inside the app — Jua is for marketing-landing display moments only
- Don't use weight 400 for body — the reference's body weight is 500
- Don't apply colored shadows (blue, green, branded) — shadows are always neutral black
- Don't pad financial cards generously like Toss — the reference packs density; data is the aesthetic
- Don't approximate currency amounts (`약 120만원`) on primary financial surfaces — bare numerals with commas only
- Don't use `#0099ff` info-blue for default links — green is the default link color; blue is reserved for *external* references
- Don't use Pretendard 300 on body — light weights only at hero display sizes (52px+)
- Don't sprinkle the brand green on chart series — green is for interaction, teal-slate is for data

</details>

### Principles

1. **Photos carry the color.** The UI stays white and quiet. *UI implication:* no tinted surfaces or decorative fills around the tile board, and the accent never fills a frame.
2. **One accent per screen.** *UI implication:* a single primary action or selected state uses `#13bd7e` / `#06a96c`; everything else stays neutral.
3. **Say what happened, not what is missing.** This is the voice rule applied to visuals. *UI implication:* 안 한 날 and 쉬는 날 use neutral tones (`#f0f2f5` line, `#9fa4b0` muted), never red or orange, and empty frames carry no alert badge.
4. **Calm motion.** The only verified transition is a 350ms accordion; controls change instantly. *UI implication:* no spring, bounce, or celebratory animation when a frame fills.
5. **Verify on a real screen.** *UI implication:* check a component on the actual tile board and weekly view before generalizing it into a rule.

### Usage Boundaries
| Element | Use for | Never use for |
|---|---|---|
| accent `#13bd7e` | One primary action or selected state per screen; header link hover | Background fills, frame fills, decoration, completion celebration; text alone as the carrier of meaning (about 2.4:1 on white) |
| accent-strong `#06a96c` | Fill of the full-width primary action, with `#ffffff` text | Text color, secondary buttons |
| error `#fe493d` (legacy value; state palette unresolved) | Real failures, such as a photo that could not be loaded | 안 한 날, 쉬는 날, or empty frames |
| Weight 700 | Headings and the primary action label | Body paragraphs (body is 400) |
| Shadow `0 4px 9px rgba(0,0,0,.15)` | Floating layers: sheets, popovers, landing pill CTA | Frames on the tile board — the photos supply depth |
| muted `#9fa4b0` | Supporting metadata | Essential information such as 쉬는 날 labels; interactive text |


<!-- design-md:section foundations -->
## 2. Foundations

<!-- design-md:claim foundations kind=rules-or-constraints lang=en -->
### Color Palette & Roles

### Primary
- **Current accent** (`#13bd7e`): repeated green text and border color across home, contents, loan, and card-detail surfaces.
- **Primary action** (`#06a96c`): full-width loan-flow action background, paired with `#ffffff` text.
- The previous `#04c584` and `#10df99` values were not observed in the five-surface capture and are not current canonical tokens.

### Heading & Body
- **Foreground** (`#111111`): dominant heading, body, and list text across all five surfaces.
- **Secondary** (`#555c68`): supporting copy on home, contents, and card detail.
- **Neutral** (`#606874`): explanatory copy in loan and customer-safety contexts.
- **Muted** (`#9fa4b0`): product metadata and subdued actions on contents and card detail.

### Surface & Border
- **Canvas** (`#ffffff`): default current page and card surface.
- **Line** (`#f0f2f5`): observed 1px customer-safety card border.
- **Transparent**: most navigation, list, disclosure, and utility controls stay unfilled.

### Unresolved color groups

No current public chart, authenticated dashboard, input validation, warning, error, or success-state palette was safely captured. Those legacy groups are omitted rather than mapped to plausible greens, reds, or teals.
<!-- design-md:claim-end -->

### Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat (L0) | No shadow | Page background, inline elements |
| Soft (L1) | `0 1px 1px rgba(0,0,0,.08)` | Subtle row lift, list-item separators |
| Standard (L2) | `0 2px 5px rgba(0,0,0,.12)` | Default cards — by far the most common (~38 occurrences) |
| Elevated (L3) | `0 4px 9px rgba(0,0,0,.15)` | Dropdowns, hover-elevated cards |
| Deep (L4) | `0px 2px 8px rgba(0,0,0,.1)` | Floating action panels |
| Modal (L5) | `0 17px 50px rgba(0,0,0,.19)` | Dialog modals, account-switch overlays |
| Inset (L-1) | `inset 0 1px 1px rgba(0,0,0,.12)` | Pressed button state, depressed input visual |
| Halo | `0 0 2px rgba(0,0,0,.26)` | Thin outline on overlay menus and popovers |

**Shadow Philosophy.** Shadows are **always neutral and single-layer**: no colored shadows, no parallax stacks. Levels L1–L5 are the measured scale kept from the reference. On the tile board frames stay flat, because the photos supply the depth.

Measured exception (2026-07-12 capture, confirmed 2026-09-29): the Safety Link Card (unused — reference-specific) carries a tinted rest shadow, `0 8px 24px #dce9f3`, so the neutral-only statement above does not hold for that card.

### Motion & Easing

One current public accordion panel exposed a `350ms` height/opacity transition using `cubic-bezier(0.25, 0.1, 0.25, 1)`. No broader duration scale, spring policy, chart animation, score count-up, or reduced-motion implementation was verified in this capture. The six controls probed on 2026-09-29 all compute `transition: all 0s`, so their hover and pressed changes are instant.

<details>
<summary>Superseded synthetic motion proposals — not verified product facts</summary>

**Durations:**

| Token | Value | Use |
|---|---|---|
| `motion-instant` | 0ms | State commits, checkbox flips, focus ring appearance |
| `motion-fast` | 150ms | Hover, focus, button press overlays, inline value updates |
| `motion-standard` | 250ms | Card expand, dropdown open, tab content switch, modal open |
| `motion-slow` | 400ms | Page-level transitions, recommendation-card reveal animation |
| `motion-data` | 600ms | Chart series draw-in, score-bar count-up — slower because the user needs time to read the number |

**Easings:**

| Token | Curve | Use |
|---|---|---|
| `ease-enter` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Arriving — modals, dropdowns, sheets |
| `ease-exit` | `cubic-bezier(0.4, 0.0, 1, 1)` | Dismissals |
| `ease-standard` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Two-way transitions, chart draw-in |
| `ease-data` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Score count-up, chart series — eases out gradually so the final value is the calm resting state |

**Explicitly forbidden.** No spring overshoot anywhere. No bounce. No `cubic-bezier` with a middle control above `1.0`. 데일리롤's voice is calm and matter-of-fact, so filling a frame is never celebrated with overshoot or bounce. The reference licenses spring easing nowhere, and neither does this system.

**Signature motions.**

1. **Score count-up (unused — reference-specific).** When a credit-score or asset-total updates, the number animates from the previous value to the new value across `motion-data` (600ms) with `ease-data`. The duration is deliberately slow — the user is supposed to read the change, not see it flash. The Korean numeric separators (`,`) re-flow correctly during the count.
2. **Chart series draw-in (unused — reference-specific).** Time-series charts draw left-to-right in `motion-data` with `ease-standard`. The user's own series (`#04c584`) is drawn *last*, so the eye lands on the user's own data after the surrounding distribution has been established.
3. **Recommendation card reveal (unused — reference-specific).** When a fresh recommendation set loads, cards fade in with `motion-standard / ease-enter` from `opacity: 0; translateY(4px)`. Translate is intentionally small (4px, not 20px) — the cards arrive, they do not fly in.
4. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`. Score count-ups become instant value swaps. Chart draw-ins render their final state immediately. The product remains fully usable; nothing in the product is information-dependent on motion.

</details>

<!-- design-md:section typography-assets -->
## 3. Typography & Assets

### Typography Rules

### Font evidence boundary

| Evidence class | Resolution |
|---|---|
| Official product-use | BPL publications establish an official product-language system, but do not publish a current universal font token in the inspected text. |
| Live surface-use | Five public web surfaces loaded and visibly used Pretendard on 603 elements. |
| Official distributed asset | No reference-exclusive UI font asset is promoted in this reference. |
| Declared-only | `swiper-icons` was declared with zero visible text usage. |
| Evidence boundary | Native-app-only typography remains unresolved without an inspectable current surface. |

Specimen availability requires a loadable font source and is separate from family truth.

### Font Family
- **Primary**: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`
- 데일리롤 decision: keep Pretendard (full Korean and Latin coverage, SIL OFL); no font substitution is needed.
- Loaded sources were observed for Pretendard Regular, Medium, SemiBold, Bold, and ExtraBold subsets.
- BM JUA was not declared, loaded, or visibly used in this fresh capture and is omitted.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Product Heading | Pretendard | 20px | 700 | 28px | normal | Repeated section and card heading |
| Supporting Heading | Pretendard | 18px | 700 | 26px | -0.09px | Compact product heading |
| Body | Pretendard | 16px | 400 | 24px | normal | Shared product body and list copy |
| Prominent Label | Pretendard | 16px | 700 | 26px | -0.08px | Action and emphasized product label |
| Metadata | Pretendard | 14px | 500 | 20px | -0.07px | Supporting product information |
| Caption | Pretendard | 12px | 500–700 | 18px | -0.06px | Dense metadata where observed |

### Principles
- **Pretendard is the only current visible text family.** Do not substitute an unobserved accent face.
- **400 carries reading; 700 carries decisions.** Current body/list copy is commonly 400, while headings and the primary loan action are 700.
- **Tracking is subtle at product sizes.** Current 14–18px roles use approximately -0.06px to -0.09px; no -1px display token is promoted.
- **Surface evidence stays local.** Authenticated app typography and native-only financial amount roles remain unresolved.

<!-- design-md:section components-states -->
## 4. Components & States

### Component Stylings

### Current verified components

**Primary Action**
- Background: `#06a96c`
- Text: `#ffffff`
- Radius: 16px
- Padding: 16px 20px
- Height: 56px
- Font: 16px / 700 / Pretendard
- Hover: a full-size black `::after` overlay goes from opacity 0 to 0.04; the fill stays `#06a96c`
- Pressed: the same overlay at 0.04 (pressed equals hover)
- Focus: no visible indication — `outline-style: none`, and no other property changes (measured 2026-09-29 after real Tab presses, `:focus-visible` matched)
- States: default captured 2026-07-12; hover, pressed and focus measured 2026-09-29 on the same loan-flow button; every change is instant (`transition: all 0s`)
- Use: Full-width primary action, labelled with a PRODUCT.md feature name (e.g., 습관 만들기). Reference use: public interest-rate flow

**Filter Chip**
- Background: `rgba(19, 189, 126, 0.15)`
- Text: `#13bd7e`
- Radius: 6px
- Padding: 10px 12px
- Font: 16px / 500 / Pretendard
- States: default captured 2026-07-12; no safe active interaction expansion. The `/contents` surface answered HTTP 404 on 2026-09-29 (four attempts), so these values could not be re-measured and stay as captured
- Use: Category and filter action on the public contents directory

**Info Card**
- Background: `#ffffff`
- Border: 1px solid `#f0f2f5`
- Radius: 24px
- Padding: 24px
- Use: Guidance card in the 24px container shape (reference use: customer-safety guidance)
- Scope: the 158px guidance list card (`surface-4::li`, six on the page). The report link cards at the top of the same page are a different element, recorded below as Safety Link Card; the 2026-09-29 probe measured one of those, so its 28px 24px padding and tinted shadow do not apply here

**Disclosure Row (unused — reference-specific)**
- Background: transparent
- Label: `#272a30`, 16px / 700 / Pretendard — the visible `span.text-b16.font-bold` (measured 2026-09-29). The button's own computed style is `#000000` 16px / 400; the earlier `#111111` matched neither
- Radius: 0px
- Padding: 24px 20px
- Hover and pressed: no visible change (measured 2026-09-29)
- Focus: no visible indication — `outline-style: none`, nothing else changes (measured 2026-09-29)
- Use: Expandable disclosure row on the public card-product detail (the expanded state was not opened)

### Header, hero and footer (captured 2026-07-12; states measured 2026-09-29)

**Header Link**
- Text: `#111111`, 16px / 700 / Pretendard, -0.08px tracking; padding 0 22px, 26px line box, no fill
- Hover and pressed: the text turns `#13bd7e`. All 44 July state samples (11 links on four surfaces) agree, and the 2026-09-29 probe read the same on 카드 with real `:hover` and `:active`
- Focus: no visible indication — `outline-style: none`, nothing else changes (measured 2026-09-29)
- Use: sticky desktop header (reference labels 카드, 대출, 예적금 … are unused — reference-specific)

**Landing Pill CTA**
- Background `#13bd7e`, text `#ffffff`, 41px radius, padding 10px 20px, 41px tall, 18px / 500 / Pretendard
- Shadow: `0 4px 9px rgba(0,0,0,0.15)`
- Hover and pressed: no visible change. Focus: no visible indication (all measured 2026-09-29)
- (unused — reference-specific) The carousel's other slides recolour the same pill: `#877af5` with white text (내 최저금리 조회하기) and `#ffbe4c` with `#111111` text (이벤트 보기), captured 2026-07-12 and present again in the 2026-09-29 survey
- Use: landing primary CTA (reference label 뱅크샐러드 사용해보기 — unused — reference-specific)

**Landing Outline Pill**
- Background `#ffffff`, text and 1px border `#13bd7e`; the filled pill's radius, padding, type and shadow; 43px tall
- Hover and pressed: no visible change. Focus: no visible indication (all measured 2026-09-29)
- Use: landing secondary CTA (reference label 서비스 더 알아보기 — unused — reference-specific)

**Safety Link Card (unused — reference-specific)**
- Background `#ffffff`, 1px solid `#f0f2f5` border, 24px radius, padding 28px 24px, 564px × 190px (272px-wide cards sit beside it)
- Shadow: `0 8px 24px #dce9f3` — a tinted rest shadow, present in the 2026-07-12 capture and on 2026-09-29
- Title: `#272a30`, 24px / 700 (measured 2026-09-29)
- Hover and pressed: no visible change. Focus: no visible indication (all measured 2026-09-29)
- Use: report links (reference label 명의 도용 의심 — unused — reference-specific)

**Carousel Page Dot (unused — reference-specific)**
- `#ffffff`, 9999px radius, 36px × 8px for the current page, shadow `0 2px 8px rgba(0,0,0,0.1)`; the 2026-09-29 survey reads the other dots at 8px × 8px
- No pointer-state sample

**Footer Link**
- Text `#111111`, 16px / 400 / Pretendard, 20px line box, no fill
- No pointer-state sample
- Use: footer columns (reference labels 회사소개, 블로그 … are unused — reference-specific)

None of the six controls probed on 2026-09-29 shows a visible keyboard focus indication: each removes the browser ring (`outline-style: none`) and changes nothing else. That is recorded as a measured absence on each component, not as a focus token.

### Iconography
- Library: Lucide (`lucide-react`, MIT). Outline style only, using the library defaults (24px grid, 2px stroke); no filled or duotone variants.
- Icons are neutral (`#111111` / `#555c68`); the accent appears only on a selected state, per Usage Boundaries.
- Why: even strokes suit the calm, orderly voice. The reference defines no icon spec, so this fills the gap.


<details>
<summary>Superseded 2026-05 legacy snapshot — retained for audit history, not canonical</summary>

### Legacy Buttons

#### Primary CTA (Legacy Accent Green)
- Background: `#04c584`
- Text: `#ffffff`
- Border: none
- Radius: 2px
- Padding: 12px 24px
- Height: 42px (line-height-driven)
- Font: 16px / 700 / Pretendard
- Hover: background `#10df99` (lightens — opposite of convention)
- Use: Primary CTA on data tables, recommendation rows, transactional flows ("내 카드 추천 받기", "신청하기")

#### Primary CTA — Large Display
- Background: `#04c584`
- Text: `#ffffff`
- Border: none
- Radius: 2px
- Padding: 16px 32px
- Height: 56px
- Font: 18px / 700 / Pretendard
- Letter-spacing: -1px
- Hover: `#10df99`
- Use: Hero CTA on landing surfaces ("앱 다운로드", "지금 시작하기")

#### Primary CTA — Hover-Inverted (Retry)
- Background: `#10df99` (default lighter)
- Text: `#ffffff`
- Border: none
- Radius: 2px
- Padding: 10px 20px
- Font: 14px / 500 / Pretendard
- Hover: background `#04c584` (darkens — the one place the reference uses the darken pattern)
- Use: Secondary retry / "다시 시도" actions where the resting state is a softer mint

#### Ghost / Outlined
- Background: `#ffffff`
- Text: `#04c584`
- Border: 1px solid `#04c584`
- Radius: 2px
- Padding: 12px 24px
- Font: 16px / 700 / Pretendard
- Hover: background `#f3fdfa` (mint tint)
- Use: Secondary actions paired with a Primary CTA

#### Neutral / Cancel
- Background: `#f5f5f5`
- Text: `#434444`
- Border: none
- Radius: 2px
- Padding: 12px 24px
- Font: 16px / 700 / Pretendard
- Hover: background `#e1e1e1`
- Use: Cancel / "취소" / dismiss actions

#### Disabled
- Background: `#e1e1e1`
- Text: `#acacac`
- Border: none
- Radius: 2px
- Font: 16px / 700 / Pretendard
- Use: Disabled state (form incomplete, retry cooling down)

#### Link Button (Inline Text Link)
- Background: transparent
- Text: `#04c584`
- Border: none
- Padding: 0
- Font: 14px / 500 / Pretendard
- Hover: text-decoration: underline
- Use: Inline links within content ("자세히 보기"), table-row jump links

### Cards & Containers

#### Data Card (Default)
- Background: `#ffffff`
- Border: 1px solid `#e1e1e1` (some surfaces use no border + shadow only)
- Radius: 2px
- Padding: 20px 24px
- Shadow: `0 2px 5px rgba(0, 0, 0, 0.12)`
- Use: Recommendation rows, transaction cards, account summary blocks

#### Card — Soft Variant
- Background: `#fbfbfb`
- Border: none
- Radius: 8px
- Padding: 24px
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.1)`
- Use: Marketing/landing feature cards (the rare 8px-radius case)

#### Card — Highlight (Selected)
- Background: `#f3fdfa`
- Border: 1px solid `#10df99`
- Radius: 2px
- Padding: 20px 24px
- Use: Selected state in product comparison lists (cards/loans), recommended-pick highlight

### Inputs & Forms

#### Text Input (Default)
- Background: `#ffffff`
- Text: `#999999` (placeholder) / `#434444` (filled)
- Border: 1px solid `#e1e1e1`
- Radius: 2px
- Padding: 0 16px
- Height: 48px
- Font: 16px / 500 / Pretendard

#### Text Input — Focus
- Background: `#f3fdfa`
- Text: `#434444`
- Border: 1px solid `#10df99`
- Radius: 2px
- Use: Active typing state — the mint tint is the only branded background fill in the system

#### Text Input — Error
- Background: `#ffffff`
- Text: `#434444`
- Border: 1px solid `#fe493d`
- Radius: 2px
- Error message below: 12px / 500 / `#fe493d`
- Use: Validation failure state

#### Amount Input (Financial)
- Background: `#ffffff`
- Text: `#2b2b2b`
- Border: 2px solid `#f5f5f5`
- Radius: 2px
- Padding: 0 16px
- Height: 56px
- Font: 22px / 700 / Pretendard (right-aligned)
- Use: Specialized input for entering won amounts — heavier border (2px), bigger type, right-aligned, 700 weight; treats money input as a heading not a form field

### Badges & Tags

#### Status Pill (Brand)
- Background: `#f3fdfa`
- Text: `#04c584`
- Border: none
- Radius: 41px (rare pill — used only on tag chips, not buttons)
- Padding: 4px 10px
- Font: 12px / 500 / Pretendard
- Use: Filter chips ("연회비 없음", "주유 할인") on card-recommendation pages

#### Status Badge (Warning)
- Background: `#ffffff`
- Text: `#f56200`
- Border: 1px solid `#fd8700`
- Radius: 2px
- Padding: 2px 8px
- Font: 12px / 700 / Pretendard
- Use: Rate-warning, expiry, attention-needed indicators

#### Status Badge (Negative)
- Background: `#ffffff`
- Text: `#fe493d`
- Border: 1px solid `#fe493d`
- Radius: 2px
- Padding: 2px 8px
- Font: 12px / 700 / Pretendard
- Use: Overdue, declined, blocking-issue indicators

### Tables (Financial Data)

#### Table Header Row
- Background: `#f5f5f5`
- Text: `#7b7b7b`
- Border-bottom: 1px solid `#e1e1e1`
- Padding: 12px 16px
- Font: 13px / 700 / Pretendard / uppercase letter-spacing 0.05em
- Use: Column headers on transaction lists, fee schedules

#### Table Body Row
- Background: `#ffffff` (alternates with `#fbfbfb` on dense tables)
- Text: `#434444`
- Border-bottom: 1px solid `#e1e1e1`
- Padding: 12px 16px
- Font: 14px / 500 / Pretendard
- Amounts right-aligned: 14px / 700 / `#2b2b2b` (positive) or `#fe493d` (negative)
- Use: Transaction rows, line-item displays

### Charts & Data Viz

#### Chart Series Tokens
- Series 1: `#34464b` (primary)
- Series 2: `#5c818a` (secondary)
- Series 3: `#1c6c73` (tertiary)
- Series 4: `#a7c7cf` (quaternary / pale)
- Highlight: `#04c584` (always reserved for "your value" / user's own data point)
- Negative: `#fe493d`
- Positive trend: `#04c584`

#### Axis & Gridlines
- Axis label: 10–12px / 500 / `#7b7b7b`
- Gridline: 1px dashed `#e1e1e1`
- Background: `#ffffff` or `#fbfbfb`

### Navigation

- Header: sticky white (`#ffffff`), no shadow at rest, 1px bottom border `#f5f5f5`
- Logo: left, ~24–28px tall, brand wordmark in `#04c584` (or `#2b2b2b` mono variant)
- Nav links: 14px / 500 / Pretendard / `#434444`, hover `#04c584`
- Sign-in CTA: white background, `#2b2b2b` text, 1px solid `#d8dfe6` border, 16px radius, 6px 14px padding, 14px / 400 (the home-page header uses a softer 16px radius for the auth pill — exception to the 2px default; this is the only 16px-radius live observation in the captured DOM)

### Shadows

| Level | Treatment | Use |
|---|---|---|
| Flat | none | Page background, inline elements |
| Soft (L1) | `0 1px 1px rgba(0,0,0,.08)` | Subtle row separators |
| Standard (L2) | `0 2px 5px rgba(0,0,0,.12)` | Default cards — most common (~38 occurrences) |
| Elevated (L3) | `0 4px 9px rgba(0,0,0,.15)` | Dropdowns, popovers |
| Deep (L4) | `0px 2px 8px rgba(0,0,0,.1)` | Floating panels |
| Modal (L5) | `0 17px 50px rgba(0,0,0,.19)` | Modal dialogs |
| Inset | `inset 0 1px 1px rgba(0,0,0,.12)` | Pressed-button / depressed input feel |

</details>

**Tier 2 status:** unavailable
**Earlier mistakes reverted:** `#04c584` canonical primary, `#10df99` hover, BM JUA current usage, 2px default radius, and uncaptured input/chart/modal/state claims

### States

The 2026-07-12 collector performed zero safe interaction expansions, but its pseudo-state pass did record hover and pressed samples for the 11 header menu links on four surfaces (text `#111111` to `#13bd7e`). This paragraph previously said default render states only (corrected 2026-09-29).

A live probe on 2026-09-29 measured hover, pressed and keyboard focus on six controls. The header link turns `#13bd7e`; the loan action darkens through a black `::after` overlay at opacity 0.04; the two hero pills, the safety link card and the disclosure row do not change; and none of the six shows a visible keyboard focus indication (`outline-style: none`, nothing else changes). No canonical empty, loading, error, success, or disabled treatment is promoted. The loan accordion was captured in its rendered state, but this does not establish a complete product-state system.

<details>
<summary>Superseded synthetic state proposals — not verified product facts; copy converted to VOICE.md</summary>

| State | Treatment |
|---|---|
| **Empty (no habits yet)** | White canvas. One short line in `#555c68`: `습관을 만들면 여기에 칸이 생겨요.` One primary action in the accent, labelled 습관 만들기. No illustration. |
| **Empty (filter cleared)** | (unused — reference-specific) |
| **Empty (no data this period)** | (unused — reference-specific) |
| **Loading (first paint)** | Skeleton blocks at `#f5f5f5` matching the final layout exactly. 1s shimmer with 8% white highlight using a `linear-gradient` sweep. |
| **Loading (refresh / in-place)** | Subtle `#04c584` 2px progress bar at top of the section. Previous values stay visible. Never block the board during refresh. |
| **Error (inline field)** | `#fe493d` 1px border on the input, 12px error text below in `#fe493d` weight 500. One line saying what failed and the next action. |
| **Error (photo failed to load)** | Inline banner in the affected area. `#fe493d` left border, white background, 14px `#555c68` text: `사진을 불러오지 못했어요. 다시 시도해 주세요.` with a retry button. Never a generic toast. |
| **Error (data freshness warning)** | (unused — reference-specific) |
| **Success (frame filled)** | Inline confirmation row in `#f3fdfa` mint-tint background with the text `조깅이 한 칸 채워졌어요.` (habit name as subject). No toast, no emoji, no exclamation. |
| **Success (passive update)** | 3s auto-dismiss toast, `#2b2b2b` background (not brand green), white 14px / 500 text, shadow `0 2px 5px rgba(0,0,0,.12)`. No emoji. |
| **Skeleton** | `#f5f5f5` blocks at exact final dimensions. 1s shimmer. |
| **Disabled** | Background `#e1e1e1`, text `#acacac`. Cursor `not-allowed`. The geometry stays identical to the enabled state so re-enabling does not shift layout. |
| **Pressed (button)** | Inset shadow `inset 0 1px 1px rgba(0,0,0,.12)` + background about 5% darker for the press duration. Returns instantly on release (no spring). |

</details>


<!-- design-md:section layout-platforms -->
## 5. Layout & Platforms

### Layout Principles

### Spacing System
- Base unit: 4px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
- Card internal padding: 20px / 24px (compact; the reference packs more data per card)
- Table-row vertical padding: 12px (denser than consumer apps)

### Grid & Container
- Marketing/landing: max content width ~1080–1200px, centered
- App / data surfaces: full-width with 16–24px gutters; tables go edge-to-edge on mobile
- Card-recommendation lists: single-column on mobile, 2–3 column grid on desktop
- Charts: full-width within their card container, never bleed outside

### Whitespace Philosophy
- **Density serves the board.** The reference prefers more facts visible without scrolling; for 데일리롤 that density belongs to the habit × period board, while the screens around it stay quiet.
- **Section rhythm by surface fill.** White (`#ffffff`) and off-white (`#fbfbfb`) sections alternate quietly — not for drama, but to chunk dense data into scannable bands.
- **Tight gaps inside, generous gaps outside.** Inside a comparison card, rows sit on 12px vertical gaps. Between cards, 24–32px. The hierarchy of grouping is communicated through gap-size alone.

### Border Radius Scale

Current verified radii: 6px chips, 16px actions, 24px containers, full pill for indicators. The legacy scale below is history only.

- **2px (dominant — 81 occurrences in CSS)**: Buttons, inputs, cards, badges, banners. The signature.
- 4px: Small badges, inline pills.
- 8px: Soft marketing cards (rare).
- 10–12px: Promotional banner corners (rare).
- 30–41px: Filter pills, tag chips, avatar circles.
- 50%: Avatars, icon backdrops.

The 2px default is superseded by the role-specific radii above; do not apply it. This scale is retained for history only.

### Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | <600px | Single column, full-width tables (horizontal scroll if needed), 16px gutters |
| Tablet | 600–1024px | 2-column card grids, 20px gutters |
| Desktop | 1024–1280px | Full marketing layout, 3-column feature grids |
| Large | >1280px | Centered content max-width ~1200px |

### Touch Targets
- Buttons minimum 42px height (default), 56px for hero display CTAs
- Table rows minimum 44px (slightly denser than 48px standard — the reference accepts a tighter tap)
- Filter pill chips: 28–32px height
- Input minimum 48px height; amount-input 56px

### Collapsing Strategy
- Hero: 52px → 36px on mobile, weight 700 maintained
- Marketing 3-col feature grids → 2-col → single column
- Comparison tables: maintain table form on tablet, switch to stacked cards on mobile (each row becomes a card with key/value pairs)
- Charts: full-width, maintain aspect ratio, axis-label font drops 12px → 10px on mobile
- Filter chip rows: horizontal scroll (no wrap) on mobile to preserve the chip rhythm

### Image Behavior
- Card/product logos: 24–40px, consistent square framing within rows
- Chart screenshots in marketing: full-width on mobile, 2-col on desktop
- Decorative illustrations: rare; when used, locked to a single accent illustration per landing surface (no illustration overload — data is the visual)

<!-- design-md:section content-locales -->
## 6. Content & Locales

### Voice & Tone

데일리롤 speaks like a reticent photo-studio owner quietly tidying an album: it says what happened in the frame, in short complete sentences, in everyday polite Korean (`~해요`). It never judges, pushes, or praises loudly. The habit name is the grammatical subject, and the copy never uses emoji or exclamation marks. Personality: calm (차분한), plain-spoken (담백한), orderly (정갈한), quietly kind (은근히 다정한).

| Context | Tone | Example |
|---|---|---|
| Onboarding / first screen | Minimal; one line at most, learn by using | `습관 이름과 주기를 정해요.` |
| Empty state | Say what will happen next, without urging | `습관을 만들면 여기에 칸이 생겨요.` |
| Success / completion | Habit name as subject, only what happened | `조깅이 한 칸 채워졌어요.` |
| Weekly wrap-up | Only what has gathered; never mention empty frames first | `이번 주는 사진 4장이 모였어요.` |
| Monthly share card | The plain fact that the result exists | `이번 달 카드가 만들어졌어요.` |
| Error / notice | What failed and the next action, one line | `사진을 불러오지 못했어요. 다시 시도해 주세요.` |
| Push notification | Minimal; Sunday-night weekly wrap-up only, plus anything the user turned on | `이번 주는 사진 4장이 모였어요.` |
| Landing / intro | Describe what it does; no slogan | `습관마다 사진으로 칸을 채우고, 한 주와 한 달을 돌아봐요.` |

The attributes stay fixed and only the amount of words changes by context: errors lean on orderliness (fact plus next step), empty states lean slightly warmer. Action labels reuse PRODUCT.md feature names (e.g., 습관 만들기) and never use a pushing imperative.

**Words to use:** 칸, 채워졌어요, 모였어요, 만들어졌어요, 놓였어요, 생겨요, 이번 주 / 이번 달, 사진 ○장, 쉬는 날, 그대로.

**Forbidden phrases:**
- Scoring: 달성, 달성률, 부족해요, 분발
- Streaks: 연속, 스트릭, 끊겼어요
- Guilt: 포기, 실패, 못 했어요
- Games and slogans: 챌린지, 미션, 클리어, 파이팅, 화이팅, Keep going, 갓생
- Diary vocabulary: 소중한, 따뜻한, 포근한
- Baby talk: 우쭈쭈, 최고예요, 대단해요
- Pushing imperatives: `~하세요!`
- One-word replies: `완료.`, `저장됨.`
- Pointing at empty frames first: 빈 칸이에요, 비어 있어요

Voice samples above come from VOICE.md and are unverified planning copy for a service that has not shipped. Habit-name subjects need 이/가 particle handling in implementation.

<!-- design-md:section governance -->
## 7. Governance

### Agent Prompt Guide

### Quick Color Reference
- Accent: `#13bd7e`
- Primary action fill: `#06a96c` (text `#ffffff`)
- Canvas: `#ffffff`
- Foreground: `#111111`
- Secondary text: `#555c68` / neutral `#606874`
- Muted metadata: `#9fa4b0`
- Line: `#f0f2f5`
- Neutral surface / skeleton: `#f5f5f5` (legacy measurement)
- Error: `#fe493d` (legacy value)

### Example Component Prompts
- "Create the primary action: full width, `#06a96c` background, `#ffffff` text, 16px radius, 16px 20px padding, 56px tall, Pretendard 16px/700. Hover adds a black overlay at 0.04 opacity; the fill does not change. Label with a feature name such as 습관 만들기."
- "Compose a habit strip on a white canvas: 24px containers with a 1px `#f0f2f5` border, flat frames with no shadow, photos supplying all the color, 안 한 날 and 쉬는 날 in neutral tones (never red or orange)."
- "Write feedback copy: habit name as subject, everyday polite Korean, no emoji, no exclamation mark — for example `조깅이 한 칸 채워졌어요.`"

### Iteration Guide
1. **Photos carry the color; the accent appears once per screen.** Never use it as a fill or decoration.
2. **Radius is role-specific: 6 / 16 / 24px.** If the AI produces 2px corners, reject — that is the superseded default.
3. **Body is 400, decisions are 700.** Headings and the primary action use 700; paragraphs never do.
4. **Shadows are neutral and single-layer; frames on the board are flat.**
5. **Empty and skipped frames are neutral, never an error color.**
6. **Pretendard with the full Korean fallback stack.** No BM JUA.
7. **Copy follows Voice & Tone.** No emoji, no exclamation marks, no forbidden phrases.

<details>
<summary>Superseded legacy guide — uses values that predate the current tokens, kept for audit history</summary>

### Quick Color Reference
- Primary CTA: Legacy Accent Green (`#04c584`)
- Hover: Legacy Hover Green (`#10df99`)
- Page background: White (`#ffffff`)
- Surface alt: Off-white (`#fbfbfb`)
- Neutral surface: (`#f5f5f5`)
- Heading text: Warm near-black (`#2b2b2b`)
- Body text: (`#434444`)
- Caption: (`#7b7b7b`)
- Placeholder: (`#999999`)
- Border: (`#e1e1e1`)
- Focus background tint: Mint (`#f3fdfa`)
- Chart series: `#34464b` / `#5c818a` / `#1c6c73` / `#a7c7cf`
- Error: `#fe493d`
- Warning: `#fd8700` / `#f56200`

### Example Component Prompts
- "Create a the reference-style primary CTA: `#04c584` background, white text, 2px border-radius (not 12px), 700-weight Pretendard at 16px, 12px 24px padding, 42px height. Hover lightens to `#10df99`."
- "Design a card-recommendation row: white background, 1px solid `#e1e1e1` border, 2px radius, 20px 24px padding, shadow `0 2px 5px rgba(0,0,0,.12)`. Card logo 32px left, title 16px/700 `#2b2b2b`, three filter chips below (`#f3fdfa` bg, `#04c584` text, 41px radius, 12px/500), annual-fee figure right-aligned 18px/700 with '원' suffix in 500."
- "Build a focused amount input: 2px border `#f5f5f5`, on focus border `#10df99` and background `#f3fdfa`. Text 22px/700 right-aligned, `#2b2b2b`, won unit in 500 weight following the digits."
- "Create a data chart: white background, axis labels 10px/500 `#7b7b7b`, gridlines 1px dashed `#e1e1e1`. Series 1 `#34464b`, series 2 `#5c818a`, series 3 `#1c6c73`. User's own data point in `#04c584` to make 'your value' pop against neutral teal-slate."
- "Design a transaction table row: alternating `#ffffff` / `#fbfbfb` background, 12px 16px padding, 1px solid `#e1e1e1` bottom border. Date column 14px/500 `#7b7b7b`, merchant 14px/500 `#434444`, amount right-aligned 14px/700 — `#2b2b2b` for positive, `#fe493d` for negative."

### Iteration Guide
1. **Default radius is 2px.** If the AI produces 12px or 16px corners, reject — that's Toss, not the reference.
2. **Default weight is 700 for anything important.** Headings, CTAs, financial amounts. 500 for body. Never 400 for body.
3. **Green is for interaction only.** Never use `#04c584` as a generic background fill or decorative element. It always means: the user can tap this, or this is the user's own data.
4. **Hover lightens.** `#04c584` → `#10df99` on hover (the opposite of conventional darken-on-hover). This is a signature.
5. **Shadows are neutral and single-layer.** `0 2px 5px rgba(0,0,0,.12)` is the workhorse. No colored shadows.
6. **Chart series are teal-slate, not green.** `#34464b` / `#5c818a` / `#1c6c73` / `#a7c7cf`. Reserve green for the user's own data point.
7. **Pretendard is non-negotiable.** Always include the full Korean fallback stack. Jua only for marketing display.

</details>


<!-- design-md:claim authority kind=evidence-backed-reconstruction lang=en -->

### Authority



This document adapts an evidence-backed reconstruction of a reference design system (Banksalad) for 데일리롤 (Daily Roll); it is not authority for an unrelated target project.

<!-- design-md:claim-end -->

<!-- design-md:claim application-priority order=prompt-fact,repository-fact,system-contract,reference-inspiration lang=en -->

### Application priority



1. Direct user instructions for the requested scope.

2. Repository facts.

3. This system contract.

4. Reference inspiration.

<!-- design-md:claim-end -->

<!-- design-md:claim unknowns policy=absent-at-smallest-unresolved-boundary lang=en -->

### Unknowns



Omit only the smallest unresolved value or group. Do not replace it with a plausible default.

<!-- design-md:claim-end -->

<!-- design-md:claim changes policy=review-record-validate-before-adoption lang=en -->

### Changes



Record, review, and validate changes before adoption.

<!-- design-md:claim-end -->
