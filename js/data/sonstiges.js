window.checklistsData.push({
    id: "anschlusstreffen_all",
    type: "standard",
    applicableTypes: ["NGT6DD", "NGT8DD", "NGTD8DD", "NGTD12DD", "NGTDXDD"],
    title: "Dienstbetrieb: Anschlusstreffen & Anschlussmanager",
    categories: [
        {
            name: "Anschlussüberwachung & IBIS",
            tasks: [
                {
                    text: "Anschlussmanager im IBIS kontrollieren",
                    note: "Status und Pünktlichkeit der Zubringer- und Anschlussfahrzeuge prüfen."
                },
                {
                    text: "Verhalten bei Verspätung von Anschlussfahrzeugen",
                    subtasks: [
                        { text: "Prüfen, ob es sich um einen garantierten Anschluss handelt" },
                        { text: "Bei drohender Wartezeit: Leitstelle (LS) anfunken und Weisung zur Weiterfahrt bzw. Wartezeit einholen" },
                        { text: "Fahrgastinformation: Sonderansage 'Warten auf Anschluss' / 'Anschlussaufenthalt' im IBIS abspielen" }
                    ]
                }
            ]
        }
    ]
});