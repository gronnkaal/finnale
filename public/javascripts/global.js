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

    bwUsage = (myInfo.usage / 1000 / 1000).toFixed(0);
    bwLimit = (myInfo.limit / 1000 / 1000).toFixed(0);
    bwExtra = (myInfo.extra / 1000 / 1000).toFixed(0);

    bwUsagePercent = (bwUsage / bwLimit * 100).toFixed(0);
    bwExtraPercent = (bwExtra / bwLimit * 100).toFixed(0);

    $('#iceBwUsage').text(bwUsage + " MB");
    $('#iceBwLimit').text(bwLimit + " MB");
    $('#iceBwExtra').text(bwExtra + " MB");
    $('#iceInfoIp').text(myInfo.ip);
    $('#iceUsageProgress').css("width", bwUsagePercent + "%");
    $('#iceExtraProgress').css("width", bwExtraPercent + "%");
    $('#iceUsageInfo').text(bwUsagePercent + "%");
    $('#iceExtraInfo').text(bwExtraPercent + "%");

	// $('#iceInfoSim').text(myInfo.sim);

  });
};