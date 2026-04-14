const CONFIG = {
  MAX_SUBJECTS: 7,
  TOTAL_AVAILABLE_SUBJECTS: 15,
  REMINDER_DAYS: 7,
  LANGUAGES: {
    en: { name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
    af: { name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦', dir: 'ltr' },
    es: { name: 'Spanish', native: 'Español', flag: '🇪🇸', dir: 'ltr' },
    nl: { name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
    st: { name: 'Sotho', native: 'Sesotho', flag: '🇱🇸', dir: 'ltr' },
    fr: { name: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
    it: { name: 'Italian', native: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    ja: { name: 'Japanese', native: '日本語', flag: '🇯🇵', dir: 'ltr' },
    zh: { name: 'Chinese', native: '中文', flag: '🇨🇳', dir: 'ltr' }
  },
  STORAGE_KEYS: {
    NOTES: 'notesHistory',
    EVENTS: 'events',
    THEME: 'theme',
    SUBJECTS: 'subjects',
    SUBJECTS_SELECTED: 'subjectsSelected',
    NOTIFICATIONS_ENABLED: 'notificationsEnabled',
    LANGUAGE: 'language',
    LANGUAGE_SELECTED: 'languageSelected',
    FINISHED_SUBJECTS: 'finishedSubjects',
    LISTED_TASKS: 'listedTasks'
  }
};

const TRANSLATIONS = {
  en: {
    homeworkNotes: 'Homework Notes',
    notesHistory: 'Notes History',
    exportData: 'Export Data',
    clearHistory: 'Clear History',
    enableNotifications: 'Enable Notifications',
    noSavedNotes: 'No saved notes yet',
    noEventsToday: 'No events today',
    selectLanguage: 'Select Language',
    chooseLanguage: 'Choose your preferred language',
    selectSubjects: 'Select Your 7 Subjects',
    chooseSubjects: 'Choose exactly 7 subjects from the list below',
    subjectsSelected: 'subjects selected',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    finish: 'Finish',
    finished: 'Finished',
    done: 'Done',
    addSubject: 'Add Subject',
    maxSubjects: 'Maximum 7 subjects allowed',
    subjectDeleted: 'Subject deleted',
    cannotDelete: 'Cannot delete last subject',
    saved: 'Saved',
    newDay: 'New day! Notes have been archived',
    finishConfirm: 'Mark {subject} as finished? This will save your notes.',
    addNotesFirst: 'Write down your homework and mark as finished with the flag when you are done!',
    greatJob: 'Great job! Subject marked as finished!',
    notificationsEnabled: 'Notifications enabled!',
    notificationDenied: 'Notification permission denied',
    dataExported: 'Data exported successfully',
    historyCleared: 'History cleared',
    today: 'Today',
    daysLeft: 'days left',
    dayLeft: 'day left',
    eventReminder: 'Event Reminder',
    newEventAdded: 'New Event Added',
    update: 'Update',
    newVersion: 'New version available!',
    listedTasks: 'Listed Tasks',
    addTask: 'Add Task',
    taskPlaceholder: 'Enter a task...',
    taskDeleted: 'Task deleted'
  },
  af: {
    homeworkNotes: 'Huiswerk Notas',
    notesHistory: 'Notas Geskiedenis',
    exportData: 'Voer Data Uit',
    clearHistory: 'Maak Geskiedenis Skoon',
    enableNotifications: 'Aktiveer Kennisgewings',
    noSavedNotes: 'Nog geen gestoorde notas nie',
    noEventsToday: 'Geen gebeurtenisse vandag nie',
    selectLanguage: 'Kies Taal',
    chooseLanguage: 'Kies jou voorkeurtaal',
    selectSubjects: 'Kies Jou 7 Vakke',
    chooseSubjects: 'Kies presies 7 vakke uit die lys hieronder',
    subjectsSelected: 'vakke gekies',
    confirm: 'Bevestig',
    save: 'Stoor',
    delete: 'Vee uit',
    finish: 'Klaar',
    finished: 'Klaar',
    done: 'Klaar',
    addSubject: 'Voeg Vak By',
    maxSubjects: 'Maksimum 7 vakke toegelaat',
    subjectDeleted: 'Vak uitgevee',
    cannotDelete: 'Kan nie laaste vak uitvee nie',
    saved: 'Gestoor',
    newDay: 'Nuwe dag! Notas is geargiveer',
    finishConfirm: 'Merk {subject} as klaar? Dit sal jou notas stoor.',
    addNotesFirst: 'Voeg notas by voordat jy as klaar merk!',
    greatJob: 'Goed gedoen! Vak as klaar gemerk!',
    notificationsEnabled: 'Kennisgewings geaktiveer!',
    notificationDenied: 'Kennisgewing toestemming geweier',
    dataExported: 'Data suksesvol uitgevoer',
    historyCleared: 'Geskiedenis skoongemaak',
    today: 'Vandag',
    daysLeft: 'dae oor',
    dayLeft: 'dag oor',
    eventReminder: 'Gebeurtenis Herinnering',
    newEventAdded: 'Nuwe Gebeurtenis Bygevoeg',
    update: 'Opdateer',
    newVersion: 'Nuwe weergawe beskikbaar!',
    listedTasks: 'Lys Take',
    addTask: 'Voeg Taak By',
    taskPlaceholder: 'Voer \'n taak in...',
    taskDeleted: 'Taak uitgevee'
  },
  es: {
    homeworkNotes: 'Notas de Tarea',
    notesHistory: 'Historial de Notas',
    exportData: 'Exportar Datos',
    clearHistory: 'Borrar Historial',
    enableNotifications: 'Activar Notificaciones',
    noSavedNotes: 'Aún no hay notas guardadas',
    noEventsToday: 'No hay eventos hoy',
    selectLanguage: 'Seleccionar Idioma',
    chooseLanguage: 'Elige tu idioma preferido',
    selectSubjects: 'Selecciona Tus 7 Asignaturas',
    chooseSubjects: 'Elige exactamente 7 asignaturas de la lista',
    subjectsSelected: 'asignaturas seleccionadas',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    finish: 'Terminar',
    finished: 'Terminado',
    done: 'Hecho',
    addSubject: 'Añadir Asignatura',
    maxSubjects: 'Máximo 7 asignaturas permitidas',
    subjectDeleted: 'Asignatura eliminada',
    cannotDelete: 'No se puede eliminar la última asignatura',
    saved: 'Guardado',
    newDay: '¡Nuevo día! Las notas han sido archivadas',
    finishConfirm: '¿Marcar {subject} como terminado? Esto guardará tus notas.',
    addNotesFirst: '¡Añade notas antes de marcar como terminado!',
    greatJob: '¡Buen trabajo! ¡Asignatura marcada como terminada!',
    notificationsEnabled: '¡Notificaciones activadas!',
    notificationDenied: 'Permiso de notificación denegado',
    dataExported: 'Datos exportados exitosamente',
    historyCleared: 'Historial borrado',
    today: 'Hoy',
    daysLeft: 'días restantes',
    dayLeft: 'día restante',
    eventReminder: 'Recordatorio de Evento',
    newEventAdded: 'Nuevo Evento Añadido',
    update: 'Actualizar',
    newVersion: '¡Nueva versión disponible!',
    listedTasks: 'Tareas Listadas',
    addTask: 'Añadir Tarea',
    taskPlaceholder: 'Introduce una tarea...',
    taskDeleted: 'Tarea eliminada'
  },
  nl: {
    homeworkNotes: 'Huiswerk Notities',
    notesHistory: 'Notities Geschiedenis',
    exportData: 'Data Exporteren',
    clearHistory: 'Geschiedenis Wissen',
    enableNotifications: 'Meldingen Inschakelen',
    noSavedNotes: 'Nog geen opgeslagen notities',
    noEventsToday: 'Geen evenementen vandaag',
    selectLanguage: 'Taal Selecteren',
    chooseLanguage: 'Kies je voorkeurstaal',
    selectSubjects: 'Selecteer Je 7 Vakken',
    chooseSubjects: 'Kies precies 7 vakken uit de lijst',
    subjectsSelected: 'vakken geselecteerd',
    confirm: 'Bevestigen',
    save: 'Opslaan',
    delete: 'Verwijderen',
    finish: 'Afronden',
    finished: 'Afgerond',
    done: 'Klaar',
    addSubject: 'Vak Toevoegen',
    maxSubjects: 'Maximum 7 vakken toegestaan',
    subjectDeleted: 'Vak verwijderd',
    cannotDelete: 'Kan laatste vak niet verwijderen',
    saved: 'Opgeslagen',
    newDay: 'Nieuwe dag! Notities zijn gearchiveerd',
    finishConfirm: '{subject} markeren als afgerond? Dit slaat je notities op.',
    addNotesFirst: 'Voeg notities toe voordat je als afgerond markeert!',
    greatJob: 'Goed gedaan! Vak gemarkeerd als afgerond!',
    notificationsEnabled: 'Meldingen ingeschakeld!',
    notificationDenied: 'Melding toestemming geweigerd',
    dataExported: 'Data succesvol geëxporteerd',
    historyCleared: 'Geschiedenis gewist',
    today: 'Vandaag',
    daysLeft: 'dagen resterend',
    dayLeft: 'dag resterend',
    eventReminder: 'Evenement Herinnering',
    newEventAdded: 'Nieuw Evenement Toegevoegd',
    update: 'Bijwerken',
    newVersion: 'Nieuwe versie beschikbaar!',
    listedTasks: 'Gelijste Taken',
    addTask: 'Taak Toevoegen',
    taskPlaceholder: 'Voer een taak in...',
    taskDeleted: 'Taak verwijderd'
  },
  st: {
    homeworkNotes: 'Lintlha tsa Mosebetsi oa Lehae',
    notesHistory: 'Nalane ya Lintlha',
    exportData: 'Romella Data',
    clearHistory: 'Hlakola Nalane',
    enableNotifications: 'Bahela Tsebiso',
    noSavedNotes: 'Ha ho lintlha tse bolokilweng',
    noEventsToday: 'Ha ho mehlolo kajeno',
    selectLanguage: 'Khetha Puo',
    chooseLanguage: 'Khetha puo eo o e ratang',
    selectSubjects: 'Khetha Likhaolo tsa hao tse 7',
    chooseSubjects: 'Khetha likhaolo tse 7 feela ho tswa lenaneng',
    subjectsSelected: 'likhaolo tse khethilweng',
    confirm: 'Netefatsa',
    save: 'Boloka',
    delete: 'Hlakola',
    finish: 'Qetella',
    finished: 'Qetilwe',
    done: 'Etswe',
    addSubject: 'Kenya Khaolo',
    maxSubjects: 'Likhaolo tse 7 feela tse lumelloang',
    subjectDeleted: 'Khaolo e hlakotswe',
    cannotDelete: 'E ka se hlakole khaolo ea ho qetela',
    saved: 'E bolokilwe',
    newDay: "Letsatsi le lecha! Lintlha li bolokilwe",
    finishConfirm: 'Marka {subject} e qetilwe? E tla boloka lintlha tsa hao.',
    addNotesFirst: 'Kenya lintlha pele o marka e qetilwe!',
    greatJob: 'Mosebetsi o motle! Khaolo e markilwe e qetilwe!',
    notificationsEnabled: 'Tsebiso e bahetswe!',
    notificationDenied: 'Tumello ea tsebiso e hanoetse',
    dataExported: 'Data e rometswe ka katleho',
    historyCleared: 'Nalane e hlakotswe',
    today: 'Kajeno',
    daysLeft: 'matsatsi a setseng',
    dayLeft: 'letsatsi le setseng',
    eventReminder: 'Tsebiso ea Mohlolo',
    newEventAdded: 'Mohlolo o Montšha o Kenyelletswe',
    update: 'Ntlafatsa',
    newVersion: 'Mofuta o mocha o fumaneha!',
    listedTasks: 'Litebelelo tse Behilweng',
    addTask: 'Kenya Tlhahiso',
    taskPlaceholder: 'Kenya tlhahiso...',
    taskDeleted: 'Tlhahiso e hlakotswe'
  },
  fr: {
    homeworkNotes: 'Notes de Devoirs',
    notesHistory: 'Historique des Notes',
    exportData: 'Exporter les Données',
    clearHistory: "Effacer l'Historique",
    enableNotifications: 'Activer les Notifications',
    noSavedNotes: 'Aucune note enregistrée',
    noEventsToday: "Aucun événement aujourd'hui",
    selectLanguage: 'Choisir la Langue',
    chooseLanguage: 'Choisissez votre langue préférée',
    selectSubjects: 'Sélectionnez Vos 7 Matières',
    chooseSubjects: 'Choisissez exactement 7 matières dans la liste',
    subjectsSelected: 'matières sélectionnées',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    delete: 'Supprimer',
    finish: 'Terminer',
    finished: 'Terminé',
    done: 'Fait',
    addSubject: 'Ajouter une Matière',
    maxSubjects: 'Maximum 7 matières autorisées',
    subjectDeleted: 'Matière supprimée',
    cannotDelete: 'Impossible de supprimer la dernière matière',
    saved: 'Enregistré',
    newDay: 'Nouveau jour ! Les notes ont été archivées',
    finishConfirm: 'Marquer {subject} comme terminé ? Cela enregistrera vos notes.',
    addNotesFirst: 'Ajoutez des notes avant de marquer comme terminé !',
    greatJob: 'Bon travail ! Matière marquée comme terminée !',
    notificationsEnabled: 'Notifications activées !',
    notificationDenied: 'Permission de notification refusée',
    dataExported: 'Données exportées avec succès',
    historyCleared: 'Historique effacé',
    today: "Aujourd'hui",
    daysLeft: 'jours restants',
    dayLeft: 'jour restant',
    eventReminder: 'Rappel Événement',
    newEventAdded: 'Nouvel Événement Ajouté',
    update: 'Mettre à jour',
    newVersion: 'Nouvelle version disponible !',
    listedTasks: 'Tâches Listées',
    addTask: 'Ajouter une Tâche',
    taskPlaceholder: 'Entrez une tâche...',
    taskDeleted: 'Tâche supprimée'
  },
  it: {
    homeworkNotes: 'Note dei Compiti',
    notesHistory: 'Cronologia Note',
    exportData: 'Esporta Dati',
    clearHistory: 'Cancella Cronologia',
    enableNotifications: 'Abilita Notifiche',
    noSavedNotes: 'Nessuna nota salvata',
    noEventsToday: 'Nessun evento oggi',
    selectLanguage: 'Seleziona Lingua',
    chooseLanguage: 'Scegli la tua lingua preferita',
    selectSubjects: 'Seleziona le Tue 7 Materie',
    chooseSubjects: 'Scegli esattamente 7 materie dalla lista',
    subjectsSelected: 'materie selezionate',
    confirm: 'Conferma',
    save: 'Salva',
    delete: 'Elimina',
    finish: 'Termina',
    finished: 'Terminato',
    done: 'Fatto',
    addSubject: 'Aggiungi Materia',
    maxSubjects: 'Massimo 7 materie consentite',
    subjectDeleted: 'Materia eliminata',
    cannotDelete: 'Impossibile eliminare l\'ultima materia',
    saved: 'Salvato',
    newDay: 'Nuovo giorno! Le note sono state archiviate',
    finishConfirm: 'Contrassegnare {subject} come terminato? Questo salverà le tue note.',
    addNotesFirst: 'Aggiungi note prima di contrassegnare come terminato!',
    greatJob: 'Ottimo lavoro! Materia contrassegnata come terminata!',
    notificationsEnabled: 'Notifiche abilitate!',
    notificationDenied: 'Permesso notifica negato',
    dataExported: 'Dati esportati con successo',
    historyCleared: 'Cronologia cancellata',
    today: 'Oggi',
    daysLeft: 'giorni rimasti',
    dayLeft: 'giorno rimasto',
    eventReminder: 'Promemoria Evento',
    newEventAdded: 'Nuovo Evento Aggiunto',
    update: 'Aggiorna',
    newVersion: 'Nuova versione disponibile!',
    listedTasks: 'Attività Elencate',
    addTask: 'Aggiungi Attività',
    taskPlaceholder: 'Inserisci un\'attività...',
    taskDeleted: 'Attività eliminata'
  },
  ja: {
    homeworkNotes: '宿題ノート',
    notesHistory: 'ノート履歴',
    exportData: 'データをエクスポート',
    clearHistory: '履歴をクリア',
    enableNotifications: '通知を有効化',
    noSavedNotes: '保存されたノートはありません',
    noEventsToday: '今日のイベントはありません',
    selectLanguage: '言語を選択',
    chooseLanguage: '優先言語を選択してください',
    selectSubjects: '7科目を選択',
    chooseSubjects: 'リストから正確に7科目を選択してください',
    subjectsSelected: '科目選択済み',
    confirm: '確認',
    save: '保存',
    delete: '削除',
    finish: '完了',
    finished: '完了済み',
    done: '完了',
    addSubject: '科目を追加',
    maxSubjects: '最大7科目まで',
    subjectDeleted: '科目を削除しました',
    cannotDelete: '最後の科目は削除できません',
    saved: '保存済み',
    newDay: '新しい日！ノートがアーカイブされました',
    finishConfirm: '{subject}を完了としてマークしますか？これによりノートが保存されます。',
    addNotesFirst: '完了としてマークする前にノートを追加してください！',
    greatJob: 'よくできました！科目が完了としてマークされました！',
    notificationsEnabled: '通知が有効になりました！',
    notificationDenied: '通知の許可が拒否されました',
    dataExported: 'データのエクスポートに成功しました',
    historyCleared: '履歴をクリアしました',
    today: '今日',
    daysLeft: '日残り',
    dayLeft: '日残り',
    eventReminder: 'イベントリマインダー',
    newEventAdded: '新しいイベントが追加されました',
    update: '更新',
    newVersion: '新しいバージョンが利用可能です！',
    listedTasks: 'リストされたタスク',
    addTask: 'タスクを追加',
    taskPlaceholder: 'タスクを入力...',
    taskDeleted: 'タスクを削除しました'
  },
  zh: {
    homeworkNotes: '作业笔记',
    notesHistory: '笔记历史',
    exportData: '导出数据',
    clearHistory: '清除历史',
    enableNotifications: '启用通知',
    noSavedNotes: '暂无保存的笔记',
    noEventsToday: '今天没有事件',
    selectLanguage: '选择语言',
    chooseLanguage: '选择您的首选语言',
    selectSubjects: '选择您的7个科目',
    chooseSubjects: '从列表中恰好选择7个科目',
    subjectsSelected: '个科目已选择',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    finish: '完成',
    finished: '已完成',
    done: '完成',
    addSubject: '添加科目',
    maxSubjects: '最多允许7个科目',
    subjectDeleted: '科目已删除',
    cannotDelete: '无法删除最后一个科目',
    saved: '已保存',
    newDay: '新的一天！笔记已归档',
    finishConfirm: '将{subject}标记为完成？这将保存您的笔记。',
    addNotesFirst: '在标记为完成之前先添加一些笔记！',
    greatJob: '干得好！科目已标记为完成！',
    notificationsEnabled: '通知已启用！',
    notificationDenied: '通知权限被拒绝',
    dataExported: '数据导出成功',
    historyCleared: '历史已清除',
    today: '今天',
    daysLeft: '天后',
    dayLeft: '天后',
    eventReminder: '事件提醒',
    newEventAdded: '新事件已添加',
    update: '更新',
    newVersion: '新版本可用！',
    listedTasks: '列出的任务',
    addTask: '添加任务',
    taskPlaceholder: '输入任务...',
    taskDeleted: '任务已删除'
  }
};

const AVAILABLE_SUBJECTS = [
  'Maths', 'Math Lit', 'Science', 'Biology', 'English', 'Afrikaans',
  'CAT', 'IT', 'EGD', 'Accounting', 'Business', 'Life Orientation',
  'Hospitality', 'Tourism', 'History'
];

class AppState {
  constructor() {
    this.subjects = [];
    this.events = new Map();
    this.currentDate = new Date();
    this.deferredPrompt = null;
    this.subjectsSelected = false;
    this.notificationsEnabled = false;
    this.finishedSubjects = new Set();
    this.currentLanguage = 'en';
    this.languageSelected = false;
    this.listedTasks = [];
  }

  async init() {
    await this.loadData();
    this.requestNotificationPermission();
    this.cleanupOldNotificationFlags();
    this.loadFinishedSubjects();
    this.loadListedTasks();
    return this;
  }

  async loadData() {
    this.subjectsSelected = localStorage.getItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED) === 'true';
    this.notificationsEnabled = localStorage.getItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS_ENABLED) === 'true';
    this.languageSelected = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE_SELECTED) === 'true';
    this.currentLanguage = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || 'en';

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

  loadListedTasks() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LISTED_TASKS);
    if (saved) {
      this.listedTasks = JSON.parse(saved);
    }
  }

  saveListedTasks() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.LISTED_TASKS, JSON.stringify(this.listedTasks));
  }

  addListedTask(text) {
    const task = {
      id: `task-${Date.now()}`,
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.listedTasks.push(task);
    this.saveListedTasks();
    return task;
  }

  updateListedTask(id, updates) {
    const task = this.listedTasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.saveListedTasks();
    }
  }

  deleteListedTask(id) {
    this.listedTasks = this.listedTasks.filter(t => t.id !== id);
    this.saveListedTasks();
  }

  loadFinishedSubjects() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.FINISHED_SUBJECTS);
    if (saved) {
      const data = JSON.parse(saved);
      this.finishedSubjects = new Set(data.subjects || []);
    }
  }

  saveFinishedSubjects() {
    const data = {
      subjects: Array.from(this.finishedSubjects)
    };
    localStorage.setItem(CONFIG.STORAGE_KEYS.FINISHED_SUBJECTS, JSON.stringify(data));
  }

  markSubjectFinished(subjectId) {
    this.finishedSubjects.add(subjectId);
    this.saveFinishedSubjects();
    this.archiveSubjectNotes(subjectId);

    const subject = this.subjects.find(s => s.id === subjectId);
    if (subject) {
      subject.finished = true;
      subject.finishedAt = new Date().toISOString();
      this.saveSubjects();
    }
  }

  unfinishSubject(subjectId) {
    this.finishedSubjects.delete(subjectId);
    this.saveFinishedSubjects();
    const subject = this.subjects.find(s => s.id === subjectId);
    if (subject) {
      subject.finished = false;
      delete subject.finishedAt;
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
      lastModified: null,
      finished: false
    }));
    this.saveSubjects();
  }

  setSelectedSubjects(selectedNames) {
    this.subjects = selectedNames.map((name, index) => ({
      id: `subject-${Date.now()}-${index}`,
      name: name,
      notes: '',
      saved: false,
      lastModified: null,
      finished: false
    }));
    this.subjectsSelected = true;
    localStorage.setItem(CONFIG.STORAGE_KEYS.SUBJECTS_SELECTED, 'true');
    this.saveSubjects();
  }

  setLanguage(langCode) {
    if (CONFIG.LANGUAGES[langCode]) {
      this.currentLanguage = langCode;
      localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, langCode);
      localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE_SELECTED, 'true');
      this.languageSelected = true;
      return true;
    }
    return false;
  }

  t(key, replacements = {}) {
    const translation = TRANSLATIONS[this.currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
    return translation.replace(/\{(\w+)\}/g, (match, key) => replacements[key] || match);
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
      this.showToast(this.t('notificationDenied'), 'error');
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      this.notificationsEnabled = true;
      localStorage.setItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS_ENABLED, 'true');
      this.showToast(this.t('notificationsEnabled'), 'success');
      this.sendReminderNotifications();
      return true;
    } else {
      this.showToast(this.t('notificationDenied'), 'error');
      return false;
    }
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
        const title = `🗓️ ${this.t('eventReminder')}`;
        const body = `${event.title} - ${event.daysRemaining} ${event.daysRemaining !== 1 ? this.t('daysLeft') : this.t('dayLeft')}!`;
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
      settingsDialog: document.getElementById('settings-dialog'),
      savedNotes: document.getElementById('saved-notes'),
      eventReminders: document.getElementById('event-reminders'),
      remindersContent: document.querySelector('.reminders-content'),
      installBtn: document.getElementById('install-btn'),
      listedTasksContainer: document.getElementById('listed-tasks-container'),
      taskCounter: document.querySelector('.task-counter')
    };
  }

  init() {
    this.renderDate();
    this.initTheme();
    this.updatePageLanguage();
    this.renderEventReminders();
    this.checkAndNotifyUpcomingEvents();

    if (!this.state.languageSelected) {
      this.showLanguagePicker();
    } else if (!this.state.subjectsSelected || this.state.subjects.length === 0) {
      this.showSubjectPicker();
    } else {
      this.renderSubjects();
      this.renderListedTasks();
    }

    this.attachEventListeners();
    this.state.sendReminderNotifications();

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.idleInitialization());
    }
  }

  updatePageLanguage() {
    document.documentElement.lang = this.state.currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.state.t(key);
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.placeholder = this.state.t(key);
      }
    });
  }

  showLanguagePicker() {
    const overlay = document.createElement('div');
    overlay.className = 'language-picker-overlay';
    overlay.innerHTML = `
      <div class="language-picker-modal">
        <div class="language-header">
          <h2>${this.state.t('selectLanguage')}</h2>
          <p>${this.state.t('chooseLanguage')}</p>
        </div>
        <div class="language-grid">
          ${Object.entries(CONFIG.LANGUAGES).map(([code, lang]) => `
            <div class="language-option" data-lang="${code}">
              <span class="language-flag">${lang.flag}</span>
              <span class="language-name">${lang.name}</span>
              <span class="language-native">${lang.native}</span>
            </div>
          `).join('')}
        </div>
        <div class="language-actions">
          <button id="confirm-language" class="btn-primary" disabled>
            ${this.state.t('confirm')}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    let selectedLang = null;
    const options = overlay.querySelectorAll('.language-option');
    const confirmBtn = overlay.querySelector('#confirm-language');

    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        selectedLang = option.dataset.lang;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      if (selectedLang) {
        this.state.setLanguage(selectedLang);
        overlay.remove();
        this.updatePageLanguage();
        this.showSubjectPicker();
      }
    });
  }

  checkAndNotifyUpcomingEvents() {
    if (!this.state.notificationsEnabled || !('Notification' in window)) return;

    const upcoming = this.state.getUpcomingEvents();
    const twoDaysAway = upcoming.filter(event => event.daysRemaining === 2);

    twoDaysAway.forEach(event => {
      const notifiedKey = `notified-${event.id}`;
      if (localStorage.getItem(notifiedKey)) return;

      new Notification(`📅 ${this.state.t('eventReminder')}`, {
        body: `${event.title} - 2 ${this.state.t('daysLeft')}`,
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

    if (!remindersBar || !content) return;

    if (upcoming.length === 0) {
      remindersBar.classList.add('hidden');
      return;
    }

    remindersBar.classList.remove('hidden');
    content.innerHTML = upcoming.map(event => {
      const isUrgent = event.daysRemaining <= 2;
      const daysText = event.daysRemaining === 0 ? this.state.t('today') + '!' : 
                       event.daysRemaining === 1 ? `1 ${this.state.t('dayLeft')}` : 
                       `${event.daysRemaining} ${this.state.t('daysLeft')}`;

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
          <h2>${this.state.t('selectSubjects')}</h2>
        </div>
        <div class="picker-instructions">
          <p>${this.state.t('chooseSubjects')}</p>
          <span class="selection-count">0/${CONFIG.MAX_SUBJECTS} ${this.state.t('subjectsSelected')}</span>
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
            ${this.state.t('confirm')}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(picker);

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
            this.state.showToast(this.state.t('maxSubjects'), 'error');
            return;
          }
          selectedCount++;
          label.classList.add('selected');
        } else {
          selectedCount--;
          label.classList.remove('selected');
        }
        countDisplay.textContent = `${selectedCount}/${CONFIG.MAX_SUBJECTS} ${this.state.t('subjectsSelected')}`;
        confirmBtn.disabled = selectedCount !== CONFIG.MAX_SUBJECTS;
      });
    });

    confirmBtn.addEventListener('click', () => {
      const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
      this.state.setSelectedSubjects(selected);
      picker.remove();
      this.renderSubjects();
      this.renderListedTasks();
      this.state.showToast(this.state.t('saved'), 'success');
    });
  }

  idleInitialization() {
    this.preloadResources();
    this.setupPeriodicSync();
  }

  preloadResources() {
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
    try {
      const weekday = now.toLocaleDateString(this.state.currentLanguage, { weekday: 'long' });
      const day = now.toLocaleDateString(this.state.currentLanguage, { day: 'numeric' });
      const month = now.toLocaleDateString(this.state.currentLanguage, { month: 'long' });
      this.elements.dateDisplay.innerHTML = `<span class="weekday">${weekday}</span><span class="date">${day} ${month}</span>`;
    } catch (e) {
      const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
      const day = now.toLocaleDateString(undefined, { day: 'numeric' });
      const month = now.toLocaleDateString(undefined, { month: 'long' });
      this.elements.dateDisplay.innerHTML = `<span class="weekday">${weekday}</span><span class="date">${day} ${month}</span>`;
    }
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
    card.dataset.index = index;

    card.innerHTML = `
      <input type="text" class="subject-input" placeholder="${this.state.t('addSubject')}" value="${subject.name}" aria-label="${this.state.t('addSubject')}" readonly>
      <textarea class="notes-textarea" placeholder="${this.state.t('addNotesFirst')}" aria-label="${this.state.t('addNotesFirst')} ${subject.name}">${subject.notes}</textarea>
      <div class="card-actions">
        ${isFinished ? `
          <button class="btn-icon unfinish" aria-label="Unfinish" title="Mark as not finished"><i class="fa-solid fa-rotate-left"></i></button>
          <span class="finished-badge"><i class="fa-solid fa-check-circle"></i> ${this.state.t('done')}</span>
        ` : `
          <button class="btn-icon delete" aria-label="${this.state.t('delete')}" title="${this.state.t('delete')}"><i class="fa-solid fa-trash"></i></button>
          <button class="btn-icon save" aria-label="${this.state.t('save')}" title="${this.state.t('save')}"><i class="fa-solid fa-check"></i></button>
          <button class="btn-icon finish" aria-label="${this.state.t('finish')}" title="${this.state.t('finish')}"><i class="fa-solid fa-flag-checkered"></i></button>
        `}
      </div>
    `;

    const textarea = card.querySelector('.notes-textarea');

    let debounceTimer;
    const autoSave = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.saveSubject(index, subject.name, textarea.value);
      }, 1000);
    };

    textarea.addEventListener('input', autoSave);

    if (isFinished) {
      const unfinishBtn = card.querySelector('.btn-icon.unfinish');
      unfinishBtn.addEventListener('click', () => {
        this.state.unfinishSubject(subject.id);
        this.renderSubjects();
        this.updateSubjectCounter();
        setTimeout(() => {
          const newCard = this.elements.subjectsContainer.children[index];
          if (newCard) {
            newCard.querySelector('.notes-textarea').focus();
          }
        }, 100);
      });
    } else {
      const saveBtn = card.querySelector('.btn-icon.save');
      const deleteBtn = card.querySelector('.btn-icon.delete');
      const finishBtn = card.querySelector('.btn-icon.finish');

      saveBtn.addEventListener('click', () => {
        this.saveSubject(index, subject.name, textarea.value, true);
        card.classList.add('saved');
        setTimeout(() => card.classList.remove('saved'), 2000);
      });

      deleteBtn.addEventListener('click', () => {
        if (confirm(this.state.t('finishConfirm', { subject: subject.name }))) {
          this.deleteSubject(index);
        }
      });

      finishBtn.addEventListener('click', () => {
        if (!textarea.value.trim()) {
          this.state.showToast(this.state.t('addNotesFirst'), 'error');
          return;
        }
        this.finishSubject(subject.id, index);
      });
    }

    return card;
  }

  finishSubject(subjectId, index) {
    this.state.markSubjectFinished(subjectId);
    this.state.showToast(this.state.t('greatJob'), 'success');

    const nextIndex = this.findNextUnfinishedSubject(index);
    if (nextIndex !== -1) {
      setTimeout(() => {
        const nextCard = this.elements.subjectsContainer.children[nextIndex];
        if (nextCard) {
          nextCard.classList.add('focus-next');
          const textarea = nextCard.querySelector('.notes-textarea');
          textarea.focus();
          textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => nextCard.classList.remove('focus-next'), 1000);
        }
      }, 300);
    }

    this.renderSubjects();
    this.updateSubjectCounter();
  }

  findNextUnfinishedSubject(currentIndex) {
    for (let i = currentIndex + 1; i < this.state.subjects.length; i++) {
      if (!this.state.isSubjectFinished(this.state.subjects[i].id)) {
        return i;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (!this.state.isSubjectFinished(this.state.subjects[i].id)) {
        return i;
      }
    }
    if (!this.state.isSubjectFinished(this.state.subjects[currentIndex].id)) {
      return currentIndex;
    }
    return -1;
  }

  saveSubject(index, name, notes, manual = false) {
    this.state.subjects[index].name = name;
    this.state.subjects[index].notes = notes;
    this.state.subjects[index].lastModified = new Date().toISOString();
    if (manual) {
      this.state.subjects[index].saved = true;
      this.state.showToast(`${this.state.t('saved')}: ${name || 'Untitled'}`, 'success');
    }
    this.state.saveSubjects();
  }

  deleteSubject(index) {
    if (this.state.subjects.length <= 1) {
      this.state.showToast(this.state.t('cannotDelete'), 'error');
      return;
    }
    this.state.subjects.splice(index, 1);
    this.state.saveSubjects();
    this.renderSubjects();
    this.updateSubjectCounter();
    this.state.showToast(this.state.t('subjectDeleted'), 'info');
  }

  addSubject() {
    if (this.state.subjects.length >= CONFIG.MAX_SUBJECTS) {
      this.state.showToast(this.state.t('maxSubjects'), 'error');
      return;
    }
    const available = AVAILABLE_SUBJECTS.filter(sub => !this.state.subjects.some(s => s.name === sub));
    if (available.length === 0) {
      this.state.showToast(this.state.t('maxSubjects'), 'error');
      return;
    }

    const picker = document.createElement('dialog');
    picker.className = 'modal';
    picker.innerHTML = `
      <div class="modal-content">
        <div class="modal-header"><h2>${this.state.t('addSubject')}</h2><button class="close-btn" onclick="this.closest('dialog').close()"><i class="fa-solid fa-xmark"></i></button></div>
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
        lastModified: null,
        finished: false
      };
      this.state.subjects.push(newSubject);
      this.state.saveSubjects();
      this.renderSubjects();
      picker.close();
      picker.remove();
      delete window.selectSubjectToAdd;
      const cards = this.elements.subjectsContainer.querySelectorAll('.subject-card');
      cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.state.showToast(`${this.state.t('addSubject')}: ${subjectName}`, 'success');
    };
  }

  updateSubjectCounter() {
    const finishedCount = this.state.finishedSubjects.size;
    const total = this.state.subjects.length;
    this.elements.subjectCounter.textContent = `${finishedCount}/${total} ${this.state.t('finished')} • ${total}/${CONFIG.MAX_SUBJECTS} ${this.state.t('subjectsSelected')}`;
  }

  renderListedTasks() {
    const container = this.elements.listedTasksContainer;
    const counter = this.elements.taskCounter;
    if (!container) return;

    container.innerHTML = '';

    if (this.state.listedTasks.length === 0) {
      container.innerHTML = `<p class="empty-state" style="color: var(--color-text-secondary); font-style: italic; padding: var(--space-md);">No tasks yet. Add one below!</p>`;
    } else {
      this.state.listedTasks.forEach(task => {
        const taskCard = this.createListedTaskCard(task);
        container.appendChild(taskCard);
      });
    }

    if (counter) {
      const completed = this.state.listedTasks.filter(t => t.completed).length;
      const total = this.state.listedTasks.length;
      counter.textContent = `${completed}/${total} done`;
    }
  }

  createListedTaskCard(task) {
    const card = document.createElement('div');
    card.className = `listed-task-card ${task.completed ? 'completed' : ''}`;
    card.dataset.id = task.id;

    card.innerHTML = `
      <div class="task-checkbox ${task.completed ? 'checked' : ''}" role="button" tabindex="0" aria-label="Toggle task completion">
        ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}
      </div>
      <div class="task-input-wrapper">
        <textarea class="task-input" placeholder="${this.state.t('taskPlaceholder')}" rows="1">${task.text}</textarea>
      </div>
      <button class="task-delete-btn" aria-label="${this.state.t('delete')}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    const checkbox = card.querySelector('.task-checkbox');
    const input = card.querySelector('.task-input');
    const deleteBtn = card.querySelector('.task-delete-btn');

    const toggleComplete = () => {
      const newStatus = !task.completed;
      this.state.updateListedTask(task.id, { completed: newStatus });
      this.renderListedTasks();
    };

    checkbox.addEventListener('click', toggleComplete);
    checkbox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleComplete();
      }
    });

    const autoResize = () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    };

    input.addEventListener('input', () => {
      autoResize();
      this.state.updateListedTask(task.id, { text: input.value });
    });

    setTimeout(autoResize, 0);

    deleteBtn.addEventListener('click', () => {
      this.state.deleteListedTask(task.id);
      this.renderListedTasks();
      this.state.showToast(this.state.t('taskDeleted'), 'info');
    });

    return card;
  }

  addListedTask() {
    const task = this.state.addListedTask('');
    this.renderListedTasks();
    setTimeout(() => {
      const cards = this.elements.listedTasksContainer.querySelectorAll('.listed-task-card');
      const newCard = cards[cards.length - 1];
      if (newCard) {
        const input = newCard.querySelector('.task-input');
        input.focus();
      }
    }, 100);
  }

  renderHistory() {
    const container = this.elements.savedNotes;
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES)) || [];
    if (history.length === 0) {
      container.innerHTML = `<p class="empty-state">${this.state.t('noSavedNotes')}</p>`;
      return;
    }
    const sorted = history.sort((a, b) => new Date(b.archivedAt) - new Date(a.archivedAt));
    container.innerHTML = sorted.map(entry => `
      <div class="history-item ${entry.status === 'finished' ? 'finished' : ''}">
        <div class="date">${new Date(entry.date).toLocaleDateString(this.state.currentLanguage)}</div>
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
      listedTasks: this.state.listedTasks,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homework-book-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.state.showToast(this.state.t('dataExported'), 'success');
  }

  clearHistory() {
    if (!confirm(this.state.t('clearHistory') + '?')) return;
    localStorage.removeItem(CONFIG.STORAGE_KEYS.NOTES);
    this.renderHistory();
    this.state.showToast(this.state.t('historyCleared'), 'info');
  }

  initTheme() {
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

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        if (themeToggle) {
          themeToggle.classList.toggle('dark-mode', newTheme === 'dark');
        }
      }
    });
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    const themeToggle = document.getElementById('theme-toggle');

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, next);

    if (themeToggle) {
      themeToggle.classList.toggle('dark-mode', next === 'dark');
    }
  }

  attachEventListeners() {
    document.getElementById('calendar-toggle').addEventListener('click', () => {
      window.location.href = 'events.html';
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

    document.getElementById('add-subject').addEventListener('click', () => this.addSubject());
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

    const addTaskBtn = document.getElementById('add-listed-task');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => this.addListedTask());
    }

    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', () => {
        this.showLanguagePicker();
      });
    }

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

    this.elements.settingsDialog.addEventListener('click', (e) => {
      if (e.target === this.elements.settingsDialog) this.elements.settingsDialog.close();
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
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.renderDate();
        this.renderEventReminders();
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  const state = await new AppState().init();
  const ui = new UIController(state);
  ui.init();

  window.homeworkApp = { state, ui };
});