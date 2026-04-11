import {
	definePlugin,
	PanelSection,
	PanelSectionRow,
	ButtonItem,
} from "@decky/ui";
import { routerHook } from "@decky/api";
import { FaDownload } from "react-icons/fa";
import { ReactNode } from "react";

const handleDownloadAll = () => {
	try {
		const dl = (window as any).SteamClient.Downloads;
		const apps = (window as any).appStore.allApps;

		// Log raw status values for all apps
		apps.forEach((a: any) => 
			{
		const status = a.per_client_data?.[0]?.display_status;
		// Only queue updates for apps that are not status 11 or status 9
		if (status !== undefined && status !== 11 && status !== 9 && status !== 33)
			{
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

// Page that gets injected at the /downloads route
function DownloadAllPage(): ReactNode {
  return (
    <div style={{ padding: "8px" }}>
      <PanelSection>
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={handleDownloadAll}
          >
            ▶ Resume All Downloads
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
    </div>
  );
}

function Content(): ReactNode {
	return (
		<PanelSection title="Downloads">
			<PanelSectionRow>
				<ButtonItem layout="below" onClick={handleDownloadAll}>
				▶ Resume All Downloads
				</ButtonItem>
			</PanelSectionRow>
		</PanelSection>
	);
}

export default definePlugin(() => {
	// Add a tab/route under the downloads page
	routerHook.addRoute("/downloads/downloadall", DownloadAllPage, {
		exact: true,
	});
	return {
		title: <div>Download All</div>,
		content: <Content />,
		icon: <FaDownload />,
		onDismount() {},
	};
});