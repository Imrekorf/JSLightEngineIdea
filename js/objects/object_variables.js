
var light_objects = new light_object();

var pathway_objects = new Array(4);
for(var i = 0; i < 4; i++) {
  pathway_objects[i] = new pathway_object(i+1);
}

var rooms = new Array(4);
for(var i = 0; i < 4; i++) {
  rooms[i] = new room(i+1);
}
