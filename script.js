const heartContainer = document.querySelector('.hearts');
const wishButton = document.getElementById('wishButton');
const gallery = document.getElementById('gallery');
const memoryDock = document.getElementById('memoryDock');
const memoryReveal = document.getElementById('memoryReveal');
const memoryRevealImage = document.getElementById('memoryRevealImage');
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

if (wishButton) {
  wishButton.dataset.defaultText = wishButton.textContent;
}

if (gallery) {
  photoFiles.forEach((fileName, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.animationDelay = `${index * 0.08}s`;

    const image = document.createElement('img');
    image.src = `images/${fileName}`;
    image.alt = `Our memory ${index + 1}`;
    image.loading = 'lazy';

    card.appendChild(image);
    gallery.appendChild(card);
  });
}

if (memoryDock) {
  photoFiles.slice(0, 6).forEach((fileName, index) => {
    const bubble = document.createElement('button');
    bubble.type = 'button';
    bubble.className = 'memory-bubble';
    bubble.dataset.file = fileName;
    bubble.textContent = '❤';
    bubble.setAttribute('aria-label', `Open memory ${index + 1}`);

    bubble.addEventListener('click', () => {
      const selectedFile = bubble.dataset.file;
      if (!selectedFile) return;

      const rect = bubble.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (memoryReveal && memoryRevealImage) {
        memoryRevealImage.src = `images/${selectedFile}`;
        memoryReveal.style.setProperty('--x', `${x}px`);
        memoryReveal.style.setProperty('--y', `${y}px`);
        memoryReveal.classList.remove('is-visible');
        void memoryReveal.offsetWidth;
        memoryReveal.classList.add('is-visible');
      }

      if (portraitImage) {
        portraitImage.src = `images/${selectedFile}`;
        portraitImage.classList.remove('is-popping');
        void portraitImage.offsetWidth;
        portraitImage.classList.add('is-popping');
      }

      document.querySelectorAll('.memory-bubble').forEach((btn) => {
        btn.classList.remove('is-active');
        btn.style.animation = 'bubbleFloat 2.8s ease-in-out infinite alternate';
      });

      bubble.classList.remove('is-active');
      void bubble.offsetWidth;
      bubble.classList.add('is-active');
      bubble.style.animation = 'none';
      launchBurstHearts(bubble);

      setTimeout(() => {
        memoryReveal.classList.remove('is-visible');
        bubble.classList.remove('is-active');
        bubble.style.animation = 'bubbleFloat 2.8s ease-in-out infinite alternate';
      }, 1200);
    });

    memoryDock.appendChild(bubble);
  });
}

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
