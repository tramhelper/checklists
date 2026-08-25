window.checklistsData.push({
    id: "aufruesten_all",
    type: "standard",
    applicableTypes: ["NGT6", "NGT8", "NGT8DD", "NGT12DD", "NGTDX"], 
    title: "Aufrüsten & Abfahrtskontrolle",
    categories: [
        {
            name: "Aufrüsten im Führerstand",
            // Gilt nur für NGT6 und NGT8
            condition: (context) => ["NGT6", "NGT8"].includes(context.tramType),
            tasks: [
                { 
                    text: "Fahrzeug aktivieren",
                    subtasks: [
                        { text: "Batterieschalter EIN" },
                        { text: "Stromabnehmer heben" },
                        { text: "Schlüssel stecken (Position 1)" },
                        { text: "Fahrtrichtungswähler in Sternchen (*)" }
                    ]
                },
                { 
                    text: "Komponententest durchführen & Fahrersitz einstellen",
                    subtasks: [
                        { text: "Komponententest starten" },
                        { text: "Nach erstem Durchlauf: weiter mit Komponententestknopf" },
                        { text: "Fahrersitz einstellen" },
                        { text: "Abschluss durch erneutes Drücken der Taste" }
                    ]
                }
            ]
        },
        {
            name: "Fahrzeugkontrolle (Wagenkästen)",
            // Gilt nur für NGT6 und NGT8
            condition: (context) => ["NGT6", "NGT8"].includes(context.tramType),
            dynamic: "wagenkaesten_loop",
            outerTasks: [
                { text: "Wagenkasten kontrollieren", note: "Läuft Flüssigkeit aus?" },
                { text: "Sandung überprüfen", note: "Hat der Sand gesandet? (Nur angetriebene Fahrwerke)" },
                { text: "Fahrzeugseiten überprüfen", note: "Sichtbare Schäden?" },
                { text: "Stromabnehmer überprüfen", note: "Schäden? Sollbruchstellen klein genug?" },
                { text: "Türen allgemein", note: "Lichtschranke, Einklemmschutz, Türtaster" },
                { text: "Erste Tür: Rampe", note: "Rampe herausnehmen und Rampentaster prüfen.", onlyFirst: true }
            ],
            innerTasks: [
                { text: "Entwerter testen" },
                { text: "Fahrkartenautomat testen", onlyFirst: true },
                { text: "Fahrgastraum", note: "Auf Schmutz überprüfen." },
                { text: "Sandfüllstand überprüfen", note: "Komplett durch Öffnen des Behälters (Guckloch)." },
                { text: "Heckfahrstand überprüfen", note: "Prüfen, ob dieser verschlossen ist.", onlyLast: true }
            ]
        },
        {
            name: "Beleuchtung & Wischer",
            // Gilt nur für NGT6 und NGT8
            condition: (context) => ["NGT6", "NGT8"].includes(context.tramType),
            tasks: [
                { 
                    text: "Außenbeleuchtung prüfen", 
                    subtasks: [
                        { text: "Abblendlicht & Warnblinklicht an (Wurde nach Komponententest eingeschaltet)" },
                        { text: "Blinkt das Warnblinklicht außen?" },
                        { text: "ZG2 (Schlusslicht) - Ist das Schlusslicht an?" }
                    ]
                },
                { 
                    text: "Scheibenwischer prüfen", 
                    subtasks: [
                        { text: "Hinten: Leicht anheben und prüfen" },
                        { text: "Vorne: Leicht anheben und prüfen" },
                        { text: "Vorne seitlich: Leicht anheben und prüfen" }
                    ]
                }
            ]
        },
        {
            name: "IBIS & Leitstelle (Kommunikation)",
            // Gilt für ALLE Fahrzeuge
            tasks: [
                { 
                    text: "IBIS vorbereiten", 
                    subtasks: [
                        { text: "Dienstnummer eingeben (Eingabe: 1 1)" },
                        { text: "Linie / Kurs eingeben (Mit führender Null, z.B. 0582)" }
                    ]
                },
                { 
                    text: "Kommunikation Leitstelle (LS)", 
                    subtasks: [
                        { text: "Anmeldung über Status 13" },
                        { text: "Langer Gruß, Linie & Kurs nennen" },
                        { text: "Nach Störungen fragen & wiederholen" },
                        { text: "Gespräch endet durch Leitstelle mit 'Ende'" }
                    ]
                }
            ]
        },
        {
            name: "Abschluss & Ausfahrt",
            // Gilt für ALLE Fahrzeuge
            tasks: [
                { 
                    text: "Abfahrbereit machen",
                    subtasks: [
                        { text: "Abblendlicht einschalten" },
                        { text: "Spiegel ausklappen und einstellen" }
                    ]
                },
                { 
                    text: "Besonderheit Ausfahrt Gorbitz beachten!", 
                    note: "Standard ist Ausfahrt 1. Bei Ausfahrt über Tor 2 muss an der Fahrstraßenauswahl korrigiert werden.",
                    condition: (context) => context.startDepot === "Gorbitz" 
                },
                { 
                    text: "Besonderheit Ausfahrt Btf. Reick beachten!", 
                    subtasks: [
                        { text: "Bedienterminal erst NACH Absprache mit dem Einsatzleiter benutzen" },
                        { text: "Ausfahrt per Anleitung am Terminal einstellen" },
                        { text: "Fahrtrichtung prüfen: Landwärts = LINKS (Ri. Albert-Wolf-Platz) | Stadtwärts = RECHTS (Ri. Trattendorfer Str.)" }
                    ],
                    condition: (context) => context.startDepot === "Reick" 
                }
            ]
        }
    ]
});