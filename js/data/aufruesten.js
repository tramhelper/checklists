window.checklistsData.push({
    id: "aufruesten_all",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"], 
    title: "Aufrüsten & Abfahrtskontrolle",
    categories: [
        // --- FÜHRERSTAND: SIEMENS (NGT6DD / NGT8DD) ---
        {
            name: "Aufrüsten im Führerstand (Siemens NGT6DD / NGT8DD)",
            condition: (context) => ["NGT6DD", "NGT8DD"].includes(context.tramType),
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
                },
                {
                    text: "Beleuchtung für Außenkontrolle aktivieren",
                    note: "Abblendlicht und Warnblinklicht einschalten."
                }
            ]
        },

        // --- FÜHRERSTAND: BOMBARDIER D-WAGEN (NGTD8DD / NGTD12DD) ---
        {
            name: "Aufrüsten im Führerstand (Bombardier NGT D12 / NGT D8)",
            condition: (context) => ["NGTD8DD", "NGTD12DD"].includes(context.tramType),
            tasks: [
                {
                    text: "Aktivierung & Vorbereitung",
                    subtasks: [
                        { text: "Fahrtrichtungswähler in Position Sternchen (*)" },
                        { text: "Stromabnehmer heben (lässt sich direkt heben)" },
                        { text: "Kabinenlicht / Führerstandslicht ggf. einschalten" },
                        { text: "Fahrersitz und Lehne einstellen" },
                        { text: "Lichttest / Lampentest für Tasterköpfe betätigen" }
                    ]
                },
                {
                    text: "Türen schließen & Komponententest",
                    subtasks: [
                        { text: "Alle Türen schließen" },
                        { text: "Komponententest durchführen" },
                        { text: "Erfolg mit dem Komponententest-Knopf bestätigen" }
                    ]
                },
                {
                    text: "Vorbereitung für Außenkontrolle",
                    note: "Abblendlicht, Warnblinklicht und Türfreigabe aktivieren."
                }
            ]
        },

        // --- WAGENKASTENKONTROLLE (Dynamisch für alle) ---
        {
            name: "Fahrzeugkontrolle (Wagenkästen)",
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

        // --- BELEUCHTUNG & WISCHER ---
        {
            name: "Beleuchtung & Wischer",
            tasks: [
                { 
                    text: "Außenbeleuchtung prüfen", 
                    subtasks: [
                        { text: "Warnblinklicht außen blinkt?" },
                        { text: "ZG2 (Schlusslicht) eingeschaltet?" }
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

        // --- IBIS & LEITSTELLE ---
        {
            name: "IBIS & Leitstelle (Kommunikation)",
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

        // --- ABSCHLUSS & AUSFAHRT ---
        {
            name: "Abschluss & Ausfahrt",
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