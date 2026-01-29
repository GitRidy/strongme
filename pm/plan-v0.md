# Plan v0: StrongMe Implementation Plan

## Phase 1 — Project Scaffold

1. Initialize Preact + Vite project (`npm create preact`)
2. Install dependencies: `tailwindcss`, `vite-plugin-pwa`, `@preact/signals`
3. Configure Tailwind with design tokens from PRD (colors, fonts, radii)
4. Configure `vite-plugin-pwa` with manifest (name, icons, theme color, display: standalone)
5. Add viewport meta tag and safe-area CSS per PRD §5
6. Set up folder structure: `src/components`, `src/pages`, `src/hooks`, `src/utils`, `src/data`

## Phase 2 — Data Layer

1. Create `src/hooks/use_data.js` — fetch all four JSON files in parallel from GitHub Pages base URL (`https://gitridy.github.io/strongme/`)
2. Build activity lookup map (`Map<id, activity>`) for O(1) resolution
3. Store fetched data in Preact signals for global access
4. Create `src/hooks/use_session.js` — read/write selected campaign, week, day to `localStorage`
5. Handle error states: network failure, offline with no cache, missing activity references

## Phase 3 — Navigation Components

1. **`CampaignBar.jsx`** — display campaign name, tap to toggle campaign drawer
2. **`CampaignDrawer.jsx`** — slide-down overlay showing goal, strategy, duration, notes
3. **`WeekStrip.jsx`** — horizontal scrollable week number pills; tap selects week; states: default, active, completed
4. **`DayStrip.jsx`** — 7 fixed-width day cells (M T W T F S S); tap selects day; rest days dimmed/non-interactive

## Phase 4 — Activity List

1. **`ActivityList.jsx`** — scrollable vertical stack of `ActivityCard` components
2. **`ActivityCard.jsx`** — displays: activity number, icon, name, sets × reps (`3 × 10` or `3 × 10|9|8`), times (`5|45|60`), info button `(i)`
   - Rest activities: name only, no counts
   - Tap card → set as active in Timer Console
   - Tap `(i)` → open exercise detail sheet
3. **`ExerciseDetailSheet.jsx`** — bottom sheet (~60% height) with description, tips, photo; dismiss via swipe-down or tap outside

## Phase 5 — Timer Console

1. **`TimerConsole.jsx`** — fixed bottom panel, split 75/25
2. **Timer state machine** (`src/hooks/use_timer.js`):
   - States: `idle`, `prep`, `work`, `rest`, `paused`, `set_complete`, `activity_complete`
   - On activity select → load `seconds_prep`, `seconds_work`, `seconds_rest`, `target_sets`
   - Count down each stage; auto-advance `prep → work → rest`; repeat for each set
   - Track current set number
   - Tap to toggle play/pause
3. **Countdown display** — large number colored by stage (purple prep, cyan work, orange rest)
4. **Progress bar** — 3 segments proportional to stage durations; filled/active/pending states
5. **Stage transition** — brief white flash overlay on stage change
6. **`NextActivityPreview.jsx`** — right panel showing "NEXT" label, upcoming activity name + volume; "Done" on final activity

## Phase 6 — Loading & Offline

1. **Loading screen** — centered logo + spinner; "Loading workouts..." after 3s
2. **Service worker** — `vite-plugin-pwa` caches JSON files and app shell
3. **Offline fallback** — detect offline + no cache → show message per PRD §4.4
4. Test offline behavior: load app online, go offline, reload

## Phase 7 — Polish & Deploy

1. Test on viewport widths 320px–428px
2. Verify timer accuracy (±0.5s over 60s)
3. Verify localStorage persistence across app close/reopen
4. Configure Vercel deployment
5. Test "Add to Home Screen" install flow on Android Chrome

## File Map (estimated)

```
src/
  main.jsx
  app.jsx
  index.css                  # Tailwind base + design tokens
  components/
    CampaignBar.jsx
    CampaignDrawer.jsx
    WeekStrip.jsx
    DayStrip.jsx
    ActivityList.jsx
    ActivityCard.jsx
    ExerciseDetailSheet.jsx
    TimerConsole.jsx
    NextActivityPreview.jsx
    ProgressBar.jsx
    LoadingScreen.jsx
  hooks/
    use_data.js
    use_session.js
    use_timer.js
  utils/
    format.js               # set×rep formatting, time formatting
```

## Dependencies

```
preact
@preact/signals
tailwindcss @tailwindcss/vite
vite vite-plugin-pwa
```

## Decisions

1. **Default view on load:** Today's day of week (derive from `Date.getDay()`)
2. **Icons/photos:** Placeholder only for v0 (generic SVG icons per activity category)
3. **Completion tracking:** Track completed weeks/days in localStorage ahead of Done Log
