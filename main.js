let movies = [];

function createMovieItemEl(movie, index) {
  let movieCover = new Image();
  let movieItemEl = document.createElement("li");
  let movieRemoveButton = document.createElement("button");
  let movieTitleEl = document.createElement("h2");

  movieCover.src = movie.coverURL;

  movieRemoveButton.innerText = "Remover";
  movieTitleEl.innerText = movie.title;

  movieRemoveButton.onclick = removeMovieCover.bind(this, index);

  movieTitleEl.classList.add("movie-title");
  movieRemoveButton.classList.add("btn-danger", "btn");


  movieItemEl.appendChild(movieTitleEl);
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
  let movieTitleEl = document.getElementById("movie-title");
  let imageURL = imageURLEl.value;
  let movieTitle = movieTitleEl.value;

  if (validateMovieURL(imageURL)) {
    if (movieExists(imageURL)) {
      alert("O filme já esta cadastrado!");
    } else {
      let movie = {
        title: movieTitle,
        coverURL: imageURL,
      };
      movies.push(movie);
      drawMovieListEl();
      saveToLocalStorage();
    }
  } else {
    alert("O endereço da capa do filme é invalido!!");
  }

  imageURLEl.value = "";
  movieTitleEl.value = "";
}

function removeMovieCover(index, event) {
  console.log(index);
  movies.splice(index, 1);
  saveToLocalStorage();
  drawMovieListEl();
}

function saveToLocalStorage() {
  serialized_movies = JSON.stringify(movies);
  window.localStorage.setItem("movies_json", serialized_movies);
}

function loadFromLocalStorage() {
  let serialized_movies = window.localStorage.getItem("movies_json");
  if (serialized_movies) {
    movies = JSON.parse(serialized_movies);
  }
}

window.addEventListener("load", function () {
  loadFromLocalStorage();
  drawMovieListEl();
});
