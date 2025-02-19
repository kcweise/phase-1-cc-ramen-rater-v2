// index.js

let databaseId; 
const fetchMe = ()=> {
  //Fetch returns whole database dataset then each dataset is passed to displayRamen for rendering. 
  //First dataset is passed to clickRendering for initial load
  fetch(`http://localhost:3000/ramens`)
  .then(res =>{
  if(res.ok){
  return res.json()
  }
  else {
    alert("No promise returned")
  }})
.then(res => {
  res.forEach(ramen => displayRamens(ramen))
  return res;
})
.then(res => {clickRendering(res[0])
})
.catch(error => console.log(error))
};

// Handles the click event from the images to fetch that image json properties and passes them to clickRendering
const handleClick = (e) => {
    e.preventDefault()
  fetch(`http://localhost:3000/ramens/${e.target.id}`)
  .then(res =>{
    if(res.ok){
    return res.json()
    }
    else {
      alert("No promise returned")
    }})
  .then(res => clickRendering(res))
  .catch(error => console.log(error))
  };

//Takes the fetched data from the image click and renders it in the html 
const clickRendering = (res)=> {
    
  const imgDetail = document.querySelector(".detail-image");
  const hTwoRamenName = document.querySelector(".name");
  const hThreeRestName = document.querySelector(".restaurant");
  const spanRating = document.getElementById('rating-display');
  const pcomment = document.getElementById('comment-display');
  
  imgDetail.id = res.id
  imgDetail.src = res.image;
  hTwoRamenName.textContent = res.name;
  hThreeRestName.textContent = res.restaurant;
  spanRating.textContent = res.rating;
  pcomment.textContent = res.comment;
  databaseId = res.id  
  
};

//Handle the submit even getting the inputted attributes and creates a object ready for the database. 
//Post Fetch sends request to post/write to the database and also passes the response data to displayRamens
const submitClick = (e)=> {
  e.preventDefault();
  let inputName = document.getElementById('new-name').value;
  let inputRest = document.getElementById('new-restaurant').value;
  let inputimg = document.getElementById('new-image').value;
  let inputRating = document.getElementById('new-rating').value;
  let inputComment = document.getElementById('new-comment').value;

//Input form data into database compatible object
const newInput = {name: inputName,
restaurant: inputRest,
image: inputimg,
rating: inputRating,
comment: inputComment}

fetch(`http://localhost:3000/ramens`,{
  method:'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newInput),
})
  .then(res =>{
    if(res.ok){
    return res.json()
    }
    else {
      alert("No promise returned")
    }})
  .then(res => displayRamens(res))
  .catch(error => console.log(error));
};

//Updates database based on user input and a submit button. Renders that update by passing fetch response to clickRendering
const updateClick = (e)=> {
  e.preventDefault();

  let updateRating = document.getElementById('edit-rating').value;
  let updateComment = document.getElementById('edit-comment').value;

const updateInput = {rating: updateRating, comment: updateComment}

fetch(`http://localhost:3000/ramens/${databaseId}`,{
  method:'PATCH',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateInput),
})
  .then(res =>{
    if(res.ok){
    return res.json()
    }
    else {
      alert("No promise returned")
    }})
  .then(res => clickRendering(res))
  .catch(error => console.log(error));
  };

//Update Listener for the update form, triggered listener passes the event to updateClick
const addUpdateListener = () => {
  const updates = document.getElementById(`edit-ramen`)
  updates.addEventListener('submit', (e) => updateClick(e))
};

//Submit listener for the form, triggered listener passes the event to submitClick
const addSubmitListener = () => {
  const inputs = document.getElementById(`new-ramen`)
  inputs.addEventListener('submit', (e) =>submitClick(e))
};

//Click listener for the images, triggered listener passes the event to handleClick
const addClickListener = () => {
  const image = document.getElementById(`ramen-menu`)
  image.addEventListener('click', (e) =>handleClick(e))
};

//Renders images in the DOM
const displayRamens = (response) => {
  const origDiv = document.getElementById("ramen-menu");
  const imgRamen = document.createElement("img");

  imgRamen.id = response.id;
  imgRamen.src = response.image;
  imgRamen.alt = `A delicious bowl of ${response.name}`;
  imgRamen.title = response.restaurant

  origDiv.appendChild(imgRamen);
};

//Invokes functions
const main = () => {
  fetchMe();
  addSubmitListener();
  addClickListener();
  addUpdateListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
