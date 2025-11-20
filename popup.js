chrome.tabs.query({
    active: true,
    currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getInfo: true});   
});

chrome.runtime.onMessage.addListener((msg) => {
    if(msg.platform){
        document.getElementById("result").innerText = 
        `Current Platform: ${msg.platform}\nURL: ${msg.url}`;
    }
    else {
        document.getElementById("result").innerText = 
        "No platform detected.";
    }
});