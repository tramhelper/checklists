let map;
let tramLines = {}; 
let activeLinesGroup; 
window.mapInitialized = false;

window.initMap = function() {
    map = L.map('mapContainer').setView([51.0504, 13.7373], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18
    }).addTo(map);

    activeLinesGroup = L.layerGroup().addTo(map);

    // Lade die Daten jetzt LOKAL von deinem Server!
    fetchLocalTramData();
    window.mapInitialized = true;
};

// Toggle-Funktion zwischen Interaktiv und Statisch
window.switchMapMode = function(mode) {
    if (mode === 'interactive') {
        document.getElementById('interactiveWrapper').style.display = 'block';
        document.getElementById('staticMapContainer').style.display = 'none';
        document.getElementById('btnInteractiveMap').classList.add('active');
        document.getElementById('btnStaticMap').classList.remove('active');
        
        // Leaflet zickt manchmal, wenn es aus dem Hintergrund geholt wird. Das hier fixt es:
        if (map) map.invalidateSize(); 
    } else {
        document.getElementById('interactiveWrapper').style.display = 'none';
        document.getElementById('staticMapContainer').style.display = 'block';
        document.getElementById('btnStaticMap').classList.add('active');
        document.getElementById('btnInteractiveMap').classList.remove('active');
    }
};

async function fetchLocalTramData() {
    try {
        // Pfad zur manuell heruntergeladenen Datei
        const response = await fetch('js/data/liniennetz.json'); 
        
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }

        const data = await response.json();
        processOverpassData(data);
    } catch (error) {
        console.error("Fehler beim Laden der lokalen Kartendaten:", error);
        alert("Das interaktive Liniennetz konnte nicht geladen werden.\n\nBitte stelle sicher, dass die Datei 'liniennetz.json' im Ordner 'js/data' hochgeladen wurde.");
    }
}

function processOverpassData(data) {
    const select = document.getElementById('lineFilter');
    const linesFound = new Set();

    data.elements.forEach(rel => {
        if (rel.type === 'relation' && rel.tags) {
            const ref = rel.tags.ref; 
            
            if (!ref || isNaN(parseInt(ref))) return; 

            linesFound.add(ref);

            if (!tramLines[ref]) {
                tramLines[ref] = L.layerGroup();
            }

            const lineColor = getDvbColor(ref);

            rel.members.forEach(member => {
                if (member.type === 'way' && member.geometry) {
                    const latlngs = member.geometry.map(pos => [pos.lat, pos.lon]);
                    
                    const polyline = L.polyline(latlngs, {
                        color: lineColor, 
                        weight: 4, 
                        opacity: 0.8
                    });
                    
                    polyline.bindPopup(`<b>Linie ${ref}</b><br>${rel.tags.name || ''}`);
                    
                    tramLines[ref].addLayer(polyline);
                    activeLinesGroup.addLayer(polyline); 
                }
            });
        }
    });

    // Dropdown füllen
    const sortedLines = Array.from(linesFound).sort((a,b) => parseInt(a) - parseInt(b));
    sortedLines.forEach(line => {
        const opt = document.createElement('option');
        opt.value = line;
        opt.innerText = `Linie ${line}`;
        select.appendChild(opt);
    });
}

function getDvbColor(ref) {
    const colors = {
        "1": "#E3A32B", "2": "#D92A32", "3": "#005D8C", 
        "4": "#F39200", "6": "#8F4299", "7": "#E87C29", 
        "8": "#86C543", "9": "#E05A9C", "10": "#A63D40", 
        "11": "#FCE300", "12": "#008A51", "13": "#00A19B"
    };
    return colors[ref] || "#333333"; 
}

window.filterMapLines = function() {
    const selected = document.getElementById('lineFilter').value;
    
    activeLinesGroup.clearLayers();

    if (selected === 'all') {
        for (let ref in tramLines) {
            tramLines[ref].eachLayer(layer => activeLinesGroup.addLayer(layer));
        }
    } else {
        if (tramLines[selected]) {
            tramLines[selected].eachLayer(layer => activeLinesGroup.addLayer(layer));
        }
    }
};