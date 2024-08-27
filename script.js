//recipient variables

//keep message below 50 words, else message will overflow the card
var messageText = "Happy Birthday!<br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, in pariatur. Voluptatum ipsam, ipsa quas, vitae dolorum ab beatae quae in quod quibusdam earum commodi totam ea neque. Eveniet sed et nostrum magni unde laudantium nulla aliquam quaerat accusantium facilis. Officia dolor possimus deserunt voluptatibus minus ipsam similique consequuntur vel.";

var recipientName = "Name";

//previous age of the recipient
var oldAge=18;

export const voiceNotePath = "assets/music/audio_message.mp3";

var finalDay = 26;
var finalHour = 0;
var finalMinute = 0;


document.querySelector("title").innerHTML = `Birthday Wish | ${recipientName}`;


var message = document.querySelector("#message");
var messageFlag = true;
var flame = 1;
var cake = document.querySelector("#cake");
var age = document.querySelector("#age p");

age.innerHTML=oldAge;

//audio
var bgmButton = document.querySelector("#bgm-play-buttom");
var bgmAudio = document.querySelector("#bgm audio");
bgmButton.addEventListener("click", function () {
  if (bgmButton.src.includes("audio")) {
    bgmButton.src = "assets/images/icons8-mute-64.png";
    bgmAudio.pause();
  }
  else {
    bgmButton.src = "assets/images/icons8-audio-64.png";
    bgmAudio.play();
  }
})


var targetDate = new Date();
targetDate.setDate(finalDay);
targetDate.setHours(finalHour);
targetDate.setMinutes(finalMinute);
targetDate.setSeconds(0);

var countdown = setInterval(function () {

  var now = new Date().getTime();
  var time_left = targetDate - now;
  // var days = Math.floor(time_left / (1000 * 60 * 60 * 24));
  var hours = Math.floor((time_left) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor((time_left) % (1000 * 60 * 60) / (1000 * 60));
  var secs = Math.floor((time_left) % (1000 * 60) / (1000));

  // mm:ss formatting
  function time_formatting(unit) {
    return String(unit).padStart(2, '0');
  }

  document.querySelector("#timer").innerHTML = `${time_formatting(hours)}:${time_formatting(minutes)}:${time_formatting(secs)}`;

  //last 10s
  if (time_left > 0 && time_left <= 11000) {
    document.querySelector("#timer").innerHTML = `${time_formatting(secs)}`;

  }
  //countdown ends
  else if (time_left <= 0) {
    clearInterval(countdown); //stop countdown
    document.querySelector("#timer").innerHTML = "00"; //reset the timer to 00
    setTimeout(() => {
      document.querySelector("#timer").style.display = "none";
      document.querySelector(".upper p").style.opacity = "1";
      document.querySelector(".lower p").style.opacity = "1";
      setTimeout(() => {
        document.querySelector(".upper").style.top = "-100%";
        document.querySelector(".lower").style.bottom = "-100%";
        bgmAudio.src = "";

        bgmAudio.play()
        setTimeout(() => {
          if (window.innerWidth >= 769)
            document.querySelector("#countdownOverlay").style.display = "none";

        }, 400)

      }, 1000)
    }, 800)
  }
});

function CandleBlow() {
  var rand = Math.random() * 0.3;
  document.querySelector(".flame").style.opacity = flame - rand;
  flame -= rand;
  document.querySelector("#tap").style.transform = "translate(70%, 400%) scale(0.8)";
  setTimeout(() => {
    document.querySelector("#tap").style.transform = "translate(70%, 400%) scale(1)";
  }, 100);

  if (flame <= 0) {
    age.style.transform = " scale(1.3)";
    age.innerHTML = oldAge+1;
    cake.removeEventListener("click", CandleBlow)
    bgmAudio.src = "assets/music/popper.mp3";
    bgmAudio.loop = false;
    bgmButton.src = "assets/images/icons8-audio-64.png";
    setTimeout(() => {

      const end = Date.now() + 2 * 1000;
      const colors = ["#bb0000", "#ffffff"];
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      setTimeout(() => {
        bgmAudio.src = "assets/music/main bgm.mp3";
        bgmAudio.loop = true;

        setTimeout(() => {

          //display the scroll down button
          document.querySelector("#scroll-down").style.opacity = "1";
          document.querySelector("#section2").style.display = "block";


          document.querySelector("#scroll-down").addEventListener("click", () => {
            document.querySelector(".scroll-tooltip").style.display = "none";
            //card interaction
            document.querySelector(".card").style.transform = "translateX(-50%) scale(1)";
            var carOpened = 0;
            document.querySelector(".card").addEventListener("click", () => {
              if (carOpened == 0) {
                document.querySelector(".card .cover").style.transform = "rotateY(-120deg)";
                document.querySelector(".card").style.transform = "translateX(-20%) ";
                document.querySelector("#message").style.opacity = "1";
                carOpened = 1
              }
              else if (carOpened == 1) {
                document.querySelector(".card .cover").style.transform = "rotateY(0)";
                document.querySelector(".card").style.transform = "translateX(-50%)";
                document.querySelector("#message").style.opacity = "0";
                carOpened = 0
              }
              if (messageFlag) {
                var i = 0;
                var textIteration = setInterval(() => {
                  if (i < messageText.length) {
                    // Check if the current position starts with "<br>"
                    if (messageText.slice(i, i + 4) === "<br>") {
                      message.innerHTML += "<br>";
                      i += 4; // Skip over the "<br>" tag
                    } else {
                      message.innerHTML += messageText[i];
                      i++;
                    }
                  }
                  else if (i >= messageText.length) {
                    clearInterval(textIteration);
                    setTimeout(() => {
                      document.querySelector("#text").style.display = "block";
                      document.querySelector("#bonus").addEventListener("click", () => {
                        document.querySelector("#text").style.display = "none";
                        bgmAudio.pause();
                        bgmButton.src = "assets/images/icons8-mute-64.png";
                        document.querySelector(".hero").style.display = "flex";
                      }, { once: true })
                      document.querySelector(".hero").addEventListener("click", () => {
                        bgmAudio.pause();
                        bgmButton.src = "assets/images/icons8-mute-64.png";
                      })
                    }, 1000)

                  }
                  messageFlag = false;
                }, 100);
              }
            });
            //tooltip appear if user has not opened the card
            setTimeout(() => {
              if (carOpened == 0) {
                document.querySelector(".tooltip").style.opacity = "1";
                var cardOpenCheck = setInterval(() => {
                  //tooltip disappear if user has opened the card

                  if (carOpened == 1) {
                    clearInterval(cardOpenCheck)
                    document.querySelector(".tooltip").style.display = "none";
                  }
                }, 100);
              }

            }, 1500);
          }, { once: true })

        }, 6000)
      }, 800);

    }, 400)
  }
}
cake.addEventListener("click", CandleBlow)

// Disable mouse wheel scrolling
window.addEventListener('wheel', function (e) {
  e.preventDefault();
}, { passive: false });

// Disable touch scrolling
window.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, { passive: false });

// Disable keyboard scrolling (e.g., arrow keys, spacebar)
window.addEventListener('keydown', function (e) {
  const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Spacebar, Page Up/Down, Home/End, Arrow keys
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
  }
}, false);


