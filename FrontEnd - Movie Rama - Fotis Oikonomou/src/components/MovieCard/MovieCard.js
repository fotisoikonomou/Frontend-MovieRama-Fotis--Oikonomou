export function displayMovies(movies) {
  
  const movieList = document.getElementById("movie-list");

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");

    movieCard.classList.add("movie-card");

    const genreNames = movie.genre_ids.map((id) => genres[id]).join(", ");

    movieCard.innerHTML = `

      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">

      <div class="movie-details">

        <h4 class="movie-title">${movie.title}</h4>

        <p class="movie-year"><b>Year of Release:</b> ${new Date(
          movie.release_date
        ).getFullYear()}</p>

        <p class="movie-genres"><b>Genres:</b> ${genreNames}</p>

        <p class="movie-vote"><b>Vote Average:</b> ${movie.vote_average}</p>

        <p class="movie-overview"><b>Overview:</b> ${movie.overview}</p>

      </div>

      <div class="extra-details"></div>
    `;

    movieCard.addEventListener("click", () =>
      toggleMovieDetails(movieCard, movie.id)
    );

    movieList.appendChild(movieCard);
  });
}

function toggleMovieDetails(movieCard, movieId) {
  const extraDetails = movieCard.querySelector(".extra-details");

  const isCurrentlyExpanded = movieCard.classList.contains("expanded");

  document.querySelectorAll(".movie-card.expanded").forEach((card) => {
    if (card !== movieCard) {
      // Add a small delay before starting the collapse animation
      setTimeout(() => {
        card.classList.remove("expanded");
        const otherExtraDetails = card.querySelector(".extra-details");
        setTimeout(() => {
          otherExtraDetails.innerHTML = ""; // Clear the  content after transition
        }, 500); // CSS transition duration for collapse
      }, 50); //  delay the higher the slower
    }
  });

  if (isCurrentlyExpanded) {
    // Collapse the already opened movie card
    movieCard.classList.remove("expanded");
    setTimeout(() => {
      extraDetails.innerHTML = ""; // Clear extra details after transition
    }, 500); //  CSS transition duration for collapse
  } else {
    // Expand the current selected clicked movie card
    movieCard.classList.add("expanded");
    loadExtraDetails(movieId, extraDetails);
    // Scroll the expanded movie card into view so user sees direct in his screen the selected card
    movieCard.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
