import { useEffect } from "preact/hooks";
import { fetch_data, data_loading, data_error } from "./hooks/use_data.js";
import { init_defaults } from "./hooks/use_session.js";
import { CampaignBar } from "./components/CampaignBar.jsx";
import { CampaignDrawer } from "./components/CampaignDrawer.jsx";
import { WeekStrip } from "./components/WeekStrip.jsx";
import { DayStrip } from "./components/DayStrip.jsx";
import { ActivityList } from "./components/ActivityList.jsx";
import { TimerConsole } from "./components/TimerConsole.jsx";
import { LoadingScreen, ErrorScreen } from "./components/LoadingScreen.jsx";

export function App() {
  useEffect(() => {
    fetch_data().then(() => {
      if (!data_error.value) {
        init_defaults();
      }
    });
  }, []);

  if (data_loading.value) {
    return <LoadingScreen />;
  }

  if (data_error.value) {
    return (
      <ErrorScreen
        message={data_error.value}
        on_retry={navigator.onLine ? () => fetch_data().then(() => !data_error.value && init_defaults()) : null}
      />
    );
  }

  return (
    <>
      <CampaignBar />
      <CampaignDrawer />
      <div class="mx-4 mb-3">
        <WeekStrip />
        <DayStrip />
      </div>
      <ActivityList />
      <TimerConsole />
    </>
  );
}
