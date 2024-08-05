/* Global variables that are used in the app */
export let isLoading = false;

export let currentPage = 1;

export let genres = {};

export function setLoading(value) {
  isLoading = value;
}

export function incrementPage() {
  currentPage++;
}

export function resetPage() {
  currentPage = 1;
}
