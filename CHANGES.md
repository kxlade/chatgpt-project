# Phase 1 audit and fixes

This log explains the original issue, why it mattered, and the correction. “Original” describes the code before this audit, including fixes completed earlier in this task.

## Application and routes

| File | What was originally written | Why it was wrong | What changed |
| --- | --- | --- | --- |
| `src/App.jsx` | `App` created `active` and `activeBuildFilter` state and passed four related props to `Sidebar`. | `Sidebar` did not use the category props, so the state and callbacks did not affect the interface and made the component contract misleading. | Removed the unused state and props, leaving `<Sidebar />`. Added explicit `/connectors` and `/extensions` routes so those destinations no longer fall through to Home. |
| `src/components/Sidebar.jsx`, `src/styles/glass.css`, `src/components/GlassPointerGlow.js` | “More…” was a `<select type="button">` with `aria-pressed`, `onClick`, and options all using `value=""`; its trigger was styled/named as a build filter. | `type`, `aria-pressed`, and click handling do not turn a native select into a button. Empty option values also make selected destinations indistinguishable. The menu did not navigate meaningfully, and build-filter terminology described behavior that did not exist. | Replaced it with a button exposing `aria-haspopup="menu"` and `aria-expanded`, and a menu of actual React Router links. Added outside-click and Escape dismissal. Removed dead filter state/props and renamed the styling/glow target to `more-trigger`. |
| `src/pages/Connectors.jsx` | No route or page existed. | The sidebar destination had no matching route and fell through to the catch-all redirect. | Added a small placeholder page explaining the destination. |
| `src/pages/Extensions.jsx` | No route or page existed. | The sidebar destination had no matching route and fell through to the catch-all redirect. | Added a small placeholder page explaining the destination. |
| `src/components/Sidebar.jsx` | The resize effect scheduled `setTimeout` without keeping its ID. | If the sidebar unmounted before the timer fired, the callback could still update component state. | Kept the timer ID in a ref, clears an earlier timer before scheduling another, and clears it on unmount. |
| `src/components/Navbar.jsx` | Declared `Navbar` without a default export. | A default import from this module could not work. | Added `export default Navbar`. It remains a currently unused placeholder component. |
| `src/components/BottomNav.jsx` | Rendered an empty `<div>` on every screen. | The element had no content or behavior and created meaningless markup. | Replaced the empty output with `null` until the mobile navigation phase implements it. |
| `src/pages/Home.jsx` | Hard-coded “Zion” and retained a commented-out `prompt()`. | The greeting was personal data baked into the UI, and a prompt is intrusive and blocks normal page interaction. | This was identified in the audit; the onboarding replacement belongs to the separately requested Phase 3 and has not been implemented in this Phase 1 continuation. |
| `src/pages/NewChat.jsx` | The heading contained garbled emoji encoding in the original file. | Mojibake is a sign that text was saved/read using inconsistent character encodings and appears broken to users. | Earlier inspection showed the file now displays the emoji correctly; retained it. |

## Styles and interaction

| File | What was originally written | Why it was wrong | What changed |
| --- | --- | --- | --- |
| `src/styles/global.css` | Applied `touch-action: none`, `user-select: none`, and a custom green cursor globally to `body`. | Blocking touch gestures can prevent scrolling; disabling selection harms reading and editing; a custom pointer is inappropriate for touch devices. | Restored the green cursor only inside `@media (hover: hover) and (pointer: fine)`. Removed the global touch/selection restrictions and explicitly allow text selection in `input`, `textarea`, and `[contenteditable]` controls. |
| `src/styles/layout.css` | Sized `.sidebar` only with `100vh`. | On mobile browsers the visible viewport changes as browser chrome and keyboards appear, while `100vh` may represent the larger layout viewport. | Kept `100vh` as a fallback and followed it with `100dvh` for browsers that support the dynamic viewport unit. |
| `src/styles/layout.css`, `src/components/Sidebar.jsx` | Used `recents_list` for a CSS class name. | Underscore naming was inconsistent with the project's kebab-case class names. | Renamed the class and selector to `recents-list`. |
| `src/styles/glass.css` | Included rules for `.tab`, `.navbar`, `.engagement-action`, and `.about-back`. | A project-wide search found no JSX/HTML uses of those classes, so those declarations were leftover styling with no effect and increased maintenance noise. | Removed the unused selectors and their associated rules. Kept glass effects for `.btn`, `.build-filter`, `.nav-link`, `.bottom-nav`, and `.bottom-nav-lens`, which are used or reserved by the existing UI. |
| `src/styles/glass.css` | Set `touch-action: none` and disabled text selection on `.bottom-nav`. | A navigation bar does not need to suppress browser touch behavior or text selection globally. | Removed those restrictions; touch scrolling and normal selection are left to the browser. |
| `src/styles/layout.css` | Recents hover styling used a nested selector inside a normal CSS rule. | Native CSS nesting is not supported consistently in every target browser. | Rewrote the hover selector as a regular `.recents-list li:hover` rule. |

## Unused files and page metadata

| File | What was originally written | Why it was wrong | What changed |
| --- | --- | --- | --- |
| `src/main.jsx`, `src/index.css` | `main.jsx` imported an empty stylesheet. | The import did not provide styles and implied a second global stylesheet was in use. | Removed the import and deleted the empty file. |
| `src/App.css` | Empty stylesheet remained in the source tree. | It contained no rules and was not imported. | Deleted after confirming no references. |
| `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg` | Starter/placeholder assets remained in the project. | A project-wide reference search found no imports or links using them. | Deleted the three unused files. Kept `favicon.svg`, which is referenced by `index.html`, and the PNGs still present under `src/assets`. |
| `index.html` | Browser tab title was `chatgpt-project`. | The generic scaffold name looks unfinished and does not describe the app. | Updated the title to `ChatGPT Workspace` (completed earlier in this task). |

## Verification

- Started Vite and visited `/`, `/newchat`, `/images`, `/library`, `/plugins`, `/codex`, `/connectors`, and `/extensions` in the browser.
- Captured browser `console` warnings/errors and page errors while loading every route: none were reported.
- Ran `npm run lint` and `npm run build` after completing Phase 1; both passed.
