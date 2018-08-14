    var topics = ['Pikachu','Bulbasaur', 'Charmander', 'Squirtle','Arcanine',
                    'Cyndaquil', 'Chikorita', 'Totodile', 'Torchic', 'Mudkip',
                    'Treeko', 'Pidgey', 'Mewtwo', 'Dragonite', 'Lapras', 'Salamance',
                    'Blaziken', 'Swampert', 'Typhlosion', 'Rayquaza']
    renderButtons();

    function renderButtons() {
        console.log("rendering buttons");
        $("#pokemon-buttons").empty();

    // loop through array of pokemon and dynamically generating buttons for each
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='btn-primary'>");
            //adding pokemon class to button
            a.addClass("pokemon");
            //adding data attribute
            a.attr("data-pokemon", topics[i]);
            //button text
            a.text(topics[i]);
            $("#pokemon-buttons").append(a);
        }
    };
$(document).ready(function(){
    //event listener for pokemon buttons
    $("#pokemon-buttons").on("click", ".pokemon", function() {
        console.log("Button was clicked");
        //storing pokemon property value
        var pokemon = $(this).attr("data-pokemon");
        //constructing queryUTL with API key
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        pokemon + "&api_key=tgLFe8Nsp2PDlWg23jXyCnq1I9vcFSEh&limit=10";
        //AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function(response) {
                // loop through every result item
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                // only acts if gif is rated PG or lower
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // creating new div to store rating
                        var gifDiv = $("<div class= 'gifBucket'>");
                        var rating = results[i].rating;
                    // create gif rating paragraph
                        var p = $("<p>").text("Rating: " + rating);
                    // create image tag
                        var pokemon = $("<img>");
                    // adding src attribute from result
                        pokemon.attr("class", "gif");
                        pokemon.attr("src", results[i].images.fixed_height_still.url);
                        pokemon.attr("data-still", results[i].images.fixed_height_still.url);
                        pokemon.attr("data-animate", results[i].images.fixed_height.url);
                        pokemon.attr("data-state", "still")
                    // append paragraph and pokemon to gifDiv
                        gifDiv.append(pokemon);
                        gifDiv.append(p);

                        $("#gifs-here").prepend(gifDiv)
                    }
                }
        
            });
        });

        $(document).on("click", ".gif", function() {
            var state = $(this).attr("data-state");
            console.log("gif clicked state=" + state);
        // if clicked image is still, update src attributes
        // set data state to animate
        // else set src to data-still
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });
    
    $("#pokeAdder").on("click", function() {
        console.log("submit pressed");
        var newPokemon = $("#addPokemon").val();

        if (newPokemon !== '') {
            topics.push(newPokemon);
            renderButtons();
        };
    });
});