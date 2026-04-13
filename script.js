// Theme toggle
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.textContent = "Light Mode";
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) {
      themeToggle.textContent = "Dark Mode";
    }
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Page load event
window.addEventListener("load", function () {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "none";
    }
  }, 1000);

  updateResizeText();
  updateScrollText();
});

// Sidebar elements
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Sidebar toggle
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("show");
  });
}

// Overlay closes sidebar
if (overlay) {
  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  });
}

// Keyboard events
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  }

  if (event.key.toLowerCase() === "1") {
    sidebar.classList.add("active");
    overlay.classList.add("show");
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
    const clipsSection = document.getElementById("clips");
    if (clipsSection) {
      clipsSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Scroll event + parallax
const hero = document.querySelector(".hero");
const topBtn = document.getElementById("topBtn");
const scrollText = document.getElementById("scrollText");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  updateScrollText();

  if (topBtn) {
    if (scrollY > 200) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  }

  if (hero) {
    hero.style.backgroundPositionY = scrollY * 0.4 + "px";
  }
});

// Back to top
if (topBtn) {
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Resize event
const resizeText = document.getElementById("resizeText");

window.addEventListener("resize", function () {
  updateResizeText();
});

function updateResizeText() {
  if (resizeText) {
    resizeText.textContent = "Screen Width: " + window.innerWidth + "px";
  }
}

function updateScrollText() {
  if (scrollText) {
    scrollText.textContent = "Scroll Position: " + window.scrollY + "px";
  }
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

if (searchInput) {
  searchInput.addEventListener("input", filterCards);
}

if (filterSelect) {
  filterSelect.addEventListener("change", filterCards);
}

// Featured video events
const mainVideo = document.getElementById("mainVideo");
const videoStatus = document.getElementById("videoStatus");
const videoTime = document.getElementById("videoTime");

if (mainVideo) {
  mainVideo.addEventListener("play", function () {
    if (videoStatus) {
      videoStatus.textContent = "Video Status: Playing";
    }
  });

  mainVideo.addEventListener("pause", function () {
    if (videoStatus) {
      videoStatus.textContent = "Video Status: Paused";
    }
  });

  mainVideo.addEventListener("ended", function () {
    if (videoStatus) {
      videoStatus.textContent = "Video Status: Ended";
    }
  });

  mainVideo.addEventListener("timeupdate", function () {
    if (videoTime) {
      videoTime.textContent = "Current Time: " + mainVideo.currentTime.toFixed(1) + "s";
    }
  });
}

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

if (requestForm) {
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
}