var toggle = false;
chrome.browserAction.setTitle({title:'whitelist OFF'});
chrome.browserAction.setBadgeText({text: ''});

chrome.webRequest.onBeforeRequest.addListener(
    //callback
    function(details) {
        const url = details.url;
        var q = decodeURIComponent(url.match(/q=([^&]*)/)[1]).split('+');

        //list of sites to add to the query
        var whitelist = [
          'stackoverflow.com',
          'developer.mozilla.org',
        ];

        //if there's already a site: in the search query, don't use the whitelist
        var re = /(?:^|\W)site:(\S+)(?!\w)/g;
        if (re.exec(q)) return;

        q = q.join(' ');
        
        var sitesQ = whitelist
          .map(site => 'site:' + site)
          .join(' OR ');
        var newQ = q + (sitesQ && (' AND ' + sitesQ));
        newQ = encodeURIComponent(newQ).replace(/%20/g, '+');

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

  }
})