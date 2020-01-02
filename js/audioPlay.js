 
let funcContent = () => {
  let massMusic = {
    worker1: {text: "2 Chainz feat. Ariana Grande - Rule The World", music: "music/2 Chainz feat. Ariana Grande - Rule The World.mp3"},
    worker2: {text: "2Scratch - No Mercy (feat. J Swey)", music: "music/2Scratch - No Mercy (feat. J Swey) [Without Drop].mp3"},
    worker3: {text: "2Scratch - Reminder (ft. Young Jae)", music: "music/2Scratch - Reminder (ft. Young Jae).mp3"},
    worker4: {text: "Marshmello - Moving On", music: "music/Marshmello - Moving On.mp3"}
  }
  for (const key in massMusic) {
    let container = document.querySelector(".container")
    let newEl = document.createElement("div");
    newEl.innerHTML = `
    <div class="audio__container">
    <audio controls class="audio__player" id="player">
    <source src="${massMusic[key].music}">
   </audio>
   <h3 class="audio__title">${massMusic[key].text}</h3>
   <div class='audio__hud'>
    <div class='audio-hud__action_play play audio-hud__action' id='audio-hud__action'>
    </div>
    <div class='audio-hud__curr-time' id='audio-hud__curr-time'>00:00</div>
    <progress value='0' max='100' class='audio-hud__progress-bar' id='audio-hud__progress-bar'></progress>
    <div class='audio-hud__duration' id='audio-hud__duration'>00:00</div>
    <select title='Скорость' class='audio-hud__speed' id='audio-hud__speed'>
      <option value='25'>0.25x</option>
      <option value='50'>0.5x</option>
      <option value='75'>0.75x</option>
      <option value='100' selected>1x</option>
      <option value='125'>1.25x</option>
      <option value='150'>1.5x</option>
      <option value='175'>1.75x</option>
      <option value='200'>2x</option>
    </select>
    <div class="audio-regular__music">
      <div class="audio__range">
      <input type='range' value='100' max='100' title='Громкость' class='audio-hud__volume slider' id='audio-hud__volume'>
      </div>
      <div class='audio-hud__mute_false audio-hud__mute' id='audio-hud__mute'>
      </div>
    </div>
    <a class='audio-hud__download' title='Скачать' href="${massMusic[key].music}" download></a>
    <div class="input__wrapper">
   <input name="file" type="file" name="file" id="input__file" class="input input__file" multiple>
   <label for="input__file" class="input__file-button">
      <span class="input__file-icon-wrapper"><img class="input__file-icon" src="img/dowland.png" alt="Выбрать файл" width="25"></span>
   </label>
   </div>
    </div>
    </div>
    `;
    container.appendChild(newEl);
  }
}
funcContent();

let audio__player = document.querySelectorAll(".audio__player");
let actionButton = document.querySelectorAll('.audio-hud__action');
let durationTime = document.querySelectorAll('.audio-hud__duration');
let progressBar = document.querySelectorAll('.audio-hud__progress-bar');
let currTime = document.querySelectorAll('.audio-hud__curr-time');
let muteButton = document.querySelectorAll('.audio-hud__mute');
let volumeScale = document.querySelectorAll('.audio-hud__volume');
let speedSelect = document.querySelectorAll('.audio-hud__speed');

//Рассчитываем время в секундах и минутах

let AudioTime = (time) => { 
  time = Math.floor(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  let minutesVal = minutes;
  let secondsVal = seconds;
  if(minutes < 10) {
    minutesVal = '0' + minutes;
  }
  if(seconds < 10) {
    secondsVal = '0' + seconds;
  }
  return minutesVal + ':' + secondsVal;
}

let muz = () => {
  /*ВКЛ пуза музыки*/ 
actionButton.forEach((element, indOne) => {
  element.addEventListener("click", () => {
    element.classList.toggle("activ")
    audio__player.forEach((index, indTwo) => {
      if(index.paused && indOne == indTwo){
        index.play();
      }
      else{
        index.pause();
      }
      durationTime.forEach((iterotor, indFri) => {
        if(iterotor.innerHTML == '00:00' && indFri == indOne && indFri == indTwo) {
          iterotor.innerHTML = AudioTime(index.duration); //Об этой функции чуть ниже
      }
  })
  /*манипулирование звуковой дорожкой*/
  currTime.forEach((curr, indFour) => {
    progressBar.forEach((progresss, indFive) => {
      if(indFour == indOne && indFour == indTwo && indFive == indFour && indFive == indOne && indFive == indTwo) {
        index.addEventListener("timeupdate", () => {
          progress = (Math.floor(index.currentTime) / (Math.floor(index.duration) / 100));
          progresss.value = progress;
          curr.innerHTML = AudioTime(index.currentTime);
        });
        progresss.addEventListener("click", (e) => {
          let mouseX = Math.floor(e.pageX - progresss.offsetLeft);
          let progress = mouseX / (progresss.offsetWidth / 100);
          index.currentTime = index.duration * (progress / 100);
        });
      }
    });
  })
  /*Регулеровка громкости*/
  volumeScale.forEach((volumeS, indSix) => {
    muteButton.forEach((mut, indSeven) => {
      if(indSix == indOne && indSix == indTwo && indSeven == indOne && indSeven == indTwo && indSeven == indSix){
        volumeS.addEventListener("change", () => {
          let volume = volumeS.value / 100;
          index.volume = volume;
          if(index.volume == 0) {
            mut.classList.add("muteAct")
          } else {
            mut.classList.remove("muteAct")
          }
        })
        mut.addEventListener("click", () => {
          if(index.volume == 0) {
            index.volume = volumeS.value / 100;
            mut.classList.remove("muteAct")
          } else {
            index.volume = 0;
            mut.classList.add("muteAct")
          }
        })
      }
    })
  })
  /* скорость музыки */
  speedSelect.forEach((speedS, indEight) => {
    if(indEight == indOne && indEight == indTwo){
      speedS.addEventListener("change", () => {
        let speed = speedS.value / 100;
        index.playbackRate = speed;
      })
    }
  })
  });
})
});
}
muz();