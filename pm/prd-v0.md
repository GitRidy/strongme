# PRD v0: Minimalist Workout Timer PWA - “StrongMe”

## 1. Product Overview

A lightweight, mobile-first web application designed for focused workout execution. The app serves as a digital version of a hand-drawn workout log, providing schedule context, exercise lists, and active set timers.

### Target Environment

- **Platform:** Web (PWA), optimized for Android Chrome (Add to Home Screen).
- **Deployment:** Vercel (or similar).
- **Data Source:** Static JSON file hosted on GitHub Pages.

------

## 2. Core Features (V0)

### 2.1 Schedule Navigation

- **Week Selection:** A tappable "Week" indicator (e.g., "A") that opens a simple drawer/modal to switch between different week configurations.
- **Day Selection:** A horizontal scrolling or fixed strip of days (1, 2, 3...). Tapping a day updates the exercise list.

### 2.2 Exercise List

- **Display:** List of 5 exercises (a-e) parsed from the JSON.
- **Details:** Shows name, volume (sets/reps), and an info icon `(i)`.
- **Selection:** Tapping an exercise list item "activates" it, updating the Timer Console at the bottom.

### 2.3 Timer Console

- **Context:** Displays the currently selected exercise name and progress (e.g., Set 2 of 3).
- **Dual Timers:** * **Prepare:** A 15s countdown (visual ring + numeric).
  - **Work:** A 45s countdown (visual ring + numeric).
- **Audio:** Simple beep/ping notification at the transition from Prepare to Work and at the end of Work.

### 2.4 Information Overlays

- **Exercise Detail:** Tapping `(i)` triggers a slide-up bottom sheet containing the exercise description/notes from the JSON.

------

## 3. Technical Architecture

### 3.1 Data Schema (`workout_data.json`)

The app will fetch this structure:

JSON

```
{
  "weeks": {
    "A": {
      "days": [
        {
          "day_id": 3,
          "focus": "Lower push focus",
          "exercises": [
            { "id": "a", "name": "Horizontal Barbell Press", "volume": "3 x 11r", "prep": 15, "work": 45, "notes": "Keep elbows tucked." },
            { "id": "b", "name": "Dead Bugs", "volume": "3 x 10r", "prep": 15, "work": 45, "notes": "Push lower back into floor." }
          ]
        }
      ]
    }
  }
}
```

### 3.2 Stack

- **Framework:** React or Preact (lightweight for PWA).
- **Styling:** Tailwind CSS (for rapid layout and mobile-first responsiveness).
- **PWA:** `manifest.json` and a Service Worker for offline caching and "Install" prompt.

------

## 4. UI/UX Specifications

### 4.1 Structure (Vertical Stack)

1. **Header (15%):** Navigation context (Week/Day).
2. **Menu (45%):** List `a` through `e`. Current exercise highlighted.
3. **Console (40%):** Fixed-bottom dashboard with dual timers.

### 4.2 Aesthetics

- **Background:** Neutral off-white/light grey.
- **Accent:** Performance Blue (#007AFF) for active states and rings.
- **Typography:** Sans-serif (System stack: Inter/Roboto).

------

## 5. Success Criteria for V0

1. App installs on Android home screen via Chrome.
2. App successfully fetches and renders data from the GitHub Pages JSON.
3. Timers function accurately and play sound alerts even if the screen is dimmed (where possible via browser API).
4. Switching Day/Week updates the list without page refresh.

