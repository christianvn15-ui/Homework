// events.js - Calendar Page for Homework Book PWA

/**
 * Calendar Page - Standalone events management
 * Integrates with main app via localStorage
 */

const CONFIG = {
  STORAGE_KEYS: {
    EVENTS: 'events',
    THEME: 'theme',
    LANGUAGE: 'language'
  },
  LANGUAGES: {
    en: { name: 'English', flag: '🇬🇧' },
    af: { name: 'Afrikaans', flag: '🇿🇦' },
    es: { name: 'Spanish', flag: '🇪🇸' },
    nl: { name: 'Dutch', flag: '🇳🇱' },
    st: { name: 'Sotho', flag: '🇱🇸' },
    fr: { name: 'French', flag: '🇫🇷' },
    it: { name: 'Italian', flag: '🇮🇹' },
    ja: { name: 'Japanese', flag: '🇯🇵' },
    zh: { name: 'Chinese', flag: '🇨🇳' }
  }
};

const TRANSLATIONS = {
  en: {
    calendar: 'Calendar',
    eventTitle: 'Event title',
    saveEvent: 'Save',
    cancel: 'Cancel',
    noEvents: 'No events for this date',
    delete: 'Delete',
    saved: 'Event saved',
    deleted: 'Event deleted',
    sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat'
  },
  af: {
    calendar: 'Kalender',
    eventTitle: 'Gebeurtenis titel',
    saveEvent: 'Stoor',
    cancel: 'Kanselleer',
    noEvents: 'Geen gebeurtenisse vir hierdie datum',
    delete: 'Vee uit',
    saved: 'Gebeurtenis gestoor',
    deleted: 'Gebeurtenis uitgevee',
    sun: 'Son', mon: 'Maa', tue: 'Din', wed: 'Woe', thu: 'Don', fri: 'Vry', sat: 'Sat'
  },
  es: {
    calendar: 'Calendario',
    eventTitle: 'Título del evento',
    saveEvent: 'Guardar',
    cancel: 'Cancelar',
    noEvents: 'No hay eventos para esta fecha',
    delete: 'Eliminar',
    saved: 'Evento guardado',
    deleted: 'Evento eliminado',
    sun: 'Dom', mon: 'Lun', tue: 'Mar', wed: 'Mié', thu: 'Jue', fri: 'Vie', sat: 'Sáb'
  },
  nl: {
    calendar: 'Kalender',
    eventTitle: 'Evenement titel',
    saveEvent: 'Opslaan',
    cancel: 'Annuleren',
    noEvents: 'Geen evenementen voor deze datum',
    delete: 'Verwijderen',
    saved: 'Evenement opgeslagen',
    deleted: 'Evenement verwijderd',
    sun: 'Zo', mon: 'Ma', tue: 'Di', wed: 'Wo', thu: 'Do', fri: 'Vr', sat: 'Za'
  },
  st: {
    calendar: 'Khalendara',
    eventTitle: 'Sehlooho sa mohlolong',
    saveEvent: 'Boloka',
    cancel: 'Hlakola',
    noEvents: 'Ha ho mehlolo ka letsatsi lena',
    delete: 'Hlakola',
    saved: 'Mohlolo o bolokilwe',
    deleted: 'Mohlolo o hlakotswe',
    sun: 'Sont', mon: 'Mant', tue: 'Lab', wed: 'Labob', thu: 'Labone', fri: 'Labohl', sat: 'Moq'
  },
  fr: {
    calendar: 'Calendrier',
    eventTitle: "Titre de l'événement",
    saveEvent: 'Enregistrer',
    cancel: 'Annuler',
    noEvents: 'Aucun événement pour cette date',
    delete: 'Supprimer',
    saved: 'Événement enregistré',
    deleted: 'Événement supprimé',
    sun: 'Dim', mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam'
  },
  it: {
    calendar: 'Calendario',
    eventTitle: 'Titolo evento',
    saveEvent: 'Salva',
    cancel: 'Annulla',
    noEvents: 'Nessun evento per questa data',
    delete: 'Elimina',
    saved: 'Evento salvato',
    deleted: 'Evento eliminato',
    sun: 'Dom', mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Gio', fri: 'Ven', sat: 'Sab'
  },
  ja: {
    calendar: 'カレンダー',
    eventTitle: 'イベントタイトル',
    saveEvent: '保存',
    cancel: 'キャンセル',
    noEvents: 'この日のイベントはありません',
    delete: '削除',
    saved: 'イベントを保存しました',
    deleted: 'イベントを削除しました',
    sun: '日', mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土'
  },
  zh: {
    calendar: '日历',
    eventTitle: '事件标题',
    saveEvent: '保存',
    cancel: '取消',
    noEvents: '该日期没有事件',
    delete: '删除',
    saved: '事件已保存',
    deleted: '事件已删除',
    sun: '日', mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六'
  }
};

// State
const state = {
  events: new Map(),
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDate: null,
  currentLanguage: 'en'
};

// DOM Elements
const elements = {
  calendarGrid: document.getElementById("calendar-grid"),
  calendarTitle: document.getElementById("calendar-title"),
  selectedDatePanel: document.getElementById("selected-date-panel"),
  selectedDateTitle: document.getElementById("selected-date-title"),
  eventsList: document.getElementById("events-list"),
  eventForm: document.getElementById("event-form"),
  eventTitle: document.getElementById("event-title"),
  toastContainer: document.getElementById("toast-container")
};

// Initialize
function init() {
  loadTheme();
  loadLanguage();
  loadEvents();
  renderCalendar();
  attachEventListeners();
  updatePageLanguage();
}

// Load theme from main app
function loadTheme() {
  const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeToggle = document.getElementById('theme-toggle');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.classList.add('dark-mode');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.classList.remove('dark-mode');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  const themeToggle = document.getElementById('theme-toggle');
  
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, next);
  
  if (themeToggle) {
    themeToggle.classList.toggle('dark-mode', next === 'dark');
  }
}

// Load language from main app
function loadLanguage() {
  const savedLang = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || 'en';
  if (TRANSLATIONS[savedLang]) {
    state.currentLanguage = savedLang;
  }
}

function t(key) {
  return TRANSLATIONS[state.currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
}

function updatePageLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });
}

// Load events from main app storage
function loadEvents() {
  const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.EVENTS);
  if (saved) {
    const parsed = JSON.parse(saved);
    state.events = new Map(Object.entries(parsed));
  }
}

function saveEvents() {
  const obj = Object.fromEntries(state.events);
  localStorage.setItem(CONFIG.STORAGE_KEYS.EVENTS, JSON.stringify(obj));
}

// Render calendar
function renderCalendar() {
  elements.calendarGrid.innerHTML = "";

  const date = new Date(state.currentYear, state.currentMonth);
  const monthName = date.toLocaleString(state.currentLanguage, { month: 'long', year: 'numeric' });
  elements.calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const firstDay = new Date(state.currentYear, state.currentMonth, 1).getDay();
  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  const today = new Date();

  // Previous month padding
  const prevMonthDays = new Date(state.currentYear, state.currentMonth, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayDiv = createDayCell(prevMonthDays - i, true);
    elements.calendarGrid.appendChild(dayDiv);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && 
                    state.currentMonth === today.getMonth() && 
                    state.currentYear === today.getFullYear();
    const key = `${state.currentYear}-${state.currentMonth + 1}-${d}`;
    const hasEvent = state.events.has(key) && state.events.get(key).length > 0;

    const dayDiv = createDayCell(d, false, isToday, hasEvent, key);
    elements.calendarGrid.appendChild(dayDiv);
  }

  // Next month padding to fill grid
  const totalCells = firstDay + daysInMonth;
  const remaining = 42 - totalCells; // 6 rows * 7 days
  for (let d = 1; d <= remaining; d++) {
    const dayDiv = createDayCell(d, true);
    elements.calendarGrid.appendChild(dayDiv);
  }
}

function createDayCell(day, isOtherMonth, isToday = false, hasEvent = false, dateKey = null) {
  const div = document.createElement("div");
  div.className = "calendar-day";

  // Create day number element
  const dayNumber = document.createElement("span");
  dayNumber.className = "day-number";
  dayNumber.textContent = day;
  div.appendChild(dayNumber);

  if (isOtherMonth) div.classList.add("other-month");
  if (isToday) div.classList.add("today");
  if (hasEvent) div.classList.add("has-event");

  if (!isOtherMonth && dateKey) {
    div.onclick = () => selectDate(day, dateKey, div);
  }

  return div;
}


// Select date
function selectDate(day, key, element) {
  // Remove previous selection
  document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
  element.classList.add('selected');

  state.selectedDate = key;

  // Show panel
  elements.selectedDatePanel.classList.remove("hidden");

  // Format date for display
  const [year, month, dayNum] = key.split('-').map(Number);
  const date = new Date(year, month - 1, dayNum);
  elements.selectedDateTitle.textContent = date.toLocaleDateString(state.currentLanguage, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  renderEventsList(key);
  elements.eventTitle.value = "";
  elements.eventTitle.focus();
}

function renderEventsList(dateKey) {
  const events = state.events.get(dateKey) || [];

  if (events.length === 0) {
    elements.eventsList.innerHTML = `<p class="empty-state">${t('noEvents')}</p>`;
    return;
  }

  elements.eventsList.innerHTML = events.map((event, index) => `
    <div class="event-item">
      <span>${event.title}</span>
      <button onclick="deleteEvent('${dateKey}', ${index})" title="${t('delete')}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

// Save event
function saveEvent(e) {
  e.preventDefault();

  const title = elements.eventTitle.value.trim();
  if (!title || !state.selectedDate) return;

  const events = state.events.get(state.selectedDate) || [];
  events.push({ 
    id: `event-${Date.now()}`,
    title,
    createdAt: new Date().toISOString()
  });

  state.events.set(state.selectedDate, events);
  saveEvents();

  elements.eventTitle.value = "";
  renderCalendar();
  renderEventsList(state.selectedDate);
  showToast(t('saved'), 'success');
}

// Delete event
function deleteEvent(dateKey, index) {
  const events = state.events.get(dateKey) || [];
  events.splice(index, 1);

  if (events.length === 0) {
    state.events.delete(dateKey);
  } else {
    state.events.set(dateKey, events);
  }

  saveEvents();
  renderCalendar();
  renderEventsList(dateKey);
  showToast(t('deleted'), 'success');
}

// Navigation
function prevMonth() {
  state.currentMonth--;
  if (state.currentMonth < 0) {
    state.currentMonth = 11;
    state.currentYear--;
  }
  renderCalendar();
  hidePanel();
}

function nextMonth() {
  state.currentMonth++;
  if (state.currentMonth > 11) {
    state.currentMonth = 0;
    state.currentYear++;
  }
  renderCalendar();
  hidePanel();
}

function hidePanel() {
  elements.selectedDatePanel.classList.add("hidden");
  document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
  state.selectedDate = null;
}

// Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Event listeners
function attachEventListeners() {
  // Back button
  document.getElementById("back-btn").onclick = () => {
    window.location.href = 'index.html';
  };

  // Theme toggle
  document.getElementById("theme-toggle").onclick = toggleTheme;

  // Calendar navigation
  document.getElementById("prev-month").onclick = prevMonth;
  document.getElementById("next-month").onclick = nextMonth;

  // Event form
  elements.eventForm.onsubmit = saveEvent;

  // Cancel button
  document.getElementById("cancel-event").onclick = () => {
    elements.eventTitle.value = "";
    elements.eventTitle.blur();
  };

  // Close panel
  document.getElementById("close-panel").onclick = hidePanel;

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePanel();
    }
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);