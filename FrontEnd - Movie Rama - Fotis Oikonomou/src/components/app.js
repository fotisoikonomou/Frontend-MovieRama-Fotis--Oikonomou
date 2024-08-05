import { loadMovies } from './api.js';
import { setupInfiniteScroll,fetchGenres } from './ui.js';
import {  currentPage } from './state.js';
import {setupSearch } from './search/search.js';
import {NOW_PLAYING_URL} from "./credentials.js";


//execute the listener only when dom is fully loaded. 
document.addEventListener('DOMContentLoaded', async () => {
 
  try {
   
    await fetchGenres(); //wait until fetchgenres is fully loaded
    
    loadMovies(NOW_PLAYING_URL, currentPage);/* this function takes now playing url 
                                                and the dynamically curentPage and displays accordingly the results based on the page*/
   
    setupInfiniteScroll();
    
    setupSearch();
    
  } catch (error) {
    console.error('Error while initializing the application:', error);
  }
});