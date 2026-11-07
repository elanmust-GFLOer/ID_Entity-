# ADR-0001 — Offline, nem hitelesítő labor

Dátum: 2026-11-07.
Státusz: javasolt; a scaffold PR elfogadásával válhat repository-alappá.

## Kontextus

Az aktor, szerep, felhatalmazás és bizonyíték megkülönböztetéséhez még nincs jóváhagyott ID_Entity technikai specifikáció. A GFLO pilot terjedelmét és biztonsági kapuit e kísérlet nem módosítja.

## Döntési javaslat

Függőségmentes Node.js ES-modulok; egy közvetlen megbízó–agent kapcsolat; pontos task/action/resource; szigorú verziózás és UTC idő; pozitív controlEpoch; legfeljebb egyórás laborgrant; minden döntés authority: false; evidence synthetic/unverified.

Nincs LLM, API-kulcs, backend, wallet, publikus identitásgráf vagy protokollírás.

## Következmény és újravizsgálat

A modell offline próbálható, de a hitelesítés, tartós replayvédelem/revokáció, recovery és független megfigyelés nyitott. A számláló monotonitását nem garantálja.

Hiteles kibocsátó és első adapter tervezésekor új ADR kell. A jelenlegi rekordok átnevezése önmagában nem hozhat létre valódi jogosultságot.
