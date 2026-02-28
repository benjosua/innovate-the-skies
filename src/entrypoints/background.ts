export default defineBackground(() => {
  console.log('Background service worker started');

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'open-sidepanel') {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.windowId) {
        await chrome.sidePanel.open({ windowId: tab.windowId });
      }
    }
  });
});
