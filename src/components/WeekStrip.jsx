import {
  current_campaign,
  selected_week_num,
  select_week,
} from "../hooks/use_session.js";

export function WeekStrip() {
  const camp = current_campaign.value;
  if (!camp) return null;

  const active = selected_week_num.value;

  return (
    <div class="mb-3">
      <div class="flex items-center justify-between mb-2.5">
        <span class="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
          Week
        </span>
        <span class="text-[11px] font-medium text-text-tertiary">
          <span class="text-accent font-bold">{active}</span> of{" "}
          {camp.duration_weeks}
        </span>
      </div>
      <div class="relative">
      <div class="flex gap-2 overflow-x-auto p-0.5 -m-0.5 scrollbar-none">
        {camp.weeks.map((w) => {
          const is_active = w.week_num === active;
          return (
            <button
              key={w.week_num}
              onClick={() => select_week(w.week_num)}
              class={`min-w-[40px] h-10 rounded-sm border-[1.5px] flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-200 cursor-pointer ${
                is_active
                  ? "bg-accent border-accent text-bg font-bold shadow-[0_0_20px_var(--color-accent-glow)]"
                  : "bg-surface border-surface-border text-text-tertiary hover:border-text-tertiary hover:text-text-secondary"
              }`}
            >
              {w.week_num}
            </button>
          );
        })}
      </div>
      <div class="absolute right-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-bg to-transparent" />
      </div>
    </div>
  );
}
