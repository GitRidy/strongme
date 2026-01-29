# sample_data

Sample workout data for StrongMe V0 development and testing.

## Source

Derived from "Full Body × 5: DB-Dominant with Calisthenics Alternatives" workout plan.

## Files

| File | Records | Description |
|------|---------|-------------|
| `campaigns.json` | 1 | 8-week "Baseline Strength & Dumbbell Fluency" campaign |
| `weekplans.json` | 2 | Standard 5-day week + deload variant |
| `dayplans.json` | 5 | H Push, Pull, Squat, Hinge, Power days |
| `activities.json` | 21 | 20 exercises + Rest activity |

## Schema Notes

**Activities schema extensions** (not in PRD, proposed additions):

```json
{
  "is_timed": boolean,    // true = reps represent seconds (holds, carries)
  "is_per_side": boolean  // true = reps are per side (unilateral exercises)
}
```

These enable correct display formatting:
- `is_timed: true` → display `2 x 20s` instead of `2 x 20`
- `is_per_side: true` → display `2 x 8/side` or handle as 16 total reps

## Week Structure

**wp1 (Standard):**
| Day | Plan | Focus |
|-----|------|-------|
| Mon | dp1 | Horizontal Push |
| Tue | dp2 | Pull |
| Wed | — | Rest |
| Thu | dp3 | Squat |
| Fri | dp4 | Hinge |
| Sat | dp5 | Power |
| Sun | — | Rest |

**wp2 (Deload):** Same order, 3 training days only (Mon/Wed/Fri), reduced volume.

## Timing Defaults

From source plan: ~45s work + 15s transition, 30-45s rest

| Exercise Type | seconds_prep | seconds_work | seconds_rest |
|---------------|--------------|--------------|--------------|
| Emphasis (E1-E2) | 15 | 45 | 30 |
| Supporting (E3-E5) | 15 | 45 | 45 |
| Timed holds | 15 | (varies) | 45 |
