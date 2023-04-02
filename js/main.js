const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.media');
const navMenu = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('hide');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('hide');
    });
});

//tilt effect
const el = (sel, par) => (par || document).querySelector(sel);
const elWrap = el("#wrap");
const elTilt = el(".tilt");
const settings = {
  reverse: 0,        // Reverse tilt: 1, 0
  max: 35,           // Max tilt: 35
  perspective: 1000, // Parent perspective px: 1000
  scale: 1,          // Tilt element scale factor: 1.0
  axis: "",          // Limit axis. "y", "x"
};

elWrap.style.perspective = `${settings.perspective}px`;

const tilt = (evt) => {
  const bcr = elWrap.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (evt.clientX - bcr.left) / bcr.width));
  const y = Math.min(1, Math.max(0, (evt.clientY - bcr.top) / bcr.height));
  const reverse = settings.reverse ? -1 : 1;
  const tiltX = reverse * (settings.max / 2 - x * settings.max);
  const tiltY = reverse * (y * settings.max - settings.max / 2);
  elTilt.style.transform = `
    rotateX(${settings.axis === "x" ? 0 : tiltY}deg)
    rotateY(${settings.axis === "y" ? 0 : tiltX}deg)
    scale(${settings.scale})
  `;
}
elWrap.addEventListener("pointermove", tilt);

// Add an event listener to all elements with the "lightbox" class
var lightboxElements = document.querySelectorAll('.lightbox');
for (var i = 0; i < lightboxElements.length; i++) {
  lightboxElements[i].addEventListener('click', function() {
    // Get the image source and create a new image element
    var src = this.getAttribute('src');
    var img = new Image();
    img.src = src;
    
    // Create the lightbox container and image elements
    var lightboxContainer = document.createElement('div');
    lightboxContainer.classList.add('lightbox-container');
    var lightboxImage = document.createElement('img');
    lightboxImage.classList.add('lightbox-image');
    lightboxImage.src = src;
    lightboxContainer.appendChild(lightboxImage);
    
    // Create the close button element
    var closeButton = document.createElement('span');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
      lightboxContainer.remove();
    });
    lightboxContainer.appendChild(closeButton);
    
    // Add a click event listener to the lightbox container
    lightboxContainer.addEventListener('click', function(event) {
      // If the click occurred outside the image, close the lightbox
      if (event.target === lightboxContainer) {
        lightboxContainer.remove();
      }
    });
    
    // Add the lightbox container to the body
    document.body.appendChild(lightboxContainer);
  });
}
