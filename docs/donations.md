# Spenden und Betterplace verwalten

Die Website verarbeitet keine Karten- oder Zahlungsdaten. Online-Spenden werden vollständig im offiziellen Betterplace-Formular abgeschlossen. Die Website zeigt nur öffentliche Kampagnendaten an.

## Eine Betterplace-Kampagne hinzufügen oder ersetzen

1. Bei Betterplace anmelden und das gewünschte Projekt öffnen.
2. Die öffentliche Projekt-URL oder den offiziellen Spendenlink kopieren. Der Link muss mit `https://www.betterplace.org/` beginnen und `/projects/<Projekt-ID>` enthalten.
3. Sanity Studio öffnen.
4. **Website-Einstellungen** öffnen.
5. Unter **Spendenwege** den Wert **Betterplace-Spendenlink** ersetzen.
6. Änderungen veröffentlichen.

Nach der Veröffentlichung liest die Website automatisch folgende öffentliche Angaben von Betterplace:

- Kampagnentitel und Kurzbeschreibung
- Kampagnenbild und Ort
- Anzahl bestätigter Spenden
- gespendeter und noch benötigter Betrag
- Finanzierungsfortschritt
- aktueller offizieller Spendenlink

Die Daten werden für höchstens eine Stunde zwischengespeichert. Aktualisierungen auf Betterplace können deshalb mit Verzögerung auf der Website erscheinen.

## Was bei einer Störung passiert

Wenn die öffentliche Betterplace-Schnittstelle vorübergehend nicht erreichbar ist, bleibt der in Sanity hinterlegte Spendenlink verfügbar. Wenn Betterplace selbst meldet, dass eine Kampagne geschlossen ist oder keine Spenden annehmen darf, wird die Online-Schaltfläche deaktiviert. Die Bankverbindung bleibt als Alternative sichtbar.

## Betragsauswahl

Die Betragsauswahl auf der Website ist eine Orientierung für die Spenderin oder den Spender. Aus Sicherheitsgründen wird kein Betrag als unbekannter URL-Parameter an Betterplace angehängt. Der Betrag wird im Betterplace-Formular noch einmal bestätigt und dort wird auch die Zahlungsart gewählt.

## Banküberweisung ändern

Kontoinhaber, IBAN, BIC und Bank werden ebenfalls unter **Website-Einstellungen → Spendenwege** gepflegt. Eine Auswahl auf der Website löst niemals automatisch eine Überweisung aus.
