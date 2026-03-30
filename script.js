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

// Button click event: open sidebar
menuBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("show");
});

// Click overlay to close sidebar
overlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");
});

// Keyboard event: ESC closes sidebar
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  }

  // Keyboard shortcut: press H to show alert
  if (event.key.toLowerCase() === "h") {
    alert("Welcome to Badminton Highlights!");
  }
});

// Simple button click event
document.getElementById("highlightBtn").addEventListener("click", function () {
  alert("Enjoy watching the badminton highlights!");
});

// Scroll event + parallax effect
const hero = document.querySelector(".hero");
const topBtn = document.getElementById("topBtn");
const scrollText = document.getElementById("scrollText");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  // update text
  updateScrollText();

  // show/hide top button
  if (scrollY > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

  // parallax effect
  hero.style.backgroundPositionY = scrollY * 0.4 + "px";
});

// Back to top button
topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Window resize event
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

// Hover event is already handled by CSS :hover on cards

// Search + filter
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

// Video events
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

// Form submission event with validation
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

  // clear old errors
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