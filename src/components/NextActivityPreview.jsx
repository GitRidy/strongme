import { current_dayplan } from "../hooks/use_session.js";
import { activity_map } from "../hooks/use_data.js";
import { timer_activity } from "../hooks/use_timer.js";
import { active_activity_num } from "./ActivityList.jsx";
import { format_sets_reps } from "../utils/format.js";

export function NextActivityPreview() {
  const dp = current_dayplan.value;
  const current_num = active_activity_num.value;

  if (!dp || !current_num) {
    return (
      <div class="flex-1 bg-bg p-4 flex flex-col justify-center border-l border-surface-border">
        <div class="text-[9px] font-bold uppercase tracking-[1.5px] text-text-muted mb-2.5">
          Next
        </div>
        <div class="text-[13px] font-semibold text-text-tertiary">—</div>
      </div>
    );
  }

  const next_da = dp.activities.find((a) => a.activity_num === current_num + 1);
  if (!next_da) {
    return (
      <div class="flex-1 bg-bg p-4 flex flex-col justify-center border-l border-surface-border">
        <div class="text-[9px] font-bold uppercase tracking-[1.5px] text-text-muted mb-2.5">
          Next
        </div>
        <div class="text-[13px] font-semibold text-text-primary">Done</div>
      </div>
    );
  }

  const act = activity_map.value.get(next_da.activity_id);

  return (
    <div class="flex-1 bg-bg p-4 flex flex-col justify-center border-l border-surface-border">
      <div class="text-[9px] font-bold uppercase tracking-[1.5px] text-text-muted mb-2.5">
        Next
      </div>
      <div class="text-[13px] font-semibold mb-1 leading-snug tracking-tight text-text-primary">
        {act?.name || "Unknown"}
      </div>
      <div class="text-xs font-medium text-text-tertiary">
        {format_sets_reps(next_da.target_sets, next_da.target_reps)}
      </div>
    </div>
  );
}
