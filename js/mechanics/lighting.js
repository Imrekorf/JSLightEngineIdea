var Areas = [], Lights = [];

function CollectAreas() {
  var length = Areas.length;
  var Area_parents = document.getElementsByClassName('body_parent');
  for(var i = length; i < Area_parents.length; i++){
    Areas[i] = new Area(Area_parents[i].id);
    Areas[i].getLight();
  }
}

  class Area {

    constructor(id) {
      this.id = id;
      this.el = document.getElementById(this.id);

      this.childs = new Array(this.el.getElementsByClassName('wall').length);
      for(var i = 0; i < this.el.getElementsByClassName('wall').length; i++){
        this.childs[i] = this.el.getElementsByClassName('wall')[i];
      }

      this.dis = 0;
      this.brightness = 200;
      this.display = this.getDisplay();

      var rgb = jQuery("#"+this.id).css("color");
      rgb = rgb.replace(/[^\d,]/g, '').split(',');
      this.r = rgb[0];
      this.g = rgb[1];
      this.b = rgb[2];
    }

    getDisplay() {
      if(jQuery("#"+this.id).css("display") == "block"){return true;} else {return false;}
    }

    getLight() {
      for(var j = 0; j < this.childs.length; j++){
        var lights = Lights;
        var wall = this.childs[j];
        // getting position of node
        var x = wall.getBoundingClientRect().left + (wall.offsetWidth/2);
        var y = wall.getBoundingClientRect().top + (wall.offsetHeight/2);

        var contot1 = 0;

        for(var i = 0; i < lights.length; i ++){
          // get position of light node

          var x2 = lights[i].el.offsetLeft+lights[0].el.offsetWidth/2;
          var y2 = lights[i].el.offsetTop+lights[0].el.offsetHeight/2;
          // get distance between light node and node
          var dis1 = map(Math.abs(Math.sqrt( Math.pow(x2 - x, 2) + ( Math.pow(y2 - y, 2) ))), 0, lights[i].brightness*10, 0, lights[i].brightness/2);
          // get gradual variable
          var output = -(Math.pow(dis1, 1.65)) + lights[i].brightness;
          // get value between 0 - 1 to signify "strength" between light node and node
          var con1 = map(output, 0, 200, 0, 1);
          if(con1 < 0){con1 = 0;}
          // get combined value of all squares
          contot1 = contot1 + con1;
        }

        // get slope for new colors between 0.5 - 3
        var f1 = map(contot1, 0, 1, 0.01, 3);
        // get new rgb values for node
        var r1 = parseInt(this.r * f1); if(r1 > 256){r1 = 256;};
        var g1 = parseInt(this.g * f1); if(g1 > 256){g1 = 256;};
        var b1 = parseInt(this.b * f1); if(b1 > 256){b1 = 256;};
        wall.style.background = "rgb("+r1+","+g1+","+b1+")";
        //this.el.style.color = "rgb("+r1+","+g1+","+b1+")";
      }
    }
  }

  class Light {

    constructor(id) {
      this.id = id;
      this.el = document.getElementById(this.id);

      this.display = this.getDisplay();
      var rgb = jQuery("#"+this.id).css("background-color");
      rgb = rgb.replace(/[^\d,]/g, '').split(',');
      this.brightness = map(rgb[0], 0, 256, 0, 100);
    }

    getDisplay() {
      if(jQuery("#"+this.id).css("display") == "block"){return true;} else {return false;}
    }

  }
