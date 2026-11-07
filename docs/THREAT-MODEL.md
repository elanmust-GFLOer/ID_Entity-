# Fenyegetési modell — v0.1

Hatókör: szintetikus, folyamaton belüli modell, valódi adat/credential nélkül. Nem tesz biztonsági ígéretet éles rendszerekre.

| Út | Mit vizsgál a labor? | Mi hiányzik az éles védelemhez? |
| --- | --- | --- |
| Más agent/feladat nevében indított kérés | Pontos delegateId/taskId-illesztés | Hitelesített hívó és session; minden fixture-mező hamisítható |
| Túl széles scope | Pontos action/resource; wildcard elutasítása | Host által kikényszerített tool-/adat-hozzáférés |
| Lejárt/visszavont grant | Időhatár és revokedAt | Hiteles óra, tartós monoton állapot és fail-closed lookup |
| Kontrollváltás | controllerId és mindkét epoch | Hiteles váltás, régi sessionök/cache-ek érvénytelenítése |
| Azonosító-ütközés | Dupla entity id elutasítása az adott bemenetben | Tartós névtér és tenant-határok |
| Ismételt végrehajtás | Nincs replayvédelmi ígéret | Tartós nonce/idempotencia és atomikus felhasználás |
| Kitalált siker | Evidence csak synthetic/unverified | Független forrásmegfigyelés, output-ellenőrzés és aláírás |
| Prompt injection | A modellben nincs szabad admin/scope-emelő mező | Valódi agent/tool izoláció és támadó bemenetes E2E |
| Privát adatok kiszivárgása | Kizárólag szintetikus opaque hivatkozás | Adatminimalizálás, retention/törlés, ACL és megosztási consent |
| Kibocsátó/ellenőrző összejátszása | Nem vizsgálható e modellből | Elkülönített emberi kontroll, governance és incidenskezelés |

Nyitott kérdések: ki regisztrálhat entitást és controllert; hogyan kötjük audience-hez a grantet; hogyan működik rotáció/recovery; mi akadályozza meg az ellenőrzés és végrehajtás közti állapotváltozást; ki figyelheti meg a teljesítést; hogyan vonható vissza a bizonyíték?

Személyes SoulCraft-napló, Bond, hangulat és helyi XP nem alakulhat át automatikusan protokolljoggá. Nincs Sybil-, ember-egyediség- vagy általános agentbiztonság-igazolás.
