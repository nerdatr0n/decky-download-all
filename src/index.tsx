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

      // Log raw status values for all apps
      apps.forEach((a: any) => {
        const status = a.per_client_data?.[0]?.display_status;
        if (status !== undefined && status !== 11 && status !== 9) {
          dl.QueueAppUpdate(a.appid);
          console.log("DownloadAll:", a.display_name, "status:", status, "per_client_data:", JSON.stringify(a.per_client_data?.[0]));
        }
      });

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