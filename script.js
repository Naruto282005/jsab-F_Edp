// Page load event
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1000);

  updateResizeText();
  updateScrollText();
});

// Sidebar elements
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Sidebar toggle
menuBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("show");
});

// Overlay closes sidebar
overlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");
});

// Keyboard event
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  }

  if (event.key.toLowerCase() === "h") {
    alert("Welcome to Badminton Highlights!");
  }
});

// Button click event
const highlightBtn = document.getElementById("highlightBtn");

if (highlightBtn) {
  highlightBtn.addEventListener("click", function () {
    alert("Enjoy watching the badminton highlights!");
    document.getElementById("clips").scrollIntoView({
      behavior: "smooth"
    });
  });
}

// Scroll event + parallax
const hero = document.querySelector(".hero");
const topBtn = document.getElementById("topBtn");
const scrollText = document.getElementById("scrollText");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  updateScrollText();

  if (scrollY > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

  if (hero) {
    hero.style.backgroundPositionY = scrollY * 0.4 + "px";
  }
});

// Back to top
topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Resize event
const resizeText = document.getElementById("resizeText");

window.addEventListener("resize", function () {
  updateResizeText();
});

function updateResizeText() {
  resizeText.textContent = "Screen Width: " + window.innerWidth + "px";
}

function updateScrollText() {
  scrollText.textContent = "Scroll Position: " + window.scrollY + "px";
}

// Search and filter
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const cards = document.querySelectorAll(".card");

function filterCards() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  cards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category;

    const matchSearch = title.includes(searchValue);
    const matchFilter = filterValue === "all" || category === filterValue;

    if (matchSearch && matchFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterCards);
filterSelect.addEventListener("change", filterCards);

// Featured video events
const mainVideo = document.getElementById("mainVideo");
const videoStatus = document.getElementById("videoStatus");
const videoTime = document.getElementById("videoTime");

mainVideo.addEventListener("play", function () {
  videoStatus.textContent = "Video Status: Playing";
});

mainVideo.addEventListener("pause", function () {
  videoStatus.textContent = "Video Status: Paused";
});

mainVideo.addEventListener("ended", function () {
  videoStatus.textContent = "Video Status: Ended";
});

mainVideo.addEventListener("timeupdate", function () {
  videoTime.textContent = "Current Time: " + mainVideo.currentTime.toFixed(1) + "s";
});

// Hover play videos on cards
const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((card) => {
  const video = card.querySelector(".hover-video");

  card.addEventListener("mouseenter", () => {
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  });

  card.addEventListener("mouseleave", () => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
});

// Form submission with validation
const requestForm = document.getElementById("requestForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

requestForm.addEventListener("submit", function (e) {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  successMessage.textContent = "";

  let isValid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  }

  if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
    emailError.textContent = "Enter a valid email.";
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = "Request submitted successfully.";
    requestForm.reset();
  }
});