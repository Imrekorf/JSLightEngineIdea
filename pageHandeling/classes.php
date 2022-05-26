<?php
  class light {

    var $xpos = "500px";
    var $ypos = "500px";

    function __construct($xpos, $ypos, $num, $light){
      $rgb = (int)map($light, 0, 100, 0, 256);
      $style = "left: ".$xpos."px; top: ".$ypos."px; background-color: rgb($rgb,$rgb,$rgb); box-shadow: 0 0 20px 1px rgb($rgb, $rgb, $rgb);";
      echo '<div id="light_'.$num.'" style="'.$style.'" class="light"></div>';
      echo '<script id="light_script_'.$num.'">
        drag_light_listener(\'light_'.$num.'\');
        $("#light_script_'.$num.'").remove();
      </script>';
    }
  }

  // pathways //

  class pathway {
    var $size = 25;

    function vertical($xpos, $ypos, $num) {
      $size = $this->size;
      echo'
      <div class="mainbody" style="top: '.$ypos.'px; left: '.$xpos.'px; height: '.($size*3).'px; width: '.($size*3).'px">
        <div id="body_parent_vertical_pathway_'.$num.'" class="body_parent">
          <div id="V_wall_part_1_'.$num.'" class="wall" style="top: 0; left: 0; height: 100%; width: calc(100% / 3);"></div>
          <div id="V_wall_part_2_'.$num.'" class="wall" style="top: 0; left: '.($size*2).'px; height: 100%; width: calc(100% / 3);"></div>
        </div>
      </div>';
    }

    function horizontal($xpos, $ypos, $num) {
      $size = $this->size;
      echo'
      <div class="mainbody" style="top: '.$ypos.'px; left: '.$xpos.'px; height: '.($size*3).'px; width: '.($size*3).'px">
        <div id="body_parent_horizontal_pathway_'.$num.'" class="body_parent">
          <div id="H_wall_part_1_'.$num.'" class="wall" style="top: 0; left: 0; height: calc(100% / 3); width: 100%;"></div>
          <div id="H_wall_part_2_'.$num.'" class="wall" style="top: '.($size*2).'px; left: 0; height: calc(100% / 3); width: 100%;"></div>
        </div>
      </div>';
    }

    function cross() {

    }
  }


  // rooms //

  class rooms {

  }

?>
