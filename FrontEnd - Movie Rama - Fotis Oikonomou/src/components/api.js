import { setLoading, isLoading, incrementPage } from "./state.js";

import { displayMovies } from "./ui.js";

export let genres = {};

export async function loadMovies(url, page) {
  if (isLoading) return; // Prevent from multiple requests from happening
  setLoading(true); // Start loading. This means fetch is in progress. This is used by infinite scrolling in other function

  try {
    const response = await fetch(`${url}&page=${page}`);
    const data = await response.json();
    displayMovies(data.results);
    incrementPage(); // Increment page for next request
  } catch (error) {
    console.error("Error while fetching the movies:", error);
  } finally {
    setLoading(false); // End of the loading
  }
}
