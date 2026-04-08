// app.js - Modern JavaScript with ES6+ features, performance optimizations, and clean architecture

/**
 * Homework Book PWA - Main Application
 * Features: Modern ES6+, Event Reminders, Notifications, Calendar
 */

// Configuration
const CONFIG = {
  MAX_SUBJECTS: 7,
  REMINDER_DAYS: 7, // Show reminders from 7 days before
  STORAGE_KEYS: {
    NOTES: 'notesHistory',
    EVENTS: 'events',
    LAST_DAY: 'lastDay',
    THEME: 'theme',
    SUBJECTS: 'subjects',
    SUBJECTS_SELECTED: 'subjectsSelected',
    NOTIFICATIONS_ENABLED: 'notificationsEnabled',
    FINISHED_SUBJECTS: 'finishedSubjects'
  }
};

// Available subjects list (15 options)
const AVAILABLE_SUBJECTS = [
  'Maths', 'Math Lit', 'Science', 'Biology', 'English', 'Afrikaans',
  'CAT', 'IT', 'EGD', 'Accounting', 'Business', 'Life Orientation',
  'Hospitality', 'Tourism', 'History'
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
    this.notificationsEnabled = false;
    this.finishedSubjects = new Set();
  }
  
  async init() {
    await this.loadData();
    this.checkDailyReset();
    this.requestNotificationPermission();
    this.cleanupOldNotificationFlags();
    this.loadFinishedSubjects();
    return this;
  }
  
  async loadData() {
    this.subjectsSelected = localStorage.getItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED) === 'true';
    this.notificationsEnabled = localStorage.getItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS_ENABLED) === 'true';
    
    const savedSubjects = localStorage.getItem(CONFIG.STORAGE_KEYS.SUBJECTS);
    if (savedSubjects) {
      this.subjects = JSON.parse(savedSubjects);
    } else if (this.subjectsSelected) {
      this.createDefaultSubjects();
    }
    
    const savedEvents = localStorage.getItem(CONFIG.STORAGE_KEYS.EVENTS);
    if (savedEvents) {
      this.events = new Map(Object.entries(JSON.parse(savedEvents)));
    }
  }
  
  loadFinishedSubjects() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.FINISHED_SUBJECTS);
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      // Only load finished subjects from today
      if (data.date === today) {
        this.finishedSubjects = new Set(data.subjects);
      } else {
        this.finishedSubjects = new Set();
      }
    }
  }
  
  saveFinishedSubjects() {
    const data = {
      date: new Date().toDateString(),
      subjects: Array.from(this.finishedSubjects)
    };
    localStorage.setItem(CONFIG.STORAGE_KEYS.FINISHED_SUBJECTS, JSON.stringify(data));
  }
  
  markSubjectFinished(subjectId) {
    this.finishedSubjects.add(subjectId);
    this.saveFinishedSubjects();
    
    // Archive the notes before clearing
    this.archiveSubjectNotes(subjectId);
    
    // Clear the subject notes
    const subject = this.subjects.find(s => s.id === subjectId);
    if (subject) {
      subject.notes = '';
      subject.saved = false;
      subject.lastModified = null;
      this.saveSubjects();
    }
  }
  
  archiveSubjectNotes(subjectId) {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject || !subject.notes.trim()) return;
    
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [];
    history.push({
      date: new Date().toDateString(),
      subject: subject.name,
      content: subject.notes,
      archivedAt: new Date().toISOString(),
      status: 'finished'
    });
    localStorage.setItem(CONFIG.STORAGE_KEYS.NOTES, JSON.stringify(history));
  }
  
  isSubjectFinished(subjectId) {
    return this.finishedSubjects.has(subjectId);
  }
  
  createDefaultSubjects() {
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
  
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'granted') {
      this.notificationsEnabled = true;
      localStorage.setItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS_ENABLED, 'true');
    }
  }
  
  async enableNotifications() {
    if (!('Notification' in window)) {
      this.showToast('Notifications not supported in this browser', 'error');
      return false;
    }
    
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      this.notificationsEnabled = true;
      localStorage.setItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS_ENABLED, 'true');
      this.showToast('Notifications enabled!', 'success');
      this.sendReminderNotifications();
      return true;
    } else {
      this.showToast('Notification permission denied', 'error');
      return false;
    }
  }
  
  checkDailyReset() {
    const today = new Date().toDateString();
    const lastDay = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_DAY);
    
    if (lastDay && lastDay !== today) {
      this.archiveNotes(lastDay);
      this.subjects.forEach(subject => {
        if (subject.notes.trim()) {
          subject.notes = '';
          subject.saved = false;
          subject.lastModified = null;
        }
      });
      // Clear finished subjects on new day
      this.finishedSubjects.clear();
      this.saveFinishedSubjects();
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
    if ('setAppBadge' in navigator) {
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
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
    setTimeout(() => {
      toast.style.animation = 'fadeOut 300ms ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  getUpcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = [];
    
    this.events.forEach((events, dateKey) => {
      const [year, month, day] = dateKey.split('-').map(Number);
      const eventDate = new Date(year, month - 1, day);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= CONFIG.REMINDER_DAYS) {
        events.forEach(event => {
          upcoming.push({
            ...event,
            dateKey,
            eventDate,
            daysRemaining: diffDays
          });
        });
      }
    });
    
    return upcoming.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }
  
  sendReminderNotifications() {
    if (!this.notificationsEnabled || !('Notification' in window)) return;
    
    const upcoming = this.getUpcomingEvents();
    upcoming.forEach(event => {
      if (event.daysRemaining > 0) {
        const title = '📅 Event Reminder';
        const body = `${event.title} - ${event.daysRemaining} day${event.daysRemaining !== 1 ? 's' : ''} remaining!`;
        new Notification(title, {
          body,
          icon: './icon-192.png',
          badge: './icon-192.png',
          tag: event.id
        });
      }
    });
  }
  
  cleanupOldNotificationFlags() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('notified-')) {
        const eventId = key.replace('notified-', '');
        let eventExists = false;
        let eventDate = null;
        
        this.events.forEach((events, dateKey) => {
          const event = events.find(e => e.id === eventId);
          if (event) {
            eventExists = true;
            const [year, month, day] = dateKey.split('-').map(Number);
            eventDate = new Date(year, month - 1, day);
          }
        });
        
        if (!eventExists || (eventDate && eventDate < today)) {
          localStorage.removeItem(key);
        }
      }
    }
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
      eventReminders: document.getElementById('event-reminders'),
      remindersContent: document.querySelector('.reminders-content'),
      installBtn: document.getElementById('install-btn')
    };
  }
  
  init() {
    this.renderDate();
    this.initTheme();
    this.renderEventReminders();
    this.checkAndNotifyUpcomingEvents();
    
    if (!this.state.subjectsSelected || this.state.subjects.length === 0) {
      this.showSubjectPicker();
    } else {
      this.renderSubjects();
      this.renderTodayEvents();
    }
    
    this.attachEventListeners();
    this.state.sendReminderNotifications();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.idleInitialization());
    }
  }
  
  checkAndNotifyUpcomingEvents() {
    if (!this.state.notificationsEnabled || !('Notification' in window)) return;
    
    const upcoming = this.state.getUpcomingEvents();
    const twoDaysAway = upcoming.filter(event => event.daysRemaining === 2);
    
    twoDaysAway.forEach(event => {
      const notifiedKey = `notified-${event.id}`;
      if (localStorage.getItem(notifiedKey)) return;
      
      new Notification('📅 Event Reminder', {
        body: `${event.title} - 2 days remaining!`,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: event.id
      });
      
      localStorage.setItem(notifiedKey, 'true');
    });
  }
  
  renderEventReminders() {
    const upcoming = this.state.getUpcomingEvents();
    const remindersBar = this.elements.eventReminders;
    const content = this.elements.remindersContent;
    
    if (upcoming.length === 0) {
      remindersBar.classList.add('hidden');
      return;
    }
    
    remindersBar.classList.remove('hidden');
    content.innerHTML = upcoming.map(event => {
      const isUrgent = event.daysRemaining <= 2;
      const daysText = event.daysRemaining === 0 ? 'Today!' : 
                       event.daysRemaining === 1 ? '1 day left' : 
                       `${event.daysRemaining} days left`;
      
      return `
        <div class="reminder-item ${isUrgent ? 'urgent' : ''}">
          <i class="fa-solid fa-bell"></i>
          <span>${event.title} - ${daysText}</span>
        </div>
      `;
    }).join('');
  }
  
  showSubjectPicker() {
    const picker = document.createElement('div');
    picker.id = 'subject-picker';
    picker.className = 'subject-picker-overlay';
    picker.innerHTML = `
      <div class="subject-picker-modal">
        <div class="picker-header">
          <h2>Select Your 7 Subjects</h2>
        </div>
        <div class="picker-instructions">
          <p>Choose exactly 7 subjects from the list below:</p>
          <span class="selection-count">0/7 selected</span>
        </div>
        <div class="subjects-picker-grid">
          ${AVAILABLE_SUBJECTS.map((subject) => `
            <label class="subject-option" data-subject="${subject}">
              <input type="checkbox" value="${subject}">
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
    
    const style = document.createElement('style');
    style.textContent = `
      .subject-picker-overlay { 
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      .subject-picker-modal { 
        background: var(--color-surface, #ffffff);
        border-radius: 16px;
        width: min(95vw, 600px);
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        overflow: hidden;
      }
      .picker-header { 
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-border, #e0e0e0);
        background: var(--color-surface-elevated, #f8f9fa);
      }
      .picker-header h2 { margin: 0; font-size: 1.5rem; color: var(--color-text, #1a1a1a); }
      .picker-instructions { 
        padding: 1rem 1.5rem;
        background: var(--color-bg, #fdfdfd);
        border-bottom: 1px solid var(--color-border, #e0e0e0);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .picker-instructions p { margin: 0; color: var(--color-text-secondary, #666666); }
      .selection-count { font-weight: 700; color: var(--color-primary, #0077ff); font-size: 1.125rem; }
      .subjects-picker-grid { 
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 0.75rem;
        padding: 1.5rem;
        max-height: 50vh;
        overflow-y: auto;
        background: var(--color-surface, #ffffff);
      }
      .subject-option { 
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: var(--color-bg, #fdfdfd);
        border: 2px solid var(--color-border, #e0e0e0);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .subject-option:hover { border-color: var(--color-primary, #0077ff); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .subject-option.selected { background: var(--color-primary, #0077ff); border-color: var(--color-primary, #0077ff); color: white; }
      .subject-option input { display: none; }
      .checkmark { 
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-border, #e0e0e0);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }
      .subject-option.selected .checkmark { background: white; border-color: white; }
      .subject-option.selected .checkmark::after { content: '✓'; color: var(--color-primary, #0077ff); font-weight: bold; font-size: 14px; }
      .subject-name { font-weight: 500; font-size: 0.9375rem; }
      .picker-actions { 
        padding: 1.5rem;
        border-top: 1px solid var(--color-border, #e0e0e0);
        display: flex;
        justify-content: center;
        background: var(--color-surface-elevated, #f8f9fa);
      }
      #confirm-subjects { padding: 0.875rem 2rem; font-size: 1rem; min-width: 200px; }
      #confirm-subjects:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-primary {
        background: var(--color-primary, #0077ff);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .btn-primary:hover:not(:disabled) { background: var(--color-primary-hover, #005fcc); transform: translateY(-1px); }
      
      @media (prefers-color-scheme: dark) {
        .subject-picker-modal { background: #1a1a1a; }
        .picker-header { background: #242424; border-color: #333333; }
        .picker-header h2 { color: #f5f5f5; }
        .picker-instructions { background: #0f0f0f; border-color: #333333; }
        .picker-instructions p { color: #a0a0a0; }
        .subjects-picker-grid { background: #1a1a1a; }
        .subject-option { background: #242424; border-color: #333333; color: #f5f5f5; }
        .subject-option:hover { border-color: #4dabf7; }
        .picker-actions { background: #242424; border-color: #333333; }
      }
    `;
    document.head.appendChild(style);
    
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
    
    confirmBtn.addEventListener('click', () => {
      const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
      this.state.setSelectedSubjects(selected);
      picker.remove();
      style.remove();
      this.renderSubjects();
      this.renderTodayEvents();
      this.state.showToast('Subjects selected successfully!', 'success');
    });
  }
  
  idleInitialization() {
    this.preloadResources();
    this.setupPeriodicSync();
  }
  
  preloadResources() {
    const nextMonth = (this.state.currentMonth + 1) % 12;
    const nextYear = this.state.currentMonth === 11 ? this.state.currentYear + 1 : this.state.currentYear;
  }
  
  setupPeriodicSync() {
    if ('serviceWorker' in navigator && 'sync' in registration) {
      navigator.serviceWorker.ready.then(registration => {
        registration.periodicSync?.register('sync-events', {
          minInterval: 24 * 60 * 60 * 1000
        }).catch(console.error);
      });
    }
  }
  
  renderDate() {
    const now = new Date();
    const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
    const day = now.toLocaleDateString(undefined, { day: 'numeric' });
    const month = now.toLocaleDateString(undefined, { month: 'long' });
    this.elements.dateDisplay.innerHTML = `<span class="weekday">${weekday}</span><span class="date">${day} ${month}</span>`;
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
    const isFinished = this.state.isSubjectFinished(subject.id);
    const card = document.createElement('div');
    card.className = `subject-card ${subject.saved ? 'saved' : ''} ${isFinished ? 'finished' : ''}`;
    card.dataset.id = subject.id;
    card.innerHTML = `
      <input type="text" class="subject-input" placeholder="Subject name" value="${subject.name}" aria-label="Subject name" readonly ${isFinished ? 'disabled' : ''}>
      <textarea class="notes-textarea" placeholder="${isFinished ? 'Finished for today! Come back tomorrow for new homework.' : 'Write your homework notes here...'}" aria-label="Notes for ${subject.name}" ${isFinished ? 'disabled' : ''}>${isFinished ? '' : subject.notes}</textarea>
      <div class="card-actions">
        ${isFinished ? `
          <span class="finished-badge"><i class="fa-solid fa-check-circle"></i> Done</span>
        ` : `
          <button class="btn-icon delete" aria-label="Delete subject" title="Delete"><i class="fa-solid fa-trash"></i></button>
          <button class="btn-icon save" aria-label="Save notes" title="Save"><i class="fa-solid fa-check"></i></button>
          <button class="btn-icon finish" aria-label="Mark as finished" title="Finished"><i class="fa-solid fa-flag-checkered"></i></button>
        `}
      </div>
    `;
    
    if (isFinished) return card;
    
    const textarea = card.querySelector('.notes-textarea');
    const saveBtn = card.querySelector('.btn-icon.save');
    const deleteBtn = card.querySelector('.btn-icon.delete');
    const finishBtn = card.querySelector('.btn-icon.finish');
    
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
    
    finishBtn.addEventListener('click', () => {
      if (!textarea.value.trim()) {
        this.state.showToast('Add some notes before marking as finished!', 'error');
        return;
      }
      if (confirm(`Mark ${subject.name} as finished? This will save your notes and clear the field for tomorrow.`)) {
        this.finishSubject(subject.id, index);
      }
    });
    
    return card;
  }
  
  finishSubject(subjectId, index) {
    this.state.markSubjectFinished(subjectId);
    this.state.showToast('Subject marked as finished! Great job!', 'success');
    this.renderSubjects();
    this.updateSubjectCounter();
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
    const available = AVAILABLE_SUBJECTS.filter(sub => !this.state.subjects.some(s => s.name === sub));
    if (available.length === 0) {
      this.state.showToast('No more subjects available to add', 'error');
      return;
    }
    
    const picker = document.createElement('dialog');
    picker.className = 'modal';
    picker.innerHTML = `
      <div class="modal-content">
        <div class="modal-header"><h2>Add Subject</h2><button class="close-btn" onclick="this.closest('dialog').close()"><i class="fa-solid fa-xmark"></i></button></div>
        <div style="padding: var(--space-md); max-height: 40vh; overflow-y: auto;">
          ${available.map(sub => `<button class="btn-secondary" style="width: 100%; margin-bottom: var(--space-sm); justify-content: center;" onclick="window.selectSubjectToAdd('${sub}')">${sub}</button>`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(picker);
    picker.showModal();
    
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
      const cards = this.elements.subjectsContainer.querySelectorAll('.subject-card');
      cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.state.showToast(`Added: ${subjectName}`, 'success');
    };
  }
  
  updateSubjectCounter() {
    const finishedCount = this.state.finishedSubjects.size;
    const total = this.state.subjects.length;
    this.elements.subjectCounter.textContent = `${finishedCount}/${total} finished • ${total}/${CONFIG.MAX_SUBJECTS} subjects`;
  }
  
  renderCalendar() {
    const grid = this.elements.calendarGrid;
    const title = this.elements.calendarTitle;
    grid.innerHTML = '';
    title.textContent = new Date(this.state.currentYear, this.state.currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate();
    const today = new Date();
    
    const prevMonthDays = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      grid.appendChild(this.createDayCell(prevMonthDays - i, true));
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && this.state.currentMonth === today.getMonth() && this.state.currentYear === today.getFullYear();
      const key = `${this.state.currentYear}-${this.state.currentMonth + 1}-${d}`;
      const dayEvents = this.state.events.get(key) || [];
      grid.appendChild(this.createDayCell(d, false, isToday, dayEvents, key));
    }
    
    const totalCells = firstDay + daysInMonth;
    for (let d = 1; d <= 42 - totalCells; d++) {
      grid.appendChild(this.createDayCell(d, true));
    }
  }
  
  createDayCell(day, isOtherMonth, isToday = false, events = [], dateKey = null) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.innerHTML = `<span class="day-number">${day}</span>`;
    
    if (isOtherMonth) cell.classList.add('other-month');
    if (isToday) cell.classList.add('today');
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
    this.renderEventReminders();
    this.state.showToast('Event saved', 'success');
    
    const [year, month, day] = dateKey.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const diffDays = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= CONFIG.REMINDER_DAYS && this.state.notificationsEnabled) {
      new Notification('📅 New Event Added', {
        body: `${title} - ${diffDays === 0 ? 'Today!' : diffDays + ' days remaining'}`,
        icon: './icon-192.png'
      });
    }
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
    display.innerHTML = `<ul>${events.map(event => `<li><i class="fa-solid fa-calendar-check"></i>${event.title}</li>`).join('')}</ul>`;
  }
  
  renderHistory() {
    const container = this.elements.savedNotes;
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [];
    if (history.length === 0) {
      container.innerHTML = '<p class="empty-state">No saved notes yet</p>';
      return;
    }
    const sorted = history.sort((a, b) => new Date(b.archivedAt) - new Date(a.archivedAt));
    container.innerHTML = sorted.map(entry => `
      <div class="history-item">
        <div class="date">${new Date(entry.date).toLocaleDateString()}</div>
        <div class="subject">${entry.subject || 'Untitled'}</div>
        <div class="content">${entry.content}</div>
        ${entry.status ? `<span class="status-badge">${entry.status}</span>` : ''}
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
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeIcon(newTheme);
      }
    });
  }
  
  updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
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
  
  attachEventListeners() {
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
    
    document.getElementById('cancel-event').addEventListener('click', () => {
      this.elements.eventForm.classList.add('hidden');
      this.elements.eventTitle.value = '';
    });
    
    document.getElementById('event-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.elements.eventTitle.value.trim();
      if (title) this.saveEvent(title);
    });
    
    document.getElementById('settings-toggle').addEventListener('click', () => {
      this.renderHistory();
      this.elements.settingsDialog.showModal();
    });
    
    document.getElementById('settings-close').addEventListener('click', () => {
      this.elements.settingsDialog.close();
    });
    
    document.getElementById('export-data').addEventListener('click', () => this.exportData());
    document.getElementById('clear-history').addEventListener('click', () => this.clearHistory());
    
    const enableNotifBtn = document.getElementById('enable-notifications');
    if (enableNotifBtn) {
      enableNotifBtn.addEventListener('click', async () => {
        const enabled = await this.state.enableNotifications();
        if (enabled) {
          enableNotifBtn.innerHTML = '<i class="fa-solid fa-bell"></i> Notifications On';
          enableNotifBtn.disabled = true;
        }
      });
    }
    
    document.getElementById('add-subject').addEventListener('click', () => this.addSubject());
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    
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
    
    [this.elements.calendarDialog, this.elements.settingsDialog].forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });
    
    document.addEventListener('keydown', (e) => {
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
      if (e.key === 'Escape') {
        this.elements.eventForm.classList.add('hidden');
      }
    });
    
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.renderDate();
        this.renderEventReminders();
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
  
  window.homeworkApp = { state, ui };
});
