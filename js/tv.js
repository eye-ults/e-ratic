var sounds = [
  '/sounds/Hoot.wav',
  '/sounds/offline.wav',
  '/sounds/bluescreen.wav',
  '/sounds/whitenoise.wav',
  '/sounds/strange_bird.wav'
];

var currentSoundIndex = 0;
var loop;

function ready(err, _loop) {
  if (err) {
    console.warn(err);
    return;
  }
  loop = _loop;
  loop.stop();
}

loopify(sounds[currentSoundIndex + 1], ready);

// List of GIF files to cycle through
var gifList = [
  'img/TV_EYE.gif',
  'img/E-ratic_Glitch.gif',
  'img/Offline.gif',
  'img/bluescreen.gif',
  'img/whitenoise.gif'
];

// Index of the current GIF file in the list
var currentGifIndex = 0;

//Turn on and off TV
//Turn on and off TV
function toggleTV() {
  var image = document.getElementById('tv');
  if (image.src.match('img/TV_OFF.png')) {
    image.src = 'img/Turn_on.gif';
    image.alt = 'turn on effect';
    Promise.all([
      loop.stop(),
      loopify(sounds[currentGifIndex], ready),
      new Promise((resolve) => setTimeout(resolve, 900))
    ]).then(() => {
      // Cycle to the next GIF file in the list
      currentGifIndex = (currentGifIndex + 1) % gifList.length;
      image.src = gifList[currentGifIndex];
      image.alt = 'glitch effect';
      loop.play();
    });
  } else {
    image.src = 'img/Turn_off.gif';
    image.alt = 'TV off effect';
    Promise.all([
      loop.stop(),
      new Promise((resolve) => setTimeout(resolve, 900))
    ]).then(() => {
      image.src = 'img/TV_OFF.png';
      image.alt = 'TV Off';
    });
  }
}