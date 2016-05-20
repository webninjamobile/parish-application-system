var page = require('webpage').create();
var system = require('system');
var args = system.args;
var id = args[1];
var url = args[2];
var format = args[3] || '.pdf';

if(format == '.pdf'){
  page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    margin: '1cm'
  }

}

page.open(url, function (status) {
  window.setTimeout(function () {
    page.render('public/pdf/'+id+'.pdf')
    phantom.exit();
  }, 2000); // Change timeout as required to allow sufficient time
});
