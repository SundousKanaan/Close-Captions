import { captions } from "./captions2.js";

console.log(captions[0].time);

const captionContainer = document.querySelector("main section ul");
const video = document.querySelector("video");

let currentCaptionIndex = 0;

video.addEventListener("timeupdate", timeupdate => {

  const currentTime = video.currentTime;
  const currentCaption = captions[currentCaptionIndex];

  console.log("timer 0", currentTime);

  if (currentTime >= currentCaption.time && currentCaptionIndex < captions.length + 1) {

      console.log("currentCaptionIndex:"+currentCaptionIndex, captions[currentCaptionIndex].charachter);

      liCaption(captions);


      if (currentTime >= 19.580 && currentTime < 21.430) {
        video.classList.add("zoomin")
      } else {
        video.classList.remove("zoomin")
      }

      if (currentTime >= 45.800 && currentTime < 46.190) {
        video.classList.add("vibration")
      } else {
        video.classList.remove("vibration")
      }


      if (captionContainer.childElementCount > 2) {
        let captionText = document.querySelector("main section ul li:first-of-type");
        captionText.remove();
      }

      currentCaptionIndex++;
  }
});

function liCaption(captions) {
  const liElement = document.createElement("li");
  const pElement = document.createElement("p");
  const divElement = document.createElement("div");
  const imgElement = document.createElement("img");

  imgElement.src = "./images/"+captions[currentCaptionIndex].charachter+"-"+captions[currentCaptionIndex].mood+".png";
  pElement.innerHTML = captions[currentCaptionIndex].caption;

  divElement.appendChild(imgElement);
  liElement.appendChild(divElement);
  liElement.appendChild(pElement);
  captionContainer.appendChild(liElement);
} 

video.addEventListener("play", () => {
  captionContainer.classList.add("start");
  console.log("start");
});

video.addEventListener("pause", () => {
  console.log("pause");
});

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    if (video.paused) {
      video.play();

    } else {
      video.pause();
    }
  }
}); 