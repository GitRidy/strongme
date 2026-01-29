import { signal } from "@preact/signals";

const BASE_URL = "https://gitridy.github.io/strongme";

export const campaigns = signal(null);
export const weekplans = signal(null);
export const dayplans = signal(null);
export const activities = signal(null);
export const activity_map = signal(new Map());
export const data_loading = signal(true);
export const data_error = signal(null);

export async function fetch_data() {
  data_loading.value = true;
  data_error.value = null;
  try {
    const [c, w, d, a] = await Promise.all([
      fetch(`${BASE_URL}/campaigns.json`).then((r) => r.json()),
      fetch(`${BASE_URL}/weekplans.json`).then((r) => r.json()),
      fetch(`${BASE_URL}/dayplans.json`).then((r) => r.json()),
      fetch(`${BASE_URL}/activities.json`).then((r) => r.json()),
    ]);
    campaigns.value = c.campaigns;
    weekplans.value = w.weekplans;
    dayplans.value = d.dayplans;
    activities.value = a.activities;

    const map = new Map();
    for (const act of a.activities) {
      map.set(act.id, act);
    }
    activity_map.value = map;
    data_loading.value = false;
  } catch (err) {
    console.error("Failed to fetch workout data:", err);
    data_error.value = navigator.onLine
      ? "Couldn't load workout data"
      : "You're offline. Open the app online first to cache workouts.";
    data_loading.value = false;
  }
}
