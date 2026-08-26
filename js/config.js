// Definition der Wagenkasten-Anzahl pro Fahrzeugtyp
const tramConfig = {
    "NGT6DD": { wagenkaesten: 5 },
    "NGT8DD": { wagenkaesten: 7 }, 
    "NGTD8DD": { wagenkaesten: 3 }, 
    "NGTD12DD": { wagenkaesten: 5 },
    "NGTDXDD": { wagenkaesten: 5 }
};

// Globaler Speicher für alle geladenen Checklisten
window.checklistsData = [];