export function ExerciseDetailSheet({ activity, onClose }) {
  const open = !!activity;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        class={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      {/* Sheet */}
      <div
        class={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-surface rounded-t-xl border border-surface-border border-b-0 z-[101] max-h-[70vh] overflow-y-auto transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div class="w-9 h-1 bg-text-muted rounded-full mx-auto mt-3 mb-2" />
        <div class="px-6 pb-8 pt-2">
          <h2 class="text-xl font-bold mb-2 tracking-tight">
            {activity?.name}
          </h2>
          <p class="text-sm text-text-secondary mb-6 leading-relaxed">
            {activity?.description}
          </p>
          {activity?.tips?.length > 0 && (
            <>
              <div class="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3">
                Tips
              </div>
              <ul class="flex flex-col gap-2">
                {activity.tips.map((tip, i) => (
                  <li
                    key={i}
                    class="text-sm p-3 bg-surface-elevated border border-surface-border rounded-sm flex items-start gap-3 leading-snug text-text-secondary"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5 shadow-[0_0_8px_var(--color-accent-glow)]" />
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
