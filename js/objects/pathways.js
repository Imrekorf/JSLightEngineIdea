class light_object {

  light(xpos2, ypos2, light) {
    var xpos = xpos2 / 16;
    var ypos = ypos2 / 16;
    var num = Lights.length;
    var self = this;
    var rgb = parseInt(map(light, 0, 100, 0, 256));
    var style = `left: ${xpos}em; top: ${ypos}em; background-color: rgb(${rgb},${rgb},${rgb}); box-shadow: 0 0 20em 1em rgb(${rgb},${rgb},${rgb});`;
    var light = document.createElement('div');
    light.id = "light_"+num;
    light.className = "light";
    light.style = style;
    document.getElementById('lights').appendChild(light);
    setTimeout(function() {
      $("#light_"+num).draggable({
        drag: function() {
          for(var i = 0; i < Areas.length; i++){
            Areas[i].getLight();
          }
        }
      });
    }, 10);
    Lights[num] = new Light("light_"+num);
    for(var i = 0; i < Areas.length; i++){
      Areas[i].getLight();
    }
  }

}

// pathways //

class pathway_object {

  constructor(room) {
    this.size = 1.563;
    this.room = room;
  }

  vertical(xpos2, ypos2, length) {
    var num = Areas.length;
    var xpos = (xpos2*25) / 16;
    var ypos = (ypos2*25) / 16;
    var size = this.size;
    // creating wall
    function vertical_pathway_fun(){
      var vertical_pathway = "";
      for(var i = 0; i < length*2; i+=2){
        vertical_pathway += `<div name=${"V_wall_part_"+num} id=${"V_wall_part_"+i+"_"+num} class="wall" style="top: ${(i/2)*size}em; left: 0; height: ${size}em; width: ${size}em;"></div>`
        vertical_pathway += `<div name=${"V_wall_part_"+num} id=${"V_wall_part_"+(i+1)+"_"+num} class="wall" style="top: ${(i/2)*size}em; left: ${size*3}em; height: ${size}em; width: ${size}em;"></div>`;
      }
      return vertical_pathway;
    }
    // creating pathway div
    var vertical_pathway = document.createElement('div');
    vertical_pathway.className = "mainbody";
    vertical_pathway.style = `top: ${ypos}em; left: ${xpos}em; height: ${size*3}em; width: ${size*3}em`;
    vertical_pathway.innerHTML = `
      <div id=${"body_parent_vertical_pathway_"+num} class="body_parent">
        ${vertical_pathway_fun()}
      </div>`;
    document.getElementById('room'+this.room).appendChild(vertical_pathway);
    // removing walls ( connecting areas)
    setTimeout(function() {
      for(var k = 0; k < (length*2)-1; k+=2){
        if(!!document.getElementById('V_wall_part_'+k+'_'+num)){
          var wall_topleft = document.getElementById('V_wall_part_'+k+'_'+num).getBoundingClientRect();
          remove_wall(document.elementFromPoint(wall_topleft.left+25, wall_topleft.top));
          remove_wall(document.elementFromPoint(wall_topleft.left+50, wall_topleft.top));
        }
      }

      function remove_wall(el) {
        if(el.className == "wall" && el.getAttribute("name") != "V_wall_part_"+num && el.getAttribute("name") != "room_corner"){
          el.remove();
        }
      }
    }, 10);
    CollectAreas();
  }

  horizontal(xpos2, ypos2, length) {
    var num = Areas.length;
    var xpos = (xpos2*25) / 16;
    var ypos = (ypos2*25) / 16;
    var size = this.size;
    // creating walls
    function horizontal_pathway_fun(){
      var horizontal_pathway = "";
      for(var i = 0; i < length*2; i+=2){
        horizontal_pathway += `<div name=${"H_wall_part_"+num} id=${"H_wall_part_"+i+"_"+num} class="wall" style="top: 0; left: ${(i/2)*size}em; height: ${size}em; width: ${size}em;"></div>`
        horizontal_pathway += `<div name=${"H_wall_part_"+num} id=${"H_wall_part_"+(i+1)+"_"+num} class="wall" style="top: ${size*3}em; left: ${(i/2)*size}em; height: ${size}em; width: ${size}em;"></div>`;
      }
      return horizontal_pathway;
    }
    // creating pathway div
    var horizontal_pathway = document.createElement('div');
    horizontal_pathway.className = "mainbody";
    horizontal_pathway.style = `top: ${ypos}em; left: ${xpos}em; height: ${size*3}em; width: ${size*3}em`;
    horizontal_pathway.innerHTML = `
      <div id=${"body_parent_horizontal_pathway_"+num} class="body_parent">
        ${horizontal_pathway_fun()}
      </div>`;
    document.getElementById('room'+this.room).appendChild(horizontal_pathway);
    // removing walls ( connecting areas)
    setTimeout(function() {
      for(var k = 0; k < (length*2)-1; k+=2){
        if(!!document.getElementById('H_wall_part_'+k+'_'+num)){
          var wall_topleft = document.getElementById('H_wall_part_'+k+'_'+num).getBoundingClientRect();
          remove_wall(document.elementFromPoint(wall_topleft.left, wall_topleft.top+25));
          remove_wall(document.elementFromPoint(wall_topleft.left, wall_topleft.top+50));
        }
      }

      function remove_wall(el) {
        if(el.className == "wall" && el.getAttribute("name") != "H_wall_part_"+num && el.getAttribute("name") != "room_corner"){
          el.remove();
        }
      }
    }, 10);
    CollectAreas();
  }

}


// rooms //

class room {

  constructor(room) {
    this.size = 1.563;
    this.room = room;
  }

  // creates room where walls can overlap
  square(xpos2, ypos2, ss) {
    var num = Areas.length;
    var xpos = (xpos2*25) / 16;
    var ypos = (ypos2*25) / 16;
    var size = this.size;
    // getting maxsize
    var maxsize = document.getElementById('room1').offsetWidth;
    if(document.getElementById('room1').offsetHeight < document.getElementById('room1').offsetWidth){
      maxsize = document.getElementById('room1').offsetHeight;
    }
    // setting roomsize
    var room_size = parseInt(map(ss, 0, 100, 0, (maxsize/25)))-1;
    // create vertical wall
    function vertical(side){
      var c = side + side;
      var vertical_left = `<div name="room_corner" id=${"S_C_wall_part_"+c+"_"+num} class="wall" style="top: 0; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`;
      var j = side + (side*2);
      for(var i = 1; i < room_size; i++){
        vertical_left += `<div id=${"S_V_wall_part_"+j+"_"+num} class="wall" style="top: ${size*i}em; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`
        j++;
      }
      vertical_left += `<div name="room_corner" id=${"S_C_wall_part_"+(c+1)+"_"+num} class="wall" style="top: ${size*room_size}em; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`
      return vertical_left;
    }
    // create horizontal wall
    function horizontal(side){
      var j = 0 + side + (side*2);
      var horizontal_bottom= "";
      for(var i = 1; i < room_size; i++){
        horizontal_bottom += `<div id=${"S_H_wall_part_"+j+"_"+num} class="wall" style="top: ${size*(side*room_size)}em; left: ${size*i}em; height: ${size}em; width: ${size}em;"></div>`
        j++;
      }
      return horizontal_bottom;
    }

    // create room parent
    var cross_pathway = document.createElement('div');
    cross_pathway.className = "mainbody";
    cross_pathway.style = `top: ${ypos}em; left: ${xpos}em; height: ${size*11}em; width: ${size*11}em`;
    cross_pathway.innerHTML = `
      <div id=${"body_parent_room_"+num} class="body_parent">
        <!-- vertical left -->
        ${vertical(0)};
        <!-- horizontal top -->
        ${horizontal(0)};
        <!-- vertical right -->
        ${vertical(1)};
        <!-- horizontal bottom -->
        ${horizontal(1)};
      </div>`;
    document.getElementById('room'+this.room).appendChild(cross_pathway);
    CollectAreas();
  }

  // creates room where overlapping walls are removed
  square_o(xpos2, ypos2, ss) {
    var num = Areas.length;
    var xpos = (xpos2*25) / 16;
    var ypos = (ypos2*25) / 16;
    var size = this.size;
    // getting maxsize
    var maxsize = document.getElementById('room1').offsetWidth;
    if(document.getElementById('room1').offsetHeight < document.getElementById('room1').offsetWidth){
      maxsize = document.getElementById('room1').offsetHeight;
    }
    // setting roomsize
    var room_size = parseInt(map(ss, 0, 100, 0, (maxsize/25)))-1;
    // create vertical wall
    function vertical(side){
      var c = side + side;
      var vertical_left = `<div name="room_corner" id=${"S_C_wall_part_"+c+"_"+num} class="wall" style="top: 0; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`;
      var j = side
      for(var i = 1; i < room_size; i++){
        vertical_left += `<div name=${"S_V_wall_part_"+num} id=${"S_V_wall_part_"+j+"_"+num} class="wall" style="top: ${size*i}em; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`
        j = j + 2;
      }
      vertical_left += `<div name="room_corner" id=${"S_C_wall_part_"+(c+1)+"_"+num} class="wall" style="top: ${size*room_size}em; left: ${size*(side*room_size)}em; height: ${size}em; width: ${size}em;"></div>`
      return vertical_left;
    }
    // create horizontal wall
    function horizontal(side){
      var j = side;
      var horizontal_bottom= "";
      for(var i = 1; i < room_size; i++){
        horizontal_bottom += `<div name=${"S_H_wall_part_"+num} id=${"S_H_wall_part_"+j+"_"+num} class="wall" style="top: ${size*(side*room_size)}em; left: ${size*i}em; height: ${size}em; width: ${size}em;"></div>`
        j = j + 2;
      }
      return horizontal_bottom;
    }

    // create room parent
    var cross_pathway = document.createElement('div');
    cross_pathway.className = "mainbody";
    cross_pathway.style = `top: ${ypos}em; left: ${xpos}em; height: ${size*11}em; width: ${size*11}em`;
    cross_pathway.innerHTML = `
      <div id=${"body_parent_room_"+num} class="body_parent">
        <!-- vertical left -->
        ${vertical(0)};
        <!-- horizontal top -->
        ${horizontal(0)};
        <!-- vertical right -->
        ${vertical(1)};
        <!-- horizontal bottom -->
        ${horizontal(1)};
      </div>`;
    document.getElementById('room'+this.room).appendChild(cross_pathway);

    setTimeout(function() {
      for(var k = 0; k < (room_size*2); k++){
        if(typeof(document.getElementById('S_V_wall_part_'+k+'_'+num)) != 'undefined' && document.getElementById('S_V_wall_part_'+k+'_'+num) != null){
          console.log(k, num, "V")
          var wall_topleft = document.getElementById('S_V_wall_part_'+k+'_'+num).getBoundingClientRect();
          remove_wall_V(document.elementFromPoint(wall_topleft.left, wall_topleft.top));
        }
      }

      for(var k = 0; k < (room_size*2); k++){
        if(typeof(document.getElementById('S_H_wall_part_'+k+'_'+num)) != 'undefined' && document.getElementById('S_H_wall_part_'+k+'_'+num) != null){
          console.log(k, num, "H")
          var wall_topleft = document.getElementById('S_H_wall_part_'+k+'_'+num).getBoundingClientRect();
          remove_wall_H(document.elementFromPoint(wall_topleft.left, wall_topleft.top));
        }
      }

      function remove_wall_V(el) {
        if(el.className == "wall" && el.getAttribute("name") != "S_V_wall_part_"+num && el.getAttribute("name") != "room_corner"){
          el.remove();
        }
      }
      function remove_wall_H(el) {
        if(el.className == "wall" && el.getAttribute("name") != "S_H_wall_part_"+num && el.getAttribute("name") != "room_corner"){
          el.remove();
        }
      }
    }, 10);

    CollectAreas();
  }
}
