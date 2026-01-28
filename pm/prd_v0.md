# PRD v0: Minimalist Workout Timer PWA - "StrongMe"

*RevF*

## 1. Product Overview

A lightweight, mobile-first web application designed for focused workout execution. The app draws on pre-defined workout plans via JSON files, providing context in terms of current campaign, week plan, and day plan. For a given day plan, the app presents a pre-defined list of activities and provides set timers as the user moves through the activities of the day plan.

### Target Environment

- **Platform:** Web (PWA), optimized for Android Chrome (Add to Home Screen).
- **Deployment:** Vercel.
- **Data Source:** Workout plan and exercise info stored in static JSON files hosted on GitHub Pages.

## 2. Core Features (V0)

### 2.1 Data Model

- **Campaigns:** Multi-week training programs designed to achieve a stated goal via a stated strategy. Each campaign contains an ordered list of weeks, where each week references a week plan.
  - Fields: id, name, goal, strategy, duration_weeks, notes, weeks[]
  - Each week entry: week_num, weekplan_id
- **Week Plans:** Templates defining 7 days of training, where each day either references a day plan or is a rest day (null).
  - Fields: id, nickname, description, day1_dayplan_id through day7_dayplan_id
  - A day with no assigned dayplan_id (null) is interpreted as a rest day
  - Nickname examples: `DB Foc`, `DB Iso 1`, `FB Cali`
  - Description examples: `Dumbbell Focus`, `Dumbbell Isolation 1`, `Full Body Calisthenics`
- **Day Plans:** Ordered lists of activities for a single training session. Each day plan contains its activities inline.
  - Fields: id, nickname, description, activities[]
  - Each activity entry: activity_num, activity_id, target_sets, target_reps, seconds_prep, seconds_work, seconds_rest
  - `target_reps` is an integer array. A single-element array (e.g., `[10]`) means all sets use that rep count. A multi-element array (e.g., `[10, 9, 8]`) specifies reps per set.
- **Activities:** Exercise definitions stored in a separate reference file.
  - Fields: id, code, name, description, tips[], icon_filename, photo_filename
  - Example: `{ id: "a7", code: "HDbP", name: "Horizontal Dumbbell Press", ... }`

### Not in V0

- **Done Log**: A chronological log of completed activities, day plans, week plans, and campaigns with ability to track results (reps, times, etc.)

### 2.2 Schedule Navigation

- **Campaign Bar**: Current campaign name. Tapping reveals a drawer with further campaign details.
- **Campaign Weeks Bar:** A horizontal fixed strip of campaign week numbers, with the active week highlighted and completed weeks showing as solid. Tapping on a week number shows the assigned week plan for that week in the Week Plan Bar.
- **Week Plan Bar**: Horizontal fixed strip of 7 days of the week, with the active day highlighted and completed days showing as solid. Tapping on a day shows the activities of the assigned day plan in the Day Plan Section.

### 2.3 Exercise List

- **Day Plan Section**: A vertical stack of numbered activities showing activity number (1 for the day's first activity), activity icon, activity name, target sets × reps, target times (prep|work|rest), and an info icon `(i)`.
- Show set×rep counts in this format: `3 × 10`
  - Where reps differ between sets, use this format: `3 × 10|9|8`
  - Underlying data uses integer arrays: `[10]` for uniform, `[10, 9, 8]` for varied
- Show prep|work|rest times in seconds, with `—` for zero, in this format: `5|45|10` or `—|60|—`
- For rest activities, don't show set×rep or time counts
- **Selection:** Tapping an exercise list item "activates" it, updating the Timer Console at the bottom.

### 2.4 Timer Console

- **Layout:** Split into main timer area (~75%) and next activity preview (~25%).
- **Context:** Main area displays currently selected exercise name and progress (e.g., "Set 2 of 3").
- **Countdown Number:** Large, centered above progress bar, colored by current stage.
- **Progress Bar:** Horizontal bar divided into 3 proportional segments (prep, work, rest). Completed stages show solid fill. Active stage fills progressively left-to-right as time elapses. Pending stages show as unfilled/muted.
- **Next Activity Preview:** Right-side panel showing "NEXT" label, upcoming activity name, and volume (e.g., `3 × 10`). On final activity, shows "Done" or session complete state.
- **Interaction:** Tap anywhere in timer console to toggle between paused and active.
- **Stage Transition:** Brief white flash overlay when advancing to next stage.
- **Audio Indicator:** None in V0.

### 2.5 Information Overlays

- **Exercise Detail:** Tapping `(i)` triggers a slide-up bottom sheet containing the exercise description and tips from the JSON.

## 3. Technical Architecture

### 3.1 Data Schema

Data is stored as static JSON files hosted on GitHub Pages:

Base URL: https://gitridy.github.io/strongme/data/

```
/data
  /campaigns.json
  /weekplans.json
  /dayplans.json
  /activities.json
```

**`campaigns.json`**

```json
{
  "campaigns": [
    {
      "id": "c1",
      "name": "Summer Strength",
      "goal": "Build foundational strength",
      "strategy": "Progressive overload with compound movements",
      "duration_weeks": 8,
      "notes": "Focus on form first 2 weeks",
      "weeks": [
        { "week_num": 1, "weekplan_id": "wp1" },
        { "week_num": 2, "weekplan_id": "wp1" },
        { "week_num": 3, "weekplan_id": "wp2" }
      ]
    }
  ]
}
```

**`weekplans.json`**

```json
{
  "weekplans": [
    {
      "id": "wp1",
      "nickname": "DB Foc",
      "description": "Dumbbell Focus",
      "day1_dayplan_id": "dp1",
      "day2_dayplan_id": null,
      "day3_dayplan_id": "dp2",
      "day4_dayplan_id": null,
      "day5_dayplan_id": "dp1",
      "day6_dayplan_id": "dp3",
      "day7_dayplan_id": null
    }
  ]
}
```

**`dayplans.json`**

```json
{
  "dayplans": [
    {
      "id": "dp1",
      "nickname": "Upper A",
      "description": "Upper body push focus",
      "activities": [
        {
          "activity_num": 1,
          "activity_id": "a7",
          "target_sets": 3,
          "target_reps": [10],
          "seconds_prep": 5,
          "seconds_work": 45,
          "seconds_rest": 60
        },
        {
          "activity_num": 2,
          "activity_id": "a3",
          "target_sets": 3,
          "target_reps": [10, 9, 8],
          "seconds_prep": 5,
          "seconds_work": 40,
          "seconds_rest": 45
        }
      ]
    }
  ]
}
```

**`activities.json`**

```json
{
  "activities": [
    {
      "id": "a7",
      "code": "HDbP",
      "name": "Horizontal Dumbbell Press",
      "description": "Horizontal bench press with dumbbells",
      "tips": [
        "Keep feet wide and planted",
        "Slow & controlled return",
        "Full range of motion"
      ],
      "icon_filename": "hdp-icon.svg",
      "photo_filename": "hdp-photo.jpg"
    },
    {
      "id": "a3",
      "code": "DB",
      "name": "Dead Bugs",
      "description": "Core stability exercise with alternating limb extension",
      "tips": [
        "Push lower back into floor",
        "Move slowly",
        "Breathe out on extension"
      ],
      "icon_filename": "db-icon.svg",
      "photo_filename": "db-photo.jpg"
    },
    {
      "id": "rest",
      "code": "REST",
      "name": "Rest",
      "description": "Recovery period",
      "tips": [],
      "icon_filename": "rest-icon.svg",
      "photo_filename": null
    }
  ]
}
```

### 3.2 Stack

- **Framework:** Preact (smaller bundle than React, ideal for PWA)
- **Styling:** Tailwind CSS (mobile-first utility classes)
- **State:** Preact Signals or simple useState (no external state library needed)
- **Build:** Vite (fast builds, excellent PWA plugin support)
- **PWA:** `vite-plugin-pwa` for manifest generation and service worker
- **Deployment:** Vercel (zero-config for Vite projects)

### 3.3 Data Fetching Strategy

1. On app load, fetch all four JSON files in parallel
2. Service worker caches JSON files for offline use
3. Build activity lookup map client-side for efficient exercise resolution
4. Store active campaign/week/day selection in localStorage for session persistence

## 4. UI/UX Specifications

### 4.1 Layout Structure (Vertical Stack)

| Zone               | Height | Content                                  |
| ------------------ | ------ | ---------------------------------------- |
| Campaign Bar       | ~5%    | Campaign name, tap for drawer            |
| Campaign Weeks Bar | ~8%    | Horizontal scrollable week numbers       |
| Week Plan Bar      | ~8%    | 7-day strip (Mon–Sun)                    |
| Day Plan Section   | ~44%   | Scrollable activity list                 |
| Timer Console      | ~35%   | Progress bar + countdown + next activity |

### 4.2 Component Details

**Campaign Bar**

- Displays campaign name (e.g., "Summer Strength")
- Tap to reveal slide-down drawer with goal, strategy, duration, notes
- Subtle chevron indicator for expandability

**Campaign Weeks Bar**

- Horizontal strip of numbered boxes (1, 2, 3, … n)
- States: default (outline), active (filled accent), completed (filled muted)
- Horizontally scrollable if weeks exceed viewport
- Tap week → updates Week Plan Bar to show that week's assigned weekplan

**Week Plan Bar**

- 7 fixed-width day cells labeled M T W T F S S
- States: rest day (dimmed/striped), active (accent border), completed (solid fill)
- Tap day → updates Day Plan Section with that day's activities
- Rest days (null dayplan_id) show as non-interactive

**Day Plan Section**

- Vertical scrollable list of activity cards
- Each card displays: activity number, icon, name, set×rep (e.g., `3 x 10`), times (e.g., `5|45|60`), info button
- Rest activities show name only, no counts
- Tap card → activates that exercise in Timer Console
- Tap `(i)` → opens Exercise Detail bottom sheet

**Timer Console**

- Fixed to bottom of viewport, split 75/25 between main timer and next activity preview

​	*Main Timer Area (left):*
- **Context line:** Exercise name + "Set X of Y"
- **Countdown:** Large centered number, colored by current stage (purple/cyan/orange)
- **Progress bar:** Thin horizontal bar (~12–16px) with 3 segments proportional to stage durations
  - Completed stages: solid fill (stage color)
  - Active stage: progressive fill advancing left-to-right
  - Pending stages: muted/unfilled
  - Segment dividers: subtle vertical hairlines
- **Interaction:** Tap anywhere to toggle play/pause
- **Stage transition:** Brief white flash overlay

​	*Next Activity Preview (right):*
- **Label:** "NEXT" in muted small caps
- **Activity name:** Upcoming exercise name
- **Volume:** Sets × reps or duration (e.g., `3 × 10` or `2 × 60s`)
- **Final activity state:** Shows "Done" when no next activity exists
- **Styling:** Muted/secondary treatment to avoid competing with active timer

### 4.3 Aesthetics

| Element            | Value                                                    |
| ------------------ | -------------------------------------------------------- |
| Background         | `#0A0A0C` (near-black)                                   |
| Surface/Cards      | `#141418`                                                |
| Surface Elevated   | `#1C1C21`                                                |
| Surface Border     | `rgba(255, 255, 255, 0.08)`                              |
| Accent (active)    | `#00D4FF` (Cyan)                                         |
| Accent Soft        | `rgba(0, 212, 255, 0.12)`                                |
| Accent Muted       | `rgba(0, 212, 255, 0.25)`                                |
| Accent Glow        | `rgba(0, 212, 255, 0.4)`                                 |
| Prep stage         | `#A855F7` (Purple)                                       |
| Work stage         | `#00D4FF` (Cyan)                                         |
| Rest stage         | `#F97316` (Orange)                                       |
| Text Primary       | `#FFFFFF`                                                |
| Text Secondary     | `#A1A1AA`                                                |
| Text Tertiary      | `#52525B`                                                |
| Text Muted         | `#3F3F46`                                                |
| Completed state    | `#3F3F46` (background), `#71717A` (text)                 |
| Icon Exercise      | `#FBBF24` (Amber)                                        |
| Icon Core          | `#34D399` (Emerald)                                      |
| Icon Rest          | `#F87171` (Red)                                          |
| Typography         | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` |
| Border radius (sm) | `8px`                                                    |
| Border radius (md) | `12px`                                                   |
| Border radius (lg) | `16px`                                                   |
| Border radius (xl) | `24px`                                                   |
| Progress bar bg    | `#1C1C21` (surface elevated, unfilled segments)          |

**Formatting conventions:**

- Set×rep display: `3 × 10` (multiplication sign, not letter x)
- Zero time indicator: `—` (em-dash, not hyphen)
- Times format: `5|45|60` or `—|60|—`

### 4.4 Information Overlays

**Exercise Detail Bottom Sheet**

- Triggered by `(i)` icon tap
- Slides up from bottom, covers ~60% of screen
- Contains: exercise name, description, tips (bulleted), photo if available
- Dismiss via swipe-down or tap outside

**Campaign Drawer**

- Triggered by Campaign Bar tap
- Slides down from Campaign Bar
- Contains: goal, strategy, duration, notes
- Dismiss via tap on Campaign Bar or outside

**Error States**

| Scenario                        | Behavior                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| Network fetch fails (online)    | Show retry button + "Couldn't load workout data"             |
| Offline, no cache               | Show "You're offline. Open the app online first to cache workouts." |
| Missing `activity_id` reference | Skip activity, log warning to console, continue rendering    |
| Empty day plan                  | Show "Rest day" state                                        |

## 5. Loading & Viewport

### First Load Experience

1. Show centered app logo + spinner while fetching
2. If >3 seconds, add "Loading workouts..." text
3. On success, transition to default view (current week, current day)
4. On failure, show error state (above)

### Viewport / Device Handling

Add to `index.html`:

html

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Add to global CSS:

css

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## 6. Success Criteria for V0

1. **Installable:** App installs to Android home screen via Chrome "Add to Home Screen"
2. **Data loading:** App fetches and correctly parses all four JSON files from GitHub Pages
3. **Navigation:** Tapping week numbers and days updates displayed content without page refresh
4. **Timer accuracy:** Countdown timer is accurate within ±0.5 seconds over a 60-second period
5. **Stage transitions:** Visual flash indicator fires on each stage change (prep→work→rest)
6. **Offline capable:** App loads and displays cached data when offline
7. **Responsive:** UI renders correctly on viewport widths 320px–428px (typical Android phones)
8. **State persistence:** Selected campaign/week/day survives app close and reopen

## 7. Future Considerations (Post-V0)

- **Done Log:** Track completed activities, sets, reps, and timestamps
- **Audio cues:** Stage transition beeps/chimes
- **Campaign progress:** Visual progress bar on Campaign Bar
- **Exercise substitutions:** Allow swapping exercises within a day plan
- **Custom campaigns:** User-created campaigns via in-app editor
- **Sync:** Cloud backup of done log and preferences
