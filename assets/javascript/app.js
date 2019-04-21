var teams = ['Chicago Bulls', 'Los Angeles Lakers', 'Denver Nuggets', 'Boston Celtics', 'Milwaukee Bucks'];

function displaynbaInfo() {

    $('#nbaView').empty();

    var nba = $(this).attr('data-name');

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + nba + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating == "r" || results[i].rating == "pg-13") {

                } else {
                    console.log(response)

                    var rating = results[i].rating;
                    var p = $('<p>').text("Rating: " + rating);
                    var nbaImage = $('<img>');

                    nbaImage.attr('src', results[i].images.fixed_height_still.url);
                    nbaImage.attr('data-still', results[i].images.fixed_height_still.url);
                    nbaImage.attr('data-animate', results[i].images.fixed_height.url);
                    nbaImage.attr('data-state', 'still');
                    nbaImage.addClass('nbaImage');


                    $('#nbaView').append(nbaImage);
                    $('#nbaView').append(p);
                }
            }
            $('.nbaImage').on('click', function () {

                var state = $(this).attr('data-state');
                console.log(state);

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            });
        });
}


function renderButtons() {
    $('#buttonsView').empty();

    for (var i = 0; i < teams.length; i++) {
        var a = $('<button>')
        a.addClass('nba');
        a.addClass("btn btn-success");
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', teams[i]);
        a.text(teams[i]);
        $('#buttonsView').append(a);
    }
}

$('#addnba').on('click', function () {
    var nba = $('#nba-input').val().trim();
    teams.push(nba);
    renderButtons();
    return false;
})

$(document).on('click', '.nba', displaynbaInfo);
renderButtons();