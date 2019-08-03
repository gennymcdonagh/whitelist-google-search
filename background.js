var toggle = false;
chrome.browserAction.setTitle({title:'whitelist OFF'});
chrome.browserAction.setBadgeText({text: ''});
chrome.browserAction.setBadgeBackgroundColor({color: 'gray'});

chrome.webRequest.onBeforeRequest.addListener(
    //callback
    function(details) {
        const url = details.url;
        var q = decodeURIComponent(url.match(/q=([^&]*)/)[1]);

        const whitelist = [
          'stackoverflow.com',
          'developer.mozilla.org',
        ];
        
        var sitesQ = whitelist
          .map(site => 'site:' + site)
          .filter(site => !q.includes(site))
          .join(' OR ');
        var newQ = q + (sitesQ && (' AND ' + sitesQ));

        var newUrl = url.replace(/q=([^&]*)/, 'q=' + newQ);
        if (toggle) return {redirectUrl: newUrl};
    },
    //filter
    {
        urls: [
          "https://www.google.com/search?*",
          "http://www.google.com/search?*",
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    //opt_extraInfoSpec
    ["blocking"]
);
chrome.browserAction.onClicked.addListener(function () {
  if (!toggle) {
    toggle = true;
    chrome.browserAction.setTitle({title:'whitelist ON'});
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});


    //alert('toggled ON');
  } else {
    toggle = false;
    chrome.browserAction.setTitle({title:'whitelist OFF'});
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setBadgeBackgroundColor({color: 'gray'});

  }
})