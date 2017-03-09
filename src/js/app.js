/* global google:ignore */
// import {markdown} from '../lib/markdown';
// console.log( markdown.toHTML( 'Hello *World*!' ) );

$(function () {

  // Store the #map div, and make it available to all functions
  var $map = $('#map');
  // Set a map variable that will hold our Google map, and is available to all functions
  var map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  var infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    var latLng = { lat: 51.515113, lng: -0.072051 };
    map = new google.maps.Map($map.get(0), {
      zoom: 5,
      center: latLng,
      scrollwheel: false
    });

    getTrips();
  }

  function getTrips() {

    const trips = $('#mapData').data('trips');

    trips.forEach((trip) => {
      //console.log(trip);
      addMarker(trip);
    });


  }

  function addMarker(trip) {

    var latLng = { lat: trip.lat, lng: trip.long };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
      //icon: '../assets/images/dot.svg' // Adding a custom icon
    });

    // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
    marker.addListener('click', function () {
      markerClick(marker, trip);
    });
  }

  function markerClick(marker, trip) {
    // If there is an open infowindow on the map, close it
    if (infowindow) infowindow.close();

    // Locate the data that we need from the individual trip object
    var tripName = trip.title;
    var tripId = trip._id;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: `<p>${tripName}</p>
                <p><a href="/trips/${tripId}">details</a></p>`
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }


// End of the map stuff -------------------------------------------------------



// start of the search --------------------------------------------------------
  // console.log('Loaded');
  // $('form').on('submit', submitted);
  //
  // function submitted(e) {
  //   e.preventDefault();
  //   console.log('click');
  //   console.log($('form input[name=q]').val());
  // }



});
