import { captions, sounds } from "./captions2.js";

console.log(captions[0].time);

const captionContainer = document.querySelector("main section ul");
const video = document.querySelector("video");
const iconsExplainContainer = document.querySelector("main > div span")
const effectsContainer = document.querySelector("main > div > div")

let currentCaptionIndex = 0;
let myInterval;
let currentTime;

// video play/stop ==========================================================================

video.addEventListener("play", () => {
  captionContainer.classList.add("start");
  iconsExplainContainer.classList.add('hidden');

  console.log("start");
});

video.addEventListener("pause", () => {
  console.log("pause");
});

effectsContainer.addEventListener("click", function (event) {
  if (video.paused) {
    video.play();

  } else {
    video.pause();
  }
}); 

iconsExplainContainer.addEventListener("click", function (event) {
  if (video.paused) {
    video.play();

  } else {
    video.pause();
  }
}); 



// video time update ==========================================================================
video.addEventListener("timeupdate", timeupdate => {
  const currentCaption = captions[currentCaptionIndex];
  currentTime = video.currentTime;
  console.log("--- timer 0", currentTime);

  // captions array
  if (currentTime >= currentCaption.time && currentCaptionIndex < captions.length + 1) {
    captionMaken(captions);

    if (currentTime >= 19.580 && currentTime < 21.430) {
      video.classList.add("zoomin")
    } else {
      video.classList.remove("zoomin")
    }

    if (currentTime >= 45.750 && currentTime < 46.190) {
      video.classList.add("shock")
    } else {
      video.classList.remove("shock")
    }
    if (captionContainer.childElementCount > 1) {
      let captionText = document.querySelector("main section ul li:first-of-type");
      captionText.remove();
    }

    currentCaptionIndex++;
  }

  // sounds array
  for (let i = 0; i < sounds.length; i++) {
    if (currentTime >= sounds[i].timestart && currentTime < sounds[i].timestop) {
      if (!myInterval) {
        console.log("setInterval");
        makeSound(sounds[i], i);
        soundNote(sounds[i], i);
        myInterval = setInterval(makeSound, 300, sounds[i], i);
      }
    }
  }

  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i + 1]) {
      if (currentTime >= sounds[i].timestop && currentTime < sounds[i + 1].timestart) {
        if (myInterval) {
          console.log("clearInterval");
          clearInterval(myInterval);
          myInterval = null;
          effectsContainer.innerHTML=""
        }
      }
    }
    else if (currentTime >= sounds[i].timestop) {
      if (myInterval) {
        console.log("clearInterval");
        clearInterval(myInterval);
        myInterval = null;
        effectsContainer.innerHTML=""
      }
    }
  }

});


// captions adding ==========================================================================

function captionMaken(captions) {
  const liElement = document.createElement("li");
  const pElement = document.createElement("p");
  const divElement = document.createElement("div");
  const imgElement = document.createElement("img");

  imgElement.src = "./images/" + captions[currentCaptionIndex].charachter + "-" + captions[currentCaptionIndex].mood + ".png";
  pElement.innerHTML = captions[currentCaptionIndex].caption;

  if (captions[currentCaptionIndex].charachter !== "sound") {
    divElement.appendChild(imgElement);
    liElement.appendChild(divElement);
    liElement.appendChild(pElement);
    captionContainer.appendChild(liElement);
  } else {
    liElement.appendChild(pElement);
    captionContainer.appendChild(liElement);
  }
}

// sound making ==========================================================================

function makeSound(sound, index) {
  console.log("HI");
  // console.log(sound)

  const span = document.createElement('span');
  
  span.style.left = sound.positionX;
  span.style.top = sound.positionY;
  span.style.setProperty("--sound-power", sound.soundPower);

  effectsContainer.appendChild(span);
}

function soundNote(sound, index) {
  const soortSound = document.createElement('p');
  soortSound.innerHTML = `${sound.sort}`
  soortSound.dataset.sort = `${sound.img}`
  effectsContainer.appendChild(soortSound);

  console.log(effectsContainer);
}