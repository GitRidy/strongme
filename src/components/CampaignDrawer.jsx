import { current_campaign } from "../hooks/use_session.js";
import { drawer_open } from "./CampaignBar.jsx";

export function CampaignDrawer() {
  const camp = current_campaign.value;
  if (!camp) return null;

  const open = drawer_open.value;

  return (
    <div
      class={`mx-4 rounded-md border border-surface-border bg-surface overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        open
          ? "max-h-[200px] opacity-100 translate-y-0 mb-3"
          : "max-h-0 opacity-0 -translate-y-2"
      }`}
    >
      <div class="p-4 grid grid-cols-2 gap-4">
        <DrawerItem label="Goal" value={camp.goal} />
        <DrawerItem label="Duration" value={`${camp.duration_weeks} weeks`} />
        <DrawerItem label="Strategy" value={camp.strategy} full />
        {camp.notes && <DrawerItem label="Notes" value={camp.notes} full />}
      </div>
    </div>
  );
}

function DrawerItem({ label, value, full }) {
  return (
    <div class={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <span class="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
        {label}
      </span>
      <span class="text-[13px] text-text-secondary leading-snug">{value}</span>
    </div>
  );
}
