window.checklistsData.push({
    id: "einruecken_all",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGT12DD", "NGTDXDD"],
    title: "Einrücken & Abstellen",
    categories: [
        {
            name: "Einrücken Btf. Gorbitz",
            condition: (context) => context.endDepot === "Gorbitz",
            tasks: [
                { 
                    text: "Vorbereitung IBIS & Funk", 
                    subtasks: [
                        { text: "Telefonbuch im IBIS auswählen -> Gorbitz" },
                        { text: "Funkspruch: 'Wagennummer möchte einrücken.'" },
                        { text: "Hinweise wiederholen und beenden." }
                    ]
                },
                { 
                    text: "Einfahrt Gleisschleife", 
                    subtasks: [
                        { text: "Rechter Taster: Tor 1" },
                        { text: "Mittlerer Taster: Tor 2 (Werkstatt)" },
                        { text: "Linker Taster: Zurück in Schleife" }
                    ]
                },
                { 
                    text: "Bei inaktiver Fahrstraße", 
                    note: "Elektrische Weichen müssen handgestellt werden (auch stumpf befahrene, um mechanisches Auffahren zu verhindern)!" 
                }
            ]
        },
        {
            name: "Einrücken Btf. Reick",
            condition: (context) => context.endDepot === "Reick",
            tasks: [
                { 
                    text: "Allgemeine Hinweise", 
                    subtasks: [
                        { text: "Im Normalfall ohne Anmeldung einrücken." },
                        { text: "11.30 bis 15.00 Uhr: Kein Einsatzleiter in Reick! Bei Gesprächsbedarf in Gorbitz melden." }
                    ]
                },
                { 
                    text: "Besonderheiten auf der Strecke", 
                    subtasks: [
                        { text: "Signal SO61 / SO62: Wenn Signal nicht steht, Kreuzung mit PKW-Verkehr nicht befahren." },
                        { text: "Genug Abstand halten, damit eigene Zuweisung nicht auf vorderes Fahrzeug angewendet wird." },
                        { text: "Blinkt Leuchte BTF? Sofort vor Signal anhalten & Einsatzleiter kontaktieren." }
                    ]
                },
                { text: "Abstellen in der Halle", note: "Rettungswege (gelb) unbedingt freihalten!" }
            ]
        }
    ]
});