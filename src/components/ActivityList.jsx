import { signal } from "@preact/signals";
import { current_dayplan, selected_day_num } from "../hooks/use_session.js";
import { activity_map } from "../hooks/use_data.js";
import { start_activity } from "../hooks/use_timer.js";
import { ActivityCard } from "./ActivityCard.jsx";
import { ExerciseDetailSheet } from "./ExerciseDetailSheet.jsx";

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const active_activity_num = signal(null);
export const detail_activity = signal(null);

export function ActivityList() {
  const dp = current_dayplan.value;
  const day_num = selected_day_num.value;

  if (!dp) {
    return (
      <div class="flex-1 flex items-center justify-center text-text-tertiary text-sm">
        Rest day
      </div>
    );
  }

  return (
    <>
      <div class="overflow-y-auto min-h-0 px-4 pb-2">
        <div class="flex items-center gap-2 mb-1 pt-2">
          <span class="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
            {DAY_NAMES[day_num] || ""}
          </span>
          <span class="text-text-muted">&middot;</span>
          <span class="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            {dp.nickname} &middot; {dp.description}
          </span>
        </div>
        {dp.activities.map((da) => (
          <ActivityCard
            key={da.activity_num}
            day_activity={da}
            is_active={active_activity_num.value === da.activity_num}
            on_select={() => {
              active_activity_num.value = da.activity_num;
              const act = activity_map.value.get(da.activity_id);
              if (act && act.id !== "rest") {
                start_activity(da);
              }
            }}
            on_info={(act) => {
              detail_activity.value = act;
            }}
          />
        ))}
      </div>
      <ExerciseDetailSheet
        activity={detail_activity.value}
        onClose={() => (detail_activity.value = null)}
      />
    </>
  );
}
