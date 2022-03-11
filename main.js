let movies = [];

function createMovieItemEl(movie, index) {
  let movieCover = new Image();
  movieCover.src = movie;
  let movieItemEl = document.createElement("li");
  let movieRemoveButton = document.createElement("button");
  movieRemoveButton.classList.add("btn-danger", "btn");
  movieRemoveButton.innerText = "Remover";
  movieRemoveButton.onclick = removeMovieCover.bind(this, index);
  movieItemEl.appendChild(movieCover);
  movieItemEl.appendChild(movieRemoveButton);

  return movieItemEl;
}

function drawMovieListEl() {
  let movieListEl = document.querySelector(".movie-list");
  movieListEl.innerHTML = "";
  movies.forEach((movie, index) => {
    movieListEl.appendChild(createMovieItemEl(movie, index));
  });
}

function validateMovieURL(imageURL) {
  return imageURL.endsWith(".jpg") || imageURL.endsWith(".jpeg");
}

function movieExists(imageURL) {
  return movies.indexOf(imageURL) > -1;
}

function addMovieCover() {
  let imageURLEl = document.getElementById("img-url");
  let imageURL = imageURLEl.value;

  if (validateMovieURL(imageURL)) {
    if (movieExists(imageURL)) {
      alert("O filme já esta cadastrado!");
    } else {
      movies.push(imageURL);
      drawMovieListEl();
      saveToLocalStorage();
    }
  }else{
    alert("O endereço da capa do filme é invalido!!");
  }

  imageURLEl.value = "";
}

function removeMovieCover(index, event) {
  console.log(index);
  movies.splice(index, 1);
  saveToLocalStorage();
  drawMovieListEl();
}

function saveToLocalStorage() {
  serialized_movies = movies.toString();
  window.localStorage.setItem("movies", serialized_movies);
}

function loadFromLocalStorage() {
  let serialized_movies = window.localStorage.getItem("movies");
  if (serialized_movies) {
    movies = serialized_movies.split(",");
  }
}

window.addEventListener("load", function () {
  loadFromLocalStorage();
  drawMovieListEl();
});
