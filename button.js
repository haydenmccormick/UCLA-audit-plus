var enabled = true;
var myButton = document.getElementById("switch");

if (myButton) {
    chrome.storage.local.get('enabled', data => {
        enabled = !!data.enabled;
        myButton.textContent = enabled ? 'Disable' : 'Enable';
    });
    myButton.onclick = () => {
        enabled = !enabled;
        myButton.textContent = enabled ? 'Disable' : 'Enable';
        chrome.storage.local.set({ enabled: enabled });
    };
}