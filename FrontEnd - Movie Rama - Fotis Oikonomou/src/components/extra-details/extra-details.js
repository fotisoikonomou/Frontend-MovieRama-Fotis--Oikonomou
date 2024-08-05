import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../credentials.js";

export function toggleMovieDetails(movieCard, movieId) {

  const extraDetails = movieCard.querySelector(".extra-details");
  
  const isCurrentlyExpanded = movieCard.classList.contains("expanded");

  // Collapse any other expanded movie card if is open
  document.querySelectorAll(".movie-card.expanded").forEach((card) => {
    if (card !== movieCard) {
      // Add a delay before starting the collapse animation
      setTimeout(() => {
        card.classList.remove("expanded");
        const otherExtraDetails = card.querySelector(".extra-details");
        setTimeout(() => {
          otherExtraDetails.innerHTML = ""; // Clear content after transition
        }, 500); // CSS transition duration for collapse
      }, 50); //  delay the higher the slower
    }
  });

  if (isCurrentlyExpanded) {
    // Collapse the open movie card
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

export function loadExtraDetails(movieId, container) {
  fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,reviews,similar`
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      container.innerHTML = `
            <div class="trailer">
              <h4>Trailer</h4>
  
              ${
                data.videos.results.length > 0
                  ? `<iframe src="https://www.youtube.com/embed/${data.videos.results[0].key}" frameborder="0" allowfullscreen></iframe>`
                  : "<p>There is no trailer at this time!</p>"
              }
  
            </div>
            <div class="reviews">
  
              <h3>Reviews</h3>
  
              
              ${
                data.reviews.results.length > 0 // Check if there are any reviews first
                  ? /*If there are avaiable revies then start from 0 index and display at least 2 reviews */
                    data.reviews.results
                      .slice(0, 2)
                      .map(
                        (review) => ` <p><strong>Author:</strong> ${
                          review.author_details.username || "Unknown Author"
                        }</p>
                                      <p><strong>Created at:</strong> ${new Date(
                                        review.created_at
                                      ).getFullYear()}</p>
                                      <p><strong>Rating:</strong> ${
                                        review.author_details.rating || "N/A"
                                      }</p>
                                      <p>${review.content}</p>`
                      )
                      .join("")
                  : "<p>There are no reviews at this time!</p>"
              }
            </div>
            <div class="similar-movies">
              
            <h4>Similar Movies</h4>
  
              <div class="similar-movie-list">
           
           ${
             data.similar.results.length > 0
               ? data.similar.results
                   .slice(0, 3)
                   .map(
                     (movie) => ` 
                  <div class="similar-movie">
              ${
                movie.poster_path
                  ? `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">`
                  : `<p><strong>No Image Available</strong></div>`
              }
               
                   
                  <p><strong>${movie.title}</strong></p>

                   <p><strong>Release date:</strong> ${new Date(
                     movie.release_date
                   ).getFullYear()}</p>
                  
                  </div>
  
                `
                   )
                   .join("")
               : "<p>There are no similar movies at this time!</p>"
           }
              </div>
            </div>
          `;
    })
    .catch((error) =>
      console.error(
        "There was an error while loading the movie  details:",
        error
      )
    );
}
