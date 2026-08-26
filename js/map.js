let map;
let tramLines = {}; // Speichert die Linien nach Nummer sortiert
let activeLinesGroup; // Layer, der aktuell auf der Karte angezeigt wird

window.mapInitialized = false;

window.initMap = function() {
    // Karte erstellen und auf Dresden zentrieren
    map = L.map('mapContainer').setView([51.0504, 13.7373], 12);

    // OpenStreetMap Kacheln laden
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    activeLinesGroup = L.layerGroup().addTo(map);

    // Daten von Overpass API abrufen
    fetchTramData();
    window.mapInitialized = true;
};

async function fetchTramData() {
    // Fragt bei der Overpass-API alle "tram" Relationen rund um die Koordinaten von Dresden ab
    const query = `
        [out:json][timeout:25];
        (
          relation["route"="tram"](50.95,13.6,51.15,13.9);
        );
        out geom;
    `;
    const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    try {
        const response = await fetch(url);
        const data = await response.json();
        processOverpassData(data);
    } catch (error) {
        console.error("Fehler beim Laden der Kartendaten:", error);
        alert("Das Liniennetz konnte leider nicht geladen werden.");
    }
}

function processOverpassData(data) {
    const select = document.getElementById('lineFilter');
    const linesFound = new Set();

    data.elements.forEach(rel => {
        if (rel.type === 'relation' && rel.tags) {
            const ref = rel.tags.ref; // Die Liniennummer
            
            // Herausfiltern von Schienenersatzverkehr oder unbenannten Linien
            if (!ref || isNaN(parseInt(ref))) return; 

            linesFound.add(ref);

            if (!tramLines[ref]) {
                tramLines[ref] = L.layerGroup();
            }

            const lineColor = getDvbColor(ref);

            // Geometrie (die Koordinaten) auslesen
            rel.members.forEach(member => {
                if (member.type === 'way' && member.geometry) {
                    const latlngs = member.geometry.map(pos => [pos.lat, pos.lon]);
                    
                    const polyline = L.polyline(latlngs, {
                        color: lineColor, 
                        weight: 4, 
                        opacity: 0.8
                    });
                    
                    // Popup beim Antippen auf der Karte
                    polyline.bindPopup(`<b>Linie ${ref}</b><br>${rel.tags.name || ''}`);
                    
                    tramLines[ref].addLayer(polyline);
                    activeLinesGroup.addLayer(polyline); // Direkt auf die Karte werfen
                }
            });
        }
    });

    // Dropdown-Menü mit den gefundenen Linien füllen
    const sortedLines = Array.from(linesFound).sort((a,b) => parseInt(a) - parseInt(b));
    sortedLines.forEach(line => {
        const opt = document.createElement('option');
        opt.value = line;
        opt.innerText = `Linie ${line}`;
        select.appendChild(opt);
    });
}

// Setzt die echten DVB-Farben für die Karte
function getDvbColor(ref) {
    const colors = {
        "1": "#E3A32B",  // Gold/Ocker
        "2": "#D92A32",  // Rot
        "3": "#005D8C",  // Blau
        "4": "#F39200",  // Orange-Gelb
        "6": "#8F4299",  // Lila
        "7": "#E87C29",  // Orange
        "8": "#86C543",  // Hellgrün
        "9": "#E05A9C",  // Pink
        "10": "#A63D40", // Dunkelrot
        "11": "#FCE300", // Gelb
        "12": "#008A51", // Dunkelgrün
        "13": "#00A19B"  // Türkis
    };
    return colors[ref] || "#333333"; // Falls eine neue Linie existiert: Grau
}

// Wird aufgerufen, wenn man das Dropdown ändert
window.filterMapLines = function() {
    const selected = document.getElementById('lineFilter').value;
    
    // Karte säubern
    activeLinesGroup.clearLayers();

    if (selected === 'all') {
        // Alle wieder hinzufügen
        for (let ref in tramLines) {
            tramLines[ref].eachLayer(layer => activeLinesGroup.addLayer(layer));
        }
    } else {
        // Nur die ausgewählte Linie hinzufügen
        if (tramLines[selected]) {
            tramLines[selected].eachLayer(layer => activeLinesGroup.addLayer(layer));
        }
    }
};