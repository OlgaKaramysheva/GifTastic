//create variable called topics 
$(document).ready(function () {

    var topics = ["black labradors", "brown labradors", "golden labradors"];

    //create button for array for each topic

    function getGifs(searchTerm) {
        var apiKey = "mCD8qaUjjrh0aD1WNmUqdBq4urll6uuW";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=1&rating=PG-13&lang=en";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var data = response.data[i];
                var p = $("<p>");
                p.text("Rated: " + data.rating);


                var img = $("<img>");
                img.attr("src", data.images.downsized_still.url);
                img.attr("data-still", data.images.downsized_still.url);
                img.attr("data-animate", data.images.original.url);

                img.attr("data-state", "still");

                img.addClass("gif");


                $("#gif-holder").append(p, img);
            }
        });
    }

    function createButton(title) {
        // make a new button 
        var btn = $("<button>");
        // and a value of the title of the show 
        btn.text(title);
        // with a data-attribute of data-title
        btn.attr("data-title", title);
        // add the class of btn btn-success
        btn.addClass("btn btn-success show-btn");
        // append the new button the #buttons div
        $("#buttons").append(btn);
    }

    function makeButtons() {
        // loop through an array of strings
        // for each element in the array 
        for (var i = 0; i < topics.length; i++) {
            createButton(topics[i]);
        }
    }

    function addTopic() {
        console.log("Hello world");
        var topic = $("#new_topic").val().trim();

        topics.push(topic);

        createButton(topic);
    }

    makeButtons();

    // listen for the click .show-btn
    $(document).on("click", ".show-btn", function (event) {
        // console.log("clicked on a btn");
        // clear gifs from the previous page 
        $("#gif-holder").empty();

        // get the buttons data-attribute value
        var show = $(this).attr("data-title");
        console.log(show);

        // call the function with that value
        // add new gifs
        getGifs(show);
    });


    // $.on("click", "#gif-holder", function(event){
    $(document).on("click",".gif", function () {
        //event.preventDefault()
        // console.log("img clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    $("#submit").on("click", function (){
        // console.log("click");
        var newTopic = $("#new_topic").val().trim();
        console.log(newTopic);
        topics.push(newTopic);
        console.log(topics);
        makeButtons();



    })

})