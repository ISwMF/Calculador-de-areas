function areacalculator(coordinates, latcenter, lngcenter) {
  this.coordinates = coordinates;
  this.latcenter = latcenter;
  this.lngcenter = lngcenter;
}


areacalculator.prototype.getArea = function() {
  var area = 0;
  for (var i = 0; i < this.coordinates.length; i++) {
    if (i + 1 == this.coordinates.length) {
      var a = this.getDistanceBetweenCoordinates(this.coordinates[i].lat, this.coordinates[i].lng, this.coordinates[0].lat, this.coordinates[0].lng);
      var b = this.getDistanceBetweenCoordinates(this.coordinates[i].lat, this.coordinates[i].lng, latcenter, lngcenter);
      var c = this.getDistanceBetweenCoordinates(this.coordinates[0].lat, this.coordinates[0].lng, latcenter, lngcenter);

      //formula de Herón
      var s = (a + b + c) / 2;
      var areatriangle = Math.sqrt((s * (s - a) * (s - b) * (s - c)));
      area = area + areatriangle;

    } else {
      var a = this.getDistanceBetweenCoordinates(this.coordinates[i].lat, this.coordinates[i].lng, this.coordinates[i + 1].lat, this.coordinates[i + 1].lng);
      var b = this.getDistanceBetweenCoordinates(this.coordinates[i].lat, this.coordinates[i].lng, latcenter, lngcenter);
      var c = this.getDistanceBetweenCoordinates(this.coordinates[i + 1].lat, this.coordinates[i + 1].lng, latcenter, lngcenter);

      //formula de Herón
      var s = (a + b + c) / 2;
      var areatriangle = Math.sqrt((s * (s - a) * (s - b) * (s - c)));
      area = area + areatriangle;

    }
  }
  return area;
}

//Halla la distancia entre dos coordenadas (latitud y longitud) usando la formula de Haversine
areacalculator.prototype.getDistanceBetweenCoordinates = function(lat1, lng1, lat2, lng2) {
  var R = 6371; //km
  var dlon = lng2 - lng1;
  var dlat = lat2 - lat1;
  a = Math.pow(Math.sin(dlat / 2), 2) + (Math.cos(lat1)) * (Math.cos(lat2)) * Math.pow(Math.sin(dlon / 2), 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = R * c;
  return d;
}
