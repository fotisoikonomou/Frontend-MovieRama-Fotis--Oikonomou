import { loadMovies } from "./api.js";
import { currentPage,isLoading } from "./state.js";
import { toggleMovieDetails } from "./extra-details/extra-details.js";

import {
  API_KEY,
  BASE_URL,
  NOW_PLAYING_URL,
  SEARCH_URL,
  IMAGE_BASE_URL,
} from "./credentials.js";

let genres = {};

let currentSearch = "";

export async function fetchGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    data.genres.forEach((genre) => {
      genres[genre.id] = genre.name;
    });
  } catch (error) {
    console.error("Error while fetching the genres:", error);
  }
}

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
        <p class="movie-year"><b>Year of Release:</b> ${new Date(movie.release_date).getFullYear()}</p>
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
export function setupInfiniteScroll() {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      const url = currentSearch
        ? `${SEARCH_URL}${currentSearch}`
        : NOW_PLAYING_URL;
      loadMovies(url, currentPage);
    }
  });
}
