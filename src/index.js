let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.querySelector("#toy-collection");

const renderOneToy = (toy) => {
  console.log(toy);
  const toyCard = document.createElement("div");
  toyCard.className = "card";
  // toyCard.setAttribute("class", "card");

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const image = document.createElement("img");
  image.src = toy.image;
  // image.setAttribute("class", "toy-card");
  image.className = "toy-avatar";

  const paragraph = document.createElement("p");
  paragraph.textContent = `${toy.likes} likes`;

  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.textContent = "Like ❤️";

  // toyCard.append(h2);
  // toyCard.append(image);
  // toyCard.append(paragraph);
  // toyCard.append(button);
  toyCard.append(h2, image, paragraph, button);
  toyCollection.append(toyCard);

  // add event listener click to toys like button
  // find the current number of likes and increase by 1
  // new count in paragraph in toy card

  button.addEventListener("click", updateLikes);
};

const updateLikes = (event) => {
  // const newLikes = toy.likes + 1;
  // toy.likes = newLikes;

  // const currentLikesString = event.target.parentElement.querySelector('p').textContent.split(" ")[0];
  // const currentLikes = parseInt(currentLikesString);
  // const newLikes = currentLikes + 1;

  // paragraph.textContent = newLikes + " Likes"
  paragraph.textContent = `${newLikes} Likes`;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newLikes,
    }),
  });
};

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach(renderOneToy);
  });

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const image = event.target.image.value;
  const newToy = {
    name,
    image: image,
    likes: 0,
  };
  // const imageInput = event.target["toy-image"];
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((toy) => {
      // make sure no errors
      renderOneToy(toy);
      // if there is errors let the users know
    });
});

// A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
// If the post is successful, the toy should be added to the DOM without reloading the page.

// find the toy form
// add event listener to the toy form
// preventDefault aka don't refresh!

// send data in fetch so it persists and gets added to db.json
//    - name and image from form inputs
//    - likes to be zero
//    - id doesn't need to be included json-server adds that for us

// toy should be added to the toy collection on DOM
//    - same thing we did for each toy from the get request

// When a user clicks on a toy's like button, two things should happen:
// the toy's like count should be updated in the DOM without reloading the page

// Red -> Green -> Refactor
// const BASE_URL = "http://localhost:3000";

// function init() {
//   getToys();
// }

// function createsToyCard() {
//   // create toy card
// }

// function listensForLikeButtonClick() {
//   // add event listener to like button
// }

// function renderOneToy(toy) {
//   console.log(toy);
//   createsToyCard();
//   listensForLikeButtonClick();
// }

// function handleToyData(toys) {
//   toys.forEach(renderOneToy);
// }

// function getToys() {
//   fetch(BASE_URL + "/toys")
//     .then((resp) => resp.json())
//     .then(handleToyData);
// }

// init();
