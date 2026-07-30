/**
 * Concept-diagram copy, per locale.
 *
 * Every string that a diagram draws lives here — nothing is hardcoded in the
 * drawing code. Adding a language is a copy task, not a code task.
 *
 * Two things to respect when translating:
 *
 * 1. **Reuse the terms already established** in `why.ts`, `ui.ts` and `faq.ts`.
 *    A reader who meets "credential" as one word on `/why` and a different word
 *    in the diagram will think they are two different things.
 * 2. **Length is a hard constraint.** These strings are drawn into a fixed
 *    canvas, not reflowed by a browser. German and French run 20–35% longer than
 *    English; a headline that doubles in length gets auto-shrunk and stops
 *    looking deliberate. Budgets are noted on each field below. `alt` is the one
 *    field with no limit — it is never drawn, only read by assistive technology
 *    and by machines.
 *
 * Proper names (CTDL, ELM / Europass, Open Badges 3.0, Credential Commons) are
 * not translated.
 */

import type { Locale } from "./ui";

/** Shared frame copy. Budgets are in characters, measured against the wide canvas. */
export type DiagramCopy = {
  /** Small label above the headline. Budget ~18. */
  kicker: string;
  /** The claim, not the topic. Budget ~52 (wraps to two lines beyond that). */
  headline: string;
  /** One line of qualification. Budget ~70. Optional. */
  deck?: string;
  /** What the reader should take away. Budget ~78. */
  takeaway: string;
  /** Complete, self-contained explanation. No length limit — never drawn. */
  alt: string;
  /** Short caption for use under the figure. Budget ~140. */
  caption: string;
};

export type DiagramsDict = {
  /** The three parts of the layer. Part labels ~14, subs ~34. */
  overview: DiagramCopy & { parts: { label: string; sub: string }[] };
  /** Two parallel tracks. `opsTrack` ~34, `knowledgeTrack` ~64; short names ~12; cells ~24. */
  twoTrees: DiagramCopy & {
    opsTrack: string;
    knowledgeTrack: string;
    opsShort: string;
    knowledgeShort: string;
    ops: [string, string, string, string];
    knowledge: [string, string, string, string];
  };
  /** The transplant test. Panel titles ~26, items ~30. */
  whatTravels: DiagramCopy & {
    travelsTitle: string;
    travels: string[];
    staysTitle: string;
    stays: string[];
  };
  /** Versions as rings. `versionWord` ~10, ring notes ~26, `note` ~52. */
  growthRings: DiagramCopy & { versionWord: string; rings: [string, string, string]; note: string };
  /** Neutral slots and crosswalks. `slotsLabel` ~30, slots ~22, `crosswalksTo` ~16. */
  neutralSlots: DiagramCopy & { slotsLabel: string; slots: [string, string, string, string]; crosswalksTo: string };
};

const en: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "A thin interoperability layer, not a portal",
    deck: "three parts, all open",
    takeaway: "Describe your data, check it conforms, map it to standards you already use.",
    alt: "Credential Commons is a thin, open interoperability and conformance layer made of three parts. Profiles are machine-readable descriptions of what good data looks like. The validator answers whether your data conforms. Crosswalks describe how your fields map to international standards such as CTDL, ELM/Europass and Open Badges 3.0. It is not a new ontology, a registry, or a portal.",
    caption: "Three parts: machine-readable profiles, a validator, and crosswalks to existing standards.",
    parts: [
      { label: "Profiles", sub: "what good data looks like" },
      { label: "Validator", sub: "does your data conform?" },
      { label: "Crosswalks", sub: "how your fields map to standards" },
    ],
  },
  twoTrees: {
    kicker: "Two trees",
    headline: "Two trees. Three places they meet.",
    deck: "Credential Commons models the knowledge tree, and crosswalks to yours",
    takeaway: "Your operations tree stays yours — Credential Commons never rebuilds one.",
    alt: "Two parallel tracks. The upper track is an organisation's product and operations tree: data and infrastructure, the catalogue or warehouse, product lines, revenue. The lower track is the knowledge and credential tree that Credential Commons models: prior knowledge, the programme, learning outcomes, the credential. Dashed links join the two tracks at three stages — the catalogue offering, the learning outcomes, and the credential. Credential Commons crosswalks to an operations tree at those points; it never owns or rebuilds one.",
    caption:
      "Two tracks: an operations tree and a knowledge tree, meeting at the catalogue offering, the learning outcomes and the credential.",
    opsTrack: "Your product / operations tree",
    knowledgeTrack: "The knowledge / credential tree — what Credential Commons models",
    opsShort: "Operations",
    knowledgeShort: "Knowledge",
    ops: ["Data and infrastructure", "Catalogue / warehouse", "Product lines", "Revenue"],
    knowledge: ["Prior knowledge", "Programme", "Learning outcomes", "Credential"],
  },
  whatTravels: {
    kicker: "Transplant test",
    headline: "Only what the next organisation needs has to travel",
    takeaway: "Would the next organisation need it? Then it travels.",
    alt: "The transplant test decides what belongs in a shared credential record. One question: would the next organisation need this to recognise and continue the learner's growth? What travels: the learner's identity, the learning outcomes, the alignment to a competency framework, the credential or achievement itself, and the version the claim was made against. What stays behind: course materials, cohorts, rosters, schedules, and the organisation's own teaching methods. Credential Commons is deliberately small — it holds only what must survive the transplant.",
    caption:
      "The transplant test: what the next organisation needs travels with the learner; everything else stays where it was made.",
    travelsTitle: "Travels with the learner",
    travels: ["Identity", "Learning outcomes", "Competency alignment", "The credential and its version"],
    staysTitle: "Stays where it was made",
    stays: ["Materials", "Cohorts and rosters", "Schedules", "Your own teaching methods"],
  },
  growthRings: {
    kicker: "Versions",
    headline: "A credential is a claim about one ring",
    takeaway: "Nothing is overwritten, so an old credential can still be checked.",
    alt: "Versions modelled as growth rings. Each published version of a programme is one ring: it is retained and never overwritten by later versions. A credential is a claim about the specific ring it was granted against, so verifying an older credential means reading that ring rather than the current version of the programme. History is part of the model from the start, not a log added on afterwards.",
    caption: "Each version is a retained ring. A credential points at the ring it was granted against.",
    versionWord: "Version",
    rings: ["first published version", "revised — 0.1 kept", "current version"],
    note: "A credential names the ring it was granted against.",
  },
  neutralSlots: {
    kicker: "Neutral slots",
    headline: "The socket is fixed, the framework stays yours",
    takeaway: "The socket is the part that stays put. What you plug into it stays yours.",
    alt: "Credential Commons mandates no single vendor, product or framework. Where a layer needs an external model — a competency framework, a credit system, a level, a delivery mode — it defines a neutral, framework-agnostic slot plus a crosswalk mechanism. Adopters plug in whatever they already use, and the crosswalks describe how those fields map to CTDL, ELM/Europass and Open Badges 3.0. The crosswalks say how to map if you use these standards; they do not say to use them.",
    caption: "Neutral slots with crosswalks: Credential Commons defines the socket, not your choice of framework.",
    slotsLabel: "Neutral slots — yours to fill",
    slots: ["Competency framework", "Credit system", "Level", "Delivery mode"],
    crosswalksTo: "crosswalks to",
  },
};

const et: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "Õhuke koostöövõimekiht, mitte portaal",
    deck: "kolm osa, kõik avatud",
    takeaway: "Kirjelda andmed, kontrolli vastavust, seo standarditega, mida juba kasutad.",
    alt: "Credential Commons on õhuke avatud koostöövõime- ja vastavuskiht, mis koosneb kolmest osast. Profiilid on masinloetavad kirjeldused sellest, millised on head andmed. Valideerija ütleb, kas su andmed vastavad. Vasted kirjeldavad, kuidas su väljad käivad kokku rahvusvaheliste standarditega nagu CTDL, ELM/Europass ja Open Badges 3.0. See ei ole uus ontoloogia, register ega portaal.",
    caption: "Kolm osa: masinloetavad profiilid, valideerija ja vasted olemasolevate standarditega.",
    parts: [
      { label: "Profiilid", sub: "millised on head andmed" },
      { label: "Valideerija", sub: "kas su andmed vastavad?" },
      { label: "Vasted", sub: "su väljade vasted standarditega" },
    ],
  },
  twoTrees: {
    kicker: "Kaks puud",
    headline: "Kaks puud. Kolm kohta, kus nad kohtuvad.",
    deck: "Credential Commons kirjeldab teadmiste puud ja seob sinu omaga",
    takeaway: "Tegevuspuu jääb sinu omaks — Credential Commons ei ehita seda üle.",
    alt: "Kaks kõrvuti kulgevat rada. Ülemine on organisatsiooni toote- ja tegevuspuu: andmed ja taristu, kataloog või andmeladu, tooteliinid, tulu. Alumine on teadmiste ja tunnistuse puu, mida Credential Commons kirjeldab: varasemad teadmised, õppeprogramm, õpiväljundid, tunnistus. Katkendjooned ühendavad radu kolmes kohas — kataloogi pakkumine, õpiväljundid ja tunnistus. Credential Commons seob end nendes kohtades tegevuspuuga; ta ei võta seda enda alla ega ehita seda üle.",
    caption:
      "Kaks rada: tegevuspuu ja teadmiste puu, mis kohtuvad kataloogi pakkumises, õpiväljundites ja tunnistuses.",
    opsTrack: "Sinu toote- ja tegevuspuu",
    knowledgeTrack: "Teadmiste ja tunnistuse puu — seda kirjeldab Credential Commons",
    opsShort: "Tegevus",
    knowledgeShort: "Teadmised",
    ops: ["Andmed ja taristu", "Kataloog / andmeladu", "Tooteliinid", "Tulu"],
    knowledge: ["Varasemad teadmised", "Õppeprogramm", "Õpiväljundid", "Tunnistus"],
  },
  whatTravels: {
    kicker: "Ümberistutuse test",
    headline: "Kaasa läheb ainult see, mida järgmine vajab",
    takeaway: "Kas järgmine organisatsioon vajab seda? Siis läheb kaasa.",
    alt: "Ümberistutuse test otsustab, mis kuulub jagatavasse tunnistuskirjesse. Üksainus küsimus: kas järgmine organisatsioon vajab seda, et õppija kasvu tunnustada ja jätkata? Kaasa lähevad: õppija identiteet, õpiväljundid, joondus kompetentsiraamistikuga, tunnistus ise ja versioon, mille kohta väide käib. Maha jäävad: õppematerjalid, rühmad, osalejate nimekirjad, ajakavad ja organisatsiooni enda õppemeetodid. Credential Commons on meelega väike — ta hoiab ainult seda, mis peab ümberistutuse üle elama.",
    caption:
      "Ümberistutuse test: mida järgmine organisatsioon vajab, see läheb õppijaga kaasa; ülejäänu jääb sinna, kus see tehti.",
    travelsTitle: "Läheb õppijaga kaasa",
    travels: ["Identiteet", "Õpiväljundid", "Joondus kompetentsiga", "Tunnistus ja selle versioon"],
    staysTitle: "Jääb sinna, kus see tehti",
    stays: ["Õppematerjalid", "Rühmad ja nimekirjad", "Ajakavad", "Sinu enda õppemeetodid"],
  },
  growthRings: {
    kicker: "Versioonid",
    headline: "Tunnistus on väide ühe aastarõnga kohta",
    takeaway: "Midagi ei kirjutata üle — vana tunnistust saab ikka kontrollida.",
    alt: "Versioonid on kujutatud aastarõngastena. Iga avaldatud versioon on üks rõngas: see säilitatakse ja hilisemad versioonid ei kirjuta seda üle. Tunnistus on väide just selle rõnga kohta, mille alusel see anti — vana tunnistuse kontrollimine tähendab selle rõnga lugemist, mitte õppeprogrammi tänast versiooni. Ajalugu on mudelis algusest peale, mitte hiljem lisatud logi.",
    caption: "Iga versioon on alles hoitud aastarõngas. Tunnistus osutab rõngale, mille alusel see anti.",
    versionWord: "Versioon",
    rings: ["esimene avaldatud versioon", "täiendatud — 0.1 säilib", "praegune versioon"],
    note: "Tunnistus nimetab rõnga, mille alusel see anti.",
  },
  neutralSlots: {
    kicker: "Neutraalsed pesad",
    headline: "Pesa on paigas, raamistik jääb sinu omaks",
    takeaway: "Pesa on see, mis püsib paigal. Mille sa sinna paned, see jääb sinu omaks.",
    alt: "Credential Commons ei kohusta ühtki tarnijat, toodet ega raamistikku. Kui kiht vajab välist mudelit — kompetentsiraamistikku, ainepunktisüsteemi, taset, õppevormi —, määrab ta neutraalse, raamistiku-agnostilise pesa ja vastete mehhanismi. Kasutaja paneb sinna selle, mida ta juba kasutab, ja vasted kirjeldavad, kuidas need väljad käivad kokku CTDL-i, ELM/Europassi ja Open Badges 3.0-ga. Vasted ütlevad, kuidas kaardistada, kui neid standardeid kasutad; nad ei ütle, et neid tuleks kasutada.",
    caption: "Neutraalsed pesad ja vasted: Credential Commons määrab pesa, mitte raamistiku valiku.",
    slotsLabel: "Neutraalsed pesad — sinu täita",
    slots: ["Kompetentsiraamistik", "Ainepunktisüsteem", "Tase", "Õppevorm"],
    crosswalksTo: "vasted",
  },
};

const fi: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "Ohut yhteentoimivuuskerros, ei portaali",
    deck: "kolme osaa, kaikki avoimia",
    takeaway: "Kuvaa tiedot, tarkista vaatimustenmukaisuus, kartoita tuttuihin standardeihin.",
    alt: "Credential Commons on ohut ja avoin yhteentoimivuus- ja vaatimustenmukaisuuskerros, joka koostuu kolmesta osasta. Profiilit ovat koneluettavia kuvauksia siitä, millaiset ovat hyvät tiedot. Validaattori kertoo, ovatko tietosi vaatimustenmukaisia. Vastaavuudet kertovat, miten kenttäsi vastaavat kansainvälisiä standardeja kuten CTDL, ELM/Europass ja Open Badges 3.0. Se ei ole uusi ontologia, rekisteri eikä portaali.",
    caption: "Kolme osaa: koneluettavat profiilit, validaattori ja vastaavuudet olemassa oleviin standardeihin.",
    parts: [
      { label: "Profiilit", sub: "millaiset ovat hyvät tiedot" },
      { label: "Validaattori", sub: "ovatko tiedot vaatimustenmukaisia?" },
      { label: "Vastaavuudet", sub: "kenttiesi vastaavuus standardeihin" },
    ],
  },
  twoTrees: {
    kicker: "Kaksi puuta",
    headline: "Kaksi puuta. Kolme kohtaamispistettä.",
    deck: "Credential Commons mallintaa tiedon puun ja vastaavuudet omaasi",
    takeaway: "Toimintapuusi pysyy sinun — Credential Commons ei rakenna sellaista.",
    alt: "Kaksi rinnakkaista polkua. Ylempi on organisaation tuote- ja toimintapuu: data ja infrastruktuuri, luettelo tai tietovarasto, tuotelinjat, liikevaihto. Alempi on tiedon ja todistuksen puu, jota Credential Commons mallintaa: aiempi osaaminen, koulutusohjelma, oppimistulokset, todistus. Katkoviivat yhdistävät polut kolmessa kohdassa — luettelon tarjonta, oppimistulokset ja todistus. Näissä kohdissa Credential Commons kartoittaa vastaavuudet toimintapuuhun; se ei koskaan omista tai rakenna sellaista.",
    caption:
      "Kaksi polkua: toimintapuu ja tiedon puu, jotka kohtaavat luettelon tarjonnassa, oppimistuloksissa ja todistuksessa.",
    opsTrack: "Sinun tuote- ja toimintapuusi",
    knowledgeTrack: "Tiedon ja todistuksen puu — Credential Commonsin mallintama",
    opsShort: "Toiminta",
    knowledgeShort: "Tieto",
    ops: ["Data ja infrastruktuuri", "Luettelo / tietovarasto", "Tuotelinjat", "Liikevaihto"],
    knowledge: ["Aiempi osaaminen", "Koulutusohjelma", "Oppimistulokset", "Todistus"],
  },
  whatTravels: {
    kicker: "Uudelleenistutus",
    headline: "Mukaan kulkee vain se, mitä seuraava tarvitsee",
    takeaway: "Tarvitsisiko seuraava organisaatio tätä? Silloin se kulkee mukana.",
    alt: "Uudelleenistutustesti ratkaisee, mikä kuuluu yhteiseen todistustietoon. Yksi kysymys: tarvitsisiko seuraava organisaatio tätä tunnistaakseen oppijan kasvun ja jatkaakseen siitä? Mukana kulkee oppijan identiteetti, oppimistulokset, kohdistus osaamiskehykseen, todistus itse ja se versio, jota vastaan todistus annettiin. Paikalleen jäävät oppimateriaalit, ryhmät ja osallistujaluettelot, aikataulut sekä organisaation omat opetusmenetelmät. Credential Commons on tarkoituksella pieni — se pitää vain sen, minkä on selvittävä uudelleenistutuksesta.",
    caption:
      "Uudelleenistutustesti: se, mitä seuraava organisaatio tarvitsee, kulkee oppijan mukana; muu jää sinne, missä se syntyi.",
    travelsTitle: "Kulkee oppijan mukana",
    travels: ["Identiteetti", "Oppimistulokset", "Kohdistus osaamiskehykseen", "Todistus ja sen versio"],
    staysTitle: "Jää sinne, missä syntyi",
    stays: ["Oppimateriaalit", "Ryhmät ja osallistujat", "Aikataulut", "Omat opetusmenetelmät"],
  },
  growthRings: {
    kicker: "Versiot",
    headline: "Todistus on väite yhdestä vuosilustosta",
    takeaway: "Mitään ei ylikirjoiteta, joten vanhan todistuksen voi yhä tarkistaa.",
    alt: "Versiot on mallinnettu puun vuosilustoiksi. Jokainen julkaistu koulutusohjelman versio on yksi lusto: se säilytetään, eikä myöhempi versio koskaan korvaa sitä. Todistus on väite juuri siitä lustosta, jota vastaan se annettiin, joten vanhan todistuksen tarkistaminen tarkoittaa sen luston lukemista eikä koulutusohjelman nykyisen version lukemista. Historia on osa mallia alusta asti, ei jälkikäteen lisätty loki.",
    caption: "Jokainen versio on säilytetty lusto. Todistus osoittaa siihen lustoon, jonka mukaan se annettiin.",
    versionWord: "Versio",
    rings: ["ensimmäinen julkaisu", "päivitetty — 0.1 säilyy", "nykyinen versio"],
    note: "Todistus nimeää luston, jonka mukaan se annettiin.",
  },
  neutralSlots: {
    kicker: "Neutraalit paikat",
    headline: "Paikka on kiinteä, kehys pysyy sinun",
    takeaway: "Paikka on se, mikä pysyy. Se, minkä siihen liität, on sinun.",
    alt: "Credential Commons ei velvoita mihinkään toimittajaan, tuotteeseen tai kehykseen. Kun kerros tarvitsee ulkoisen mallin — osaamiskehyksen, opintopistejärjestelmän, tason tai toteutustavan — se määrittää neutraalin, kehysriippumattoman paikan ja vastaavuusmekanismin. Käyttöönottaja liittää siihen sen, mitä jo käyttää, ja vastaavuudet kertovat, miten nuo kentät kartoittuvat CTDL:ään, ELM/Europassiin ja Open Badges 3.0:aan. Vastaavuudet näyttävät, miten kartoittaa, jos käytät näitä standardeja — eivät sitä, mitä käyttää.",
    caption: "Neutraalit paikat ja vastaavuudet: Credential Commons määrittää paikan, ei kehyksen valintaa.",
    slotsLabel: "Neutraalit paikat — täytä sinä",
    slots: ["Osaamiskehys", "Opintopistejärjestelmä", "Taso", "Toteutustapa"],
    crosswalksTo: "vastaavuudet",
  },
};

const de: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "Schlanke Interoperabilitätsschicht, kein Portal",
    deck: "drei Teile, alle offen",
    takeaway: "Daten beschreiben, Konformität prüfen, auf bestehende Standards abbilden.",
    alt: "Credential Commons ist eine schlanke, offene Interoperabilitäts- und Konformitätsschicht aus drei Teilen. Profile sind maschinenlesbare Beschreibungen davon, wie gute Daten aussehen. Der Validator beantwortet, ob Ihre Daten konform sind. Crosswalks beschreiben, wie Ihre Felder auf internationale Standards wie CTDL, ELM/Europass und Open Badges 3.0 abgebildet werden. Es ist keine neue Ontologie, kein Register und kein Portal.",
    caption: "Drei Teile: maschinenlesbare Profile, ein Validator und Crosswalks zu bestehenden Standards.",
    parts: [
      { label: "Profile", sub: "wie gute Daten aussehen" },
      { label: "Validator", sub: "sind Ihre Daten konform?" },
      { label: "Crosswalks", sub: "Ihre Felder auf Standards abbilden" },
    ],
  },
  twoTrees: {
    kicker: "Zwei Bäume",
    headline: "Zwei Bäume. Drei Berührungspunkte.",
    deck: "Credential Commons modelliert den Wissensbaum — Crosswalks zu Ihrem",
    takeaway: "Ihr Betriebsbaum gehört Ihnen — Credential Commons baut keinen nach.",
    alt: "Zwei parallele Stränge. Der obere Strang ist der Produkt- und Betriebsbaum einer Organisation: Daten und Infrastruktur, Katalog beziehungsweise Warehouse, Produktlinien, Umsatz. Der untere Strang ist der Wissens- und Nachweisbaum, den Credential Commons modelliert: Vorwissen, Programm, Lernergebnisse, Nachweis. Gestrichelte Linien verbinden die beiden Stränge an drei Stellen — beim Katalogangebot, bei den Lernergebnissen und beim Nachweis. Credential Commons bildet an diesen Stellen per Crosswalk auf einen Betriebsbaum ab; es besitzt oder baut selbst keinen.",
    caption:
      "Zwei Stränge: ein Betriebsbaum und ein Wissensbaum, die sich beim Katalogangebot, bei den Lernergebnissen und beim Nachweis treffen.",
    opsTrack: "Ihr Produkt- und Betriebsbaum",
    knowledgeTrack: "Wissens- und Nachweisbaum — was Credential Commons modelliert",
    opsShort: "Betrieb",
    knowledgeShort: "Wissen",
    ops: ["Daten und Infrastruktur", "Katalog / Warehouse", "Produktlinien", "Umsatz"],
    knowledge: ["Vorwissen", "Programm", "Lernergebnisse", "Nachweis"],
  },
  whatTravels: {
    kicker: "Verpflanzungstest",
    headline: "Nur was die nächste Organisation braucht, reist mit",
    takeaway: "Braucht die nächste Organisation es? Dann reist es mit.",
    alt: "Der Verpflanzungstest entscheidet, was in einen gemeinsamen Nachweis-Datensatz gehört. Eine Frage: Bräuchte die nächste Organisation das, um das Wachstum der lernenden Person anzuerkennen und fortzusetzen? Was mitreist: die Identität der lernenden Person, die Lernergebnisse, die Zuordnung zu einem Kompetenzrahmenwerk, der Nachweis beziehungsweise die Leistung selbst und die Version, auf die sich die Aussage bezieht. Was zurückbleibt: Kursmaterialien, Durchgänge, Teilnehmerlisten, Zeitpläne und die eigenen Lehrmethoden der Organisation. Credential Commons ist bewusst klein — es hält nur, was die Verpflanzung überleben muss.",
    caption:
      "Der Verpflanzungstest: Was die nächste Organisation braucht, reist mit den Lernenden; alles andere bleibt, wo es entstand.",
    travelsTitle: "Reist mit den Lernenden",
    travels: ["Identität", "Lernergebnisse", "Kompetenz-Zuordnung", "Nachweis und seine Version"],
    staysTitle: "Bleibt, wo es entstand",
    stays: ["Materialien", "Durchgänge, Teilnehmerlisten", "Zeitpläne", "Ihre eigenen Lehrmethoden"],
  },
  growthRings: {
    kicker: "Versionen",
    headline: "Ein Nachweis ist eine Aussage über einen Ring",
    takeaway: "Nichts wird überschrieben — ein alter Nachweis bleibt prüfbar.",
    alt: "Versionen als Jahresringe. Jede veröffentlichte Version eines Programms ist ein Ring: Sie bleibt erhalten und wird nie von späteren Versionen überschrieben. Ein Nachweis ist eine Aussage über genau den Ring, für den er ausgestellt wurde. Einen älteren Nachweis zu prüfen heißt also, diesen Ring zu lesen und nicht die heutige Fassung des Programms. Die Historie ist von Anfang an Teil des Modells, kein nachträglich ergänztes Protokoll.",
    caption: "Jede Version ist ein bewahrter Ring. Ein Nachweis zeigt auf den Ring, für den er ausgestellt wurde.",
    versionWord: "Version",
    rings: ["erstmals veröffentlicht", "überarbeitet — 0.1 bleibt", "aktuelle Version"],
    note: "Ein Nachweis nennt den Ring, für den er gilt.",
  },
  neutralSlots: {
    kicker: "Neutrale Slots",
    headline: "Der Steckplatz steht fest, das Rahmenwerk ist Ihres",
    takeaway: "Der Steckplatz ist der feste Teil. Was Sie einstecken, bleibt Ihres.",
    alt: "Credential Commons schreibt keinen Anbieter, kein Produkt und kein Rahmenwerk vor. Wo eine Schicht ein externes Modell braucht — ein Kompetenzrahmenwerk, ein Leistungspunktsystem, ein Niveau, eine Lernform —, definiert sie einen neutralen, rahmenwerk-agnostischen Slot und einen Crosswalk-Mechanismus dazu. Wer Credential Commons einsetzt, steckt ein, was er ohnehin nutzt; die Crosswalks beschreiben, wie diese Felder auf CTDL, ELM/Europass und Open Badges 3.0 abgebildet werden. Die Crosswalks sagen, wie man abbildet, wenn Sie diese Standards nutzen — nicht, dass Sie sie nutzen sollen.",
    caption: "Neutrale Slots mit Crosswalks: Credential Commons definiert den Steckplatz, nicht Ihre Wahl des Rahmenwerks.",
    slotsLabel: "Neutrale Slots — Ihre Wahl",
    slots: ["Kompetenzrahmenwerk", "Leistungspunktsystem", "Niveau", "Lernform"],
    crosswalksTo: "Crosswalks zu",
  },
};

const fr: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "Une fine couche d'interopérabilité, pas un portail",
    deck: "trois parties, toutes ouvertes",
    takeaway: "Décrivez vos données, validez-les, mappez vers vos normes habituelles.",
    alt: "Credential Commons est une fine couche ouverte d'interopérabilité et de conformité, composée de trois parties. Les profils sont des descriptions lisibles par machine de ce à quoi ressemblent de bonnes données. Le validateur dit si vos données sont conformes. Les correspondances décrivent comment vos champs se rattachent aux normes internationales telles que CTDL, ELM/Europass et Open Badges 3.0. Ce n'est ni une nouvelle ontologie, ni un registre, ni un portail.",
    caption: "Trois parties : des profils lisibles par machine, un validateur et des correspondances vers les normes existantes.",
    parts: [
      { label: "Profils", sub: "ce que sont de bonnes données" },
      { label: "Validateur", sub: "vos données sont-elles conformes ?" },
      { label: "Correspondances", sub: "vos champs vers les normes" },
    ],
  },
  twoTrees: {
    kicker: "Deux arbres",
    headline: "Deux arbres. Trois points de rencontre.",
    deck: "Credential Commons modélise l'arbre du savoir et se raccorde au vôtre",
    takeaway: "Votre arbre d'opérations reste le vôtre : Credential Commons n'en refait pas.",
    alt: "Deux voies parallèles. En haut, l'arbre produit et opérations d'une organisation : données et infrastructure, catalogue ou entrepôt, gammes de produits, chiffre d'affaires. En bas, l'arbre du savoir et du titre que modélise Credential Commons : connaissances préalables, programme, acquis d'apprentissage, titre. Des liens en pointillés relient les deux voies à trois étapes — l'offre du catalogue, les acquis d'apprentissage et le titre. Credential Commons établit des correspondances avec un arbre d'opérations en ces points ; il n'en possède ni n'en reconstruit aucun.",
    caption:
      "Deux voies : l'arbre des opérations et l'arbre du savoir, qui se rejoignent à l'offre du catalogue, aux acquis et au titre.",
    opsTrack: "Votre arbre produit / opérations",
    knowledgeTrack: "L'arbre du savoir et du titre — modélisé par Credential Commons",
    opsShort: "Opérations",
    knowledgeShort: "Savoir",
    ops: ["Données, infrastructure", "Catalogue / entrepôt", "Gammes de produits", "Chiffre d'affaires"],
    knowledge: ["Connaissances préalables", "Programme", "Acquis d'apprentissage", "Titre"],
  },
  whatTravels: {
    kicker: "Transplantation",
    headline: "Seul ce dont l'organisation suivante a besoin voyage",
    takeaway: "L'organisation suivante en a-t-elle besoin ? Alors, ça voyage.",
    alt: "Le test de la transplantation décide de ce qui a sa place dans un titre partagé. Une seule question : l'organisation suivante en aurait-elle besoin pour reconnaître et poursuivre la croissance de l'apprenant ? Ce qui voyage : l'identité de l'apprenant, les acquis d'apprentissage, l'alignement sur un cadre de compétences, le titre ou la réussite elle-même, et la version au regard de laquelle la déclaration a été faite. Ce qui reste sur place : les supports de cours, les groupes et listes d'inscrits, les plannings et les méthodes pédagogiques propres à l'organisation. Credential Commons est délibérément petit — il ne garde que ce qui doit survivre à la transplantation.",
    caption:
      "Le test de la transplantation : ce dont l'organisation suivante a besoin voyage avec l'apprenant ; tout le reste ne bouge pas.",
    travelsTitle: "Voyage avec l'apprenant",
    travels: ["Identité", "Acquis d'apprentissage", "Alignement des compétences", "Le titre et sa version"],
    staysTitle: "Reste sur place",
    stays: ["Supports de cours", "Groupes et listes d'inscrits", "Plannings", "Vos méthodes pédagogiques"],
  },
  growthRings: {
    kicker: "Versions",
    headline: "Un titre porte sur un seul cerne",
    takeaway: "Rien n'est écrasé : un ancien titre reste vérifiable.",
    alt: "Les versions modélisées comme des cernes de croissance. Chaque version publiée d'un programme est un cerne : elle est conservée et jamais écrasée par les versions suivantes. Un titre porte sur le cerne précis au regard duquel il a été délivré ; vérifier un ancien titre revient donc à lire ce cerne-là, et non la version actuelle du programme. L'historique fait partie du modèle dès le départ, ce n'est pas un journal ajouté après coup.",
    caption: "Chaque version est un cerne conservé. Un titre renvoie au cerne pour lequel il a été délivré.",
    versionWord: "Version",
    rings: ["première version publiée", "révisée — 0.1 conservée", "version actuelle"],
    note: "Un titre nomme le cerne dont il relève.",
  },
  neutralSlots: {
    kicker: "Emplacements neutres",
    headline: "La prise est fixe, le cadre reste le vôtre",
    takeaway: "La prise, c'est ce qui ne bouge pas. Ce que vous y branchez reste le vôtre.",
    alt: "Credential Commons n'impose aucun fournisseur, produit ni cadre. Là où une couche a besoin d'un modèle externe — un cadre de compétences, un système de crédits, un niveau, une modalité de formation — elle définit un emplacement neutre, indépendant de tout cadre, ainsi qu'un mécanisme de correspondance. Ceux qui l'adoptent y branchent ce qu'ils utilisent déjà, et les correspondances décrivent comment ces champs se rattachent à CTDL, ELM/Europass et Open Badges 3.0. Les correspondances disent comment mapper si vous utilisez ces normes ; elles ne disent pas de les utiliser.",
    caption: "Emplacements neutres et correspondances : Credential Commons définit la prise, pas votre choix de cadre.",
    slotsLabel: "Emplacements neutres — à vous",
    slots: ["Cadre de compétences", "Système de crédits", "Niveau", "Modalité de formation"],
    crosswalksTo: "correspondances",
  },
};

/** Crosswalk targets are proper names — the same in every language. */
export const CROSSWALK_TARGETS = ["CTDL", "ELM / Europass", "Open Badges 3.0"] as const;

export const diagramCopy: Record<Locale, DiagramsDict> = { en, et, fi, de, fr };

export const copyFor = (lang: Locale): DiagramsDict => diagramCopy[lang] ?? en;
