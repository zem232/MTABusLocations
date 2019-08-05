var bus = 'B32'
var apikey = ' ..'
var url = "http://bustime.mta.info/api/siri/vehicle-monitoring.json?key="+
apikey + "&VehicleMonitoringDetailLevel=calls&LineRef=" + bus

mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-73.9649257, 40.776106],
  zoom: 12
});

var zoomThreshold = 4;

function filterBy(vid) {
  //filtering for the hour, as defined by time slider
  var filters = ['==', 'Vehicle_ID', vid];
  map.setFilter('vpaths', filters);
}

map.on('load', function() {

  $.getJSON('js/m20.json', function(data) {

    buses =  data['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['VehicleActivity']

    buses.forEach(function(item){
      console.log(item)
      // create a bus marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://cdn0.iconfinder.com/data/icons/app-tab-bar-icons-for-iphone/60/Bus_transportation_transport_vector_symbol_simple_pictogram_icon.png)';


      new mapboxgl.Marker({
        color: '#11b4da'
      })
        .setLngLat([item['MonitoredVehicleJourney']['VehicleLocation']['Longitude'],
        item['MonitoredVehicleJourney']['VehicleLocation']['Latitude']])
        .setPopup(new mapboxgl.Popup({offset:40}) // sets a popup on this marker
          .setText(`${item.MonitoredVehicleJourney.MonitoredCall.StopPointName} `))
        .addTo(map);
    });


  });
});


// This is Bootstrap's sidebar to find out more info about this project
$(document).ready(function() {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });
  // when the dismiss arrow button is clicked on the sidebar, the sidebar will collapse.
  $('#sidebarCollapse, .overlay').on('click', function() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  });
  // This is the more info button that will expand the sidebar
  $('#moreInfo').on('click', function() {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});
