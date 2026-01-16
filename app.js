// --- PWA Install Prompt ---
let deferredPrompt;
const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove("hidden");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") {
    console.log("User accepted the install prompt");
  }
  deferredPrompt = null;
  installBtn.classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  console.log("App installed successfully");
  installBtn.classList.add("hidden");
});

// --- Date Display ---
function updateDateDisplay() {
  const dateDisplay = document.getElementById("date-display");
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  dateDisplay.textContent = now.toLocaleDateString(undefined, options);
}
updateDateDisplay();

// --- Homework Auto-Clear ---
function checkHomeworkReset() {
  const todayKey = new Date().toDateString();
  const lastSavedDay = localStorage.getItem("lastDay");

  if (lastSavedDay && lastSavedDay !== todayKey) {
    const blocks = document.querySelectorAll(".subject-block");
    const history = JSON.parse(localStorage.getItem("notesHistory")) || [];

    blocks.forEach(block => {
      const subject = block.querySelector(".subject").value;
      const notes = block.querySelector(".notes").value;
      if (subject.trim() || notes.trim()) {
        history.push({ day: lastSavedDay, subject, content: notes });
      }
      block.querySelector(".subject").value = "";
      block.querySelector(".notes").value = "";
    });

    localStorage.setItem("notesHistory", JSON.stringify(history));
  }
  localStorage.setItem("lastDay", todayKey);
}
checkHomeworkReset();

// --- Manual Save Homework ---
document.querySelectorAll(".save-homework").forEach((btn) => {
  btn.addEventListener("click", () => {
    const block = btn.closest(".subject-block");
    const subject = block.querySelector(".subject").value;
    const notes = block.querySelector(".notes").value;
    if (!subject.trim() && !notes.trim()) return;

    const todayKey = new Date().toDateString();
    const history = JSON.parse(localStorage.getItem("notesHistory")) || [];
    history.push({ day: todayKey, subject, content: notes });
    localStorage.setItem("notesHistory", JSON.stringify(history));

    alert(`Homework for "${subject || "Untitled"}" saved!`);
  });
});

// --- Calendar ---
const calendar = document.getElementById("calendar");
const grid = document.getElementById("calendar-grid");
const title = document.getElementById("calendar-title");
let currentMonth = new Date().getMonth();
const year = new Date().getFullYear();

function renderCalendar(month) {
  grid.innerHTML = "";
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  title.textContent = `${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`;

  const events = JSON.parse(localStorage.getItem("events")) || {};

  // Find which day of week the month starts on (0 = Sunday, 6 = Saturday)
  const firstDay = new Date(year, month, 1).getDay();

  // Add blank cells before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    grid.appendChild(blank);
  }

  // Add actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;

    const key = `${year}-${month + 1}-${d}`;
    if (events[key]) {
      cell.classList.add("has-event");

      const list = document.createElement("ul");
      events[key].forEach((ev, idx) => {
        const li = document.createElement("li");
        li.textContent = ev;

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          events[key].splice(idx, 1);
          if (events[key].length === 0) {
            delete events[key];
          }
          localStorage.setItem("events", JSON.stringify(events));
          renderCalendar(month);
          showEvents(events[key], d, month);
        });

        li.appendChild(delBtn);
        list.appendChild(li);
      });
      cell.appendChild(list);
    }

    cell.addEventListener("click", () => openEventForm(d, month, events[key]));
    grid.appendChild(cell);
  }
}
renderCalendar(currentMonth);

document.getElementById("prev-month").addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
    renderCalendar(currentMonth);
  }
});
document.getElementById("next-month").addEventListener("click", () => {
  if (currentMonth < 11) {
    currentMonth++;
    renderCalendar(currentMonth);
  }
});

document.getElementById("calendar-toggle").addEventListener("click", () => {
  calendar.classList.remove("hidden");
});
document.getElementById("calendar-close").addEventListener("click", () => {
  calendar.classList.add("hidden");
});

// --- Event Form + Display ---
const eventForm = document.getElementById("event-form");
const saveBtn = document.getElementById("save-event");
let selectedDay = null;
let selectedMonth = null;

const eventDisplay = document.getElementById("event-display");

function openEventForm(day, month, existingEvents) {
  selectedDay = day;
  selectedMonth = month;
  eventForm.classList.remove("hidden");
  showEvents(existingEvents, day, month);
}

function showEvents(events, day, month) {
  eventDisplay.innerHTML = "";
  if (events && events.length) {
    const heading = document.createElement("h3");
    heading.textContent = `Events for ${year}-${month + 1}-${day}`;
    eventDisplay.appendChild(heading);

    const list = document.createElement("ul");
    events.forEach(ev => {
      const li = document.createElement("li");
      li.textContent = ev;
      list.appendChild(li);
    });
    eventDisplay.appendChild(list);
  }
}

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("event-title").value.trim();
  if (!title) return;

  const key = `${year}-${selectedMonth + 1}-${selectedDay}`;
  const events = JSON.parse(localStorage.getItem("events")) || {};
  events[key] = events[key] ? [...events[key], title] : [title];
  localStorage.setItem("events", JSON.stringify(events));

  document.getElementById("event-title").value = "";
  eventForm.classList.add("hidden");

  // Refresh calendar + show updated events
  renderCalendar(selectedMonth);
  showEvents(events[key], selectedDay, selectedMonth);
});

// --- Settings ---
const settings = document.getElementById("settings");
document.getElementById("settings-toggle").addEventListener("click", () => {
  settings.classList.remove("hidden");
  loadSavedNotes();
});
document.getElementById("settings-close").addEventListener("click", () => {
  settings.classList.add("hidden");
});

function loadSavedNotes() {
  const container = document.getElementById("saved-notes");
  container.innerHTML = "<h3>Saved Notes History</h3>";
  const history = JSON.parse(localStorage.getItem("notesHistory")) || [];
  if (!history.length) {
    container.innerHTML += "<p>No saved notes yet.</p>";
    return;
  }
  history.forEach(entry => {
    const div = document.createElement("div");
    div.textContent = `${entry.day} — ${entry.subject}: ${entry.content}`;
    container.appendChild(div);
  });
}