window.checklistsData.push({
    id: "abruesten_all",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGT12DD", "NGTDXDD"],
    title: "Abrüsten des Fahrzeugs",
    categories: [
        {
            name: "Systeme abmelden",
            tasks: [
                { 
                    text: "Fahrzeug abmelden", 
                    subtasks: [
                        { text: "Fahrzeug am IBIS abmelden (Schlüsselsymbol)" },
                        { text: "Fahrzeugmatrix kontrollieren (Verschwinden Linie/Kurs?)" }
                    ]
                }
            ]
        },
        {
            name: "Führerstand",
            tasks: [
                { 
                    text: "Fahrzeug abschalten", 
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
        }
    ]
});