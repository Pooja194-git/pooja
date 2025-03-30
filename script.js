let reviewsContainerEl = document.getElementById("reviewsContainer");
let titleInputEl = document.getElementById("titleInput");
let reviewTextareaEl = document.getElementById("reviewTextarea");

function onAddReview() {
    let movieTitle = titleInputEl.value;
    let movieReview = reviewTextareaEl.value;
    if (movieTitle === "") {
        alert("Please enter a movie title");
        return;
    }

    let movieTitleEl = document.createElement("h1");
    movieTitleEl.textContent = "movie title:" + movieTitle;
    reviewsContainerEl.appendChild(movieTitleEl);

    let movieReviewEl = document.createElement("p");
    movieReviewEl.textContent = "review:" + movieReview;
    reviewsContainerEl.appendChild(movieReviewEl);
}
titleInputEl.value = "";
reviewTextareaEl.value = "";