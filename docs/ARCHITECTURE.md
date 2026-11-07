# Architektúra — v0.1 laborprofil

Státusz: javasolt, implementált offline referencia; nem hitelesítő vagy éles engedélyezési szolgáltatás.

## Folyamat és rekordok

1. Egy person vagy organization a megbízó.
2. Egy agent a megbízóhoz rendelt végrehajtó.
3. A grant az issuer → delegate kapcsolat, egy taskId/action/resource hatókörben.
4. A policy a hívó által megadott fixture-állapotot értékeli.
5. A külön evidence rekord egy kitalált eredményt hivatkozik; nem módosítja a grantet és nem termel XP-t.

A service leírható entitás, de e profilban nem kibocsátó vagy végrehajtó. A verifier későbbi szerep, külön függetlenségi szabályokkal.

A futó formai szabályok kanonikus helye a src/model.mjs. Külön JSON Schema még nincs, így nem tartunk fenn két eltérő szerződést.

- Entity: schema, id, kind, status, controlEpoch, controllerId.
- Grant: schema, id, issuerId, delegateId, issuerEpoch, delegateEpoch, taskId, action, resource, issuedAt, expiresAt, revokedAt.
- Request: schema, delegateId, taskId, action, resource.
- Evidence: schema, id, taskId, producerId, evidenceRef, observedAt, claim, provenance, verification, authority.

Az urn:id-entity:lab: azonosítók kitalált hivatkozások. Nem DID-ek, személyazonosságok, wallet-kötések vagy globális felhasználóazonosítók. Nincs VC-, DID- vagy ERC-8004-megvalósítás.

## Kontroll és idő

A controlEpoch a kontroll változásának számlálója. A grant mindkét fél kibocsátáskori epochját rögzíti; eltéréskor elutasítás történik. Hiteles, monoton állapot még nincs: a hívó a fixture-t és az órát átírhatja vagy visszaállíthatja.

A revokedAt jelenléte mindig DENY, jövőbeli dátumnál is, konzervatív laborviselkedésként. A lejárat kizáró felső határ: now >= expiresAt már elutasítás.

A legfeljebb egyórás grant e laborprofil tervezési feltételezése, nem jóváhagyott produkciós paraméter. A dátumok UTC ISO-időpontok, kötelező ezredmásodperccel.

## Bizalmi és adatvédelmi határ

Minden policyeredmény authority: false. A request.delegateId és a controllerId önmagában nem hitelesít senkit. Nincs aláírás, nonce-tároló, tartós revokáció, hiteles óra vagy atomikus végrehajtás.

Az evidence formai validitása nem ellenőrzi az eredményt és nem kapcsolja automatikusan a rekordot egy elfogadott feladathoz. Ehhez külön korrelációs, forrás- és eredményellenőrző szükséges. Az opaque evidenceRef nem URL; a könyvtár semmit nem tölt le.

Az általános kapcsolati/tapasztalati gráf későbbi kutatás. A mostani grant egyetlen kapcsolattípus. Ismeretség és reputáció nem helyettesítheti a kifejezett delegálást.

Egy későbbi host hiteles principalból, szerveroldali grantből és megbízható időből dönthet. A credentialt birtokló tool-/signer-végrehajtó a tényleges művelethez kötve ellenőrizze az engedélyt. LLM-kimenet és beolvasott dokumentum nem emelhet jogosultságot.
