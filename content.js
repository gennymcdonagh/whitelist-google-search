// content.js
//alert("This is a Google search page");
var url = window.location.href;
console.log('url is: ' + url);
var q = url.match(/q=([^&]*)/)[1];
var newQ = 'testing';
if (q !== newQ) {
  console.log('q is: ' + q);
  var newUrl = url.replace(/q=([^&]*)/, 'q=' + newQ);
  location.replace(newUrl);
}


