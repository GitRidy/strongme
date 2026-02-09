# Spacing & Layout Adjustments — Priority 5

Based on screenshot review (2026-01-29).

## ~~1. Eliminate dead space below activity list~~
~~The activity list only fills ~1/3 of its allocated 44% zone, leaving a large empty black gap before the timer console. The list container should shrink-to-fit or the timer console should float up so there's no visible void between the last activity card and the timer.~~
**Done** — Removed `flex-1` from ActivityList, added `flex flex-col h-screen` wrapper in App so TimerConsole floats up.

## ~~2. Give the timer console more vertical breathing room~~
~~The timer countdown area is cramped — the stage label ("PREP"), countdown number, progress bar, and "TAP TO PAUSE" are stacked too tightly. Increase internal padding (especially above the stage label and below "TAP TO PAUSE") so the console feels more spacious and the large countdown digit has room to breathe.~~
**Done** — Increased outer padding (24px→28px), gap between stage label and countdown (1.5→2.5), and progress bar margins (my-3→my-4).

## ~~3. Increase vertical spacing between top-bar sections~~
~~The Campaign title, Week strip, and Day strip are stacked very densely. Add ~4-6px more gap between the campaign title and the "WEEK" label, and between the week pill row and the "WEEK 1 · 5-DAY..." descriptor, so each section reads as a distinct group.~~
**Done** — Reduced CampaignBar bottom padding (pb-6→pb-3) to tighten campaign-to-week, adjusted WeekStrip margins for clearer grouping.

## ~~4. Add more padding inside activity cards~~
~~The activity name and subtitle (e.g. "3 × 10  15|45|30") sit close to the left emoji and right info icon. Increase horizontal padding (~4-8px) so text doesn't feel pressed against the icons, and bump vertical padding slightly so cards feel less cramped.~~
**Done** — Increased horizontal padding (px-5→px-6) and gap between elements (gap-4→gap-5).

## ~~5. Tighten gap between day label row and first activity card~~
~~The "MONDAY · H PUSH · HORIZONTAL PUSH EMPHASIS" label has noticeably more space below it than above the first card warrants. Reduce the margin-bottom on this descriptor so the label feels anchored to its activity list rather than floating.~~
**Done** — Reduced day label margin-bottom (mb-2→mb-1).

## ~~6. Add left padding to "NEXT" activity text in timer console~~
~~The "NEXT / DB Row / 2 × 10" block in the timer console is jammed against the right edge of the countdown area with no left padding. It needs left margin or padding so it doesn't feel crushed against the timer column boundary.~~
**Done** — Increased left padding in NextActivityPreview (pl-5→pl-6) across all states.

## ~~7. Timer console activity name and set label need more separation~~
~~"DB Squeeze Press" and "Set 1 of 3" at the top of the timer console are too close together vertically and too close to the top edge. Add padding above the activity name and a small gap between the name and the set counter so they read as distinct lines.~~
**Done** — Increased activity name block margin (mb-3→mb-4) and name-to-set gap (mb-1→mb-1.5).

## ~~8. Progress bar needs vertical margin~~
~~The purple progress bar sits tight against both the countdown number above and "TAP TO PAUSE" below. Add margin above and below the bar so it has clear separation from surrounding elements.~~
**Done** — Increased progress bar vertical margin (my-3→my-4).

## ~~9. Week and day pill strips need right-side fade/clip indicator~~
~~The week pills (1–8) and day pills (M–S) extend to the screen edge with the last pill partially cut off but no visual cue that the row is scrollable or complete. Add a subtle gradient fade on the trailing edge, or ensure all pills are fully visible with equal inset from both edges.~~
**Done** — Week strip already has gradient fade. Day strip uses equal-width `flex-1` buttons that fill the row without scrolling, so no fade needed.
