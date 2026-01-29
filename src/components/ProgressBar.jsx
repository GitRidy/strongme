import { timer_total_duration, timer_progress, display_state } from "../hooks/use_timer.js";

export function ProgressBar() {
  const total = timer_total_duration.value;
  const progress = timer_progress.value;
  const state = display_state.value;

  const stages = [
    { key: "prep", flex: total.prep, fill: progress.prep },
    { key: "work", flex: total.work, fill: progress.work },
    { key: "rest", flex: total.rest, fill: progress.rest },
  ].filter((s) => s.flex > 0);

  const color_map = {
    prep: "bg-stage-prep shadow-[0_0_10px_rgba(168,85,247,0.5)]",
    work: "bg-stage-work shadow-[0_0_10px_var(--color-accent-glow)]",
    rest: "bg-stage-rest shadow-[0_0_10px_rgba(249,115,22,0.5)]",
  };

  return (
    <div class="h-2 bg-surface-elevated rounded-full flex overflow-hidden gap-[3px]">
      {stages.map((s) => {
        const is_complete = s.fill >= 1;
        return (
          <div
            key={s.key}
            class="h-full rounded-full relative overflow-hidden bg-surface-elevated"
            style={{ flex: s.flex }}
          >
            <div
              class={`absolute left-0 top-0 bottom-0 rounded-full transition-[width] duration-100 linear ${color_map[s.key]} ${
                is_complete ? "opacity-55 !shadow-none" : ""
              }`}
              style={{ width: `${s.fill * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
