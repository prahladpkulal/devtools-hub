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
  if (!info.selectionText) return;
  const url = 'chrome-extension://' + chrome.runtime.id + '/popup.html?tool=' + encodeURIComponent(info.menuItemId.replace('dh-', '')) + '&input=' + encodeURIComponent(info.selectionText);
  chrome.windows.create({url, type: 'popup', width: 460, height: 650});
});
