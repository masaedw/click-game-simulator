var patCells;

function getPattern()
{
  return $.map(patCells, function(i){ return i.hasClass("light"); });
}

function getCoordFromId(id)
{
  var m = id.match(/_(\d+)_(\d+)/);
  return [parseInt(m[1]), parseInt(m[2])];
}

// element is passed to callback
function eachPatternCells(center, callback)
{
  var pattern = getPattern();

  $.each(pattern, function(idx, i) {
    if (i)
    {
      var x = center[0] + (idx % 3) - 1;
      var y = center[1] + Math.floor(idx / 3) - 1;
      var sel = "#cell_" + x + "_" + y;
      callback($(sel));
    }
  });
}

function getMode()
{
  return $("input[name=mode]:checked").val();
}

function getCount()
{
  return $(".touch").length;
}

function updateCounter()
{
  $("#counter").text("count: " + getCount());
}

function initSimulator()
{
  patCells = [$("#pat_0_0"), $("#pat_1_0"), $("#pat_2_0"),
              $("#pat_0_1"), $("#pat_1_1"), $("#pat_2_1"),
              $("#pat_0_2"), $("#pat_1_2"), $("#pat_2_2")];

  $("#pattern td").click(function() {
    if (getMode() == "setting")
    {
      $(this).toggleClass("light");
    }
  });

  $("#board td").click(function() {
    if (getMode() == "setting")
    {
      $(this).toggleClass("light");
    }
    else
    {
      var coord = getCoordFromId($(this).attr("id"));
      eachPatternCells(coord, function(cell) { cell.toggleClass("light"); });
      $(this).toggleClass("touch");
      $("#counter").text("");
      updateCounter();
    }
  });

  $("#clear").click(function() {
    $.each(patCells, function(i, cell) { cell.removeClass("light"); });
    for (var x = 0; x <= 5; x++) {
      for (var y = 0; y <= 7; y++) {
        var sel = "#cell_" + x + "_" + y;
        $(sel).removeClass("touch").removeClass("light");
      }
    }
    updateCounter();
  });

  $("#replay").click(function() {
    $(".touch").each(function() {
      $(this).click();
    });
  });
}

$(initSimulator);
