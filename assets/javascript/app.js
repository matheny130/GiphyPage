
var topics = ["Homer Simpson", "Marge Simpson", "Lisa Simpson", "Bart Simpson", "Moe Syzslak", "Montgomery Burns", "Ned Flanders", "Professor Frink", "Krusty the Clown", "Chief Wiggum"];

function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("char-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons").append(a);
  }
};

$("#add-character").on("click", function (event) {
  event.preventDefault();
  var char = $("#user-input").val().trim();
  topics.push(char);
  renderButtons();
  $("#user-input").val("");
});



function displayGIF() {

  var character = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    character + "&api_key=YzU87ZrObKCD5IsIvQ6QHt5NuYi7796U&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var charImage = $("<img class='gif' id='pictures'>");
      charImage.attr("src", results[i].images.fixed_height_still.url);
      console.log(results);
      charImage.attr("data-still", results[i].images.fixed_height.url);
      charImage.attr("data-animate", results[i].images.fixed_height_still.url);
      gifDiv.prepend(charImage);
      gifDiv.prepend(p);
      $("#thumbnails").prepend(gifDiv);
    }



  });
  $("#thumbnails").empty();



};


renderButtons();

$(document).on("click", ".char-btn", displayGIF);

$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});



