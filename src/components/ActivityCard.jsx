import { activity_map } from "../hooks/use_data.js";
import { format_sets_reps, format_times } from "../utils/format.js";

export function ActivityCard({ day_activity, is_active, on_select, on_info }) {
  const act = activity_map.value.get(day_activity.activity_id);
  if (!act) return null;

  const is_rest = act.id === "rest";

  return (
    <div
      onClick={on_select}
      class={`bg-surface rounded-md border-[1.5px] p-3 px-3.5 mb-2 flex items-center gap-3 cursor-pointer transition-all duration-200 relative ${
        is_active
          ? "border-accent shadow-[0_0_24px_var(--color-accent-glow),inset_0_0_0_1px_var(--color-accent-muted)]"
          : "border-surface-border hover:border-white/15 hover:bg-surface-elevated"
      } ${is_rest ? "opacity-80" : ""}`}
    >
      {/* Activity number */}
      <div
        class={`w-[26px] h-[26px] rounded-full border-[1.5px] flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
          is_active
            ? "bg-accent border-accent text-bg"
            : "bg-surface-elevated border-surface-border text-text-tertiary"
        }`}
      >
        {day_activity.activity_num}
      </div>

      {/* Icon placeholder */}
      <div
        class={`w-[42px] h-[42px] rounded-sm flex items-center justify-center flex-shrink-0 text-xl ${
          is_rest
            ? "bg-icon-rest/15"
            : "bg-icon-exercise/15"
        }`}
      >
        {is_rest ? "❤️‍🩹" : "💪"}
      </div>

      {/* Info */}
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold mb-0.5 truncate tracking-tight">
          {act.name}
        </div>
        {!is_rest && (
          <div class="flex items-center gap-2.5">
            <span class="text-xs font-medium text-text-secondary">
              {format_sets_reps(day_activity.target_sets, day_activity.target_reps)}
            </span>
            <span class="text-[11px] font-medium text-[#6B7280] tabular-nums tracking-wide">
              {format_times(
                day_activity.seconds_prep,
                day_activity.seconds_work,
                day_activity.seconds_rest
              )}
            </span>
          </div>
        )}
      </div>

      {/* Info button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          on_info(act);
        }}
        class="w-8 h-8 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-text-tertiary flex-shrink-0 cursor-pointer hover:bg-accent-soft hover:border-accent-muted hover:text-accent transition-all"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}
