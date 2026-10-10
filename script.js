const navLinks = [...document.querySelectorAll(".nav-link")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const crumb = document.getElementById("crumb");
const pageTitle = document.getElementById("pageTitle");
const pageIntro = document.getElementById("pageIntro");
const toast = document.getElementById("toast");
const sidebar = document.getElementById("sidebar");
let toastTimer;

const views = {
  overview: {
    crumb: "Overview",
    title: 'Your career, <span>one clear direction.</span>',
    intro: "PRIORA helps students plan their career, learn smarter, prepare for opportunities, and track everything in one place."
  },
  brain: {
    crumb: "AI Career Brain",
    title: 'Find your <span>next direction.</span>',
    intro: "Understand your strengths, spot skill gaps, and turn your career goal into a practical next-step plan."
  },
  learning: {
    crumb: "Learning & Productivity",
    title: 'Make every study session <span>count.</span>',
    intro: "Break big goals into focused sessions, build useful habits, and keep your learning momentum going."
  },
  preparation: {
    crumb: "Career Preparation",
    title: 'Get ready to <span>show your best.</span>',
    intro: "Improve your resume, practice interview questions, and build confidence before your next opportunity."
  },
  opportunities: {
    crumb: "Opportunity Shield",
    title: 'Find opportunities. <span>Apply smarter.</span>',
    intro: "Review opportunities carefully, check for common red flags, and make more informed application decisions."
  },
  student: {
    crumb: "Student 360",
    title: 'Your progress, <span>all in one place.</span>',
    intro: "Keep track of your learning, skills, projects, and applications so you can see how far you've come."
  }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openView(view) {
  const data = views[view];
  if (!data) return;
  crumb.textContent = data.crumb;
  pageTitle.innerHTML = data.title;
  pageIntro.textContent = data.intro;
  navLinks.forEach(link => link.classList.toggle("active", link.dataset.view === view));
  sidebar.classList.remove("open");

  if (view !== "overview") {
    showToast(`${data.crumb} selected — connect your AI/API to enable full functionality.`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

viewButtons.forEach(button => {
  button.addEventListener("click", () => openView(button.dataset.view));
});

document.querySelectorAll(".tool-card").forEach(card => {
  card.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    openView(card.dataset.card);
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.getElementById("notificationButton").addEventListener("click", () => {
  showToast("You're all caught up. Keep moving toward your goals.");
});

const searchInput = document.getElementById("globalSearch");
const searchable = [...document.querySelectorAll(".tool-card")];
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchable.forEach(card => {
    const match = !query || card.innerText.toLowerCase().includes(query);
    card.style.opacity = match ? "1" : ".28";
    card.classList.toggle("empty-search", Boolean(query && match));
  });
});

document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    sidebar.classList.remove("open");
  }
});
