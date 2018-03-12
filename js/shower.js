function shower() {

}

shower.prototype.showResult = function(result) {
  $("#response").html("<p>El area de la zona es: " +result + " km^2<p>");
}

shower.prototype.showError = function(message) {
  $("#response").html("<p>" + message + "<p>");
}

shower.prototype.calculateNewArea = function(){
  $("#newArea").html("<button type=\"button\" class=\"btn btn-success\" onclick=\"initMap()\">Calculate new area</button>")
}
