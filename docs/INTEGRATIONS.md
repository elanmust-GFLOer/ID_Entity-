# Kapcsolódások — kutatási hipotézisek

Nincs működő integráció, támogatott wire-protokoll vagy automatikus kölcsönös bizalom.

| Projekt | Lehetséges szerep | Megőrzendő határ |
| --- | --- | --- |
| GFLO PIE | Hozzájáruló, agent, forrás és felhatalmazás megkülönböztetése | ID_Entity-grant nem PIE proof; nincs XP-írás |
| OctoPush | Megbízó → agent → task → tool-scope követése | LLM-kimenet nem credential; valódi kontroll a hostnál |
| OctoPass | Opcionális, visszavonható kapcsolat-/igazoláshivatkozás | Wallet-kontroll nem ember-egyediség; profil nem munkaigazolás |
| SoulCraft | Személyes folytonosság és külön consent | Helyi Creator XP, napló, Bond nem publikus reputáció |
| Aimparency | Szándék, terv és artifact története | Git history nem önmagában külső teljesítési bizonyíték |
| AIPOU / Verid | Receipt és evidence fogalmak összevetése | Aláírás/hash nem független igazságellenőrzés |
| Neptuv | Agent subject ↔ controller/wallet kapcsolata | Pontszám nem eseménybizonyíték; tulajdonosváltás külön kérdés |
| Evalanche | Elkülönített signer és művelethez kötött engedély | Ez a labor nem signer-policy vagy fizetési engedély |

## Kiinduló források — 2026-11-07-i kutatási kontextus

- [GFLO Core](https://github.com/elanmust-GFLOer/gflo-pie/blob/main/contracts/PIECoreIgnitionV01.sol)
- [XPPolicyV03](https://github.com/elanmust-GFLOer/gflo-pie/blob/main/contracts/XPPolicyV03.sol)
- [Proof Bridge terv](https://github.com/elanmust-GFLOer/gflo-pie/blob/main/docs/OCTOPUSH-OCTOPASS-PIE-PROOF-BRIDGE-V01.md)
- [cookR](https://github.com/elanmust-GFLOer/GFLO.Octo_PIE-cookR)
- [SoulCraft Creator](https://github.com/elanmust-GFLOer/SoulCraft/blob/main/creator/README.md)
- [AIPOU evidence boundaries](https://github.com/0xddneto/AI-Proof-of-Us/blob/main/docs/evidence-boundaries.md)
- [Aimparency](https://github.com/aimparency/v7)
- [Evalanche](https://github.com/iJaack/evalanche)

A main-linkek változhatnak; adapter előtt pontos commitra kell rögzíteni és újraellenőrizni őket. Ez a lista nem jelent partneri jóváhagyást. Személyes kapcsolatstátusz és levelezés nem kerül e publikus repóba.
