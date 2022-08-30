let container = document.querySelector('.container');
let bodyContainer = document.querySelector('.bodyContainer');
let errors = document.querySelector('.errorDisplay');
let inputField = document.querySelector('input');
let myKey = "6bc35126cb63b5b43d3a7a6318d4177c";
let locationButton = document.querySelector(".location")
let weatherIcon = document.querySelector('.weather-icon')
let backArrow = document.querySelector('.bx')

let api;

inputField.addEventListener("keyup", e =>{
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})

locationButton.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    } else {
        alert("your browser does not support geolocation")
    }
})

function onError(error){
    errors.innerText = error.message;
    errors.classList.add("error");
}
function onSuccess(position){
    const {latitude,longitude} =position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${myKey}`
    fetchData();
}


function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myKey}`;
    fetchData();
}


function weatherDetails(info){
   if (info.cod == "404") {
    errors.classList.replace("pending","error")
    errors.innerText = `${inputField.value} is not valid city name`
   } else {
    const city = info.name;
    const country = info.sys.country;
    const {description,id} = info.weather[0];
    const {feels_like,humidity,temp} = info.main;

    if(id == 800){
        weatherIcon.src = "clear.svg";
    }else if(id >= 200 && id <= 232){
        weatherIcon.src = "storm.svg";  
    }else if(id >= 600 && id <= 622){
        weatherIcon.src = "snow.svg";
    }else if(id >= 701 && id <= 781){
        weatherIcon.src = "haze.svg";
    }else if(id >= 801 && id <= 804){
        weatherIcon.src = "cloud.svg";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        weatherIcon.src = "rain.svg";
    }
    

    document.querySelector(".temp .numb").innerText = Math.floor(temp);
    document.querySelector(".temp2 .numb").innerText = Math.floor(feels_like);
    document.querySelector(".columnhumidity .numb").innerText = `${humidity}%`;
    document.querySelector(".location2 span").innerText = `${city},${country}`;
    document.querySelector(".weather").innerText = description;


    errors.classList.remove("pending", "error");
    container.classList.add("active")
   }

    
}



function fetchData(){
    errors.innerText = "Getting weather details....";
    errors.classList.add("pending");
fetch(api).then(response=>response.json()).then(result => weatherDetails(result));
}

backArrow.addEventListener('click', () => {
    container.classList.remove("active");
    errors.classList.remove("pending", "error");
    errors.innerText = "";
})

