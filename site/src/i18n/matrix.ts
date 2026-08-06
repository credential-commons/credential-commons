// The capability matrix on /standards: ten themes down the side, six standards
// across the top, one short verdict per cell, and a row that opens for the
// detail. It answers "which of these actually does the thing I need?" the way a
// spec comparison does, instead of making the reader infer it from prose.
//
// Marks and column names live OUTSIDE the per-locale dictionaries on purpose:
// a mark is a factual verdict, not copy, so it cannot drift between languages,
// and the column headers are proper names that are never translated.
//
// Parity rule for translators: 10 rows, 6 cells per row, same order. Cells are
// hard-capped at roughly four words — they are read as a grid, not as prose.

import type { Locale } from "./ui";

export type Mark = "full" | "partial" | "none";

/** Column order. Proper names — never translated, never reordered. */
export const MATRIX_COLUMNS = [
  "Credential Commons",
  "W3C VC",
  "Open Badges 3.0",
  "CTDL",
  "ELM / Europass",
  "schema.org",
] as const;

/**
 * One verdict per cell, rows in the same order as `rows` below.
 * full = does this properly · partial = does part of it, or without the
 * distinction that matters · none = out of scope for that standard.
 * Every mark here was checked against the published specification.
 */
export const MATRIX_MARKS: Mark[][] = [
  ["full", "none", "partial", "full", "full", "partial"],       // describe before award
  ["full", "none", "partial", "full", "full", "partial"],       // credit volume with a unit
  ["full", "none", "partial", "full", "full", "partial"],       // structured outcomes
  ["full", "none", "full", "full", "full", "partial"],          // competency alignment
  ["full", "none", "partial", "full", "full", "partial"],       // qualification level
  ["partial", "none", "partial", "partial", "partial", "none"],    // curriculum versions
  ["partial", "full", "full", "none", "full", "none"],          // awarding to a person
  ["none", "full", "full", "none", "full", "none"],             // tamper-evidence
  ["full", "none", "partial", "partial", "partial", "none"],    // completeness check
  ["full", "none", "partial", "partial", "partial", "full"],    // found on the open web
];

export type MatrixDict = {
  heading: string;
  intro: string;
  legend: { full: string; partial: string; none: string };
  expandHint: string;
  colTheme: string;
  rows: { theme: string; cells: string[]; detail: string }[];
};

export const matrix: Record<Locale, MatrixDict> = {
  en: {
    heading: "Feature by feature",
    intro:
      "Ten things credential data has to do, and which standard actually does each one. Open a row for the detail.",
    legend: {
      full: "does this",
      partial: "partly, or without the distinction that matters",
      none: "out of scope",
    },
    expandHint: "Open a row to see why.",
    colTheme: "What you need to do",
    rows: [
      {
        theme: "Describe an offering before anyone earns it",
        cells: ["Core purpose", "Out of scope", "Achievement only", "Yes, in depth", "Yes, EU-shaped", "Course, coarse"],
        detail:
          "Everything that exists before a learner enrols: the programme, its outcomes, its volume, its versions. No person is involved, so it can be published openly. Verifiable Credentials and Open Badges only start once somebody has earned something; Open Badges can define the achievement, but not the programme around it.",
      },
      {
        theme: "State the volume in a credit unit",
        cells: ["ECTS/EAP + hours", "Out of scope", "Number, no unit", "Yes, typed", "Yes, ECTS-native", "Bare number"],
        detail:
          "How much learning this actually is. Open Badges 3.0 has creditsAvailable and schema.org has numberOfCredits, but both are plain numbers — nothing says whether it is ECTS, EAP or contact hours. Credential Commons requires a credit value and keeps academic hours and clock hours apart, because two different regulators ask for two different units.",
      },
      {
        theme: "Carry learning outcomes as structure, not prose",
        cells: ["Identified nodes", "Out of scope", "Narrative criteria", "Yes, competency-based", "Yes, native", "teaches, loosely"],
        detail:
          "Outcomes you can point at and reuse — the same outcome shared between a programme and its courses, and rolled up to a broader one. Open Badges keeps its criteria as free narrative text. Credential Commons requires at least one outcome (a Violation if missing) on its course, curriculum and program profiles; only its micro-credential profile leaves outcomes as a recommended, Warning-level addition.",
      },
      {
        theme: "Align an outcome to a competency framework",
        cells: ["Neutral slot", "Out of scope", "alignment object", "Yes, central", "Yes, ESCO-ready", "competencyRequired"],
        detail:
          "Linking what is learned to ESCO, EQF, O*NET or a national framework. This is the one row where Open Badges is strong. Credential Commons mandates no framework at all: it fixes the slot and keeps the link readable whichever framework you put in it, so two adopters can choose differently and stay interoperable.",
      },
      {
        theme: "Claim a qualification level",
        cells: ["Optional slot", "Out of scope", "Via alignment", "Yes", "Yes, EQF-native", "educationalLevel"],
        detail:
          "A recognised level, such as 1–8 in the EQF. Credential Commons leaves this optional on purpose: level frameworks are a translation device for formal qualifications, and a micro-credential that makes no level claim is still perfectly conformant.",
      },
      {
        theme: "Keep versions of a curriculum over time",
        cells: ["New @id, no field", "Signs one moment", "Version string", "Version identifier", "Version identifier", "Out of scope"],
        detail:
          "Which version of a programme a credential belongs to, and keeping the earlier ones readable instead of overwriting them. Most standards can label a version. Credential Commons has no version field of its own: the convention is that a revised curriculum gets its own identifier, so an older cohort still resolves to what it actually studied rather than to today's edition.",
      },
      {
        theme: "Award it to a named person",
        cells: ["Maps to OB3", "Core purpose", "Core purpose", "Out of scope", "Yes, via EDC", "Out of scope"],
        detail:
          "The moment somebody earns it: the person, the date, the evidence. Credential Commons has an achievement profile that maps straight onto an Open Badges 3.0 AchievementCredential, but it never issues or holds anything itself. This row is what Verifiable Credentials and Open Badges exist for.",
      },
      {
        theme: "Prove who issued it and that nothing changed",
        cells: ["Not its job", "Core purpose", "Inherits from VC", "Out of scope", "Built on VC", "Out of scope"],
        detail:
          "Cryptographic proof that a named issuer said this and that nobody altered it afterwards. Credential Commons deliberately does none of this. A signature proves authorship, not quality — the two jobs stay cleaner apart, and this is the half Verifiable Credentials does properly.",
      },
      {
        theme: "Tell you what is missing from your data",
        cells: ["One command, free", "Out of scope", "Schema validation", "Registry review", "Schema validation", "Out of scope"],
        detail:
          "Not whether the file parses, but whether anything is missing that the next organisation will need — a credit value, a language, an outcome. Running cc validate reports it in plain language, free and with no sign-up. Schema validation tells you the shape is legal; it does not tell you the record is useful.",
      },
      {
        theme: "Be readable on the open web and by AI",
        cells: ["JSON-LD + llms.txt", "Out of scope", "Rarely public", "Registry search", "Europass search", "Core purpose"],
        detail:
          "Whether a search engine or an assistant can read your programme and quote it correctly. schema.org is what they already parse, and issued badges usually sit in a wallet where nobody can see them. Credential Commons reuses schema.org, adds the fields education needs, and publishes a machine-readable summary so assistants get the answer rather than guessing.",
      },
    ],
  },
  et: {
    heading: "Omadus omaduse haaval",
    intro:
      "Kümme asja, mida tunnistuse andmed peavad tegema, ja milline standard neist igaühte tegelikult teeb. Ava rida, et näha üksikasju.",
    legend: {
      full: "teeb seda",
      partial: "osaliselt, või ilma olulise eristuseta",
      none: "väljaspool ulatust",
    },
    expandHint: "Ava rida, et näha, miks.",
    colTheme: "Mida sa pead tegema",
    rows: [
      {
        theme: "Kirjeldada pakkumist enne, kui keegi selle saab",
        cells: ["Põhieesmärk", "Väljaspool ulatust", "Ainult saavutus", "Jah, põhjalikult", "Jah, EL-kujuline", "Kursus, pealiskaudne"],
        detail:
          "Kõik, mis on olemas enne, kui õppija end kirja paneb: programm, selle väljundid, maht, versioonid. Selles pole ühtki inimest, seega saab seda avaldada avalikult. Verifiable Credentials ja Open Badges algavad alles siis, kui keegi on midagi saanud; Open Badges saab kirjeldada saavutust, aga mitte programmi selle ümber.",
      },
      {
        theme: "Väljendada mahtu krediidiühikus",
        cells: ["ECTS/EAP + tunnid", "Väljaspool ulatust", "Arv, ilma ühikuta", "Jah, tüübiga", "Jah, ECTS-põhine", "Paljas arv"],
        detail:
          "Kui palju õppimist see tegelikult on. Open Badges 3.0-l on creditsAvailable ja schema.org-il numberOfCredits, aga mõlemad on lihtsad arvud — miski ei ütle, kas tegu on ECTS-i, EAP-i või kontakttundidega. Credential Commons nõuab ainepunkti väärtust ja hoiab akadeemilised tunnid ja astronoomilised tunnid lahus, sest kaks erinevat regulaatorit küsivad kahte erinevat ühikut.",
      },
      {
        theme: "Kanda õpiväljundeid struktuurina, mitte jutuna",
        cells: ["Tuvastatud sõlmed", "Väljaspool ulatust", "Jutustavad kriteeriumid", "Jah, kompetentsipõhine", "Jah, sisseehitatud", "teaches, lõdvalt"],
        detail:
          "Väljundid, millele saab osutada ja mida saab taaskasutada — sama väljund on jagatud programmi ja selle kursuste vahel ning koondub laiemaks väljundiks. Open Badges hoiab oma kriteeriume vaba jutustava tekstina. Credential Commons nõuab vähemalt ühte väljundit (selle puudumine on Violation) oma kursuse, õppekava ja programmi profiilidel; ainult mikrokvalifikatsiooni profiil jätab väljundid soovituslikuks, Warning-tasemel lisandiks.",
      },
      {
        theme: "Siduda väljund kompetentsiraamistikuga",
        cells: ["Neutraalne pesa", "Väljaspool ulatust", "alignment-objekt", "Jah, kesksena", "Jah, ESCO-valmis", "competencyRequired"],
        detail:
          "Sidumine õpitu ja ESCO, EQF, O*NET või mõne riikliku raamistiku vahel. See on ainus rida, kus Open Badges on tugev. Credential Commons ei nõua ühtki kindlat raamistikku: ta fikseerib pesa ja hoiab lingi loetavana, ükskõik millise raamistiku sa sinna paned, nii et kaks kasutuselevõtjat saavad valida erinevalt ja jääda ikka koostalitlusvõimeliseks.",
      },
      {
        theme: "Väita kvalifikatsioonitaset",
        cells: ["Valikuline pesa", "Väljaspool ulatust", "alignment kaudu", "Jah", "Jah, EQF-põhine", "educationalLevel"],
        detail:
          "Tunnustatud tase, näiteks 1–8 EQF-is. Credential Commons jätab selle meelega valikuliseks: taseraamistikud on tõlkevahend ametlikele kvalifikatsioonidele, ja mikrokvalifikatsioon, mis taset ei väida, on ikkagi täiesti vastav.",
      },
      {
        theme: "Säilitada õppekava versioone aja jooksul",
        cells: ["Uus @id, ilma väljata", "Allkirjastab ühe hetke", "Versioonistring", "Versiooni identifikaator", "Versiooni identifikaator", "Väljaspool ulatust"],
        detail:
          "Millisesse programmi versiooni tunnistus kuulub, ja varasemate versioonide loetavana hoidmine, selle asemel et need üle kirjutada. Enamik standardeid oskab versiooni märgistada. Credential Commonsil pole oma versioonivälja: kokkulepe on, et uuendatud õppekava saab oma identifikaatori, nii et vanem lend viitab ikka sellele, mida ta tegelikult õppis, mitte tänasele väljaandele.",
      },
      {
        theme: "Anda see nimelisele inimesele",
        cells: ["Kaardistub OB3-le", "Põhieesmärk", "Põhieesmärk", "Väljaspool ulatust", "Jah, EDC kaudu", "Väljaspool ulatust"],
        detail:
          "Hetk, mil keegi selle saab: inimene, kuupäev, tõendid. Credential Commonsil on saavutuse profiil, mis kaardistub otse Open Badges 3.0 AchievementCredentialile, aga ta ise ei anna kunagi midagi välja ega hoia midagi. See rida on täpselt see, mille jaoks Verifiable Credentials ja Open Badges olemas on.",
      },
      {
        theme: "Tõendada, kes selle väljastas ja et midagi ei muutunud",
        cells: ["Pole tema töö", "Põhieesmärk", "Pärib VC-lt", "Väljaspool ulatust", "Ehitatud VC-le", "Väljaspool ulatust"],
        detail:
          "Krüptograafiline tõend, et nimeline väljaandja seda ütles ja et keegi pole seda hiljem muutnud. Credential Commons ei tee sellest meelega midagi. Allkiri tõendab autorlust, mitte kvaliteeti — need kaks tööd püsivad puhtamalt lahus, ja see on pool, mida Verifiable Credentials teeb korralikult.",
      },
      {
        theme: "Öelda, mis su andmetest puudu on",
        cells: ["Üks käsk, tasuta", "Väljaspool ulatust", "Skeemi valideerimine", "Registri ülevaatus", "Skeemi valideerimine", "Väljaspool ulatust"],
        detail:
          "Mitte see, kas fail parsib, vaid see, kas millestki on puudu, mida järgmine organisatsioon vajab — ainepunkti väärtus, keel, väljund. Käsu cc validate käivitamine annab selle kohta aruande selges keeles, tasuta ja ilma registreerimiseta. Skeemi valideerimine ütleb, et kuju on korrektne; see ei ütle, et kirje on kasulik.",
      },
      {
        theme: "Olla loetav avalikus veebis ja AI jaoks",
        cells: ["JSON-LD + llms.txt", "Väljaspool ulatust", "Harva avalik", "Registriotsing", "Europassi otsing", "Põhieesmärk"],
        detail:
          "Kas otsingumootor või abiline suudab su programmi lugeda ja seda õigesti tsiteerida. schema.org on see, mida nad juba parsivad, ja väljastatud märgid asuvad tavaliselt rahakotis, kus keegi neid ei näe. Credential Commons kasutab schema.org-i uuesti, lisab haridusele vajalikud väljad ja avaldab masinloetava kokkuvõtte, nii et abilised saavad vastuse, selle asemel et arvata.",
      },
    ],
  },
  fi: {
    heading: "Ominaisuus kerrallaan",
    intro:
      "Kymmenen asiaa, jotka todistustietojen on tehtävä, ja mikä standardi oikeasti tekee kunkin niistä. Avaa rivi nähdäksesi tarkemmin.",
    legend: {
      full: "tekee tämän",
      partial: "osittain, tai ilman olennaista erottelua",
      none: "rajattu pois",
    },
    expandHint: "Avaa rivi ja näe miksi.",
    colTheme: "Mitä sinun täytyy tehdä",
    rows: [
      {
        theme: "Kuvaa tarjonta ennen kuin kukaan sen ansaitsee",
        cells: ["Ydintarkoitus", "Rajattu pois", "Vain saavutus", "Kyllä, syvällisesti", "Kyllä, EU-mallinen", "Kurssi, karkea"],
        detail:
          "Kaikki, mikä on olemassa ennen kuin oppija ilmoittautuu: ohjelma, sen oppimistulokset, laajuus, versiot. Mukana ei ole yhtään ihmistä, joten sen voi julkaista avoimesti. Verifiable Credentials ja Open Badges alkavat vasta, kun joku on jo jotain ansainnut; Open Badges voi määritellä saavutuksen, mutta ei sen ympärillä olevaa ohjelmaa.",
      },
      {
        theme: "Ilmaise laajuus yksikössä",
        cells: ["ECTS/EAP + tunnit", "Rajattu pois", "Luku, ei yksikköä", "Kyllä, tyypitetty", "Kyllä, ECTS-pohjainen", "Paljas luku"],
        detail:
          "Kuinka paljon oppimista tämä oikeasti on. Open Badges 3.0:lla on creditsAvailable ja schema.org:lla numberOfCredits, mutta molemmat ovat pelkkiä lukuja — kumpikaan ei kerro, onko kyse ECTS:stä, EAP:sta vai kontaktitunneista. Credential Commons vaatii opintopistearvon ja pitää akateemiset tunnit ja kellotunnit erillään, koska kaksi eri valvojaa kysyy kahta eri yksikköä.",
      },
      {
        theme: "Kanna oppimistulokset rakenteena, ei proosana",
        cells: ["Yksilöidyt solmut", "Rajattu pois", "Kertovat kriteerit", "Kyllä, osaamispohjainen", "Kyllä, sisäänrakennettu", "teaches, löyhästi"],
        detail:
          "Oppimistuloksia, joihin voi viitata ja joita voi käyttää uudelleen — sama oppimistulos jaettuna ohjelman ja sen kurssien kesken, ja koottuna laajemmaksi kokonaisuudeksi. Open Badges pitää kriteerinsä vapaana kertovana tekstinä. Credential Commons vaatii vähintään yhden oppimistuloksen (Violation, jos puuttuu) kurssi-, opetussuunnitelma- ja ohjelmaprofiileissaan; vain sen mikrotutkintoprofiili jättää oppimistulokset suositelluksi, Warning-tason lisäykseksi.",
      },
      {
        theme: "Kohdista oppimistulos osaamiskehykseen",
        cells: ["Neutraali paikka", "Rajattu pois", "alignment-objekti", "Kyllä, keskeinen", "Kyllä, ESCO-valmis", "competencyRequired"],
        detail:
          "Sen linkittäminen, mitä on opittu, ESCO:on, EQF:ään, O*NET:iin tai kansalliseen kehykseen. Tämä on ainoa rivi, jolla Open Badges on vahva. Credential Commons ei määrää mitään kehystä: se kiinnittää paikan ja pitää linkin luettavana, kumman tahansa kehyksen sinne laittaakin, joten kaksi käyttäjää voi valita eri tavalla ja silti pysyä yhteentoimivina.",
      },
      {
        theme: "Ilmoita tutkintotaso",
        cells: ["Valinnainen paikka", "Rajattu pois", "Alignmentin kautta", "Kyllä", "Kyllä, EQF-pohjainen", "educationalLevel"],
        detail:
          "Tunnustettu taso, kuten EQF:n 1–8. Credential Commons jättää tämän tarkoituksella valinnaiseksi: tasokehykset ovat käännösväline muodollisille tutkinnoille, ja mikrotutkinto, joka ei ilmoita tasoa lainkaan, on silti täysin vaatimustenmukainen.",
      },
      {
        theme: "Säilytä opetussuunnitelman versiot ajan mittaan",
        cells: ["Uusi @id, ei kenttää", "Allekirjoittaa hetken", "Versiomerkkijono", "Versiotunniste", "Versiotunniste", "Rajattu pois"],
        detail:
          "Mihin ohjelman versioon todistus kuuluu, ja se, että aiemmat versiot pysyvät luettavina sen sijaan että ne kirjoitettaisiin yli. Useimmat standardit osaavat merkitä version. Credential Commonsilla ei ole omaa versiokenttää: käytäntönä on, että uudistettu opetussuunnitelma saa oman tunnisteensa, joten vanhempi ryhmä palautuu edelleen siihen, mitä se todella opiskeli, ei tämänpäiväiseen versioon.",
      },
      {
        theme: "Myönnä se nimetylle henkilölle",
        cells: ["Kartoituu OB3:ksi", "Ydintarkoitus", "Ydintarkoitus", "Rajattu pois", "Kyllä, EDC:n kautta", "Rajattu pois"],
        detail:
          "Hetki, jolloin joku ansaitsee sen: henkilö, päivämäärä, näyttö. Credential Commonsilla on saavutusprofiili, joka kartoituu suoraan Open Badges 3.0:n AchievementCredentialiin, mutta se ei koskaan itse myönnä eikä pidä hallussaan mitään. Tätä riviä varten Verifiable Credentials ja Open Badges ovat olemassa.",
      },
      {
        theme: "Todista, kuka sen myönsi ja ettei mikään muuttunut",
        cells: ["Ei sen tehtävä", "Ydintarkoitus", "Perii VC:ltä", "Rajattu pois", "Rakentuu VC:lle", "Rajattu pois"],
        detail:
          "Kryptografinen todiste siitä, että nimetty myöntäjä sanoi tämän ja ettei kukaan muuttanut sitä jälkikäteen. Credential Commons ei tarkoituksella tee mitään tästä. Allekirjoitus todistaa tekijyyden, ei laatua — nämä kaksi tehtävää pysyvät siistimpinä erillään, ja tämä on se puolisko, jonka Verifiable Credentials hoitaa kunnolla.",
      },
      {
        theme: "Kerro, mitä tiedoistasi puuttuu",
        cells: ["Yksi komento, ilmainen", "Rajattu pois", "Skeeman validointi", "Rekisterin tarkastus", "Skeeman validointi", "Rajattu pois"],
        detail:
          "Ei sitä, jäsentyykö tiedosto, vaan sitä, puuttuuko jotain, mitä seuraava organisaatio tarvitsee — opintopistearvo, kieli, oppimistulos. cc validate -komennon ajaminen kertoo sen selkokielellä, ilmaiseksi ja ilman rekisteröitymistä. Skeeman validointi kertoo, että muoto on kelvollinen; se ei kerro, että tietue on hyödyllinen.",
      },
      {
        theme: "Ole luettavissa avoimessa webissä ja tekoälylle",
        cells: ["JSON-LD + llms.txt", "Rajattu pois", "Harvoin julkinen", "Rekisterihaku", "Europass-haku", "Ydintarkoitus"],
        detail:
          "Osaako hakukone tai avustaja lukea ohjelmasi ja lainata sitä oikein. schema.org on se, mitä ne jo jäsentävät, ja myönnetyt merkit lojuvat yleensä lompakossa, jonne kukaan ei näe. Credential Commons käyttää uudelleen schema.orgia, lisää koulutuksen tarvitsemat kentät ja julkaisee koneluettavan yhteenvedon, jotta avustajat saavat vastauksen sen sijaan että arvaisivat.",
      },
    ],
  },
  de: {
    heading: "Merkmal für Merkmal",
    intro:
      "Zehn Dinge, die Nachweisdaten leisten müssen, und welcher Standard das jeweils wirklich tut. Öffnen Sie eine Zeile für die Details.",
    legend: {
      full: "tut das",
      partial: "teilweise, oder ohne die entscheidende Unterscheidung",
      none: "Nicht vorgesehen",
    },
    expandHint: "Öffnen Sie eine Zeile, um den Grund zu sehen.",
    colTheme: "Was Sie tun müssen",
    rows: [
      {
        theme: "Ein Angebot beschreiben, bevor es jemand erwirbt",
        cells: ["Kernzweck", "Nicht vorgesehen", "Nur die Leistung", "Ja, ausführlich", "Ja, EU-geprägt", "Kurs, grob"],
        detail:
          "Alles, was existiert, bevor sich ein Lernender einschreibt: das Programm, seine Lernergebnisse, sein Umfang, seine Versionen. Keine Person ist beteiligt, daher kann es offen veröffentlicht werden. Verifiable Credentials und Open Badges beginnen erst, sobald jemand etwas erworben hat; Open Badges kann die Leistung definieren, aber nicht das Programm darum herum.",
      },
      {
        theme: "Den Umfang in einer Krediteinheit angeben",
        cells: ["ECTS/EAP + Stunden", "Nicht vorgesehen", "Zahl ohne Einheit", "Ja, typisiert", "Ja, ECTS-nativ", "Bloße Zahl"],
        detail:
          "Wie viel Lernen das tatsächlich ist. Open Badges 3.0 hat creditsAvailable und schema.org hat numberOfCredits, aber beides sind bloße Zahlen — nichts sagt, ob es sich um ECTS, EAP oder Kontaktstunden handelt. Credential Commons verlangt einen Punktewert und hält akademische Stunden und Zeitstunden auseinander, weil zwei verschiedene Regulierungsbehörden zwei verschiedene Einheiten verlangen.",
      },
      {
        theme: "Lernergebnisse als Struktur tragen, nicht als Fließtext",
        cells: ["Identifizierte Knoten", "Nicht vorgesehen", "Kriterien als Fließtext", "Ja, kompetenzbasiert", "Ja, nativ", "teaches, lose"],
        detail:
          "Lernergebnisse, auf die man verweisen und die man wiederverwenden kann — dasselbe Lernergebnis geteilt zwischen einem Programm und seinen Kursen, und zusammengeführt zu einem umfassenderen. Open Badges hält seine Kriterien als freien Fließtext. Credential Commons verlangt mindestens ein Lernergebnis (eine Violation, falls es fehlt) in seinen Profilen für Kurs, Curriculum und Programm; nur sein Mikro-Qualifikations-Profil belässt Lernergebnisse als empfohlene Ergänzung auf Warning-Ebene.",
      },
      {
        theme: "Ein Lernergebnis an einem Kompetenzrahmen ausrichten",
        cells: ["Neutrales Feld", "Nicht vorgesehen", "alignment-Objekt", "Ja, zentral", "Ja, ESCO-bereit", "competencyRequired"],
        detail:
          "Das Gelernte mit ESCO, EQF, O*NET oder einem nationalen Rahmenwerk verknüpfen. Dies ist die eine Zeile, in der Open Badges stark ist. Credential Commons schreibt überhaupt kein Rahmenwerk vor: Es legt das Feld fest und hält die Verknüpfung lesbar, unabhängig davon, welches Rahmenwerk Sie einsetzen, sodass zwei Anwender unterschiedlich wählen können und trotzdem interoperabel bleiben.",
      },
      {
        theme: "Ein Qualifikationsniveau angeben",
        cells: ["Optionales Feld", "Nicht vorgesehen", "Über alignment", "Ja", "Ja, EQF-nativ", "educationalLevel"],
        detail:
          "Ein anerkanntes Niveau, etwa 1–8 im EQF. Credential Commons lässt dies absichtlich optional: Niveaurahmen sind ein Übersetzungswerkzeug für formale Qualifikationen, und eine Mikro-Qualifikation, die kein Niveau angibt, ist trotzdem vollkommen konform.",
      },
      {
        theme: "Versionen eines Curriculums über die Zeit bewahren",
        cells: ["Neue @id, kein Feld", "Signiert einen Moment", "Versionsstring", "Versionskennung", "Versionskennung", "Nicht vorgesehen"],
        detail:
          "Zu welcher Version eines Programms ein Nachweis gehört, und die früheren Versionen lesbar zu halten, statt sie zu überschreiben. Die meisten Standards können eine Version kennzeichnen. Credential Commons hat kein eigenes Versionsfeld: Die Konvention ist, dass ein überarbeitetes Curriculum eine eigene Kennung erhält, sodass eine ältere Kohorte weiterhin auf das verweist, was sie tatsächlich studiert hat, statt auf die heutige Ausgabe.",
      },
      {
        theme: "Es einer namentlich genannten Person verleihen",
        cells: ["Bildet auf OB3 ab", "Kernzweck", "Kernzweck", "Nicht vorgesehen", "Ja, über EDC", "Nicht vorgesehen"],
        detail:
          "Der Moment, in dem jemand es erwirbt: die Person, das Datum, die Nachweise. Credential Commons hat ein Leistungsprofil, das sich direkt auf ein Open Badges 3.0 AchievementCredential abbilden lässt, aber es stellt selbst nie etwas aus oder hält etwas fest. Für diese Zeile gibt es Verifiable Credentials und Open Badges.",
      },
      {
        theme: "Beweisen, wer es ausgestellt hat und dass nichts verändert wurde",
        cells: ["Nicht seine Aufgabe", "Kernzweck", "Erbt von VC", "Nicht vorgesehen", "Baut auf VC auf", "Nicht vorgesehen"],
        detail:
          "Kryptografischer Beweis, dass ein namentlich genannter Aussteller dies gesagt hat und dass niemand es danach verändert hat. Credential Commons tut davon absichtlich nichts. Eine Signatur beweist Urheberschaft, nicht Qualität — die beiden Aufgaben bleiben sauberer getrennt, und dies ist die Hälfte, die Verifiable Credentials richtig macht.",
      },
      {
        theme: "Ihnen sagen, was in Ihren Daten fehlt",
        cells: ["Ein Befehl, kostenlos", "Nicht vorgesehen", "Schema-Validierung", "Registerprüfung", "Schema-Validierung", "Nicht vorgesehen"],
        detail:
          "Nicht, ob die Datei sich parsen lässt, sondern ob etwas fehlt, das die nächste Organisation brauchen wird — ein Punktewert, eine Sprache, ein Lernergebnis. Der Befehl cc validate meldet das in klarer Sprache, kostenlos und ohne Anmeldung. Schema-Validierung sagt Ihnen, dass die Form gültig ist; sie sagt Ihnen nicht, dass der Datensatz brauchbar ist.",
      },
      {
        theme: "Im offenen Web und für KI lesbar sein",
        cells: ["JSON-LD + llms.txt", "Nicht vorgesehen", "Selten öffentlich", "Registersuche", "Europass-Suche", "Kernzweck"],
        detail:
          "Ob eine Suchmaschine oder ein Assistent Ihr Programm lesen und korrekt zitieren kann. schema.org ist das, was sie bereits verarbeiten, und ausgestellte Badges liegen meist in einer Wallet, wo niemand sie sehen kann. Credential Commons nutzt schema.org weiter, fügt die Felder hinzu, die Bildung braucht, und veröffentlicht eine maschinenlesbare Zusammenfassung, sodass Assistenten die Antwort bekommen, statt zu raten.",
      },
    ],
  },
  fr: {
    heading: "Fonctionnalité par fonctionnalité",
    intro:
      "Dix choses que les données d'un titre doivent faire, et quelle norme fait vraiment chacune d'elles. Ouvrez une ligne pour le détail.",
    legend: {
      full: "le fait",
      partial: "partiellement, ou sans la distinction qui compte",
      none: "hors périmètre",
    },
    expandHint: "Ouvrez une ligne pour voir pourquoi.",
    colTheme: "Ce que vous devez faire",
    rows: [
      {
        theme: "Décrire une offre avant qu'elle soit obtenue",
        cells: ["Objet principal", "Hors périmètre", "Réussite seulement", "Oui, en détail", "Oui, format UE", "Cours, sommaire"],
        detail:
          "Tout ce qui existe avant qu'un apprenant ne s'inscrive : le programme, ses acquis, son volume, ses versions. Aucune personne n'est impliquée, ce qui permet de le publier ouvertement. Verifiable Credentials et Open Badges ne commencent qu'une fois que quelqu'un a obtenu quelque chose ; Open Badges peut définir la réussite, mais pas le programme qui l'entoure.",
      },
      {
        theme: "Exprimer le volume en unité de crédit",
        cells: ["ECTS/EAP + heures", "Hors périmètre", "Nombre, sans unité", "Oui, typé", "Oui, natif ECTS", "Simple nombre"],
        detail:
          "Combien d'apprentissage cela représente réellement. Open Badges 3.0 a creditsAvailable et schema.org a numberOfCredits, mais ce sont tous deux de simples nombres — rien n'indique s'il s'agit d'ECTS, d'EAP ou d'heures de contact. Credential Commons exige une valeur de crédit et distingue les heures académiques des heures d'horloge, car deux régulateurs différents demandent deux unités différentes.",
      },
      {
        theme: "Porter les acquis d'apprentissage en structure, pas en prose",
        cells: ["Nœuds identifiés", "Hors périmètre", "Critères narratifs", "Oui, par compétences", "Oui, natif", "teaches, approximatif"],
        detail:
          "Des acquis que l'on peut désigner et réutiliser — le même acquis partagé entre un programme et ses cours, et regroupé dans un acquis plus large. Open Badges conserve ses critères en texte narratif libre. Credential Commons exige au moins un acquis (une Violation s'il manque) sur ses profils de cours, de curriculum et de programme ; seul son profil de micro-titre laisse les acquis comme un ajout recommandé, de niveau Warning.",
      },
      {
        theme: "Aligner un acquis sur un référentiel de compétences",
        cells: ["Emplacement neutre", "Hors périmètre", "objet alignment", "Oui, central", "Oui, prêt ESCO", "competencyRequired"],
        detail:
          "Relier ce qui est appris à ESCO, à l'EQF, à O*NET ou à un référentiel national. C'est la seule ligne où Open Badges est fort. Credential Commons n'impose aucun référentiel : il fixe l'emplacement et garde le lien lisible quel que soit le référentiel qu'on y place, de sorte que deux adoptants peuvent choisir différemment tout en restant interopérables.",
      },
      {
        theme: "Revendiquer un niveau de qualification",
        cells: ["Emplacement facultatif", "Hors périmètre", "Via alignment", "Oui", "Oui, natif EQF", "educationalLevel"],
        detail:
          "Un niveau reconnu, comme 1 à 8 dans l'EQF. Credential Commons laisse cela facultatif à dessein : les référentiels de niveaux sont un outil de traduction pour les qualifications formelles, et un micro-titre qui ne revendique aucun niveau reste parfaitement conforme.",
      },
      {
        theme: "Conserver les versions d'un curriculum dans le temps",
        cells: ["Nouvel @id, sans champ", "Signe un instant", "Chaîne de version", "Identifiant de version", "Identifiant de version", "Hors périmètre"],
        detail:
          "À quelle version d'un programme un titre appartient, et le fait de garder les versions antérieures lisibles au lieu de les écraser. La plupart des normes peuvent étiqueter une version. Credential Commons n'a pas de champ de version qui lui soit propre : la convention veut qu'un curriculum révisé reçoive son propre identifiant, de sorte qu'une cohorte plus ancienne se rattache toujours à ce qu'elle a réellement étudié plutôt qu'à l'édition du jour.",
      },
      {
        theme: "L'attribuer à une personne nommée",
        cells: ["Correspond à OB3", "Objet principal", "Objet principal", "Hors périmètre", "Oui, via EDC", "Hors périmètre"],
        detail:
          "Le moment où quelqu'un l'obtient : la personne, la date, la preuve. Credential Commons a un profil de réussite qui correspond directement à un AchievementCredential Open Badges 3.0, mais il n'émet ni ne détient jamais rien lui-même. Cette ligne, c'est la raison d'être de Verifiable Credentials et d'Open Badges.",
      },
      {
        theme: "Prouver qui l'a délivré et que rien n'a changé",
        cells: ["Pas son rôle", "Objet principal", "Hérité de VC", "Hors périmètre", "Construit sur VC", "Hors périmètre"],
        detail:
          "La preuve cryptographique qu'un émetteur nommé a dit cela et que personne ne l'a modifié depuis. Credential Commons ne fait délibérément rien de tout cela. Une signature prouve la paternité, pas la qualité — les deux tâches restent plus nettes séparées, et c'est la moitié que Verifiable Credentials fait correctement.",
      },
      {
        theme: "Vous dire ce qui manque dans vos données",
        cells: ["Une commande, gratuite", "Hors périmètre", "Validation de schéma", "Revue du registre", "Validation de schéma", "Hors périmètre"],
        detail:
          "Pas si le fichier s'analyse correctement, mais si quelque chose manque dont la prochaine organisation aura besoin — une valeur de crédit, une langue, un acquis. Exécuter cc validate le signale en langage clair, gratuitement et sans inscription. La validation de schéma vous dit que la forme est valide ; elle ne vous dit pas que la fiche est utile.",
      },
      {
        theme: "Être lisible sur le web ouvert et par l'IA",
        cells: ["JSON-LD + llms.txt", "Hors périmètre", "Rarement public", "Recherche de registre", "Recherche Europass", "Objet principal"],
        detail:
          "Si un moteur de recherche ou un assistant peut lire votre programme et le citer correctement. schema.org est ce qu'ils analysent déjà, et les badges délivrés se trouvent généralement dans un portefeuille numérique où personne ne peut les voir. Credential Commons réutilise schema.org, ajoute les champs dont l'éducation a besoin, et publie un résumé lisible par machine afin que les assistants obtiennent la réponse au lieu de deviner.",
      },
    ],
  },
};
