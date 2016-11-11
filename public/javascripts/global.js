// DOM ready

$(document).ready(function() {
  getIceInfo();
});

// Functions

function getIceInfo() {
  $.getJSON('/ice/info', function(myInfo) {

    bwUsage = (myInfo.usage / 1000 / 1000).toFixed(2)
    bwLimit = (myInfo.limit / 1000 / 1000).toFixed(2)

    $('#iceBwUsage').text(bwUsage);
    $('#iceBwLimit').text(bwLimit);
    $('#iceInfoSim').text(myInfo.sim);
    $('#iceInfoIp').text(myInfo.ip);
  });
};


/*

function getIceBandwidth() {
  $.getJSON('/ice/bandwidth', function(data) {

  	bandwidthUsed = (data.usage / 1000 / 1000).toFixed(2)
  	bandwidthLimit = (data.limit / 1000 / 1000).toFixed(2)

    $('#iceBandwidthUsed').text(bandwidthUsed);
    $('#iceBandwidthLimit').text(bandwidthLimit);
  });
};


function getIceInfo() {
  $.getJSON('/ice/info', function(data) {

    $('#iceInfoSim').text(data.sim);
    $('#iceInfoIp').text(data.ip);
  });
};

*/