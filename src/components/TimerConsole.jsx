import {
  timer_state,
  timer_seconds,
  timer_current_set,
  timer_activity,
  timer_flash,
  toggle_pause,
  display_state,
} from "../hooks/use_timer.js";
import { activity_map } from "../hooks/use_data.js";
import { ProgressBar } from "./ProgressBar.jsx";
import { NextActivityPreview } from "./NextActivityPreview.jsx";

const STAGE_COLORS = {
  prep: "text-stage-prep",
  work: "text-stage-work",
  rest: "text-stage-rest",
};

const STAGE_GLOW = {
  prep: "text-shadow: 0 0 40px rgba(168, 85, 247, 0.5)",
  work: "text-shadow: 0 0 40px rgba(0, 212, 255, 0.4)",
  rest: "text-shadow: 0 0 40px rgba(249, 115, 22, 0.5)",
};

const STAGE_LABELS = {
  prep: "PREP",
  work: "WORK",
  rest: "REST",
};

export function TimerConsole() {
  const act_data = timer_activity.value;
  const act = act_data ? activity_map.value.get(act_data.activity_id) : null;
  const state = timer_state.value;
  const d_state = display_state.value;
  const seconds = timer_seconds.value;
  const current_set = timer_current_set.value;
  const flashing = timer_flash.value;
  const is_idle = state === "idle";
  const is_paused = state === "paused";

  return (
    <div class="bg-surface border-t border-surface-border flex min-h-[185px] relative">
      {/* Flash overlay */}
      {flashing && (
        <div class="absolute inset-0 bg-white/20 z-10 pointer-events-none" />
      )}

      {/* Main timer area */}
      <div
        class="flex-[3] p-[18px_20px] flex flex-col cursor-pointer"
        onClick={toggle_pause}
      >
        <div class="mb-1.5">
          <div class="text-base font-bold tracking-tight mb-0.5">
            {act?.name || "Select an activity"}
          </div>
          {act && (
            <div class="text-xs font-medium text-text-tertiary">
              Set {current_set} of {act_data.target_sets}
            </div>
          )}
        </div>

        <div class="flex-1 flex flex-col items-center justify-center gap-0.5">
          {!is_idle && (
            <div
              class={`text-[11px] font-bold uppercase tracking-[2px] ${STAGE_COLORS[d_state] || "text-text-tertiary"}`}
            >
              {STAGE_LABELS[d_state] || ""}
            </div>
          )}
          <div
            class={`text-[72px] font-extrabold text-center leading-none tabular-nums tracking-[-3px] ${STAGE_COLORS[d_state] || "text-text-muted"}`}
            style={!is_idle ? STAGE_GLOW[d_state] || "" : ""}
          >
            {is_idle ? "—" : seconds}
          </div>
        </div>

        <div class="mt-auto">
          <ProgressBar />
          <div class="text-center text-[10px] font-semibold text-text-muted mt-2.5 uppercase tracking-[1.5px]">
            {is_idle
              ? "Select activity"
              : is_paused
                ? "Tap to Resume"
                : "Tap to Pause"}
          </div>
        </div>
      </div>

      {/* Next activity preview */}
      <NextActivityPreview />
    </div>
  );
}
