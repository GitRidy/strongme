# PRD v0: Minimalist Workout Timer PWA - "StrongMe"

*RevC*

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
- Show set×rep counts in this format: `3 x 10`
  - Where reps differ between sets, use this format: `3 x 10|9|8`
  - Underlying data uses integer arrays: `[10]` for uniform, `[10, 9, 8]` for varied
- Show prep|work|rest times in seconds, with `-` for zero, in this format: `5|45|10` or `-|60|-`
- For rest activities, don't show set×rep or time counts
- **Selection:** Tapping an exercise list item "activates" it, updating the Timer Console at the bottom.

### 2.4 Timer Console

- **Context:** Displays the currently selected exercise name and progress (e.g., "Set 2 of 3").
- **Split Timer:** The timer comprises a thick ring in 3 arc sections, each representing a stage: purple for prep, blue for work, red for rest. In the center of the ring is a large number, colored according to the current stage and counting down while active. Tapping anywhere in the timer console section toggles the timer between paused and active.
- **Stage Start Flash Indicator**: On starting a new stage, the timer briefly flashes white.
- **Stage Start Audio Indicator:** None in V0.

### 2.5 Information Overlays

- **Exercise Detail:** Tapping `(i)` triggers a slide-up bottom sheet containing the exercise description and tips from the JSON.

## 3. Technical Architecture

### 3.1 Data Schema

Data is stored as static JSON files hosted on GitHub Pages:

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

| Zone               | Height | Content                            |
| ------------------ | ------ | ---------------------------------- |
| Campaign Bar       | ~5%    | Campaign name, tap for drawer      |
| Campaign Weeks Bar | ~8%    | Horizontal scrollable week numbers |
| Week Plan Bar      | ~8%    | 7-day strip (Mon–Sun)              |
| Day Plan Section   | ~39%   | Scrollable activity list           |
| Timer Console      | ~40%   | Ring timer + controls              |

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

- Fixed to bottom of viewport
- **Context line:** Exercise name + "Set X of Y"
- **Ring timer:** Three-segment arc (prep purple, work blue, rest red), proportional to durations
- **Center display:** Large countdown number, colored by current stage
- **Interaction:** Tap anywhere to toggle play/pause
- **Stage transition:** Brief white flash overlay

### 4.3 Aesthetics

| Element         | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Background      | `#F5F5F5` (neutral light grey)                               |
| Surface/Cards   | `#FFFFFF`                                                    |
| Accent (active) | `#007AFF` (Performance Blue)                                 |
| Prep stage      | `#8B5CF6` (Purple)                                           |
| Work stage      | `#3B82F6` (Blue)                                             |
| Rest stage      | `#EF4444` (Red)                                              |
| Completed state | `#9CA3AF` (Muted grey)                                       |
| Typography      | System stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| Border radius   | `8px` (cards), `full` (timer ring)                           |

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

## 5. Success Criteria for V0

1. **Installable:** App installs to Android home screen via Chrome "Add to Home Screen"
2. **Data loading:** App fetches and correctly parses all four JSON files from GitHub Pages
3. **Navigation:** Tapping week numbers and days updates displayed content without page refresh
4. **Timer accuracy:** Countdown timer is accurate within ±0.5 seconds over a 60-second period
5. **Stage transitions:** Visual flash indicator fires on each stage change (prep→work→rest)
6. **Offline capable:** App loads and displays cached data when offline
7. **Responsive:** UI renders correctly on viewport widths 320px–428px (typical Android phones)
8. **State persistence:** Selected campaign/week/day survives app close and reopen

## 6. Future Considerations (Post-V0)

- **Done Log:** Track completed activities, sets, reps, and timestamps
- **Audio cues:** Stage transition beeps/chimes
- **Campaign progress:** Visual progress bar on Campaign Bar
- **Exercise substitutions:** Allow swapping exercises within a day plan
- **Custom campaigns:** User-created campaigns via in-app editor
- **Sync:** Cloud backup of done log and preferences
