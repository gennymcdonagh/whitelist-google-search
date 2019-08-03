var host = "http://google.co.nz/search?";
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
        return {redirectUrl: newUrl};
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