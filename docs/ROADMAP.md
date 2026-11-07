# Fejlődési terv

A GFLO v0.2 pilot biztonsági kapui elsőbbséget élveznek. Ez külön offline kutatás, nem automatikus pilotbővítés.

| Lépés | Terv/spec | Kód | Teszt | Telepítés/integráció | Elfogadási feltétel |
| --- | --- | --- | --- | --- | --- |
| v0.1 laborprofil | E scaffold javaslata | Offline referencia | Helyi eredmény: első PR; CI külön ellenőrizendő | Nincs | Pontos scope, időhatár, revokáció, epochváltás, hibás adatok |
| v0.2 hiteles grant-forrás | Nyitott | Nincs | Nincs | Nincs | Actor/controller/audience, megbízható idő, revokáció és tenant-határ specifikálva |
| v0.3 végrehajtási bizonyíték | Nyitott | Nincs | Nincs | Nincs | Agent-állítás és megfigyelés külön; manipulált eredmény elutasítása |
| v0.4 egy izolált adapter | Opcionális | Nincs | Nincs | Nincs | Egy alkalmazás, szintetikus adat, replay/rotation/revoke E2E |
| Későbbi pilotjavaslat | Nem jóváhagyott | Nincs | Nincs | Nincs | Scope, adatkezelés, független review és tulajdonosi döntés |

## Következő legkisebb feladat

Egyetlen grant életciklusának specifikálása: hiteles kibocsátás → ellenőrzött bemenet → felhasználás → visszavonás → ismételt kérés elutasítása. Először offline, hibás esetekkel. Ezt kövesse a tárolás és az aláírási szabvány kiválasztása.

Minden új issue tartalmazzon problémát, pontos forrásverziót, bizalmi határt, nem célokat, elfogadási feltételt és bizonyítékot.

Az első kör ne kapcsoljon egyszerre walletet, cross-chain hidat, XP-jutalmat és személyes naplót. Minden adapter önálló ADR-t kapjon.
