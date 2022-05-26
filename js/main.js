
function map(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function CreateDungeon() {

  /* NOTE: Order of creating objects:
  * go by room number 0 - 3
  * 0 = top left
  * 1 = top right
  * 2 = bottom left
  * 3 = bottom right
  * 100% room = 16
  */

  // TODO: create pathing algorithm
  /*
  var rooms2 = getRandomInt(1, 5);
  for(var i; i < rooms ; i++){
    pathway_objects[0].square()
  }
  */

  pathway_objects[0].vertical(12, 12, 6);
  pathway_objects[0].horizontal(16, 13, 6);

  rooms[1].square_o(0,5,80);

  rooms[2].square_o(0,0,100);
  pathway_objects[2].horizontal((16), 5, 6);

  rooms[3].square_o(0,0,50);

  light_objects.light(200, 200, 50);
}
