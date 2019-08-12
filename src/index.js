let DOGS=[]
document.addEventListener("DOMContentLoaded", function(){
    getRequst();
    const filterDog = document.getElementById("good-dog-filter");
    filterDog.addEventListener("click", event=>{
        event.preventDefault();
        clickFilter(filterDog);
    });
});

function clickFilter(filterDog) {
    
    if(filterDog.innerHTML==="Filter good dogs: OFF") {  
        filterDog.innerHTML = "Filter good dogs: ON";
        const dogs = DOGS.filter(dog => dog.isGoodDog);
        addDogs(dogs);
    } else {
        filterDog.innerHTML = "Filter good dogs: OFF";
        addDogs(DOGS);
    }
}

function getRequst(){
    fetch("http://localhost:3000/pups")
    .then(response => {
        return response.json()
    })
    .then(dogs =>{
        DOGS= dogs
        addDogs(dogs)
    });
}

function addDogs(dogs) {
   const dogDiv = document.getElementById("dog-bar");
   deleteDogDiv();
   dogs.map(dog => {
    const dogSpan = createDog(dog);
    dogDiv.appendChild(dogSpan);
    dogSpan.addEventListener("click", event =>{
        event.preventDefault();
        deleteDog();
        showDog(dog);
    });
   });
   
}

function deleteDogDiv() {
    const div = document.getElementById("dog-bar");
    while(div.firstChild) {
        div.firstChild.remove();
    };
}

function deleteDog() {
    const div = document.getElementById("dog-info");
    while(div.firstChild) {
        div.firstChild.remove();
    }
}

function createDog(dog) {
    const span = document.createElement("span");
    span.innerHTML = dog.name;
    return span;
}

function showDog(dog) {
  const div = document.getElementById("dog-info");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const button = document.createElement("button");
  button.id = "dogToggle";
  img.src = dog.image;
  h2.innerHTML = dog.name;
  if(dog.isGoodDog === true) {
    button.innerText = "Good dog";
  }else{
    button.innerText = "Bad dog";
  }

  button.addEventListener("click", event =>{
      event.preventDefault();
      toggleDog(dog);  
  })
  
  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(button);
  return div;
}

function toggleDog(dog) {
    const  button = document.getElementById("dogToggle");
    if(dog.isGoodDog=== true) {
        dog.isGoodDog = false;
        button.innerText = "Bad dog";
    }else {
        dog.isGoodDog = true;
        button.innerText = "Good dog";
    }

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify({
            "isGoodDog": dog.isGoodDog
       }) 
    });   
}