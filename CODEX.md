# CODEX Session Handoff (IAT 210 Pancheesa Website)

## 1) Current Repo State (March 8, 2026)
Project root:
- `/Users/arpit/Developer/IAT_210`

Live Server static site:
- `/Users/arpit/Developer/IAT_210/index.html`
- `/Users/arpit/Developer/IAT_210/styles.css`
- `/Users/arpit/Developer/IAT_210/script.js`

Primary source docs:
- `/Users/arpit/Developer/IAT_210/Copy of IAT210 Group 6.md`
- `/Users/arpit/Developer/IAT_210/Copy of IAT210 Group 6.pdf`

Docs folder:
- Available: `/Users/arpit/Developer/IAT_210/docs/meeting-log.pdf`
- Context source retained: `/Users/arpit/Developer/IAT_210/docs/source-master-notes.pdf`

## 2) Locked Content Decisions (Do Not Revert)
- Game title is `Pancheesa`.
- Banner image must remain: `ChatGPT Image Mar 7, 2026, 01_31_16 AM.png`.
- Assignment section order is fixed and must remain `1 -> 15` in DOM/content order.
- Sections `9 -> 13` are minimal document-view sections.
- Meeting log opens in new tab: `docs/meeting-log.pdf` using `target="_blank" rel="noopener noreferrer"`.
- Missing PDFs must stay as disabled buttons until files are provided.
- Do not add angry-face emojis.
- Do not generate new narrative content unless explicitly requested.

## 3) Locked UI / IA Decisions (Current)
- 4 top-level tabs must remain:
  - `Home` for sections `1 -> 7`
  - `Components Gallery` for section `8`
  - `Logs & Analysis` for sections `9 -> 14`
  - `Contributions` for section `15`
- In-tab left navigation remains required for section jumps.
- No visible numbered labels (`1.`, `2.`, etc.) in headings/nav.
- Theme remains green/yellow, light mode.
- Main reading content uses a floaty/open feel (avoid heavy boxed section containers).
- Left rail style remains a floating dock feel.

## 4) Required Assignment Order (Preserved in `index.html`)
1. Banner image (main board)
2. Game title
3. One-sentence core statement
4. Trailer (embed or link)
5. Inspiration paragraph
6. Three pillars (What / Why / How)
7. Thematic backstory
8. Components gallery
9. Rulebook link (PDF)
10. Group meeting log link (PDF)
11. Playtesting log link (PDF)
12. Flowcharts link (PDF)
13. Quantitative analysis link (PDF)
14. Dynamics / trade-offs / dilemmas / typical playtime
15. Team contribution breakdown

Note:
- Section 8 currently includes a `Main Board` subsection at the top by explicit user request.

## 5) Document Button Logic (Current)
- Rulebook: disabled button (`View Rulebook PDF`) pending file.
- Meeting Log: active link button (`View Meeting Log PDF`) to `docs/meeting-log.pdf`, opens in new tab.
- Playtesting Log: disabled button pending file.
- Flowcharts: disabled button pending file.
- Quantitative Analysis: disabled button pending file.

Rule for future docs:
- If PDF exists, use active `<a>` button with `target="_blank" rel="noopener noreferrer"`.
- If PDF does not exist, keep disabled `<button>`.

## 6) Current Implemented State
Files most recently changed:
- `/Users/arpit/Developer/IAT_210/index.html`
- `/Users/arpit/Developer/IAT_210/styles.css`
- `/Users/arpit/Developer/IAT_210/script.js`

### Components Gallery (Section 8)
- Grouped visual structure:
  - Main Board
  - Action Cards (subgrouped by unit/class folders)
  - Reaction Cards
  - Hazard Cards
  - Tiles
  - Units
  - Web Exports
- Component left-rail nav includes anchors for all groups.
- Gallery uses lazy loading and async decoding for images.
- Current sizing:
  - Main board displayed prominently in wide single-column row.
  - Desktop card grids are 4 columns for readability.
  - Tablet 3 columns.
  - Mobile 2 columns.

### Navigation / Scrolling
- Tab/hash routing in `script.js` is preserved.
- Sidebar click scrolling uses sticky-header-aware offset.
- Active-link logic tracks actual nav targets per active tab (not only `section[id]`), so component subsection links highlight correctly.
- Reveal observer threshold lowered so large sections are not stuck invisible.

## 7) Content Completion Status
Available now:
- Banner image
- Title
- Core statement
- Inspiration
- Pillars
- Thematic backstory
- Components gallery (fully populated with local assets)
- Meeting-log PDF link
- Placeholder text for unfinished areas

Still missing inputs/files:
- Trailer URL/embed source
- `rulebook.pdf`
- `playtesting-log.pdf`
- `flowcharts.pdf`
- `quantitative-analysis.pdf`
- Final contributions breakdown content and percentages
- Final dynamics/trade-offs/typical playtime from playtests

## 8) Next-Session Guardrails
- Preserve assignment order and tab structure.
- Do not alter section logic for docs unless new files are provided.
- Do not rewrite narrative text unless explicitly asked.
- Keep plain HTML/CSS/JS compatible with Live Server.

## 9) Ready-to-Paste Prompt For Next CLI Session (General Standby)
Use this prompt:

```text
Project: /Users/arpit/Developer/IAT_210

Read /Users/arpit/Developer/IAT_210/CODEX.md first and preserve all locked content/UI decisions.
Do not make any changes yet.

Start by:
1) Confirming you understand the current constraints and implemented state.
2) Listing which files are likely relevant for future edits.
3) Waiting for my next instruction before editing.

Hard constraints to preserve unless I explicitly override:
- Plain HTML/CSS/JS for Live Server.
- Assignment order 1-15 in DOM remains unchanged.
- Game title remains Pancheesa.
- Banner image remains ChatGPT Image Mar 7, 2026, 01_31_16 AM.png.
- Sections 9-13 remain minimal document-view sections.
- Meeting log opens docs/meeting-log.pdf in a new tab.
- Missing PDFs remain disabled buttons.
- No angry-face emojis.
- No new narrative content unless requested.
- Keep 4 tabs and existing tab/hash/active-section logic.
```
