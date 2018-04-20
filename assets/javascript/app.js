$(document).ready(function() {
  var sports = [
    "soccer",
    "football",
    "basketball",
    "baseball",
    "tennis",
    "swimming"
  ];

  // function to make buttons and add to page
  function makeButton(arr, classes, where) {
    $(where).empty();
    for (var i = 0; i < arr.length; i++) {
      var but = $("<button>");
      but.addClass(classes);
      but.attr("data-type", arr[i]);
      but.text(arr[i]);
      $(where).append(but);
    }
  }

  $(document).on("click", ".sport-button", function() {
    $("#sports").empty();
    $(".sport-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var sportDiv = $('<div class="sport-item">');
        var rating = response.data[i].rating;
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var imgTag = $("<img>");
        imgTag.attr("src", still);
        imgTag.attr("still", still);
        imgTag.attr("animate", animated);
        imgTag.attr("states", "still");
        imgTag.addClass("sport-image");
        sportDiv.append(imgTag);
        $("#sports").append(sportDiv);
      }
    });
  });

  $(document).on("click", ".sport-image", function() {
    if ($(this).attr("states") === "still") {
      $(this).attr("src", $(this).attr("animate"));
      $(this).attr("states", "animate");
    } else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("states", "still");
    }
  });
  $("#add-sport").on("click", function(e) {
    e.preventDefault();
    var newsport = $("input")
      .eq(0)
      .val();
    if (newsport.length > 2) {
      sports.push(newsport);
    }

    makeButton(sports, "sport-button", "#sport-buttons");
  });

  makeButton(sports, "sport-button", "#sport-buttons");
});
