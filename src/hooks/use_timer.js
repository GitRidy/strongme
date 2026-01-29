import { signal, computed } from "@preact/signals";

// Timer states: idle, prep, work, rest, paused
export const timer_state = signal("idle");
export const timer_seconds = signal(0);
export const timer_current_set = signal(1);
export const timer_activity = signal(null);
export const timer_flash = signal(false);

let interval_id = null;
let paused_state = null; // which stage was active before pause

function clear_interval() {
  if (interval_id) {
    clearInterval(interval_id);
    interval_id = null;
  }
}

function flash() {
  timer_flash.value = true;
  setTimeout(() => {
    timer_flash.value = false;
  }, 200);
}

function advance_stage() {
  const act = timer_activity.value;
  if (!act) return;

  const state = timer_state.value;

  if (state === "prep") {
    flash();
    timer_state.value = "work";
    timer_seconds.value = act.seconds_work;
  } else if (state === "work") {
    flash();
    if (act.seconds_rest > 0) {
      timer_state.value = "rest";
      timer_seconds.value = act.seconds_rest;
    } else {
      finish_set();
    }
  } else if (state === "rest") {
    finish_set();
  }
}

function finish_set() {
  const act = timer_activity.value;
  if (!act) return;

  if (timer_current_set.value < act.target_sets) {
    flash();
    timer_current_set.value += 1;
    if (act.seconds_prep > 0) {
      timer_state.value = "prep";
      timer_seconds.value = act.seconds_prep;
    } else {
      timer_state.value = "work";
      timer_seconds.value = act.seconds_work;
    }
  } else {
    // Activity complete
    clear_interval();
    timer_state.value = "idle";
    timer_seconds.value = 0;
  }
}

function tick() {
  if (timer_state.value === "idle" || timer_state.value === "paused") return;
  if (timer_seconds.value > 1) {
    timer_seconds.value -= 1;
  } else {
    timer_seconds.value = 0;
    advance_stage();
  }
}

export function start_activity(day_activity) {
  clear_interval();
  timer_activity.value = day_activity;
  timer_current_set.value = 1;
  paused_state = null;

  if (day_activity.seconds_prep > 0) {
    timer_state.value = "prep";
    timer_seconds.value = day_activity.seconds_prep;
  } else {
    timer_state.value = "work";
    timer_seconds.value = day_activity.seconds_work;
  }

  interval_id = setInterval(tick, 1000);
}

export function toggle_pause() {
  if (timer_state.value === "idle") return;

  if (timer_state.value === "paused") {
    timer_state.value = paused_state || "work";
    interval_id = setInterval(tick, 1000);
  } else {
    paused_state = timer_state.value;
    timer_state.value = "paused";
    clear_interval();
  }
}

export const timer_total_duration = computed(() => {
  const act = timer_activity.value;
  if (!act) return { prep: 0, work: 0, rest: 0 };
  return {
    prep: act.seconds_prep || 0,
    work: act.seconds_work || 0,
    rest: act.seconds_rest || 0,
  };
});

export const timer_progress = computed(() => {
  const act = timer_activity.value;
  const state = timer_state.value;
  const secs = timer_seconds.value;
  if (!act) return { prep: 0, work: 0, rest: 0 };

  const actual_state = state === "paused" ? paused_state : state;
  const total = timer_total_duration.value;

  const result = { prep: 0, work: 0, rest: 0 };

  if (actual_state === "prep") {
    result.prep = total.prep > 0 ? (total.prep - secs) / total.prep : 0;
  } else if (actual_state === "work") {
    result.prep = 1;
    result.work = total.work > 0 ? (total.work - secs) / total.work : 0;
  } else if (actual_state === "rest") {
    result.prep = 1;
    result.work = 1;
    result.rest = total.rest > 0 ? (total.rest - secs) / total.rest : 0;
  }

  return result;
});

export const display_state = computed(() => {
  const state = timer_state.value;
  return state === "paused" ? paused_state || "idle" : state;
});
