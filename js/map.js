var markers = new Array();

//Valores iniciales del mapa
function initMap() {
  var myLatLng = {
    lat: 4.66,
    lng: -74.08
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 11
  });

  //se añadirá un marcador en la misma posición donde se haga 'click'
  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  markers.push({
    "lat": latLng.lat(),
    "lng": latLng.lng()
  });
  map.panTo(latLng);
}

//Llama y usa las funciones de areacalculator para calcular el area según las coordenadas
function sendInformation() {
  var show = new shower();
  if (markers.length <= 2) {
    show.showError("Se necesitan más marcadores");
  } else {
    //hace un promedio de los puntos colocados para hallar un punto intermedio
    var sumlat = 0;
    var sumlng = 0;
    for (var i = 0; i < markers.length; i++) {
      sumlat = sumlat + markers[i].lat;
      sumlng = sumlng + markers[i].lng;
    }
    latcenter = sumlat / markers.length;
    lngcenter = sumlng / markers.length;

    //marca el punto intermedio en el area
    var marker = new google.maps.Marker({
      position: {
        lat: latcenter,
        lng: lngcenter
      },
      map: map
    });
    var area = new areacalculator(markers, latcenter, lngcenter);

    //calcula y muestra el resultado
    show.showResult(area.getArea());

    //Borra la información (por si las moscas)
    google.maps.event.clearListeners(map, 'click');
    markers = [];
    show.calculateNewArea();
  }
}
