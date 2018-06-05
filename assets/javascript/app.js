// Some steps in this code were modeled after the log-movie-name & dynamic elements in-class activities
$(document).ready(function(){
// Topics
var topics = ["artists", "food" , "animals"] // The instructions requested that we include topics under this var, but it is unclear to me how to make the application change topics, so I will build the assignment on Artists only.

// Initial array of artists 

var artists = ["The Beatles", "Madonna", "The Rolling Stones", "Pitbull", "Beyonce", "Maroon 5", "Shakira"];

var GIFarray =[];

// Show buttons - as reviewed during log-movie-name activity

function showButtons(){
// Deleting the artists prior to adding new artists
// (this is necessary otherwise we will have repeat buttons)
	$("#buttons").empty();
	for(var i = 0; i < artists.length; i++){
    // Create button
        var a = $("<button>");
    // Add class
        a.addClass("artist");
    // Add data attribute
        a.attr("data-name", artists[i]);
    // Add text
        a.text(artists[i]);
    // Append to HTML
        $("#buttons").append(a);
    }

//Show GIFS for topic (artist) when clicked
$(".artist").on("click", function(){
// Clear display area
$(".display").empty();
// Capture the artist/topic name from the data-attribute
    var artist = $(this).attr("data-name")
// Construct URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=music+" + artist + "&limit=10&api_key=RIHb6WWJxG6XKWQggtH1v1KuC2pWqr5V";
// Pull data using AJAX
    $.ajax({
    url: queryURL, 
    method: "GET"
    }).then(function(response){
// Function for each item returned
        for (var i = 0; i < response.data.length; i++) {
            $(".display").append("<div class=gifDisplay'><p class='title'>Rating: "+ response.data[i].rating +"</p><div class='gif-here'><img class='GIF img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
            GIFarray.push(response.data[i].images.fixed_height.url);
       }
    });
});
}
// Call the function to show the buttons
showButtons();

// Add button for a new artist
$("#add-artist").on("click", function(event){
    event.preventDefault(); // Prevents page from refreshing
	var newArtist = $("#artist-input").val().trim();
    artists.push(newArtist);
    $("#artist-input").val("")
    showButtons();
    
});

// On click, show animated GIF - followed from pausing gifs activity
$("body").on("click", ".GIF", function(){
    var state = $(this).attr("data-state");
    var staticGif = $(this).attr("data-still");
    var animatedGif = $(this).attr("data-animate");
    if (state === "still") {
         $(this).attr("src", animatedGif);
         $(this).attr("data-state", "animate");
    }// On second click, show "static" GIF
    else if (state !== "still") {
         $(this).attr("src", staticGif);
         $(this).attr("data-state", "still");
    };
});  
});
 


