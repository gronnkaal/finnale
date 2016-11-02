// DOM ready

$(document).ready(function() {
  getBandwidthInfo();
});

// Functions

function getBandwidthInfo() {
  $.getJSON('/ice/bandwidth', function(data) {

  	bandwidthUsed = (data.usage / 1000 / 1000).toFixed(2)
  	bandwidthLimit = (data.limit / 1000 / 1000).toFixed(2)

    $('#bandwidthInfoUsed').text(bandwidthUsed);
    $('#bandwidthInfoLimit').text(bandwidthLimit);
  });
};
