//
// public/javascripts/globa.js

$(document).ready(function() {
  getIceInfo();
});

//
//
//

function getIceInfo() {
  $.getJSON('/ice', function(myInfo) {

    bwUsage = (myInfo.usage / 1000 / 1000).toFixed(2)
    bwLimit = (myInfo.limit / 1000 / 1000).toFixed(2)

    $('#iceBwUsage').text(bwUsage);
    $('#iceBwLimit').text(bwLimit);
    $('#iceInfoSim').text(myInfo.sim);
    $('#iceInfoIp').text(myInfo.ip);
  });
};