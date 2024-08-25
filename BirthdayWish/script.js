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

var message = document.querySelector("#message");
var messageFlag = true;
var flame = 1;
var cake = document.querySelector("#cake");
var age = document.querySelector("#age p");

var messageText = "Happy Birthday yrr!<br>I hope this year has gone well and if not don't worry is saal firse try karna ho jaayega :) yrr is baar jyada likh nhi paaunga kyuki ye raat 3 baje bethkar likh rha hu and puri creativity mene website banane me laga di so wishing you the best of luck and a very happy birthday.";

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

var finalDay = 25;
var finalHour = 9;
var finalMinute = 0;

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
    age.innerHTML = "19";
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
                }, 100);
                messageFlag = false;
                setTimeout(() => {
                  document.querySelector("#text").style.display = "block";
                  document.querySelector("#text").addEventListener("click", () => {
                    document.querySelector("#text").style.display = "none";
                    document.querySelector(".hero").style.display = "flex";
                  })
                  document.querySelector(".hero").addEventListener("click", () => {
                    bgmAudio.pause();
                    bgmButton.src = "assets/images/icons8-mute-64.png";
                  })
                }, 1000)
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



