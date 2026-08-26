let currentContext = {};
let activeChecklistId = null;
let currentView = 'menu';
let previousView = 'menu';

let listCompletionState = {}; 
let taskCompletionState = {}; 

function getContext() {
    return {
        tramType: document.getElementById('tramType').value,
        startDepot: document.getElementById('startDepot').value,
        endDepot: document.getElementById('endDepot').value
    };
}

window.updateFilters = function() {
    currentContext = getContext();
    if (currentView === 'menu') renderMenu();
    else if (currentView === 'checklist') openChecklist(activeChecklistId, true);
};

window.showMenu = function() {
    currentView = 'menu';
    document.getElementById('view-menu').classList.add('active');
    document.getElementById('view-locations').classList.remove('active');
    document.getElementById('view-checklist').classList.remove('active');
    document.getElementById('view-map').classList.remove('active'); // NEU

    document.getElementById('btnNavMenu').classList.add('active');
    document.getElementById('btnNavLocations').classList.remove('active');
    document.getElementById('btnNavMap').classList.remove('active'); // NEU
    
    document.getElementById('fabBack').style.display = 'none';
    renderMenu();
    window.scrollTo(0, 0);
};

window.showLocations = function() {
    currentView = 'locations';
    document.getElementById('view-locations').classList.add('active');
    document.getElementById('view-menu').classList.remove('active');
    document.getElementById('view-checklist').classList.remove('active');
    document.getElementById('view-map').classList.remove('active'); // NEU

    document.getElementById('btnNavLocations').classList.add('active');
    document.getElementById('btnNavMenu').classList.remove('active');
    document.getElementById('btnNavMap').classList.remove('active'); // NEU
    
    document.getElementById('fabBack').style.display = 'none';
    renderLocations();
    window.scrollTo(0, 0);
};

// NEUE FUNKTION FÜR DIE KARTE
window.showMap = function() {
    currentView = 'map';
    document.getElementById('view-map').classList.add('active');
    document.getElementById('view-menu').classList.remove('active');
    document.getElementById('view-locations').classList.remove('active');
    document.getElementById('view-checklist').classList.remove('active');

    document.getElementById('btnNavMap').classList.add('active');
    document.getElementById('btnNavMenu').classList.remove('active');
    document.getElementById('btnNavLocations').classList.remove('active');
    
    document.getElementById('fabBack').style.display = 'none';
    
    // Initialisiert die Karte nur beim allerersten Aufruf, 
    // um Datenvolumen und Ladezeit zu sparen!
    if (!window.mapInitialized) {
        window.initMap();
    }
    window.scrollTo(0, 0);
};

window.goBack = function() {
    if (previousView === 'locations') showLocations();
    else showMenu();
};

function renderMenu() {
    const container = document.getElementById('menuContainer');
    container.innerHTML = ''; 
    const lists = window.checklistsData.filter(l => l.type === 'standard' && l.applicableTypes.includes(currentContext.tramType));
    if (lists.length === 0) return container.innerHTML = `<div class="empty-state">Keine Checklisten für dieses Fahrzeug.</div>`;
    lists.forEach(list => container.appendChild(createMenuItem(list, 'menu')));
}

function renderLocations() {
    const container = document.getElementById('locationsContainer');
    container.innerHTML = ''; 
    const lists = window.checklistsData.filter(l => l.type === 'location');
    if (lists.length === 0) return container.innerHTML = `<div class="empty-state">Keine Betriebsstellen hinterlegt.</div>`;
    lists.forEach(list => container.appendChild(createMenuItem(list, 'locations')));
}

function createMenuItem(list, sourceView) {
    const isCompleted = !!listCompletionState[list.id];
    const div = document.createElement('div');
    div.className = `menu-item ${isCompleted ? 'completed' : ''}`;
    div.onclick = (e) => {
        if(e.target.type !== 'checkbox') {
            previousView = sourceView;
            openChecklist(list.id, false);
        }
    };
    div.innerHTML = `
        <input type="checkbox" class="menu-checkbox" ${isCompleted ? 'checked' : ''} 
               onchange="toggleEntireList('${list.id}', this.checked, '${sourceView}')">
        <div class="menu-content"><div class="menu-title">${list.title}</div></div>
        <div class="menu-arrow">▶</div>
    `;
    return div;
}

function getExpandedCategories(list, context) {
    let result = [];
    list.categories.forEach((category, catIndex) => {
        // Prüfen, ob die ganze Kategorie für den aktuellen Kontext gültig ist
        if (category.condition && !category.condition(context)) return;

        if (category.dynamic === 'wagenkaesten_loop') {
            const count = tramConfig[context.tramType].wagenkaesten || 5;
            let generatedTasks = [];
            
            for (let i = 1; i <= count; i++) {
                let outerSub = category.outerTasks.filter(t => {
                    if (t.onlyFirst && i !== 1) return false;
                    if (t.onlyLast && i !== count) return false;
                    return true;
                });
                if (outerSub.length > 0) {
                    generatedTasks.push({
                        text: `Wagenkasten ${i} Außen`,
                        subtasks: outerSub
                    });
                }
                
                let innerSub = category.innerTasks.filter(t => {
                    if (t.onlyFirst && i !== 1) return false;
                    if (t.onlyLast && i !== count) return false;
                    return true;
                });
                if (innerSub.length > 0) {
                    generatedTasks.push({
                        text: `Wagenkasten ${i} Innen`,
                        subtasks: innerSub
                    });
                }
            }
            
            result.push({
                name: category.name,
                originalCatIndex: catIndex,
                condition: category.condition,
                tasks: generatedTasks.map((t, idx) => ({ task: t, taskIndex: idx }))
            });
        } else {
            result.push({
                name: category.name,
                originalCatIndex: catIndex,
                condition: category.condition,
                tasks: category.tasks.map((task, taskIndex) => ({ task, taskIndex }))
            });
        }
    });
    return result;
}

window.toggleEntireList = function(listId, isChecked, sourceView) {
    listCompletionState[listId] = isChecked;
    if (!taskCompletionState[listId]) taskCompletionState[listId] = {};
    const state = taskCompletionState[listId];
    const list = window.checklistsData.find(l => l.id === listId);
    const expanded = getExpandedCategories(list, currentContext);
    
    expanded.forEach((cat) => {
        cat.tasks.forEach((item) => {
            const tId = `${cat.originalCatIndex}-0-${item.taskIndex}`;
            state[tId] = isChecked;
            if (item.task.subtasks) {
                item.task.subtasks.forEach((_, subIndex) => { state[`${tId}-${subIndex}`] = isChecked; });
            }
        });
    });

    if (sourceView === 'menu') renderMenu();
    if (sourceView === 'locations') renderLocations();
};

window.openChecklist = function(listId, isLiveUpdate = false) {
    currentView = 'checklist';
    activeChecklistId = listId;
    const list = window.checklistsData.find(l => l.id === listId);
    document.getElementById('currentChecklistTitle').innerText = list.title;
    const container = document.getElementById('checklistContainer');
    container.innerHTML = '';

    if (!taskCompletionState[listId]) taskCompletionState[listId] = {};
    const state = taskCompletionState[listId];
    const expandedCategories = getExpandedCategories(list, currentContext);
    let hasVisibleTasks = false;

    expandedCategories.forEach(cat => {
        let html = `<div class="category-title">${cat.name}</div>`;
        let catHasTasks = false;

        cat.tasks.forEach(item => {
            if (item.task.condition && !item.task.condition(currentContext)) return;
            hasVisibleTasks = true;
            catHasTasks = true;
            
            const tId = `${cat.originalCatIndex}-0-${item.taskIndex}`;
            const isParentChecked = !!state[tId];

            html += `<div class="task-group">`;
            
            if (item.task.subtasks && item.task.subtasks.length > 0) {
                html += `
                    <label class="task-card parent-card ${isParentChecked ? 'checked' : ''}">
                        <input type="checkbox" class="task-checkbox parent-cb" ${isParentChecked ? 'checked' : ''} 
                               onchange="toggleParent(this, '${tId}')">
                        <div class="task-content">
                            <div class="task-text">${item.task.text}</div>
                            ${item.task.note ? `<div class="task-note">${item.task.note}</div>` : ''}
                        </div>
                    </label>
                    <div class="subtasks-list">
                `;
                item.task.subtasks.forEach((sub, subIndex) => {
                    const isSubChecked = !!state[`${tId}-${subIndex}`];
                    html += `
                        <label class="task-card subtask-card ${isSubChecked ? 'checked' : ''}">
                            <input type="checkbox" class="task-checkbox sub-cb" ${isSubChecked ? 'checked' : ''} 
                                   onchange="toggleSub(this, '${tId}', '${subIndex}')">
                            <div class="task-content">
                                <div class="task-text">${sub.text}</div>
                                ${sub.note ? `<div class="task-note">${sub.note}</div>` : ''}
                            </div>
                        </label>
                    `;
                });
                html += `</div>`;
            } else {
                html += `
                    <label class="task-card ${isParentChecked ? 'checked' : ''}">
                        <input type="checkbox" class="task-checkbox" ${isParentChecked ? 'checked' : ''} 
                               onchange="toggleTask(this, '${tId}')">
                        <div class="task-content">
                            <div class="task-text">${item.task.text}</div>
                            ${item.task.note ? `<div class="task-note">${item.task.note}</div>` : ''}
                        </div>
                    </label>
                `;
            }
            html += `</div>`;
        });

        if (catHasTasks) container.innerHTML += html;
    });

    if (!hasVisibleTasks) container.innerHTML = `<div class="empty-state">Für diese Filter gibt es hier keine Aufgaben.</div>`;

    document.getElementById('view-menu').classList.remove('active');
    document.getElementById('view-locations').classList.remove('active');
    document.getElementById('view-map').classList.remove('active');
    document.getElementById('view-checklist').classList.add('active');
    document.getElementById('fabBack').style.display = 'block';
    if (!isLiveUpdate) window.scrollTo(0, 0);
};

window.toggleTask = function(checkbox, tId) {
    const card = checkbox.closest('.task-card');
    if (checkbox.checked) card.classList.add('checked');
    else card.classList.remove('checked');
    taskCompletionState[activeChecklistId][tId] = checkbox.checked;
    checkIfListIsComplete(activeChecklistId);
};

window.toggleParent = function(checkbox, tId) {
    const group = checkbox.closest('.task-group');
    const parentCard = group.querySelector('.parent-card');
    
    if (checkbox.checked) parentCard.classList.add('checked');
    else parentCard.classList.remove('checked');

    taskCompletionState[activeChecklistId][tId] = checkbox.checked;
    
    const subCbs = group.querySelectorAll('.sub-cb');
    subCbs.forEach((subCb, index) => {
        subCb.checked = checkbox.checked;
        const subCard = subCb.closest('.subtask-card');
        if (checkbox.checked) subCard.classList.add('checked');
        else subCard.classList.remove('checked');
        taskCompletionState[activeChecklistId][`${tId}-${index}`] = checkbox.checked;
    });

    checkIfListIsComplete(activeChecklistId);
};

window.toggleSub = function(checkbox, pId, subIndex) {
    const card = checkbox.closest('.subtask-card');
    if (checkbox.checked) card.classList.add('checked');
    else card.classList.remove('checked');
    taskCompletionState[activeChecklistId][`${pId}-${subIndex}`] = checkbox.checked;

    const group = checkbox.closest('.task-group');
    const subCbs = group.querySelectorAll('.sub-cb');
    let allChecked = true;
    subCbs.forEach(cb => { if(!cb.checked) allChecked = false; });

    const parentCb = group.querySelector('.parent-cb');
    const parentCard = group.querySelector('.parent-card');
    parentCb.checked = allChecked;
    taskCompletionState[activeChecklistId][pId] = allChecked;
    
    if (allChecked) parentCard.classList.add('checked');
    else parentCard.classList.remove('checked');

    checkIfListIsComplete(activeChecklistId);
};

function checkIfListIsComplete(listId) {
    const list = window.checklistsData.find(l => l.id === listId);
    const state = taskCompletionState[listId] || {};
    let allDone = true;
    const expanded = getExpandedCategories(list, currentContext);
    
    expanded.forEach((cat) => {
        cat.tasks.forEach((item) => {
            if (item.task.condition && !item.task.condition(currentContext)) return;
            const tId = `${cat.originalCatIndex}-0-${item.taskIndex}`;
            if (!state[tId]) allDone = false;
        });
    });
    listCompletionState[listId] = allDone;
}

// Initialer Start
updateFilters();