// index.js
//See all ramen images in the "div" with id: ramen-menu (IE appendChild())
//Initially runs loop to get each from database. Passes the data to displayRamens function

const fetchMe = ()=> {
  //Loop for originally getting data from server.
  for (let i = 1 ; i < 6; i++)
  fetch(`http://localhost:3000/ramens/${i}`)
  .then(res =>{
  if(res.ok){
  return res.json()
  }
  else {
    alert("No promise returned")
  }})
.then(res => displayRamens(res))
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

  imgDetail.src = res.image;
  hTwoRamenName.textContent = res.name;
  hThreeRestName.textContent = res.restaurant;
  spanRating.textContent = res.rating;
  pcomment.textContent = res.comment;
  
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

//Submit listener for the form, triggered listener passes the event to submitClick
const addSubmitListener = () => {
  const inputs = document.getElementById(`new-ramen`)
  inputs.addEventListener('submit', (e) =>{submitClick(e);})
};

//Click listener for the images, triggered listener passes the event to handleClick
const addClickListener = () => {
  const image = document.getElementById(`ramen-menu`)
  image.addEventListener('click', (e) =>{handleClick(e);})
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
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
