<?php

  include_once "classes.php";

  function base(){
  echo'
    <div id="lights" class="master">

    </div>
    <div id="side_bar1" class="side_bar"></div>
    <div id="side_bar2" class="side_bar"></div>
    <div id="side_bar3" class="side_bar"></div>

    <div id="menu_bar" class="menu_bar">

    </div>

    <div id="pathways" class="master">
      <div id="room1" class="room">

      </div>
      <div id="room2" class="room">

      </div>
      <div id="room3" class="room">

      </div>
      <div id="room4" class="room">

      </div>
    </div>
    ';
    echo'
      <script>
        CreateDungeon();
      </script>';
  }



  function map($x, $in_min, $in_max, $out_min, $out_max)
  {
    return ($x - $in_min) * ($out_max - $out_min) / ($in_max - $in_min) + $out_min;
  }

?>
