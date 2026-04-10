cd ~/decky-download-all
pnpm run build
rm -rf DownloadAll/dist
mkdir DownloadAll/dist
cp dist/index.js DownloadAll/dist/
cd ~/decky-download-all && zip -r DownloadAll.zip DownloadAll/