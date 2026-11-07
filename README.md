# ID_Entity 🧬

**v0.1.0 — offline kutatási alap az ember–MI együttműködés identitás-, felhatalmazás- és bizonyítékmodelljéhez.**

Ki cselekszik, kinek a felhatalmazásából, melyik feladatban, milyen korlátok között, és mi támasztja alá az eredményt?

Ez az első javasolt referencia, nem elfogadott közös GFLO-architektúra vagy éles biztonsági komponens. A GFLO v0.2 biztonságos pilot-előkészítése elsőbbséget élvez.

## Kipróbálás

Node.js 22 vagy újabb; nincs külső csomag, LLM vagy API-kulcs.

```sh
npm test
npm run demo
```

A demo rögzített szintetikus idővel dolgozik. Egyetlen megnevezett dokumentum összegzésére adott delegálást értékel. A lejárt, visszavont és megváltozott kontrollhoz tartozó grantet elutasítja.

**Az ALLOW_SIMULATION eredmény mindig authority: false.** Minden bemenet a hívótól érkezik, hitelesítés nélkül. Az eredmény nem valódi tool-, wallet-, adat-, XP- vagy pénzügyi jogosultság.

## A csomag

| Fájl | Szerep |
| --- | --- |
| [src/model.mjs](src/model.mjs) | Verziózott entitás-, grant-, kérés- és bizonyítékrekordok szigorú formai ellenőrzése |
| [src/policy.mjs](src/policy.mjs) | Állapotmentes, egy lépéses delegálási szimuláció |
| [examples/fixtures.mjs](examples/fixtures.mjs) | Kitalált megbízó, agent, feladat, grant és evidence |
| [examples/demo.mjs](examples/demo.mjs) | Elfogadott szimuláció és három elutasított eset |
| [test/policy.test.mjs](test/policy.test.mjs) | Határértékek, hibás szerepek, scope, revokáció és kontrollváltás |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Modell és bizalmi határok |
| [docs/THREAT-MODEL.md](docs/THREAT-MODEL.md) | Támadási utak és nyitott kérdések |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Fejlődési lépések és elfogadási feltételek |
| [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) | GFLO, OctoPush, OctoPass, SoulCraft és külső referenciák |
| [ADR-0001](docs/decisions/0001-offline-lab.md) | Az első javasolt alapdöntés |

## Alapelvek és státusz

- Ember, szervezet, agent és szolgáltatás külön entitásfajta. Az ellenőrző szerep, nem személyazonosság.
- A grant irányított, feladatra és pontos scope-ra korlátozott, lejáró és visszavonható kapcsolat.
- A kontrollverzió eltérése a szimulációban érvényteleníti a régi grantet.
- Identitáshivatkozás ≠ hitelesítés ≠ felhatalmazás ≠ teljesítési bizonyíték ≠ XP.
- Az evidence csak szintetikus, unverified rekord. Sem aláírás, sem valós teljesítés nincs igazolva.

Implementált: fixture-adatok formai ellenőrzése, pontos grant-illesztés és elutasítási okok.

Tervezett: hiteles forrás, aláírás, tartós revokáció, replay/idempotencia, kontrollváltás és független eredményellenőrzés.

Nincs backend, kulcs/wallet, token, XP-írás, hálózati végrehajtás vagy működő alkalmazási integráció. Az állapotmentes értékelés ismételhető, nem egyszer használható capability. A tesztek nem biztonsági auditok.

A repositoryban kizárólag szintetikus adatok szerepeljenek; személyes kapcsolatlista, napló, promptelőzmény és credential ne kerüljön ide.

Minden későbbi lépéshez verzió, döntésrekord, elfogadási feltétel és ellenőrzési bizonyíték tartozzon. Licenc még nincs kijelölve; ez külön tulajdonosi döntés.
