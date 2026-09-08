const MENU_ITEMS = [
  ['dh-json', 'Format selected text as JSON'],
  ['dh-base64-encode', 'Base64 encode selected text'],
  ['dh-base64-decode', 'Base64 decode selected text'],
  ['dh-url-encode', 'URL encode selected text'],
  ['dh-url-decode', 'URL decode selected text'],
  ['dh-jwt', 'Decode selected JWT']
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll().then(() => {
    MENU_ITEMS.forEach(([id, title]) => chrome.contextMenus.create({id, title, contexts: ['selection']}));
  });
  chrome.storage.local.get(['theme'], data => {
    if (!data.theme) chrome.storage.local.set({theme: 'dark'});
  });
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: false}).catch(() => {});
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText || !tab || !tab.id) return;
  const tool = info.menuItemId.replace('dh-', '');
  chrome.storage.local.set({pendingTool: tool, pendingInput: info.selectionText});
  chrome.sidePanel.open({tabId: tab.id}).catch(() => {});
});
