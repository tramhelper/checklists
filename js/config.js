// Definition der Wagenkasten-Anzahl pro Fahrzeugtyp
const tramConfig = {
    "NGT6": { wagenkaesten: 5 },
    "NGT8": { wagenkaesten: 5 }, 
    "NGT8DD": { wagenkaesten: 7 }, 
    "NGT12DD": { wagenkaesten: 5 },
    "NGTDX": { wagenkaesten: 5 }
};

// Globaler Speicher für alle geladenen Checklisten
window.checklistsData = [];