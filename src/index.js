let api = 'http://localhost:3000/pups'
const fetchDogs = function(){
    fetch(api)
    .then(function(response){
        return response.json()
    }).then(function(dogs){
        iterate(dogs)
    })
} //end fetch

fetchDogs();

const iterate = function(dogs) {
    return dogs.forEach(function(dog){
        appendDog(dog)
    })
} //end iterate

const appendDog = function(dog) {
    let divContainer = document.getElementById('dog-bar')
    let spanName = document.createElement('span')
    spanName.innerText = dog.name
    divContainer.appendChild(spanName)
    let dogInfoContainer = document.getElementById("dog-info")
    let behaviorButton = document.createElement('button')
    
    spanName.addEventListener('click', function(e){
        console.log("clicking")
        dogInfoContainer.innerHTML = ""
        let image = document.createElement('img')
        image.src = dog.image
        let h2 = document.createElement('h2')
        h2.innerText = dog.name
        behaviorButton.dataset.id = dog.id
        behaviorButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogInfoContainer.appendChild(image)
        dogInfoContainer.appendChild(h2)
        dogInfoContainer.appendChild(behaviorButton)
    })//name event listener

    behaviorButton.addEventListener('click', function(e){
        console.dir(e.target)
        e.target.innerText = e.target.innerText === "Good Dog!" ? "Bad Dog!" : "Good Dog!"
        updateDogFetch(e.target.dataset.id, !!(e.target.innerText === "Good Dog!"))
    })

}//end append dog

const updateDogFetch = function(id, behavior) {
    let patchApi = api + '/' + id
    
    fetch(patchApi, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: behavior
        })
    })

} //end update fetch
