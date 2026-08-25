// --- STÖRUNG: BNU-AUSFALL ---
window.checklistsData.push({
    id: "stoerung_bnu",
    type: "standard",
    applicableTypes: ["NGT6", "NGT8", "NGT8DD", "NGT12DD", "NGTDX"],
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
            name: "Batterie-Pufferung: NGT6 & NGT8",
            condition: (context) => ["NGT6", "NGT8"].includes(context.tramType),
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
            name: "Batterie-Pufferung: NGT8DD & NGT12DD",
            condition: (context) => ["NGT8DD", "NGT12DD"].includes(context.tramType),
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
            name: "Verhalten beim NGTDX",
            condition: (context) => context.tramType === "NGTDX",
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
    applicableTypes: ["NGT6", "NGT8", "NGT8DD", "NGT12DD", "NGTDX"],
    title: "Störung: Türstörung / Tür defekt",
    categories: [
        {
            name: "Sicherheits- & Räumungskriterien",
            tasks: [
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
            name: "Manuelle Türverriegelung (NGT6 / NGT8)",
            condition: (context) => ["NGT6", "NGT8"].includes(context.tramType),
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