# design.md v0  |  StrongMe

### Layer 1: Overall Structure (The Blueprint)

The app uses a **Single-Screen Vertical Stack** with three distinct zones. The layout is "bottom-heavy," meaning the interactive controls (timers) are prioritized at the bottom for easy thumb access.

- **Fixed Header (Top 15%):** Contextual navigation (Week/Day).
- **Scrollable Menu (Middle 45%):** A list of tasks for the session. This area is the "menu" where users select their current focus.
- **Active Performance Console (Bottom 40%):** A high-contrast dashboard for the currently selected exercise, featuring large, glanceable timers.

------

### Layer 2: Section Details (The Contents)

#### A. Header: Navigation Context

- **Week Selector:** On the left, a large, bold letter **"A"**. It should look like a button (perhaps with a subtle chevron or shadow) to indicate it can be tapped to reveal a drawer/list of other week arrangements (B, C, etc.).
- **Day Strip:** A horizontal row of numbers (1, 2, 3, 4, 5...). **"3"** is prominently circled or encased in a "pill" shape to show it is the active day.
- **Session Subtitle:** Directly below the navigation, a clear header: **"A3 / Lower push focus"**.

#### B. The Exercise List (Items a-e)

Each row in the list is a single horizontal unit containing:

1. **Label:** Lowercase letters (**a.** through **e.**) to denote order.
2. **Name:** The full name of the exercise (e.g., "Horizontal Barbell Press").
3. **Info Trigger:** A small, blue or grey circled **(i)** icon immediately following the name.
4. **Volume:** On the far right, the prescription (e.g., **3 x 11r** or **2 x 60s**).
5. **Selection Highlight:** The row for **b. Dead Bugs** is visually distinct (colored background or border) to show it is the current "live" exercise.

#### C. The Timer Console (The Footer)

This section mirrors the selected exercise's data for redundancy:

- **Identity:** Large text reading **"Dead Bugs"** on the left and the set count **"2 / 3 x 10r"** on the right.
- **The Dual Timers:** Two side-by-side circular gauges.
  - **Left (Prepare):** Smaller, labeled "PREPARE" with "15s" in the center. A progress ring depletes as time runs out.
  - **Right (Work):** Larger, labeled "WORK" with "45s" in the center. This is the primary focal point of the screen during a set.

------

### Layer 3: Aesthetics (The Style)

- **Typography:** Use a clean, professional **Sans-Serif font** (like Inter, Roboto, or San Francisco). Use "Semi-bold" for headers and "Regular" for the list.
- **Color Palette:**
  - **Background:** Neutral (Light Grey or Off-White) to reduce eye strain.
  - **Primary Accent:** A "Performance Blue" used for the active selection, the info icons, and the timer progress rings.
  - **Text:** Dark Charcoal (#333333) for high readability, with lighter grey for labels like "PREPARE" and "WORK".
- **Visual Elements:**
  - **Corner Radii:** Use rounded corners (approx. 8px to 12px) on the list selection box and the timer container to give it a modern, "app-like" feel.
  - **Hierarchy:** The "Work" timer should have a thicker stroke or more vibrant color than the "Prepare" timer to signify its importance.