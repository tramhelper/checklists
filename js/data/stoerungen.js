// --- STÖRUNG: VEREISTE OBERLEITUNG (NEU) ---
window.checklistsData.push({
    id: "stoerung_oberleitung_eis",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"],
    title: "Störung: Vereiste Oberleitung",
    categories: [
        {
            name: "Verhalten bei Siemens-Fahrzeugen (NGT6DD / NGT8DD)",
            condition: (context) => ["NGT6DD", "NGTD8DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Leitstelle informieren & Abschleppen vorbereiten",
                    note: "Siemens-Fahrzeuge können bei stark vereister Oberleitung in der Regel nicht aus eigener Kraft weiterfahren und müssen abgeschleppt werden."
                }
            ]
        },
        {
            name: "Verhalten bei Bombardier-Fahrzeugen (NGTD8DD / NGTD12DD)",
            condition: (context) => ["NGTD8DD", "NGTD12DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Wintertaste aktivieren",
                    subtasks: [
                        { text: "Weisung der Leitstelle einholen" },
                        { text: "Wintertaste auf dem linken Seitenpanel betätigen" },
                        { text: "Hinweis: Reduziert die Spannungsaufnahme, setzt Gesamtspannung auf 380 V und schaltet den Passagierkomfort (Heizung/Klima) ab." },
                        { text: "Geschwindigkeit beachten: Schaltet sich ab 30 km/h automatisch ab!" }
                    ]
                }
            ]
        }
    ]
});

// --- STÖRUNG: BNU-AUSFALL ---
window.checklistsData.push({
    id: "stoerung_bnu",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGTD8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"],
    title: "Störung: BNU-Ausfall (Bordnetz)",
    categories: [
        {
            name: "Sofortmaßnahmen (Alle Fahrzeuge)",
            tasks: [
                {
                    text: "Leitstelle unverzüglich informieren",
                    subtasks: [
                        { text: "Standort & Störung 'BNU-Ausfall' melden" },
                        { text: "Prüfen: Ist das Erreichen der Werkstatt / eines Betriebshofes in der Restzeit realistisch?" },
                        { text: "Falls NEIN: Geeigneten Abstellort ansteuern (zum Auskuppeln/Abschleppen)" }
                    ]
                }
            ]
        },
        {
            name: "Batterie-Pufferung: NGT6DD & NGT8DD",
            condition: (context) => ["NGT6DD", "NGT8DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Restfahrzeit beachten: MAX. 20 MINUTEN!",
                    note: "Batterie puffert nur kurz. Nach Ablauf fällt die Federspeicherbremse ein!"
                },
                {
                    text: "Verbraucher-Budget streng einhalten",
                    subtasks: [
                        { text: "Maximal 15× Federspeicherbremse betätigen" },
                        { text: "Maximal 1× Außenmatrix ändern" },
                        { text: "Maximal 1× Türfreigabe setzen und zurücknehmen" },
                        { text: "Maximal 1× Schienenbremse nutzen" }
                    ]
                }
            ]
        },
        {
            name: "Batterie-Pufferung: NGTD8DD & NGTD12DD",
            condition: (context) => ["NGTD8DD", "NGTD12DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Restfahrzeit beachten: MAX. 30 MINUTEN!",
                    note: "Batterie-Pufferung reicht für maximal 30 Minuten Weiterfahrt."
                },
                {
                    text: "Verbraucher-Budget streng einhalten",
                    subtasks: [
                        { text: "Maximal 1× Außenmatrix ändern" },
                        { text: "Maximal 1× Türfreigabe bedienen" },
                        { text: "Maximal 1× Schienenbremse nutzen" }
                    ]
                }
            ]
        },
        {
            name: "Verhalten beim NGTDXDD",
            condition: (context) => context.tramType === "NGTDXDD",
            tasks: [
                {
                    text: "Status der Umformer am Display prüfen",
                    subtasks: [
                        { 
                            text: "Fall A: Nur 1 Umformer defekt (Nebenverbraucher)", 
                            note: "Weiterfahrt MÖGLICH! Reduziertes Komfortangebot (Klima/Heizung gedrosselt bzw. aus)." 
                        },
                        { 
                            text: "Fall B: Beide Umformer defekt", 
                            note: "KEINE Weiterfahrt auf eigener Achse. Fahrzeug muss abgeschleppt werden!" 
                        }
                    ]
                }
            ]
        }
    ]
});

// --- STÖRUNG: TÜRSTÖRUNG ---
window.checklistsData.push({
    id: "stoerung_tuer",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"],
    title: "Störung: Türstörung / Tür defekt",
    categories: [
        {
            name: "Erste Maßnahme & Sicherheitskriterien",
            tasks: [
                {
                    text: "Erstversuch über Zentralsteuerung",
                    note: "Zunächst versuchen, die Türen einmal zentral zu öffnen und wieder zentral zu schließen."
                },
                {
                    text: "Fluchtwege kontrollieren",
                    note: "ACHTUNG: Sind ZWEI nebeneinanderliegende Türen defekt, darf das Fahrzeug wegen unzureichender Fluchtwege NICHT mehr für den Fahrgastverkehr genutzt werden (Ausschieben/Einrücken)!"
                }
            ]
        },
        {
            name: "Besonderheiten: Tür 1 defekt (Mobilitätseingeschränkte Personen)",
            tasks: [
                {
                    text: "Umgang mit mobilitätseingeschränkten Fahrgästen",
                    subtasks: [
                        { 
                            text: "Ausstieg an NICHT barrierefreien Haltestellen", 
                            note: "Rampe für aussteigende Personen per Notentriegelung manuell herausziehen." 
                        },
                        { 
                            text: "Zustieg an NICHT barrierefreien Haltestellen", 
                            note: "Keine weiteren mobilitätseingeschränkten Personen mitnehmen!" 
                        },
                        { 
                            text: "Zustieg an barrierefreien Haltestellen", 
                            note: "Fahrgast nach Zielhaltestelle fragen, um zu prüfen, ob die Zielhaltestelle barrierefrei ist bzw. die Rampe gebraucht wird." 
                        }
                    ]
                }
            ]
        },
        {
            name: "Manuelle Türverriegelung (NGT6DD / NGT8DD)",
            condition: (context) => ["NGT6DD", "NGT8DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Türflügel mechanisch sichern",
                    subtasks: [
                        { text: "Notentriegelung an der betroffenen Tür ziehen" },
                        { text: "Mithilfe eines Fahrgastes die Türflügel vollständig zuhalten" },
                        { text: "Tür mit Vierkant unten rechts fest verriegeln" },
                        { text: "Prüfen: Grünschleife (Türüberwachung) muss leuchten!" }
                    ]
                }
            ]
        }
    ]
});