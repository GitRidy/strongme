import { useState, useEffect } from "preact/hooks";

export function LoadingScreen() {
  const [show_text, set_show_text] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => set_show_text(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div class="flex-1 flex flex-col items-center justify-center gap-4">
      <div class="text-2xl font-bold tracking-tight">StrongMe</div>
      <div class="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      {show_text && (
        <div class="text-sm text-text-tertiary">Loading workouts...</div>
      )}
    </div>
  );
}

export function ErrorScreen({ message, on_retry }) {
  return (
    <div class="flex-1 flex flex-col items-center justify-center gap-4 px-8">
      <div class="text-lg font-semibold text-text-secondary text-center">
        {message}
      </div>
      {on_retry && (
        <button
          onClick={on_retry}
          class="px-6 py-2.5 bg-accent text-bg font-semibold rounded-md cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
