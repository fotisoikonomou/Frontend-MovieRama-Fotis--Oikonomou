import { NOW_PLAYING_URL, SEARCH_URL } from "../credentials.js";

import { loadMovies } from "../api.js";

let currentPages = 1;
let currentSearch = "";

export function setupSearch() {
  const searchBox = document.getElementById("search-box");
  searchBox.addEventListener("input", (e) => {
    // whenever a change occurs fires up.
    currentSearch = e.target.value.trim(); //clean the search from whitespaces

    document.getElementById("movie-list").innerHTML = ""; // clean the previously movies in the page
    if (currentSearch) {
      // if there is a search value
      loadMovies(`${SEARCH_URL}${currentSearch}`, currentPages);
    } else {
      //if not just display the current movies
      loadMovies(NOW_PLAYING_URL, currentPages);
    }
  });
}
