var page = require('webpage').create();
var system = require('system');
var args = system.args;
var url = args[1];
var file = args[2];
var fs = require('fs');
var header = fs.read('modules/baptisms/client/views/header-view.html');

page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    margin: 0
}



page.open(url, function (status) {
window.setTimeout(function () {
    page.render(file+'.pdf')
    phantom.exit();
}, 2000); // Change timeout as required to allow sufficient time
});