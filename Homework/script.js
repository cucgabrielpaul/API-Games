//Erase games IDs

getGamesFromApi().then(function(games) {
  displayGames(games);
});

function displayGames(games) {
  var template = document.getElementById("template");
  var articlesElement = document.getElementById("articles");
  articlesElement.innerHTML = "";
  console.log("Games from api", games);
  for (var i = 0; i < games.length; i++) {
    var currentGames = games[i];
    //Clone HTML element
    var clonedElement = template.cloneNode(true);
    //Get games titles
    var titleElement = clonedElement.querySelector("h3");
    titleElement.innerHTML = "Title: " + currentGames.title;
    //Replace article ids with games ids
    clonedElement.id = currentGames._id;
    //Get games img
    var imgElement = clonedElement.querySelector("img");
    var picture = currentGames.imageUrl;
    //imgElement.setAttribute("src", picture);
    imgElement.src = picture;

    articlesElement.appendChild(clonedElement);

    //Get details
    var detailsButton = clonedElement.querySelector(".details");
    detailsButton.addEventListener("click", gamesDetails);

    //Delete game
    var deleteButton = clonedElement.querySelector(".delete");
    deleteButton.addEventListener("click", deleteGame);
    //Edit game
    var editButton = clonedElement.querySelector(".edit");
    editButton.addEventListener("click", editGame);
  }
  var addgameButton = document.querySelector(".addgame");
  addgameButton.addEventListener("click", addGameOnApi);

  var regenerateButton = document.querySelector(".regenerate");
  regenerateButton.addEventListener("click", regenerateGamesFromApi);
}

function computeGameInfoFromEvent(event) {
  var parentElement = event.target.parentElement;
  var gameId = parentElement.id;

  return {
    gameElement: parentElement,
    gameId: gameId
  };
}
function gamesDetails(event) {
  var gameInfo = computeGameInfoFromEvent(event);

  getGamesDetailsFromApi(gameInfo.gameId).then(function(gameId) {
    var id = gameInfo.gameElement.children[2];
    var releaseDate = gameInfo.gameElement.children[3];
    var genre = gameInfo.gameElement.children[4];
    var publisher = gameInfo.gameElement.children[5];
    var description = gameInfo.gameElement.children[6];

    id.innerHTML = "<b>Game ID :</b> " + gameId._id;
    releaseDate.innerHTML =
      "<b>Release Date :</b> " + new Date(gameId.releaseDate).toDateString();
    genre.innerHTML = "<b>Genre :</b> " + gameId.genre;
    publisher.innerHTML = "<b>Publisher :</b> " + gameId.publisher;
    description.innerHTML = "<b>Description :</b> " + gameId.description;
  });
}

function deleteGame(event) {
  var gameInfo = computeGameInfoFromEvent(event);
  deleteGamesFromApi(gameInfo.gameId).then(function() {
    gameInfo.gameElement.remove();
  });
}

function editGame(event) {
  var gameInfo = computeGameInfoFromEvent(event);

  var editButton = event.target;
  editButton.disabled = true;

  var labelElement = document.createElement("label");
  labelElement.innerHTML = "Title : ";
  gameInfo.gameElement.appendChild(labelElement);

  var inputElement = document.createElement("input");
  inputElement.required = true;
  gameInfo.gameElement.appendChild(inputElement);

  var saveElement = document.createElement("button");
  saveElement.innerHTML = "Save";
  gameInfo.gameElement.appendChild(saveElement);

  saveElement.addEventListener("click", function() {
    var titleValue = inputElement.value;
    if (titleValue === "") {
      alert("The input field it's empty!");
    } else {
      editGameFromApi(gameInfo.gameId, titleValue).then(function(data) {
        gameInfo.gameElement.querySelector("h3").innerHTML =
          "Title : " + data.title;
        inputElement.style.display = "none";
        labelElement.style.display = "none";
        saveElement.style.display = "none";
        editButton.disabled = false;
      });
    }
  });
}

function addGameOnApi() {
  var inputs = document.getElementById("form_id");

  if (inputs.style.display == "block") {
    inputs.style.display = "none";
  } else {
    inputs.style.display = "block";
  }

  var registerBtn = document.getElementById("registerbtn");
  registerBtn.addEventListener("click", submitForm);

  var cancelBtn = document.getElementById("cancelbtn");
  cancelBtn.addEventListener("click", cancelForm);
}

function submitForm() {
  event.preventDefault();
  var title = document.querySelector("input#title").value;
  var releaseDate = document.querySelector("input#releaseDate").value;
  var genre = document.querySelector("input#genre").value;
  var publisher = document.querySelector("input#publisher").value;
  var imageUrl = document.querySelector("input#imageUrl").value;
  if (title && releaseDate && genre && publisher !== "") {
    createGame(title, releaseDate, genre, publisher, imageUrl).then(
      function result() {
        cancelForm();
        location.reload(true);
      }
    );
  } else {
    alert("The input field it's empty!");
  }
}

function cancelForm() {
  var inputs = document.getElementById("form_id");
  inputs.style.display = "none";
}
