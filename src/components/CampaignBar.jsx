import { signal } from "@preact/signals";
import { current_campaign } from "../hooks/use_session.js";

export const drawer_open = signal(false);

export function CampaignBar() {
  const camp = current_campaign.value;
  if (!camp) return null;

  return (
    <div
      class="flex items-center justify-between px-5 pt-4 pb-3 cursor-pointer active:bg-surface transition-colors"
      onClick={() => (drawer_open.value = !drawer_open.value)}
    >
      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
          Campaign
        </span>
        <h1 class="text-xl font-bold tracking-tight">{camp.name}</h1>
      </div>
      <span
        class={`w-8 h-8 flex items-center justify-center rounded-sm text-text-tertiary transition-transform duration-300 ${
          drawer_open.value ? "rotate-180" : ""
        }`}
      >
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </div>
  );
}
