// write your code here

// 1). See all ramen images in the div with the id of ramen-menu.
// When the page loads, request the data from the server to get
// all the ramen objects.Then, display the image for each of the ramen
// using an img tag inside the #ramen-menu div.

// 2). Click on an image from the #ramen-menu div and see all the info about
// that ramen displayed inside the #ramen-detail div and where it says insert
// comment here and insert rating here.

// 3). Create a new ramen after submitting the new-ramen form.
// The new ramen should be added to the #ramen-menu div.
// The new ramen does not need to persist; in other words,
// if you refresh the page, it's okay that the new ramen is no longer on the page.

let init = () => {

  let ramenMenuDiv = document.querySelector('#ramen-menu');
  let ramenDetailDiv = document.querySelector('#ramen-detail');
  
  // display a ramen image in the menu up top
  let displayOneRamenImageInMenu = (ramenObj) => {
    let img = document.createElement('img');
    img.src = ramenObj.image;
    img.id = `ramen-img-${ramenObj.id}`;
    ramenMenuDiv.appendChild(img);
    
    // add an event listener to the newly created img tag immediately following creation
    let showAllInfoAboutRamen = () => {
      // populate img tag
      ramenDetailDiv.children[0].src = ramenObj.image;
      
      // populate h2 tag containing name of ramen
      ramenDetailDiv.children[1].innerText = ramenObj.name;

      // populate h3 tag containing restaurant
      ramenDetailDiv.children[2].innerText = ramenObj.restaurant;

      // populate span tag containing rating
      document.querySelector('#rating-display').innerText = ramenObj.rating;

      // populate p tag containing comment
      document.querySelector('#comment-display').innerText = ramenObj.comment;
    };
    img.addEventListener('click', showAllInfoAboutRamen);
  };

  // fetch ramens data to display in menu
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(json => {
    json.forEach(displayOneRamenImageInMenu);
  });


  let inputForm = document.querySelector('#new-ramen');
  inputForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // capture all input fields
    let name = e.target.children[2].value;
    let restaurant = e.target.children[4].value;
    let image = e.target.children[6].value;
    let rating = parseInt(e.target.children[8].value);
    let comment = e.target.children[10].value;

    // construct new ramen object
    let newRamenObj = {
      "id": '',
      "name": name,
      "restaurant": restaurant,
      "image": image,
      "rating": rating,
      "comment": comment
    };

    // display new ramen image in menu
    displayOneRamenImageInMenu(newRamenObj);
    
    // clear out input fields upon submission
    inputForm.reset();
  });
};






document.addEventListener('DOMContentLoaded', init);