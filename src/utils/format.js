export function format_sets_reps(target_sets, target_reps) {
  if (!target_sets || !target_reps || target_reps.length === 0) return "";
  const reps_str =
    target_reps.length === 1
      ? String(target_reps[0])
      : target_reps.join("|");
  return `${target_sets} \u00d7 ${reps_str}`;
}

export function format_times(seconds_prep, seconds_work, seconds_rest) {
  const fmt = (v) => (v > 0 ? String(v) : "\u2014");
  return `${fmt(seconds_prep)}|${fmt(seconds_work)}|${fmt(seconds_rest)}`;
}
