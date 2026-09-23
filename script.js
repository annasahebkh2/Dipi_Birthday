const heartContainer = document.querySelector('.hearts');
const wishButton = document.getElementById('wishButton');
const memoryDock = document.getElementById('memoryDock');
const portraitImage = document.querySelector('.portrait-photo');
const photoFiles = [
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg',
  '7.jpeg',
  '8.jpeg',
  '9.jpeg',
  '10.jpeg',
  '11.jpeg',
  '12.jpeg',
  '13.jpeg',
  'WhatsApp Image 2026-09-23 at 2.37.02 PM.jpeg',
  'WhatsApp Image 2026-09-23 at 2.40.56 PM.jpeg'
];

if (portraitImage) {
  portraitImage.src = portraitImage.src || 'images/10.jpeg';
  portraitImage.classList.remove('is-popping');
}

if (wishButton) {
  wishButton.dataset.defaultText = wishButton.textContent;
}


const memoryBubbles = document.querySelectorAll('.memory-bubble');

memoryBubbles.forEach((bubble) => {
  bubble.addEventListener('click', () => {
    const selectedFile = bubble.dataset.file;
    if (!selectedFile) return;

    if (portraitImage) {
      portraitImage.src = `images/${selectedFile}`;
      portraitImage.classList.remove('is-popping');
      void portraitImage.offsetWidth;
      portraitImage.classList.add('is-popping');
    }

    memoryBubbles.forEach((btn) => btn.classList.remove('is-active'));
    bubble.classList.add('is-active');
    launchBurstHearts(bubble);

    setTimeout(() => {
      bubble.classList.remove('is-active');
    }, 1200);
  });
});

function createHeart() {
  if (!heartContainer) return;

  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
  heart.style.fontSize = `${18 + Math.random() * 22}px`;
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 450);

function launchBurstHearts(trigger) {
  if (!trigger || !heartContainer) return;

  const rect = trigger.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '❤';
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.bottom = 'auto';
    heart.style.fontSize = `${18 + Math.random() * 18}px`;
    heart.style.animation = `floatUp 1.7s ease-out forwards`;
    heart.style.opacity = '1';
    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 1700);
  }
}

if (wishButton) {
  wishButton.addEventListener('click', () => {
    const message = 'You are my forever favorite person. Happy Birthday, my love!';
    const defaultText = wishButton.dataset.defaultText || 'Open My Heart';

    document.body.classList.add('show-photo-reveal');

    wishButton.textContent = 'My Heart Is Yours';
    wishButton.disabled = true;
    wishButton.style.opacity = '0.92';

    const existingNote = document.querySelector('.love-note');
    if (existingNote) existingNote.remove();

    const note = document.createElement('p');
    note.className = 'love-note';
    note.textContent = message;
    note.style.marginTop = '20px';
    note.style.fontWeight = '700';
    note.style.color = '#9c1b4d';
    note.style.fontSize = '1rem';
    note.style.lineHeight = '1.8';

    wishButton.insertAdjacentElement('afterend', note);
    launchBurstHearts(wishButton);

    setTimeout(() => {
      wishButton.textContent = defaultText;
      wishButton.disabled = false;
      wishButton.style.opacity = '1';
      note.remove();
    }, 2200);
  });
}
