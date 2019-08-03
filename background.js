var host = "http://google.co.nz/search?";
chrome.webRequest.onBeforeRequest.addListener(
    //callback
    function(details) {
        const url = details.url;
        var q = url.match(/q=([^&]*)/)[1];
        var newParam = 'testing';
      
        if (!q.includes(newParam)) {
          var newQ = q + ' ' + newParam;
          var newUrl = url.replace(/q=([^&]*)/, 'q=' + newQ);
          return {redirectUrl: newUrl};
        }
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