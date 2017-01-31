(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE



  document.querySelector('button').addEventListener('click', function() {
    event.preventDefault()
    const value = document.getElementById('search').value;
    const string = stringCleaning(value);

    !string ? console.log("toast") : callApi(string)

    console.log(movies)
    renderMovies()
    movies.splice(0, movies.length)


  })



  function stringCleaning(string) {
    return string.split(' ').join("+");
  }

  function getRemoteJsonUrl(url) {
    return fetch(url).then(function(prom) {
      return prom.json();
    })
  }

  function callApi(input) {
    const api = `http://www.omdbapi.com/?s=${input}`;
    getRemoteJsonUrl(api).then(function(obj) {
      Promise.all(obj.Search).then(function(array) {
        array.forEach(function(element) {
          movies.push({id: element.imdbID, poster: element.Poster, title: element.Title, year: element.Year})
        })
        renderMovies()
      })
    })
    .catch(function(error) {
      console.log("Error Error!")
    })
  }

  // function domCreator(num) {
  //   for (i = 0; i < num; i++) {
  //     let div = document.createElement('div');
  //     document.body.append(div)
  //
  //   }
  // }




})();
