import { signal, computed } from "@preact/signals";
import { campaigns, weekplans, dayplans } from "./use_data.js";

const STORAGE_KEY = "strongme_session";

function load_session() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save_session(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

const saved = load_session();

export const selected_campaign_id = signal(saved.campaign_id || null);
export const selected_week_num = signal(saved.week_num || null);
export const selected_day_num = signal(saved.day_num || null);

function persist() {
  save_session({
    campaign_id: selected_campaign_id.value,
    week_num: selected_week_num.value,
    day_num: selected_day_num.value,
  });
}

export function select_campaign(id) {
  selected_campaign_id.value = id;
  persist();
}

export function select_week(num) {
  selected_week_num.value = num;
  persist();
}

export function select_day(num) {
  selected_day_num.value = num;
  persist();
}

export const current_campaign = computed(() => {
  if (!campaigns.value) return null;
  return (
    campaigns.value.find((c) => c.id === selected_campaign_id.value) ||
    campaigns.value[0] ||
    null
  );
});

export const current_week_entry = computed(() => {
  const camp = current_campaign.value;
  if (!camp) return null;
  return (
    camp.weeks.find((w) => w.week_num === selected_week_num.value) || null
  );
});

export const current_weekplan = computed(() => {
  const entry = current_week_entry.value;
  if (!entry || !weekplans.value) return null;
  return weekplans.value.find((wp) => wp.id === entry.weekplan_id) || null;
});

export const current_dayplan = computed(() => {
  const wp = current_weekplan.value;
  if (!wp || !dayplans.value || !selected_day_num.value) return null;
  const dp_id = wp[`day${selected_day_num.value}_dayplan_id`];
  if (!dp_id) return null;
  return dayplans.value.find((dp) => dp.id === dp_id) || null;
});

export function init_defaults() {
  const camp = campaigns.value?.[0];
  if (!camp) return;

  if (!selected_campaign_id.value) {
    selected_campaign_id.value = camp.id;
  }

  if (!selected_week_num.value) {
    selected_week_num.value = 1;
  }

  if (!selected_day_num.value) {
    const today_js = new Date().getDay(); // 0=Sun
    const day_num = today_js === 0 ? 7 : today_js; // 1=Mon..7=Sun
    selected_day_num.value = day_num;
  }

  persist();
}
