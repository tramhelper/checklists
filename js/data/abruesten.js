// --- REGULÄRES ABRÜSTEN ---
window.checklistsData.push({
    id: "abruesten_all",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"],
    title: "Abrüsten des Fahrzeugs",
    categories: [
        {
            name: "Systeme & Verbraucher abschalten",
            tasks: [
                { 
                    text: "Fahrzeug abmelden & Verbraucher aus", 
                    subtasks: [
                        { text: "Alle Verbraucher auf 0 schalten (auch Thermobox ausschalten!)" },
                        { text: "Fahrzeug am IBIS abmelden (Schlüsselsymbol)" },
                        { text: "Fahrzeugmatrix kontrollieren (Verschwinden Linie/Kurs?)" }
                    ]
                }
            ]
        },
        {
            name: "Führerstand: Siemens (NGT6DD / NGT8DD)",
            condition: (context) => ["NGT6DD", "NGT8DD"].includes(context.tramType),
            tasks: [
                { 
                    text: "Fahrzeug manuell abschalten", 
                    subtasks: [
                        { text: "Abblendlicht ausschalten" },
                        { text: "Türfreigabe (Gegebenenfalls zuvor Türöffnung betätigen)" },
                        { text: "Fahrtrichtungswähler auf 0" },
                        { text: "Schlüssel abziehen" },
                        { text: "Stromabnehmer senken" },
                        { text: "Batterieschalter ausschalten" }
                    ]
                }
            ]
        },
        {
            name: "Führerstand: Bombardier D-Wagen (NGTD8DD / NGTD12DD)",
            condition: (context) => ["NGTD8DD", "NGTD12DD"].includes(context.tramType),
            tasks: [
                { 
                    text: "Automatisches Herunterfahren", 
                    subtasks: [
                        { text: "Richtungsfahrschalter auf 0 stellen" },
                        { text: "Displaymeldung prüfen: 'Fahrzeug fährt in 5 Minuten herunter'" }
                    ]
                }
            ]
        }
    ]
});

// --- SCHNELLABRÜSTEN (D-WAGEN) ---
window.checklistsData.push({
    id: "schnellabruesten_dwagen",
    type: "standard",
    applicableTypes: ["NGTD8DD", "NGTD12DD"],
    title: "Schnellabrüsten (NGT D12 / NGT D8)",
    categories: [
        {
            name: "Sofort-Abschaltung",
            tasks: [
                {
                    text: "Schnellabrüst-Sequenz durchführen",
                    subtasks: [
                        { text: "Alle Verbraucher auf 0 schalten" },
                        { text: "Fahrtrichtungswähler auf 0 stellen" },
                        { text: "Stromabnehmer senken" },
                        { text: "Störungsmelderleuchte für MINDESTENS 8 SEKUNDEN gedrückt halten" }
                    ]
                }
            ]
        }
    ]
});