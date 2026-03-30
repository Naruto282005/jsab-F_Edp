const clips = [
  {
    title: 'Lightning Jump Smash',
    player: 'A. Chen',
    event: 'Open Championship',
    category: 'smash',
    duration: '0:34',
    description: 'A powerful jump smash finishes the point after a fast setup.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1521417531039-12a0f1a55c0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Endurance Rally Exchange',
    player: 'K. Sato',
    event: 'World Tour',
    category: 'rally',
    duration: '0:49',
    description: 'A long rally with quick footwork, control, and deceptive returns.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Impossible Defense Save',
    player: 'M. Lee',
    event: 'Grand Finals',
    category: 'defense',
    duration: '0:41',
    description: 'A defensive dig keeps the shuttle alive before a surprise winner.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Championship Point Winner',
    player: 'J. Park',
    event: 'Final Night',
    category: 'final',
    duration: '0:37',
    description: 'The last point of the match ends with a sharp diagonal smash.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Front Court Net Duel',
    player: 'L. Gomez',
    event: 'Asia Series',
    category: 'rally',
    duration: '0:31',
    description: 'Fast hands and tight net play decide the point in style.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Backhand Recovery Magic',
    player: 'R. Malik',
    event: 'Legends Cup',
    category: 'defense',
    duration: '0:44',
    description: 'An off-balance backhand save leads to an amazing turnaround.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80'
  }
];

const clipGrid = document.getElementById('clipGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileOverlay = document.getElementById('mobileOverlay');
const shuffleBtn = document.getElementById('shuffleBtn');
const featuredVideo = document.getElementById('featuredVideo');
const videoState = document.getElementById('videoState');
const videoTime = document.getElementById('videoTime');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const pageLoader = document.getElementById('pageLoader');
const hero = document.querySelector('.hero-parallax');
const screenSize = document.getElementById('screenSize');
const scrollStatus = document.getElementById('scrollStatus');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function renderClips(items) {
  clipGrid.innerHTML = '';

  if (!items.length) {
    clipGrid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; padding: 24px;">
        <h3>No clips found</h3>
        <p class="muted-text no-margin">Try a different search word or filter category.</p>
      </div>
    `;
    return;
  }

  items.forEach((clip) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb-wrap">
        <video preload="metadata" poster="${clip.poster}">
          <source src="${clip.video}" type="video/mp4" />
        </video>
        <div class="duration">${clip.duration}</div>
      </div>
      <div class="card-body">
        <div class="meta">
          <span>${clip.player}</span>
          <span>•</span>
          <span>${clip.event}</span>
        </div>
        <h3>${clip.title}</h3>
        <p class="muted-text">${clip.description}</p>
        <div class="card-actions">
          <button class="small-btn play-btn">Play Preview</button>
          <button class="small-btn feature-btn">Set as Featured</button>
        </div>
      </div>
    `;

    const video = card.querySelector('video');
    const playBtn = card.querySelector('.play-btn');
    const featureBtn = card.querySelector('.feature-btn');

    card.addEventListener('mouseenter', () => {
      video.muted = true;
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      playBtn.textContent = 'Play Preview';
    });

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.muted = true;
        video.play();
        playBtn.textContent = 'Pause Preview';
      } else {
        video.pause();
        playBtn.textContent = 'Play Preview';
      }
    });

    featureBtn.addEventListener('click', () => {
      featuredVideo.src = clip.video;
      featuredVideo.poster = clip.poster;
      featuredVideo.load();
      document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
      showToast(`Featured clip set: ${clip.title}`);
    });

    clipGrid.appendChild(card);
  });
}

function filterClips() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const filterValue = filterSelect.value;

  const filtered = clips.filter((clip) => {
    const matchesSearch =
      clip.title.toLowerCase().includes(searchValue) ||
      clip.player.toLowerCase().includes(searchValue) ||
      clip.event.toLowerCase().includes(searchValue) ||
      clip.description.toLowerCase().includes(searchValue);

    const matchesFilter = filterValue === 'all' || clip.category === filterValue;
    return matchesSearch && matchesFilter;
  });

  renderClips(filtered);
}

function toggleSidebar(forceClose = false) {
  if (window.innerWidth > 900) return;
  const shouldOpen = forceClose ? false : !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', shouldOpen);
  mobileOverlay.classList.toggle('show', shouldOpen);
}

function updateScreenStatus() {
  screenSize.textContent = `Width: ${window.innerWidth}px`;
}

function handleScroll() {
  const y = window.scrollY;
  scrollStatus.textContent = `Scroll: ${Math.round(y)}px`;
  backToTop.classList.toggle('show', y > 350);
  hero.style.transform = `translateY(${y * 0.12}px)`;
}

function shuffleHighlights() {
  const shuffled = [...clips].sort(() => Math.random() - 0.5);
  renderClips(shuffled);
  showToast('Highlights shuffled');
}

window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 850);
  renderClips(clips);
  updateScreenStatus();
  handleScroll();
  showToast('Welcome to Badminton Highlights');
});

searchInput.addEventListener('input', filterClips);
filterSelect.addEventListener('change', filterClips);
sidebarToggle.addEventListener('click', () => toggleSidebar());
mobileOverlay.addEventListener('click', () => toggleSidebar(true));
shuffleBtn.addEventListener('click', shuffleHighlights);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleSidebar(true);
  }
  if (event.key.toLowerCase() === 'm') {
    event.preventDefault();
    toggleSidebar();
  }
  if (event.key === '/') {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key.toLowerCase() === 'r') {
    event.preventDefault();
    shuffleHighlights();
  }
  if (event.key.toLowerCase() === 't') {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  updateScreenStatus();
  if (window.innerWidth > 900) {
    sidebar.classList.remove('open');
    mobileOverlay.classList.remove('show');
  }
});

featuredVideo.addEventListener('play', () => {
  videoState.textContent = 'Video State: Playing';
});

featuredVideo.addEventListener('pause', () => {
  videoState.textContent = 'Video State: Paused';
});

featuredVideo.addEventListener('ended', () => {
  videoState.textContent = 'Video State: Ended';
  showToast('Featured video finished');
});

featuredVideo.addEventListener('timeupdate', () => {
  videoTime.textContent = `Current Time: ${featuredVideo.currentTime.toFixed(1)}s`;
});

const requestForm = document.getElementById('requestForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const category = document.getElementById('category');
const message = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const categoryError = document.getElementById('categoryError');
const messageError = document.getElementById('messageError');

function clearErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  categoryError.textContent = '';
  messageError.textContent = '';
}

function validateForm() {
  clearErrors();
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.value.trim().length < 3) {
    nameError.textContent = 'Please enter at least 3 characters.';
    isValid = false;
  }

  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (!category.value) {
    categoryError.textContent = 'Please choose a highlight type.';
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    messageError.textContent = 'Please enter at least 10 characters.';
    isValid = false;
  }

  return isValid;
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.style.display = 'none';

  if (validateForm()) {
    successMessage.style.display = 'block';
    successMessage.innerHTML = `Request submitted successfully for <strong>${fullName.value.trim()}</strong>. We will review your <strong>${category.value}</strong> clip request soon.`;
    requestForm.reset();
    showToast('Clip request submitted');
  }
});

requestForm.addEventListener('reset', () => {
  clearErrors();
  successMessage.style.display = 'none';
});
