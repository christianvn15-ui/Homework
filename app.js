// app.js - Modern JavaScript with ES6+ features, performance optimizations, and clean architecture

/**
 * Homework Book PWA - Main Application
 * Features: Modern ES6+, View Transitions API, Idle Detection, Badging API
 */

// Configuration
const CONFIG = {
  MAX_SUBJECTS: 7,
  STORAGE_KEYS: {
    NOTES: 'notesHistory',
    EVENTS: 'events',
    LAST_DAY: 'lastDay',
    THEME: 'theme',
    SUBJECTS: 'subjects',
    SUBJECTS_SELECTED: 'subjectsSelected',
    AVAILABLE_SUBJECTS: 'availableSubjects'
  }
};

// Available subjects list (15 options)
const AVAILABLE_SUBJECTS = [
  'Maths',
  'Math Lit', 
  'Science',
  'Biology',
  'English',
  'Afrikaans',
  'CAT',
  'IT',
  'EGD',
  'Accounting',
  'Business',
  'Life Orientation',
  'Hospitality',
  'Tourism',
  'History'
];

// State Management
class AppState {
  constructor() {
    this.subjects = [];
    this.events = new Map();
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedDate = null;
    this.deferredPrompt = null;
    this.subjectsSelected = false;
  }
  
  async init() {
    await this.loadData();
    this.checkDailyReset();
    return this;
  }
  
  async loadData() {
    // Check if user has already selected subjects
    this.subjectsSelected = localStorage.getItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED) === 'true';
    
    // Load subjects from localStorage
    const savedSubjects = localStorage.getItem(CONFIG.STORAGE_KEYS.SUBJECTS);
    
    if (savedSubjects) {
      this.subjects = JSON.parse(savedSubjects);
    } else if (this.subjectsSelected) {
      // Should have subjects if selected flag is true, create defaults if missing
      this.createDefaultSubjects();
    }
    // If no subjects and not selected, will show subject picker
    
    // Load events
    const savedEvents = localStorage.getItem(CONFIG.STORAGE_KEYS.EVENTS);
    if (savedEvents) {
      this.events = new Map(Object.entries(JSON.parse(savedEvents)));
    }
  }
  
  createDefaultSubjects() {
    // This is a fallback - normally subjects are set via picker
    this.subjects = AVAILABLE_SUBJECTS.slice(0, CONFIG.MAX_SUBJECTS).map((name, index) => ({
      id: `subject-${Date.now()}-${index}`,
      name: name,
      notes: '',
      saved: false,
      lastModified: null
    }));
    this.saveSubjects();
  }
  
  setSelectedSubjects(selectedNames) {
    this.subjects = selectedNames.map((name, index) => ({
      id: `subject-${Date.now()}-${index}`,
      name: name,
      notes: '',
      saved: false,
      lastModified: null
    }));
    this.subjectsSelected = true;
    localStorage.setItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED, 'true');
    this.saveSubjects();
  }
  
  saveSubjects() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.SUBJECTS, JSON.stringify(this.subjects));
  }
  
  saveEvents() {
    const obj = Object.fromEntries(this.events);
    localStorage.setItem(CONFIG.STORAGE_KEYS.EVENTS, JSON.stringify(obj));
    this.updateBadge();
  }
  
  checkDailyReset() {
    const today = new Date().toDateString();
    const lastDay = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_DAY);
    
    if (lastDay && lastDay !== today) {
      // Archive current notes before reset
      this.archiveNotes(lastDay);
      
      // Reset all subjects
      this.subjects.forEach(subject => {
        if (subject.notes.trim()) {
          subject.notes = '';
          subject.saved = false;
          subject.lastModified = null;
        }
      });
      this.saveSubjects();
      
      this.showToast('New day! Notes have been archived.', 'info');
    }
    
    localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_DAY, today);
  }
  
  archiveNotes(date) {
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [];
    
    this.subjects.forEach(subject => {
      if (subject.notes.trim()) {
        history.push({
          date: date,
          subject: subject.name,
          content: subject.notes,
          archivedAt: new Date().toISOString()
        });
      }
    });
    
    localStorage.setItem(CONFIG.STORAGE_KEYS.NOTES, JSON.stringify(history));
  }
  
  async updateBadge() {
    // Badging API for installed PWAs
    if ('setAppBadge' in navigator) {
      const today = new Date().toDateString();
      const todayKey = `${this.currentYear}-${this.currentMonth + 1}-${new Date().getDate()}`;
      const count = this.events.get(todayKey)?.length || 0;
      
      try {
        if (count > 0) {
          await navigator.setAppBadge(count);
        } else {
          await navigator.clearAppBadge();
        }
      } catch (e) {
        console.log('Badge update failed:', e);
      }
    }
  }
  
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'fadeOut 300ms ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  resetSubjectsSelection() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.SUBJECTS);
    this.subjectsSelected = false;
    this.subjects = [];
    location.reload();
  }
}

// UI Controller
class UIController {
  constructor(state) {
    this.state = state;
    this.elements = {};
    this.cacheElements();
  }
  
  cacheElements() {
    // Cache DOM elements for performance
    this.elements = {
      dateDisplay: document.getElementById('date-display'),
      subjectsContainer: document.getElementById('subjects-container'),
      subjectCounter: document.querySelector('.subject-counter'),
      calendarDialog: document.getElementById('calendar-dialog'),
      calendarGrid: document.getElementById('calendar-grid'),
      calendarTitle: document.getElementById('calendar-title'),
      eventForm: document.getElementById('event-form'),
      eventTitle: document.getElementById('event-title'),
      settingsDialog: document.getElementById('settings-dialog'),
      savedNotes: document.getElementById('saved-notes'),
      eventDisplay: document.getElementById('event-display'),
      installBtn: document.getElementById('install-btn'),
      app: document.getElementById('app')
    };
  }
  
  init() {
    this.renderDate();
    this.initTheme();
    
    // Check if user needs to select subjects
    if (!this.state.subjectsSelected || this.state.subjects.length === 0) {
      this.showSubjectPicker();
    } else {
      this.renderSubjects();
      this.renderTodayEvents();
    }
    
    this.attachEventListeners();
    
    // Request idle callback for non-critical initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.idleInitialization());
    }
  }
  
  showSubjectPicker() {
    // Create subject picker modal
    const picker = document.createElement('dialog');
    picker.id = 'subject-picker';
    picker.className = 'modal subject-picker-modal';
    picker.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Select Your 7 Subjects</h2>
        </div>
        <div class="picker-instructions">
          <p>Choose exactly 7 subjects from the list below:</p>
          <span class="selection-count">0/7 selected</span>
        </div>
        <div class="subjects-picker-grid">
          ${AVAILABLE_SUBJECTS.map((subject, index) => `
            <label class="subject-option" data-subject="${subject}">
              <input type="checkbox" value="${subject}" data-index="${index}">
              <span class="checkmark"></span>
              <span class="subject-name">${subject}</span>
            </label>
          `).join('')}
        </div>
        <div class="picker-actions">
          <button id="confirm-subjects" class="btn-primary" disabled>
            Confirm Selection
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(picker);
    
    // Add styles for picker
    const style = document.createElement('style');
    style.textContent = `
      .subject-picker-modal {
        width: min(95vw, 600px);
        max-height: 90vh;
      }
      .picker-instructions {
        padding: var(--space-md);
        background: var(--color-bg);
        border-bottom: 1px solid var(--color-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .picker-instructions p {
        margin: 0;
        color: var(--color-text);
      }
      .selection-count {
        font-weight: 600;
        color: var(--color-primary);
        font-size: 1.125rem;
      }
      .subjects-picker-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: var(--space-sm);
        padding: var(--space-md);
        max-height: 50vh;
        overflow-y: auto;
        background: var(--color-surface);
      }
      .subject-option {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        background: var(--color-bg);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      .subject-option:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
      }
      .subject-option.selected {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: white;
      }
      .subject-option input {
        display: none;
      }
      .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-border);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
      }
      .subject-option.selected .checkmark {
        background: white;
        border-color: white;
      }
      .subject-option.selected .checkmark::after {
        content: '✓';
        color: var(--color-primary);
        font-weight: bold;
      }
      .subject-name {
        font-weight: 500;
      }
      .picker-actions {
        padding: var(--space-md);
        border-top: 1px solid var(--color-border);
        display: flex;
        justify-content: center;
        background: var(--color-surface-elevated);
      }
      #confirm-subjects {
        padding: var(--space-sm) var(--space-xl);
        font-size: 1rem;
      }
      #confirm-subjects:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
    
    // Show modal
    picker.showModal();
    
    // Handle selection
    const checkboxes = picker.querySelectorAll('input[type="checkbox"]');
    const confirmBtn = picker.querySelector('#confirm-subjects');
    const countDisplay = picker.querySelector('.selection-count');
    let selectedCount = 0;
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const label = e.target.closest('.subject-option');
        
        if (e.target.checked) {
          if (selectedCount >= CONFIG.MAX_SUBJECTS) {
            e.target.checked = false;
            this.state.showToast(`You can only select ${CONFIG.MAX_SUBJECTS} subjects`, 'error');
            return;
          }
          selectedCount++;
          label.classList.add('selected');
        } else {
          selectedCount--;
          label.classList.remove('selected');
        }
        
        countDisplay.textContent = `${selectedCount}/${CONFIG.MAX_SUBJECTS} selected`;
        confirmBtn.disabled = selectedCount !== CONFIG.MAX_SUBJECTS;
      });
    });
    
    // Handle confirm
    confirmBtn.addEventListener('click', () => {
      const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      
      this.state.setSelectedSubjects(selected);
      picker.close();
      picker.remove();
      style.remove();
      
      this.renderSubjects();
      this.renderTodayEvents();
      this.state.showToast('Subjects selected successfully!', 'success');
    });
  }
  
  idleInitialization() {
    // Non-critical tasks
    this.preloadResources();
    this.setupPeriodicSync();
  }
  
  preloadResources() {
    // Preload next month's calendar data
    const nextMonth = (this.state.currentMonth + 1) % 12;
    const nextYear = this.state.currentMonth === 11 ? this.state.currentYear + 1 : this.state.currentYear;
  }
  
  setupPeriodicSync() {
    // Background sync for offline support
    if ('serviceWorker' in navigator && 'sync' in registration) {
      navigator.serviceWorker.ready.then(registration => {
        registration.periodicSync?.register('sync-events', {
          minInterval: 24 * 60 * 60 * 1000 // 24 hours
        }).catch(console.error);
      });
    }
  }
  
  renderDate() {
    const now = new Date();
    const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
    const day = now.toLocaleDateString(undefined, { day: 'numeric' });
    const month = now.toLocaleDateString(undefined, { month: 'long' });
    
    this.elements.dateDisplay.innerHTML = `
      <span class="weekday">${weekday}</span>
      <span class="date">${day} ${month}</span>
    `;
  }
  
  renderSubjects() {
    const container = this.elements.subjectsContainer;
    container.innerHTML = '';
    
    this.state.subjects.forEach((subject, index) => {
      const card = this.createSubjectCard(subject, index);
      container.appendChild(card);
    });
    
    this.updateSubjectCounter();
  }
  
  createSubjectCard(subject, index) {
    const card = document.createElement('div');
    card.className = `subject-card ${subject.saved ? 'saved' : ''}`;
    card.dataset.id = subject.id;
    
    card.innerHTML = `
      <input 
        type="text" 
        class="subject-input" 
        placeholder="Subject name" 
        value="${subject.name}"
        aria-label="Subject name"
        readonly
      >
      <textarea 
        class="notes-textarea" 
        placeholder="Write your homework notes here..."
        aria-label="Notes for ${subject.name}"
      >${subject.notes}</textarea>
      <div class="card-actions">
        <button class="btn-icon delete" aria-label="Delete subject" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn-icon save" aria-label="Save notes" title="Save">
          <i class="fa-solid fa-check"></i>
        </button>
      </div>
    `;
    
    // Event delegation within card
    const textarea = card.querySelector('.notes-textarea');
    const saveBtn = card.querySelector('.btn-icon.save');
    const deleteBtn = card.querySelector('.btn-icon.delete');
    
    // Auto-save on input with debounce
    let debounceTimer;
    const autoSave = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.saveSubject(index, subject.name, textarea.value);
      }, 1000);
    };
    
    textarea.addEventListener('input', autoSave);
    
    saveBtn.addEventListener('click', () => {
      this.saveSubject(index, subject.name, textarea.value, true);
      card.classList.add('saved');
      setTimeout(() => card.classList.remove('saved'), 2000);
    });
    
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this subject? You can reselect subjects in settings.')) {
        this.deleteSubject(index);
      }
    });
    
    return card;
  }
  
  saveSubject(index, name, notes, manual = false) {
    this.state.subjects[index].name = name;
    this.state.subjects[index].notes = notes;
    this.state.subjects[index].lastModified = new Date().toISOString();
    
    if (manual) {
      this.state.subjects[index].saved = true;
      this.state.showToast(`Saved: ${name || 'Untitled'}`, 'success');
    }
    
    this.state.saveSubjects();
  }
  
  deleteSubject(index) {
    if (this.state.subjects.length <= 1) {
      this.state.showToast('Cannot delete last subject', 'error');
      return;
    }
    
    this.state.subjects.splice(index, 1);
    this.state.saveSubjects();
    this.renderSubjects();
    this.updateSubjectCounter();
    this.state.showToast('Subject deleted', 'info');
  }
  
  addSubject() {
    if (this.state.subjects.length >= CONFIG.MAX_SUBJECTS) {
      this.state.showToast(`Maximum ${CONFIG.MAX_SUBJECTS} subjects allowed`, 'error');
      return;
    }
    
    const available = AVAILABLE_SUBJECTS.filter(sub => 
      !this.state.subjects.some(s => s.name === sub)
    );
    
    if (available.length === 0) {
      this.state.showToast('No more subjects available to add', 'error');
      return;
    }
    
    // Show picker to add one subject
    const picker = document.createElement('dialog');
    picker.className = 'modal';
    picker.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add Subject</h2>
          <button class="close-btn" onclick="this.closest('dialog').close()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div style="padding: var(--space-md); max-height: 40vh; overflow-y: auto;">
          ${available.map(sub => `
            <button class="btn-secondary" style="width: 100%; margin-bottom: var(--space-sm); justify-content: center;" 
              onclick="window.selectSubjectToAdd('${sub}')">
              ${sub}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    document.body.appendChild(picker);
    picker.showModal();
    
    // Global handler for selection
    window.selectSubjectToAdd = (subjectName) => {
      const newSubject = {
        id: `subject-${Date.now()}`,
        name: subjectName,
        notes: '',
        saved: false,
        lastModified: null
      };
      
      this.state.subjects.push(newSubject);
      this.state.saveSubjects();
      this.renderSubjects();
      picker.close();
      picker.remove();
      delete window.selectSubjectToAdd;
      
      // Focus new subject input
      const cards = this.elements.subjectsContainer.querySelectorAll('.subject-card');
      const lastCard = cards[cards.length - 1];
      lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      this.state.showToast(`Added: ${subjectName}`, 'success');
    };
  }
  
  updateSubjectCounter() {
    const count = this.state.subjects.length;
    this.elements.subjectCounter.textContent = `${count}/${CONFIG.MAX_SUBJECTS} subjects`;
  }
  
  // Calendar Methods
  renderCalendar() {
    const grid = this.elements.calendarGrid;
    const title = this.elements.calendarTitle;
    
    grid.innerHTML = '';
    title.textContent = new Date(this.state.currentYear, this.state.currentMonth)
      .toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Previous month padding
    const prevMonthDays = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const cell = this.createDayCell(day, true);
      grid.appendChild(cell);
    }
    
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && 
                      this.state.currentMonth === today.getMonth() && 
                      this.state.currentYear === today.getFullYear();
      
      const key = `${this.state.currentYear}-${this.state.currentMonth + 1}-${d}`;
      const dayEvents = this.state.events.get(key) || [];
      
      const cell = this.createDayCell(d, false, isToday, dayEvents, key);
      grid.appendChild(cell);
    }
    
    // Next month padding to fill grid
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let d = 1; d <= remainingCells; d++) {
      const cell = this.createDayCell(d, true);
      grid.appendChild(cell);
    }
  }
  
  createDayCell(day, isOtherMonth, isToday = false, events = [], dateKey = null) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.textContent = day;
    
    if (isOtherMonth) {
      cell.classList.add('other-month');
    }
    if (isToday) {
      cell.classList.add('today');
    }
    if (events.length > 0) {
      cell.classList.add('has-event');
      const dots = document.createElement('div');
      dots.className = 'day-events';
      events.slice(0, 3).forEach(() => {
        const dot = document.createElement('span');
        dot.className = 'event-dot';
        dots.appendChild(dot);
      });
      cell.appendChild(dots);
    }
    
    if (!isOtherMonth && dateKey) {
      cell.addEventListener('click', (e) => this.selectDate(day, dateKey, events, e.currentTarget));
    }
    
    return cell;
  }
  
  selectDate(day, dateKey, events, cellElement) {
    this.state.selectedDate = { day, dateKey, events };
    this.elements.eventForm.classList.remove('hidden');
    this.elements.eventTitle.focus();
    
    // Highlight selected day
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    cellElement.classList.add('selected');
  }
  
  saveEvent(title) {
    if (!this.state.selectedDate) return;
    
    const { dateKey } = this.state.selectedDate;
    const currentEvents = this.state.events.get(dateKey) || [];
    
    currentEvents.push({
      id: `event-${Date.now()}`,
      title,
      createdAt: new Date().toISOString()
    });
    
    this.state.events.set(dateKey, currentEvents);
    this.state.saveEvents();
    
    this.elements.eventTitle.value = '';
    this.elements.eventForm.classList.add('hidden');
    
    this.renderCalendar();
    this.renderTodayEvents();
    this.state.showToast('Event saved', 'success');
  }
  
  deleteEvent(dateKey, eventId) {
    const events = this.state.events.get(dateKey) || [];
    const filtered = events.filter(e => e.id !== eventId);
    
    if (filtered.length === 0) {
      this.state.events.delete(dateKey);
    } else {
      this.state.events.set(dateKey, filtered);
    }
    
    this.state.saveEvents();
    this.renderCalendar();
    this.renderTodayEvents();
  }
  
  renderTodayEvents() {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const events = this.state.events.get(todayKey) || [];
    
    const display = this.elements.eventDisplay;
    
    if (events.length === 0) {
      display.innerHTML = '<p class="empty-state">No events today</p>';
      return;
    }
    
    display.innerHTML = `
      <ul>
        ${events.map(event => `
          <li>
            <i class="fa-solid fa-calendar-check"></i>
            ${event.title}
          </li>
        `).join('')}
      </ul>
    `;
  }
  
  // Settings/History Methods
  renderHistory() {
    const container = this.elements.savedNotes;
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [];
    
    if (history.length === 0) {
      container.innerHTML = '<p class="empty-state">No saved notes yet</p>';
      return;
    }
    
    // Sort by date descending
    const sorted = history.sort((a, b) => new Date(b.archivedAt) - new Date(a.archivedAt));
    
    container.innerHTML = sorted.map(entry => `
      <div class="history-item">
        <div class="date">${new Date(entry.date).toLocaleDateString()}</div>
        <div class="subject">${entry.subject || 'Untitled'}</div>
        <div class="content">${entry.content}</div>
      </div>
    `).join('');
  }
  
  exportData() {
    const data = {
      subjects: this.state.subjects,
      events: Object.fromEntries(this.state.events),
      history: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [],
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homework-book-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.state.showToast('Data exported successfully', 'success');
  }
  
  clearHistory() {
    if (!confirm('Clear all history? This cannot be undone.')) return;
    
    localStorage.removeItem(CONFIG.STORAGE_KEYS.NOTES);
    this.renderHistory();
    this.state.showToast('History cleared', 'info');
  }
  
  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.updateThemeIcon('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.updateThemeIcon('light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeIcon(newTheme);
      }
    });
  }
  
  // FIXED: Moved this method inside the class properly
  updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
      if (theme === 'dark') {
        // Dark mode: show sun icon (to indicate clicking will go to light)
        icon.className = 'fa-solid fa-sun';
      } else {
        // Light mode: show moon icon (to indicate clicking will go to dark)
        icon.className = 'fa-solid fa-moon';
      }
    }
  }
  
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, next);
    this.updateThemeIcon(next);
  }
  
  // Event Listeners
  attachEventListeners() {
    // Calendar navigation
    document.getElementById('calendar-toggle').addEventListener('click', () => {
      this.renderCalendar();
      this.elements.calendarDialog.showModal();
    });
    
    document.getElementById('calendar-close').addEventListener('click', () => {
      this.elements.calendarDialog.close();
    });
    
    document.getElementById('prev-month').addEventListener('click', () => {
      this.state.currentMonth--;
      if (this.state.currentMonth < 0) {
        this.state.currentMonth = 11;
        this.state.currentYear--;
      }
      this.renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
      this.state.currentMonth++;
      if (this.state.currentMonth > 11) {
        this.state.currentMonth = 0;
        this.state.currentYear++;
      }
      this.renderCalendar();
    });
    
    // Event form
    document.getElementById('cancel-event').addEventListener('click', () => {
      this.elements.eventForm.classList.add('hidden');
      this.elements.eventTitle.value = '';
    });
    
    document.getElementById('event-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.elements.eventTitle.value.trim();
      if (title) this.saveEvent(title);
    });
    
    // Settings
    document.getElementById('settings-toggle').addEventListener('click', () => {
      this.renderHistory();
      this.elements.settingsDialog.showModal();
    });
    
    document.getElementById('settings-close').addEventListener('click', () => {
      this.elements.settingsDialog.close();
    });
    
    document.getElementById('export-data').addEventListener('click', () => this.exportData());
    document.getElementById('clear-history').addEventListener('click', () => this.clearHistory());
    
    // Add subject FAB
    document.getElementById('add-subject').addEventListener('click', () => this.addSubject());
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.state.deferredPrompt = e;
      this.elements.installBtn.classList.remove('hidden');
    });
    
    this.elements.installBtn.addEventListener('click', async () => {
      if (!this.state.deferredPrompt) return;
      this.state.deferredPrompt.prompt();
      const { outcome } = await this.state.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        this.elements.installBtn.classList.add('hidden');
      }
      this.state.deferredPrompt = null;
    });
    
    // Close modals on backdrop click
    [this.elements.calendarDialog, this.elements.settingsDialog].forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + S to save all
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.state.subjects.forEach((subject, index) => {
          const card = this.elements.subjectsContainer.children[index];
          if (card) {
            const notes = card.querySelector('.notes-textarea').value;
            this.saveSubject(index, subject.name, notes, true);
          }
        });
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        this.elements.eventForm.classList.add('hidden');
      }
    });
    
    // Visibility API - refresh when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.renderDate();
        this.checkDailyReset();
      }
    });
  }
  
  checkDailyReset() {
    const today = new Date().toDateString();
    const lastDay = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_DAY);
    if (lastDay !== today) {
      location.reload();
    }
  }
}

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  const state = await new AppState().init();
  const ui = new UIController(state);
  ui.init();
  
  // Register as singleton for debugging
  window.homeworkApp = { state, ui };
});
