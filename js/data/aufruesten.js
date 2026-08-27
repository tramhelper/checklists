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
                        { text: "Vor dem Start des Komponententests: Alle Türen schließen (gilt auch für die Tür im Führerstand)" },
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

        // --- FÜHRERSTAND: NGT-DXDD (ALSTOM FLEXITY) ---
        {
            name: "Aufrüsten im Führerstand (NGT-DXDD)",
            condition: (context) => context.tramType === "NGTDXDD",
            tasks: [
                {
                    text: "Aktivierung des Fahrzeugs",
                    subtasks: [
                        { text: "Fahrzeugschlüssel stecken und 90° im Uhrzeigersinn drehen" },
                        { text: "Richtungswahlschalter auf Sternchen (*) stellen" },
                        { text: "Stromabnehmer heben"},
                        { text: "Warten, bis die rote Leuchte 'LT' auf der linken Seite des Bedienterminals nicht mehr blinkt" },
                        { text: "Fahrersitz, Fußpodest, Armlehne und Sollwertgeber einstellen" }
                    ]
                },
                {
                    text: "Vollständigen Komponententest durchführen",
                    subtasks: [
                        { text: "Alle Türen schließen (inklusive Fahrertür) – müssen geschlossen bleiben!" },
                        { text: "Unten in den Reitereinstellungen 'Fahrer' die 4. Position von links wählen" },
                        { text: "Vollständigen Komponententest zwingend durchführen" }
                    ]
                },
                {
                    text: "Hinweis zum Komponententest",
                    isHint: true,
                    note: "In der Regel ist der leise Komponententest zu wählen (Start über Werkzeug-/Fahrersymbol -> Softkey 'Leiser Komponententest'). Spätestens nach 5-mal leisem Komponententest ist dieser gesperrt und ein vollständiger Test zwingend erforderlich."
                },
                {
                    text: "Ablauf & Einzelpunkte des Komponententests abarbeiten",
                    subtasks: [
                        { text: "Türfreigabe erteilen" },
                        { text: "Ca. 30 Sekunden warten, bis alle Türen dreimal auf- und zugegangen sind" },
                        { text: "Richtungsfahrtschalter auf 'V' (Vorwärts) stellen" },
                        { text: "Totmann betätigen und Sollwertgeber leicht aus der Raststellung bewegen" },
                        { text: "Sollwertgeber in Nullstellung zurückbewegen" },
                        { text: "Totmann loslassen (ein Piepton ertönt)" },
                        { text: "2 Sekunden warten" },
                        { text: "Totmann einmal bestätigen und wieder loslassen (Piepton stoppt)" },
                        { text: "Roten Not-Aus-Taster drücken" },
                        { text: "Nach 2 Sekunden Not-Aus-Taster durch Drehen wieder zurücksetzen" },
                        { text: "Richtungsfahrtschalter auf '+' stellen" },
                        { text: "Auf 'Außenrundgang in Ordnung' tippen (NICHT auf 'Quittieren' gehen!)" }
                    ]
                },
                {
                    text: "Abschluss Komponententest",
                    subtasks: [
                        { text: "Zur Reitereinstellung 'Fahrer' gehen" },
                        { text: "Auf 'Abschluss Komponententest' tippen" },
                    ]
                }
            ]
        },

        // --- IBIS & LEITSTELLE (VOR AUSSENKONTROLLE) ---
        {
            name: "IBIS & Leitstelle (Vorbereitung vor Außenkontrolle)",
            tasks: [
                { 
                    text: "IBIS vorbereiten & hochfahren", 
                    note: "Vor der Außenkontrolle einstellen, damit die Matrix außen kontrolliert werden kann.",
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

        // --- KONTROLLEN IM FAHRERRAUM (VOR AUSSENKONTROLLE) ---
        {
            name: "Kontrollen im Fahrerraum (Vor der Außenkontrolle)",
            tasks: [
                {
                    text: "Ausrüstung & Plomben prüfen",
                    subtasks: [
                        { text: "Feuerlöscher vorhanden?" },
                        { text: "Weicheneisen vorhanden?" },
                        { text: "Plomben an den Tastern/Knöpfen prüfen (Kurzlehriges Tiergerät, Notfahrt, Winter, Feststellbremse lösen)" }
                    ]
                }
            ]
        },

        // --- FAHRZEUGKONTROLLE (WAGENKÄSTEN HINWEG / ERSTE SEITE & INNENRAUM) ---
        {
            name: "Fahrzeugkontrolle (Wagenkästen Hinweg - Erste Seite & Innenraum)",
            dynamic: "wagenkaesten_loop",
            outerLabel: "Wagenkasten {i} Außen (Erste Seite)",
            outerTasks: [
                { text: "Wagenkasten kontrollieren", note: "Läuft Flüssigkeit aus?" },
                { text: "Sandung überprüfen", note: "Hat der Sand gesandet? (Nur angetriebene Fahrwerke)" },
                { text: "Fahrzeugseiten überprüfen", note: "Sichtbare Schäden?" },
                { text: "Stromabnehmer überprüfen", note: "Schäden? Sollbruchstellen klein genug?", onlyFirst: true },
                { text: "Matrix kontrollieren", note: "Zeigt die Matrix Linie und Ziel korrekt an?" },
                { text: "Blinker / Warnblinker kontrollieren", note: "Blinkleuchte am Wagenkasten aktiv?" },
                { text: "Türen allgemein", note: "Lichtschranke, Einklemmschutz, Türtaster" },
                { text: "Erste Tür: Rampe", note: "Rampe herausnehmen und Rampentaster prüfen.", onlyFirst: true }
            ],
            innerTasks: [
                { text: "Entwerter testen" },
                { text: "Fahrkartenautomat testen", onlyFirst: true },
                { text: "Fahrgastraum", note: "Auf Schmutz überprüfen." },
                { text: "Nothammer überprüfen", note: "Prüfen, ob alle Nothammer vorhanden sind." },
                { text: "Sandfüllstand überprüfen", note: "Komplett durch Öffnen des Behälters (Guckloch)." },
                { text: "Heckfahrstand überprüfen", note: "Prüfen, ob dieser verschlossen ist.", onlyLast: true }
            ]
        },

        // --- HECKKONTROLLE (BELEUCHTUNG & WISCHER HINTEN) ---
        {
            name: "Heckkontrolle (Beleuchtung & Wischer hinten)",
            tasks: [
                { 
                    text: "Außenbeleuchtung hinten prüfen", 
                    subtasks: [
                        { text: "ZG2 (Schlusslicht) eingeschaltet und funktionsfähig?" },
                        { text: "Warnblinklicht / Blinker hinten blinkt?" }
                    ]
                },
                { 
                    text: "Scheibenwischer hinten prüfen", 
                    subtasks: [
                        { text: "Hinten: Leicht anheben und prüfen" }
                    ]
                }
            ]
        },

        // --- FAHRZEUGKONTROLLE (WAGENKASTEN RÜCKWEG / ANDERE SEITE) ---
        {
            name: "Fahrzeugkontrolle (Wagenkästen Rückweg - Andere Seite)",
            dynamic: "wagenkaesten_loop",
            reverse: true,
            outerLabel: "Wagenkasten {i} Außen (Andere Seite)",
            outerTasks: [
                { text: "Wagenkasten kontrollieren", note: "Läuft Flüssigkeit aus?" },
                { text: "Sandung überprüfen", note: "Hat der Sand gesandet? (Nur angetriebene Fahrwerke)" },
                { text: "Fahrzeugseiten überprüfen", note: "Sichtbare Schäden?" },
                { text: "Matrix kontrollieren", note: "Zeigt die Matrix Linie und Ziel korrekt an?" },
                { text: "Blinker / Warnblinker kontrollieren", note: "Blinkleuchte am Wagenkasten aktiv?" },
                { text: "Türen / Fenster außen", note: "Sichtprüfung der Türen und Scheiben auf der zweiten Seite" }
            ]
        },

        // --- FRONTKONTROLLE (BELEUCHTUNG & WISCHER VORNE) ---
        {
            name: "Frontkontrolle (Beleuchtung & Wischer vorne)",
            tasks: [
                { 
                    text: "Außenbeleuchtung vorne prüfen", 
                    subtasks: [
                        { text: "Abblendlicht vorne eingeschaltet?" },
                        { text: "Warnblinklicht / Blinker vorne blinkt?" }
                    ]
                },
                { 
                    text: "Scheibenwischer vorne prüfen", 
                    subtasks: [
                        { text: "Vorne: Leicht anheben und prüfen" },
                        { text: "Vorne seitlich: Leicht anheben und prüfen" }
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
                    text: "Besonderheit Ausfahrt Gorbitz",
                    isHint: true,
                    note: "Standard ist Ausfahrt 1. Bei Ausfahrt über Tor 2 muss an der Fahrstraßenauswahl korrigiert werden.",
                    condition: (context) => context.startDepot === "Gorbitz" 
                },
                { 
                    text: "Besonderheit Ausfahrt Btf. Reick", 
                    isHint: true,
                    note: "• Bedienterminal erst NACH Absprache mit dem Einsatzleiter benutzen.<br>• Ausfahrt per Anleitung am Terminal einstellen.<br>• Fahrtrichtung prüfen: Landwärts = LINKS (Ri. Albert-Wolf-Platz) | Stadtwärts = RECHTS (Ri. Trattendorfer Str.)",
                    condition: (context) => context.startDepot === "Reick" 
                },
                { 
                    text: "Besonderheit Ausfahrt Btf. Trachenberge", 
                    isHint: true,
                    note: "• Erste Haltestelle am Trachenberger Platz noch vor der ersten Spitzenweiche bedienen.<br>• Letzte Weiche, die spitz befahren wird, ist eine Handstellweiche – Lage zwingend überprüfen!",
                    condition: (context) => context.startDepot === "Trachenberge" 
                }
            ]
        }
    ]
});