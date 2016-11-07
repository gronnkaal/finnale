// DOM ready

$(document).ready(function() {
//   getIceBandwidth();
//   getIceInfo();
});

// Functions

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