import {
  current_weekplan,
  selected_day_num,
  selected_week_num,
  select_day,
} from "../hooks/use_session.js";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function DayStrip() {
  const wp = current_weekplan.value;
  if (!wp) return null;

  const active_day = selected_day_num.value;

  return (
    <div class="bg-surface rounded-md border border-surface-border p-3.5">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
          Week {selected_week_num.value}
        </span>
        <span class="text-text-muted">&middot;</span>
        <span class="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
          {wp.description}
        </span>
      </div>
      <div class="flex gap-1.5">
        {DAY_LABELS.map((label, i) => {
          const day_num = i + 1;
          const dp_id = wp[`day${day_num}_dayplan_id`];
          const is_rest = !dp_id;
          const is_active = day_num === active_day;

          return (
            <button
              key={day_num}
              onClick={() => !is_rest && select_day(day_num)}
              class={`flex-1 aspect-square max-h-[46px] rounded-sm border-[1.5px] flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                is_active
                  ? "bg-accent border-accent shadow-[0_0_16px_var(--color-accent-glow)] cursor-pointer"
                  : is_rest
                    ? "cursor-default border-surface-border"
                    : "bg-surface-elevated border-surface-border cursor-pointer hover:border-text-tertiary"
              }`}
              style={
                is_rest && !is_active
                  ? {
                      background:
                        "repeating-linear-gradient(45deg, var(--color-surface-elevated), var(--color-surface-elevated) 3px, var(--color-surface) 3px, var(--color-surface) 6px)",
                    }
                  : undefined
              }
            >
              <span
                class={`text-xs font-semibold ${
                  is_active
                    ? "text-bg font-bold"
                    : is_rest
                      ? "text-text-muted"
                      : "text-text-tertiary"
                }`}
              >
                {label}
              </span>
              {!is_rest && (
                <span
                  class={`w-1 h-1 rounded-full ${
                    is_active ? "bg-bg opacity-100" : "bg-text-tertiary opacity-50"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
