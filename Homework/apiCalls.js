var baseUrl = "https://games-api-siit.herokuapp.com";

function getGamesFromApi() {
  var url = baseUrl + "/games";
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function getGamesDetailsFromApi(gameId) {
  var url = baseUrl + "/games/" + gameId;

  return fetch(url).then(function(response) {
    return response.json();
  });
}

function editGameFromApi(gameId, titleValue) {
  var url = baseUrl + "/games/" + gameId;
  var data = {
    title: titleValue
  };

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  }).then(function(response) {
    return response.json();
  });
}

function deleteGamesFromApi(gameId) {
  var url = baseUrl + "/games/" + gameId;

  return fetch(url, {
    method: "DELETE"
  });
}

function createGame(title, releaseDate, genre, publisher, imageUrl) {
  return fetch(baseUrl + "/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      releaseDate: releaseDate,
      genre: genre,
      publisher: publisher,
      imageUrl: imageUrl.toString(),
      description: "no description"
    })
  }).then(function(response) {
    return response.json();
  });
}

function regenerateGamesFromApi() {
  var url = baseUrl + "/regenerate-games";
  return fetch(url).then(function() {
    location.reload(true);
    console.log("API was regenerate");
  });
}
