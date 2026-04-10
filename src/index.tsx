import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ButtonItem,
} from "@decky/ui";
import { FaDownload } from "react-icons/fa";

function Content() {
  const handleDownloadAll = () => {
    try {
      const dl = (window as any).SteamClient.Downloads;
      const apps = (window as any).appStore.allApps;

      // Log what we find
      const toQueue = apps.filter((a: any) => 
        [19, 35].includes(a.per_client_data?.[0]?.display_status)
      );
      console.log("DownloadAll: found", toQueue.length, "apps to queue");
      toQueue.forEach((a: any) => {
        console.log("DownloadAll: queuing", a.display_name, a.appid, a.per_client_data?.[0]?.display_status);
        dl.QueueAppUpdate(a.appid);
      });

      // Enable after queuing
      dl.EnableAllDownloads(true);
      dl.SuspendDownloadThrottling(false);
    } catch (e) {
      console.error("DownloadAll error:", e);
    }
  };

  return (
    <PanelSection title="Downloads">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={handleDownloadAll}
        >
          ▶ Resume All Downloads
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
}

export default definePlugin(() => {
  return {
    title: <div>Download All</div>,
    content: <Content />,
    icon: <FaDownload />,
    onDismount() {},
  };
});