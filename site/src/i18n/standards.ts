// "How it fits with the standards" page copy per locale. This page exists because
// the commonest misreading of the project is that it competes with Verifiable
// Credentials or Open Badges. It does not: those answer "who earned this, and who
// says so", this answers "what is this thing". Keep the copy plain — no markup in
// the strings, so every locale stays trivially checkable against `en`.
//
// Parity rule for translators: same number of sections, rows, and `adds` entries,
// in the same order. Proper names (Credential Commons, W3C Verifiable Credentials,
// Open Badges 3.0, CTDL, ELM / Europass, schema.edu.ee, schema.org, ECTS, EAP, EQF,
// JSON-LD, SHACL) are NOT translated.

import type { Locale } from "./ui";

export type StandardsDict = {
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  lede: string;
  /** The two-layer explanation, three sections. */
  sections: { h: string; p: string }[];
  tableHeading: string;
  tableIntro: string;
  /** Column headers of the comparison table. */
  columns: { name: string; what: string; need: string; not: string };
  /** One row per standard. `name` is a proper name and stays untranslated. */
  rows: { name: string; what: string; need: string; not: string }[];
  addsHeading: string;
  adds: { h: string; p: string }[];
  gapsHeading: string;
  gapsP: string;
  close: string;
  backHome: string;
};

export const standards: Record<Locale, StandardsDict> = {
  en: {
    navLabel: "How it fits with the standards",
    metaTitle: "Credential Commons and the standards — Verifiable Credentials, Open Badges, CTDL, ELM",
    metaDescription:
      "How Credential Commons relates to W3C Verifiable Credentials, Open Badges 3.0, CTDL, ELM/Europass and schema.edu.ee: what each one is for, when you need which, and what Credential Commons adds.",
    heading: "How it fits with the standards",
    lede:
      "Credential Commons does not compete with Verifiable Credentials or Open Badges. They answer a different question. This page says plainly which question each one answers, so you can see what you actually need.",
    sections: [
      {
        h: "Two different questions",
        p: "A credential has two halves. The first: what is this thing? — its name, its volume, its language, its provider, the learning outcomes, which version of the curriculum it belongs to. The second: who earned it, and who says so? — the person, the date, the evidence, the issuer's signature. Verifiable Credentials and Open Badges answer the second question very well. Credential Commons answers the first.",
      },
      {
        h: "Description comes before the award",
        p: "Most of the work happens before anyone earns anything. A programme is designed, its outcomes are written, its volume is set, it is published in a catalogue, it is revised year after year. None of that has a person in it — which is also why it can be published openly without touching anyone's personal data. Credential Commons is the shape for that stage. When someone finally earns the thing, an issuer signs it into a Verifiable Credential and the description travels with it.",
      },
      {
        h: "A signature is not quality",
        p: "A Verifiable Credential proves that a particular issuer said a particular thing, and that nobody altered it afterwards. It does not check whether what they said is any good. A badge with no volume, no language and a one-line description signs and verifies exactly as cleanly as a complete one. Credential Commons is the check that runs before the signature: it tells you, in plain language, what is missing.",
      },
    ],
    tableHeading: "Which one do you need?",
    tableIntro:
      "Find the row that matches your question. Most organisations end up using two or three of these together — they stack, they do not replace each other.",
    columns: {
      name: "Standard",
      what: "What it actually is",
      need: "You need it when…",
      not: "What it does not do",
    },
    rows: [
      {
        name: "Credential Commons",
        what: "A thin shared shape for describing an offering, a curriculum and a credential — plus a validator that tells you what is missing.",
        need: "You want your catalogue, curricula and credentials to be readable by other organisations, and you want to know whether your data is actually complete.",
        not: "It issues nothing, signs nothing and awards nothing to a person. It is not an authority and grants no stamp of its own.",
      },
      {
        name: "W3C Verifiable Credentials",
        what: "A general container and signature format: proof that a named issuer said something about a named subject, and that it has not been altered since.",
        need: "You have to prove who issued a credential and that nobody changed it — a wallet, a cross-border check, a fraud-sensitive context.",
        not: "It says nothing about what a credential should contain. Any content, complete or empty, signs equally well.",
      },
      {
        name: "Open Badges 3.0",
        what: "A Verifiable Credentials profile for achievements: this person earned this achievement, with evidence and a date.",
        need: "You award something to individual people and want it to land in a wallet or a badge platform.",
        not: "Its credits field has no ECTS/EAP unit attached, and its criteria field is free narrative rather than structured learning outcomes.",
      },
      {
        name: "CTDL",
        what: "A rich vocabulary for describing credentials, competencies and the organisations behind them, used mainly in the United States.",
        need: "You publish into the US credential ecosystem, or you need its depth of credential-type distinctions.",
        not: "It is large. Adopting it fully is a project, not an afternoon.",
      },
      {
        name: "ELM / Europass",
        what: "The European Learning Model — the data model behind Europass and European digital credentials.",
        need: "You need European recognition: Europass, EQF levels, cross-border mobility.",
        not: "It is built for the European formal machinery; it does not tell you whether your own data is complete.",
      },
      {
        name: "schema.edu.ee",
        what: "A national vocabulary that fixes local meaning — the terms an Estonian regulator, school or funder actually uses. Other countries have their own.",
        need: "You operate in that country and the local terms have to be exact.",
        not: "On its own it does not travel outside its country.",
      },
      {
        name: "schema.org",
        what: "The general web vocabulary that search engines and AI assistants already read.",
        need: "You want your programmes to be understood on the open web, by search and by AI agents.",
        not: "For education it stays shallow: a bare credit count and competency link exist, but no ECTS model, outcome structure, or versioning.",
      },
    ],
    addsHeading: "What Credential Commons adds",
    adds: [
      {
        h: "Description before the award, with no person in it",
        p: "The catalogue, the curriculum, the outcomes, the volume — the part that exists before anyone enrols, and can therefore be published openly.",
      },
      {
        h: "A conformance mirror",
        p: "One command tells you in plain language what is missing. Nothing else on this page checks your data for you.",
      },
      {
        h: "One description, several outputs",
        p: "Describe your offering once, then export to CTDL, ELM/Europass or Open Badges 3.0. You do not have to bet on a single standard.",
      },
      {
        h: "The European measures",
        p: "ECTS/EAP credits, academic versus clock hours, an optional EQF level, structured learning outcomes — the fields European funders and regulators actually ask for.",
      },
      {
        h: "Versions, kept",
        p: "Which version of a curriculum a credential belongs to. A signature captures one moment; it does not model a programme's history.",
      },
    ],
    gapsHeading: "Where the join is still rough",
    gapsP:
      "Being honest about this is part of the point. Exporting to Open Badges 3.0 currently loses two things that matter most in Europe: OB3's credit field carries no unit, so ECTS/EAP still has to travel as an alignment or an extension, and its criteria field is narrative, so structured learning outcomes map only loosely. That gap is exactly why a description layer is needed. Closing it properly is open work — the crosswalks live in the repository and pull requests are welcome.",
    close:
      "None of this asks you to pick a side. Describe your data once in a shape that is complete, and the standard your audience already trusts is one export away.",
    backHome: "← Home",
  },
  et: {
    navLabel: "Kuidas see sobitub standarditega",
    metaTitle: "Credential Commons ja standardid — Verifiable Credentials, Open Badges, CTDL, ELM",
    metaDescription:
      "Kuidas Credential Commons suhestub W3C Verifiable Credentialsi, Open Badges 3.0, CTDL, ELM/Europassi ja schema.edu.ee-ga: milleks igaüks neist on, millal millist vaja on ja mida Credential Commons juurde annab.",
    heading: "Kuidas see sobitub standarditega",
    lede:
      "Credential Commons ei konkureeri Verifiable Credentialsi ega Open Badgesiga. Need vastavad teisele küsimusele. See leht ütleb selgelt, millisele küsimusele igaüks vastab, et sa näeksid, mida sul tegelikult vaja on.",
    sections: [
      {
        h: "Kaks erinevat küsimust",
        p: "Tunnistusel on kaks poolt. Esimene: mis asi see on? — nimi, maht, keel, pakkuja, õpiväljundid, millisesse õppekava versiooni see kuulub. Teine: kes selle sai ja kes seda kinnitab? — inimene, kuupäev, tõendid, väljaandja allkiri. Verifiable Credentials ja Open Badges vastavad teisele küsimusele väga hästi. Credential Commons vastab esimesele.",
      },
      {
        h: "Kirjeldus tuleb enne tunnistuse saamist",
        p: "Enamik tööst toimub enne, kui keegi midagi saab. Programm kavandatakse, selle väljundid kirjutatakse, maht määratakse, see avaldatakse kataloogis, seda uuendatakse aasta-aastalt. Selles kõiges pole ühtki inimest — sellepärast saabki seda avaldada avalikult, ilma et see puudutaks kellegi isikuandmeid. Credential Commons on selle etapi kuju. Kui keegi lõpuks asja saab, allkirjastab väljaandja selle Verifiable Credentialiks ja kirjeldus liigub sellega kaasa.",
      },
      {
        h: "Allkiri ei taga kvaliteeti",
        p: "Verifiable Credential tõendab, et konkreetne väljaandja ütles konkreetse asja ja et keegi pole seda hiljem muutnud. See ei kontrolli, kas öeldu on üldse hea. Märk ilma mahu ja keeleta, mille kirjeldus on kõigest üherealine, allkirjastub ja kontrollitakse täpselt sama puhtalt kui täielik märk. Credential Commons on kontroll, mis käib enne allkirja: ta ütleb sulle selges keeles, mis on puudu.",
      },
    ],
    tableHeading: "Millist sul vaja on?",
    tableIntro:
      "Leia rida, mis vastab sinu küsimusele. Enamik organisatsioone kasutab lõpuks kaht-kolme neist koos — need täiendavad, mitte ei asenda üksteist.",
    columns: {
      name: "Standard",
      what: "Mis see tegelikult on",
      need: "Sul on seda vaja, kui…",
      not: "Mida see ei tee",
    },
    rows: [
      {
        name: "Credential Commons",
        what: "Õhuke jagatud kuju koolituse, õppekava ja tunnistuse kirjeldamiseks — pluss valideerija, mis ütleb, mis on puudu.",
        need: "Tahad, et su kataloog, õppekavad ja tunnistused oleksid teistele organisatsioonidele loetavad, ja tahad teada, kas su andmed on tegelikult täielikud.",
        not: "See ei anna midagi välja, ei allkirjasta ega tunnusta kedagi. See ei ole autoriteet ega löö oma templit.",
      },
      {
        name: "W3C Verifiable Credentials",
        what: "Üldine konteineri- ja allkirjaformaat: tõend, et nimeline väljaandja ütles midagi nimelise subjekti kohta ja et seda pole hiljem muudetud.",
        need: "Pead tõendama, kes tunnistuse väljastas ja et keegi seda ei muutnud — rahakott, piiriülene kontroll, pettuseohtlik olukord.",
        not: "See ei ütle midagi selle kohta, mida tunnistus peaks sisaldama. Iga sisu, täielik või tühi, allkirjastub ühtviisi hästi.",
      },
      {
        name: "Open Badges 3.0",
        what: "Verifiable Credentialsi profiil saavutustele: see inimene saavutas selle, koos tõendite ja kuupäevaga.",
        need: "Annad midagi üksikutele inimestele ja tahad, et see jõuaks rahakotti või märgiplatvormile.",
        not: "Selle ainepunktide väljal ei ole ECTS/EAP ühikut, ja selle kriteeriumide väli on vaba tekst, mitte struktureeritud õpiväljundid.",
      },
      {
        name: "CTDL",
        what: "Rikkalik sõnavara tunnistuste, kompetentside ja nende taga olevate organisatsioonide kirjeldamiseks, kasutusel peamiselt USA-s.",
        need: "Avaldad USA tunnistuste ökosüsteemi jaoks või vajad selle detailsust tunnistuse-tüüpide eristamisel.",
        not: "See on suur. Selle täielik kasutuselevõtt on projekt, mitte pärastlõuna töö.",
      },
      {
        name: "ELM / Europass",
        what: "Euroopa õppimismudel (European Learning Model) — Europassi ja Euroopa digitaalsete tunnistuste taga olev andmemudel.",
        need: "Vajad Euroopa tunnustust: Europass, EQF-tasemed, piiriülene liikuvus.",
        not: "See on ehitatud Euroopa ametliku masinavärgi jaoks; see ei ütle, kas su enda andmed on täielikud.",
      },
      {
        name: "schema.edu.ee",
        what: "Riiklik sõnavara, mis fikseerib kohaliku tähenduse — terminid, mida Eesti regulaator, kool või rahastaja tegelikult kasutab. Teistel riikidel on omad.",
        need: "Tegutsed selles riigis ja kohalikud terminid peavad olema täpsed.",
        not: "Üksinda ei liigu see riigist väljapoole.",
      },
      {
        name: "schema.org",
        what: "Üldine veebisõnavara, mida otsingumootorid ja AI-abilised juba loevad.",
        need: "Tahad, et su programme mõistetaks avalikus veebis, otsingu ja AI-agentide poolt.",
        not: "Hariduse jaoks jääb see pealiskaudseks: lihtne ainepunktide arv ja kompetentsiseos on olemas, kuid ECTS-mudel, väljundite struktuur ja versioneerimine puuduvad.",
      },
    ],
    addsHeading: "Mida Credential Commons juurde annab",
    adds: [
      {
        h: "Kirjeldus enne tunnistamist, ilma inimeseta selles",
        p: "Kataloog, õppekava, väljundid, maht — osa, mis on olemas enne, kui keegi end kirja paneb, ja mida saab seetõttu avalikult avaldada.",
      },
      {
        h: "Vastavuspeegel",
        p: "Üks käsk ütleb sulle selges keeles, mis on puudu. Miski muu sellel lehel ei kontrolli su andmeid sinu eest.",
      },
      {
        h: "Üks kirjeldus, mitu väljundit",
        p: "Kirjelda oma pakkumine korra ja ekspordi see siis CTDL-i, ELM/Europassi või Open Badges 3.0-le. Sa ei pea panustama ühele standardile.",
      },
      {
        h: "Euroopa mõõdikud",
        p: "ECTS/EAP-punktid, akadeemilised versus astronoomilised tunnid, valikuline EQF-tase, struktureeritud õpiväljundid — väljad, mida Euroopa rahastajad ja regulaatorid tegelikult küsivad.",
      },
      {
        h: "Versioonid säilivad",
        p: "Millisesse õppekava versiooni tunnistus kuulub. Allkiri jäädvustab ühe hetke; see ei modelleeri programmi ajalugu.",
      },
    ],
    gapsHeading: "Kus ühenduskohad on veel konarlikud",
    gapsP:
      "Selle kohta ausalt rääkimine ongi osa mõttest. Eksport Open Badges 3.0-le kaotab praegu kaks asja, mis Euroopas kõige rohkem loevad: OB3 ainepunktide väljal pole ühikut, mistõttu ECTS/EAP peab ikkagi liikuma joonduse või laiendusena, ja selle kriteeriumide väli on vabas vormis, mistõttu struktureeritud õpiväljundid kaardistuvad ainult ligikaudselt. Just see lünk ongi põhjus, miks kirjelduskihti on vaja. Selle korralik sulgemine on avatud töö — vasted asuvad hoidlas ja pull request'id on oodatud.",
    close:
      "Miski siin ei nõua, et sa valiksid poole. Kirjelda oma andmed korra täielikul kujul ja standard, mida su sihtrühm juba usaldab, on ühe ekspordi kaugusel.",
    backHome: "← Avaleht",
  },
  fi: {
    navLabel: "Miten se sopii yhteen standardien kanssa",
    metaTitle: "Credential Commons ja standardit — Verifiable Credentials, Open Badges, CTDL, ELM",
    metaDescription:
      "Miten Credential Commons liittyy W3C Verifiable Credentialsiin, Open Badges 3.0:aan, CTDL:ään, ELM/Europassiin ja schema.edu.ee:hen: mihin kukin on tarkoitettu, milloin mitäkin tarvitset ja mitä Credential Commons tuo lisää.",
    heading: "Miten se sopii yhteen standardien kanssa",
    lede:
      "Credential Commons ei kilpaile Verifiable Credentialsin tai Open Badgesin kanssa. Ne vastaavat eri kysymykseen. Tämä sivu kertoo suoraan, mihin kysymykseen kukin vastaa, jotta näet mitä oikeasti tarvitset.",
    sections: [
      {
        h: "Kaksi eri kysymystä",
        p: "Todistuksella on kaksi puolta. Ensimmäinen: mikä tämä asia on? — sen nimi, laajuus, kieli, tarjoaja, oppimistulokset, mihin opetussuunnitelman versioon se kuuluu. Toinen: kuka sen ansaitsi ja kuka sen väittää? — henkilö, päivämäärä, näyttö, myöntäjän allekirjoitus. Verifiable Credentials ja Open Badges vastaavat toiseen kysymykseen erittäin hyvin. Credential Commons vastaa ensimmäiseen.",
      },
      {
        h: "Kuvaus tulee ennen myöntämistä",
        p: "Suurin osa työstä tapahtuu ennen kuin kukaan ansaitsee mitään. Ohjelma suunnitellaan, sen oppimistulokset kirjoitetaan, laajuus määritetään, se julkaistaan luettelossa ja sitä päivitetään vuosi vuodelta. Tässä ei ole ihmisiä mukana missään vaiheessa — siksi sen voi julkaista avoimesti koskematta kenenkään henkilötietoihin. Credential Commons on tämän vaiheen muoto. Kun joku lopulta ansaitsee sen, myöntäjä allekirjoittaa sen Verifiable Credentialiksi ja kuvaus kulkee sen mukana.",
      },
      {
        h: "Allekirjoitus ei ole laatu",
        p: "Verifiable Credential todistaa, että tietty myöntäjä sanoi tietyn asian ja ettei kukaan ole muuttanut sitä jälkikäteen. Se ei tarkista, onko sanottu asia hyvä. Merkki ilman laajuutta, ilman kieltä ja yhden rivin kuvauksella allekirjoitetaan ja vahvistetaan yhtä siististi kuin täydellinen. Credential Commons on tarkistus, joka ajetaan ennen allekirjoitusta: se kertoo selkokielellä, mitä puuttuu.",
      },
    ],
    tableHeading: "Mitä niistä tarvitset?",
    tableIntro:
      "Etsi rivi, joka vastaa kysymystäsi. Useimmat organisaatiot päätyvät käyttämään kahta tai kolmea näistä yhdessä — ne pinoutuvat, eivät korvaa toisiaan.",
    columns: {
      name: "Standardi",
      what: "Mikä se oikeasti on",
      need: "Tarvitset sitä, kun…",
      not: "Mitä se ei tee",
    },
    rows: [
      {
        name: "Credential Commons",
        what: "Ohut yhteinen muoto tarjonnan, opetussuunnitelman ja todistuksen kuvaamiseen — sekä validaattori, joka kertoo mitä puuttuu.",
        need: "Haluat, että luettelosi, opetussuunnitelmasi ja todistuksesi ovat muiden organisaatioiden luettavissa, ja haluat tietää, ovatko tietosi todella täydelliset.",
        not: "Se ei myönnä mitään, ei allekirjoita mitään eikä anna mitään kenellekään henkilölle. Se ei ole auktoriteetti eikä lyö omaa leimaansa.",
      },
      {
        name: "W3C Verifiable Credentials",
        what: "Yleinen säiliö- ja allekirjoitusmuoto: todiste siitä, että nimetty myöntäjä sanoi jotain nimetystä kohteesta ja ettei sitä ole sen jälkeen muutettu.",
        need: "Sinun täytyy todistaa, kuka todistuksen myönsi ja ettei kukaan ole muuttanut sitä — lompakko, rajat ylittävä tarkistus, petosherkkä yhteys.",
        not: "Se ei kerro mitään siitä, mitä todistuksen pitäisi sisältää. Mikä tahansa sisältö, täydellinen tai tyhjä, allekirjoittuu yhtä hyvin.",
      },
      {
        name: "Open Badges 3.0",
        what: "Verifiable Credentials -profiili saavutuksille: tämä henkilö ansaitsi tämän saavutuksen, näytöllä ja päivämäärällä varustettuna.",
        need: "Myönnät jotain yksittäisille ihmisille ja haluat sen päätyvän lompakkoon tai merkkialustalle.",
        not: "Sen opintopistekenttään ei ole liitetty ECTS/EAP-yksikköä, ja sen kriteerikenttä on vapaata tekstiä eikä jäsenneltyjä oppimistuloksia.",
      },
      {
        name: "CTDL",
        what: "Rikas sanasto todistusten, osaamisen ja niiden takana olevien organisaatioiden kuvaamiseen, käytössä pääasiassa Yhdysvalloissa.",
        need: "Julkaiset Yhdysvaltain todistusekosysteemiin tai tarvitset sen syvällisiä todistustyyppien erotteluja.",
        not: "Se on laaja. Sen täysimääräinen käyttöönotto on projekti, ei iltapäivän hommaa.",
      },
      {
        name: "ELM / Europass",
        what: "European Learning Model — Europassin ja eurooppalaisten digitaalisten todistusten taustalla oleva tietomalli.",
        need: "Tarvitset eurooppalaista tunnustusta: Europass, EQF-tasot, rajat ylittävä liikkuvuus.",
        not: "Se on rakennettu Euroopan viralliselle koneistolle; se ei kerro, ovatko omat tietosi täydelliset.",
      },
      {
        name: "schema.edu.ee",
        what: "Kansallinen sanasto, joka lyö lukkoon paikallisen merkityksen — termit, joita virolainen valvoja, koulu tai rahoittaja oikeasti käyttää. Muilla mailla on omansa.",
        need: "Toimit kyseisessä maassa ja paikallisten termien on oltava tarkkoja.",
        not: "Yksinään se ei kulje maan rajojen ulkopuolelle.",
      },
      {
        name: "schema.org",
        what: "Yleinen verkon sanasto, jota hakukoneet ja tekoälyavustajat jo lukevat.",
        need: "Haluat, että ohjelmasi ymmärretään avoimessa webissä, hakukoneiden ja tekoälyagenttien toimesta.",
        not: "Koulutuksen osalta se pysyy pinnallisena: pelkkä opintopistemäärä ja osaamislinkki ovat olemassa, mutta ECTS-mallia, oppimistulosrakennetta tai versiointia ei ole.",
      },
    ],
    addsHeading: "Mitä Credential Commons tuo lisää",
    adds: [
      {
        h: "Kuvaus ennen myöntämistä, ilman ketään mukana",
        p: "Luettelo, opetussuunnitelma, oppimistulokset, laajuus — osa, joka on olemassa ennen kuin kukaan ilmoittautuu, ja joka voidaan siksi julkaista avoimesti.",
      },
      {
        h: "Vaatimustenmukaisuuspeili",
        p: "Yksi komento kertoo selkokielellä, mitä puuttuu. Mikään muu tällä sivulla ei tarkista tietojasi puolestasi.",
      },
      {
        h: "Yksi kuvaus, useita tulosteita",
        p: "Kuvaa tarjontasi kerran ja vie se sitten CTDL:ään, ELM/Europassiin tai Open Badges 3.0:aan. Sinun ei tarvitse panostaa vain yhteen standardiin.",
      },
      {
        h: "Eurooppalaiset mittarit",
        p: "ECTS/EAP-opintopisteet, akateemiset tunnit vai kellotunnit, valinnainen EQF-taso, jäsennellyt oppimistulokset — kentät, joita eurooppalaiset rahoittajat ja valvojat oikeasti kysyvät.",
      },
      {
        h: "Versiot, säilössä",
        p: "Mihin opetussuunnitelman versioon todistus kuuluu. Allekirjoitus tallentaa yhden hetken; se ei mallinna ohjelman historiaa.",
      },
    ],
    gapsHeading: "Missä liitos on vielä karkea",
    gapsP:
      "Tästä rehellisesti kertominen on osa asian ydintä. Vienti Open Badges 3.0:aan menettää tällä hetkellä kaksi Euroopassa eniten merkitsevää asiaa: OB3:n opintopistekenttä ei kanna yksikköä, joten ECTS/EAP joutuu edelleen kulkemaan kohdistuksena tai laajennuksena, ja sen kriteerikenttä on kertovaa tekstiä, joten jäsennellyt oppimistulokset kartoittuvat vain löyhästi. Juuri tämä aukko on syy, miksi kuvauskerrosta tarvitaan. Sen kunnollinen korjaaminen on avointa työtä — vastaavuudet ovat repositoriossa, ja pull requestit ovat tervetulleita.",
    close:
      "Mikään tästä ei vaadi sinua valitsemaan puolta. Kuvaa tietosi kerran täydellisessä muodossa, ja standardi, johon yleisösi jo luottaa, on yhden viennin päässä.",
    backHome: "← Etusivu",
  },
  de: {
    navLabel: "Wie es zu den Standards passt",
    metaTitle: "Credential Commons und die Standards — Verifiable Credentials, Open Badges, CTDL, ELM",
    metaDescription:
      "Wie sich Credential Commons zu W3C Verifiable Credentials, Open Badges 3.0, CTDL, ELM/Europass und schema.edu.ee verhält: wofür jeder Standard da ist, wann Sie welchen brauchen, und was Credential Commons hinzufügt.",
    heading: "Wie es zu den Standards passt",
    lede:
      "Credential Commons konkurriert nicht mit Verifiable Credentials oder Open Badges. Beide beantworten eine andere Frage. Diese Seite sagt klar, welche Frage jeder beantwortet, damit Sie sehen, was Sie tatsächlich brauchen.",
    sections: [
      {
        h: "Zwei unterschiedliche Fragen",
        p: "Ein Nachweis hat zwei Hälften. Die erste: Was ist dieses Ding? — sein Name, sein Umfang, seine Sprache, sein Anbieter, die Lernergebnisse, zu welcher Version des Curriculums es gehört. Die zweite: Wer hat es erworben, und wer sagt das? — die Person, das Datum, die Nachweise, die Signatur des Ausstellers. Verifiable Credentials und Open Badges beantworten die zweite Frage sehr gut. Credential Commons beantwortet die erste.",
      },
      {
        h: "Beschreibung kommt vor der Vergabe",
        p: "Der größte Teil der Arbeit passiert, bevor irgendjemand etwas erwirbt. Ein Programm wird entworfen, seine Ergebnisse werden formuliert, sein Umfang wird festgelegt, es wird in einem Katalog veröffentlicht, es wird Jahr für Jahr überarbeitet. Nichts davon enthält eine Person — weshalb es auch offen veröffentlicht werden kann, ohne die personenbezogenen Daten von irgendjemandem zu berühren. Credential Commons ist die Form für diese Phase. Wenn jemand die Sache schließlich erwirbt, signiert ein Aussteller sie zu einer Verifiable Credential, und die Beschreibung reist mit.",
      },
      {
        h: "Eine Signatur beweist keine Qualität",
        p: "Eine Verifiable Credential beweist, dass ein bestimmter Aussteller eine bestimmte Sache gesagt hat und dass niemand sie danach verändert hat. Sie prüft nicht, ob das Gesagte etwas taugt. Ein Badge ohne Umfang, ohne Sprache und mit einer einzeiligen Beschreibung signiert und verifiziert genauso sauber wie ein vollständiges. Credential Commons ist die Prüfung, die vor der Signatur läuft: Sie sagt Ihnen in klarer Sprache, was fehlt.",
      },
    ],
    tableHeading: "Welchen brauchen Sie?",
    tableIntro:
      "Finden Sie die Zeile, die zu Ihrer Frage passt. Die meisten Organisationen nutzen am Ende zwei oder drei davon zusammen — sie ergänzen sich, statt sich zu ersetzen.",
    columns: {
      name: "Standard",
      what: "Was es wirklich ist",
      need: "Sie brauchen es, wenn …",
      not: "Was es nicht tut",
    },
    rows: [
      {
        name: "Credential Commons",
        what: "Eine schlanke, gemeinsame Form zur Beschreibung eines Angebots, eines Curriculums und eines Nachweises — plus ein Validator, der Ihnen sagt, was fehlt.",
        need: "Sie wollen, dass Ihr Katalog, Ihre Curricula und Ihre Nachweise für andere Organisationen lesbar sind, und Sie wollen wissen, ob Ihre Daten wirklich vollständig sind.",
        not: "Es stellt nichts aus, signiert nichts und vergibt nichts an eine Person. Es ist keine Autorität und vergibt kein eigenes Siegel.",
      },
      {
        name: "W3C Verifiable Credentials",
        what: "Ein allgemeines Container- und Signaturformat: der Beweis, dass ein namentlich genannter Aussteller etwas über ein namentlich genanntes Subjekt gesagt hat und dass es seitdem nicht verändert wurde.",
        need: "Sie müssen beweisen, wer einen Nachweis ausgestellt hat und dass ihn niemand verändert hat — eine Wallet, eine grenzüberschreitende Prüfung, ein betrugsanfälliger Kontext.",
        not: "Es sagt nichts darüber, was ein Nachweis enthalten sollte. Jeder Inhalt, vollständig oder leer, lässt sich gleich gut signieren.",
      },
      {
        name: "Open Badges 3.0",
        what: "Ein Verifiable-Credentials-Profil für Leistungen: Diese Person hat diese Leistung erworben, mit Nachweisen und einem Datum.",
        need: "Sie vergeben etwas an einzelne Personen und wollen, dass es in einer Wallet oder einer Badge-Plattform landet.",
        not: "Sein Leistungspunkte-Feld hat keine ECTS/EAP-Einheit angehängt, und sein Kriterien-Feld ist freier Fließtext statt strukturierter Lernergebnisse.",
      },
      {
        name: "CTDL",
        what: "Ein umfangreiches Vokabular zur Beschreibung von Nachweisen, Kompetenzen und den dahinterstehenden Organisationen, hauptsächlich in den USA verwendet.",
        need: "Sie veröffentlichen im US-amerikanischen Nachweis-Ökosystem, oder Sie brauchen seine detaillierte Unterscheidung von Nachweistypen.",
        not: "Es ist umfangreich. Es vollständig einzuführen ist ein Projekt, kein Nachmittag.",
      },
      {
        name: "ELM / Europass",
        what: "Das European Learning Model — das Datenmodell hinter Europass und europäischen digitalen Nachweisen.",
        need: "Sie brauchen europäische Anerkennung: Europass, EQF-Niveaus, grenzüberschreitende Mobilität.",
        not: "Es ist für den europäischen formalen Apparat gebaut; es sagt Ihnen nicht, ob Ihre eigenen Daten vollständig sind.",
      },
      {
        name: "schema.edu.ee",
        what: "Ein nationales Vokabular, das lokale Bedeutung festlegt — die Begriffe, die eine estnische Aufsichtsbehörde, Schule oder Fördereinrichtung tatsächlich verwendet. Andere Länder haben ihre eigenen.",
        need: "Sie sind in diesem Land tätig, und die lokalen Begriffe müssen exakt stimmen.",
        not: "Für sich allein reist es nicht über sein Land hinaus.",
      },
      {
        name: "schema.org",
        what: "Das allgemeine Web-Vokabular, das Suchmaschinen und KI-Assistenten bereits lesen.",
        need: "Sie wollen, dass Ihre Programme im offenen Web verstanden werden, von der Suche und von KI-Agenten.",
        not: "Für Bildung bleibt es flach: es gibt zwar eine bloße Punktzahl und eine Kompetenz-Verknüpfung, aber kein ECTS-Modell, keine Lernergebnis-Struktur und keine Versionierung.",
      },
    ],
    addsHeading: "Was Credential Commons hinzufügt",
    adds: [
      {
        h: "Beschreibung vor der Vergabe, ohne Person darin",
        p: "Der Katalog, das Curriculum, die Ergebnisse, der Umfang — der Teil, der existiert, bevor sich irgendjemand einschreibt, und der deshalb offen veröffentlicht werden kann.",
      },
      {
        h: "Ein Konformitätsspiegel",
        p: "Ein einziger Befehl sagt Ihnen in klarer Sprache, was fehlt. Nichts anderes auf dieser Seite prüft Ihre Daten für Sie.",
      },
      {
        h: "Eine Beschreibung, mehrere Ausgaben",
        p: "Beschreiben Sie Ihr Angebot einmal und exportieren Sie es dann nach CTDL, ELM/Europass oder Open Badges 3.0. Sie müssen nicht auf einen einzigen Standard setzen.",
      },
      {
        h: "Die europäischen Kennzahlen",
        p: "ECTS/EAP-Punkte, akademische versus Zeitstunden, ein optionales EQF-Niveau, strukturierte Lernergebnisse — die Felder, die europäische Förderstellen und Aufsichtsbehörden tatsächlich verlangen.",
      },
      {
        h: "Versionen, bewahrt",
        p: "Zu welcher Version eines Curriculums ein Nachweis gehört. Eine Signatur hält einen Moment fest; sie bildet nicht die Geschichte eines Programms ab.",
      },
    ],
    gapsHeading: "Wo die Nahtstelle noch rau ist",
    gapsP:
      "Ehrlich damit umzugehen gehört zur Sache. Der Export nach Open Badges 3.0 verliert derzeit zwei Dinge, die in Europa am meisten zählen: OB3s Leistungspunkte-Feld trägt keine Einheit, daher muss ECTS/EAP weiterhin als Verknüpfung oder Erweiterung reisen, und sein Kriterien-Feld ist Fließtext, sodass strukturierte Lernergebnisse nur lose abgebildet werden. Genau diese Lücke ist der Grund, warum eine Beschreibungsschicht nötig ist. Sie sauber zu schließen ist offene Arbeit — die Crosswalks liegen im Repository, und Pull Requests sind willkommen.",
    close:
      "Nichts davon verlangt von Ihnen, sich für eine Seite zu entscheiden. Beschreiben Sie Ihre Daten einmal in einer vollständigen Form, und der Standard, dem Ihr Publikum bereits vertraut, ist nur einen Export entfernt.",
    backHome: "← Startseite",
  },
  fr: {
    navLabel: "Comment cela s'articule avec les normes",
    metaTitle: "Credential Commons et les normes — Verifiable Credentials, Open Badges, CTDL, ELM",
    metaDescription:
      "Comment Credential Commons s'articule avec W3C Verifiable Credentials, Open Badges 3.0, CTDL, ELM/Europass et schema.edu.ee : à quoi sert chacun, quand utiliser lequel, et ce que Credential Commons ajoute.",
    heading: "Comment cela s'articule avec les normes",
    lede:
      "Credential Commons ne fait pas concurrence à Verifiable Credentials ni à Open Badges. Ils répondent à une question différente. Cette page dit clairement à quelle question chacun répond, pour que vous voyiez ce dont vous avez réellement besoin.",
    sections: [
      {
        h: "Deux questions différentes",
        p: "Un titre a deux moitiés. La première : qu'est-ce que c'est ? — son nom, son volume, sa langue, son prestataire, les acquis d'apprentissage, à quelle version du curriculum il appartient. La seconde : qui l'a obtenu, et qui l'affirme ? — la personne, la date, la preuve, la signature de l'émetteur. Verifiable Credentials et Open Badges répondent très bien à la seconde question. Credential Commons répond à la première.",
      },
      {
        h: "La description précède l'attribution",
        p: "L'essentiel du travail se fait avant que quiconque obtienne quoi que ce soit. Un programme est conçu, ses acquis sont rédigés, son volume est fixé, il est publié dans un catalogue, il est révisé année après année. Rien de tout cela ne contient de personne — c'est aussi pourquoi cela peut être publié ouvertement sans toucher aux données personnelles de qui que ce soit. Credential Commons est la forme pour cette étape. Quand quelqu'un finit par obtenir le titre, un émetteur le signe en un Verifiable Credential et la description voyage avec lui.",
      },
      {
        h: "Une signature n'atteste pas la qualité",
        p: "Un Verifiable Credential prouve qu'un émetteur donné a affirmé une chose donnée, et que personne ne l'a modifiée depuis. Il ne vérifie pas si ce qui est affirmé est de qualité. Un badge sans volume, sans langue et avec une description d'une ligne se signe et se vérifie tout aussi proprement qu'un badge complet. Credential Commons est le contrôle qui s'exécute avant la signature : il vous dit, en langage clair, ce qui manque.",
      },
    ],
    tableHeading: "De quoi avez-vous besoin ?",
    tableIntro:
      "Trouvez la ligne qui correspond à votre question. La plupart des organisations finissent par en utiliser deux ou trois ensemble — elles se complètent, elles ne se remplacent pas.",
    columns: {
      name: "Norme",
      what: "Ce que c'est réellement",
      need: "Vous en avez besoin quand…",
      not: "Ce que ça ne fait pas",
    },
    rows: [
      {
        name: "Credential Commons",
        what: "Une forme commune et légère pour décrire une offre, un curriculum et un titre — plus un validateur qui vous dit ce qui manque.",
        need: "Vous voulez que votre catalogue, vos curriculums et vos titres soient lisibles par d'autres organisations, et vous voulez savoir si vos données sont réellement complètes.",
        not: "Il n'émet rien, ne signe rien et n'attribue rien à une personne. Ce n'est pas une autorité et il n'appose aucun sceau qui lui soit propre.",
      },
      {
        name: "W3C Verifiable Credentials",
        what: "Un format général de conteneur et de signature : la preuve qu'un émetteur nommé a affirmé quelque chose à propos d'un sujet nommé, et que cela n'a pas été modifié depuis.",
        need: "Vous devez prouver qui a délivré un titre et que personne ne l'a modifié — un portefeuille numérique, une vérification transfrontalière, un contexte sensible à la fraude.",
        not: "Cela ne dit rien de ce que doit contenir un titre. N'importe quel contenu, complet ou vide, se signe tout aussi bien.",
      },
      {
        name: "Open Badges 3.0",
        what: "Un profil de Verifiable Credentials pour les réussites : cette personne a obtenu cette réussite, avec une preuve et une date.",
        need: "Vous attribuez quelque chose à des personnes individuelles et voulez que cela atterrisse dans un portefeuille numérique ou une plateforme de badges.",
        not: "Son champ de crédits n'a aucune unité ECTS/EAP associée, et son champ de critères est un texte libre plutôt que des acquis d'apprentissage structurés.",
      },
      {
        name: "CTDL",
        what: "Un vocabulaire riche pour décrire les titres, les compétences et les organisations qui les délivrent, utilisé principalement aux États-Unis.",
        need: "Vous publiez dans l'écosystème américain des titres, ou vous avez besoin de sa richesse de distinctions entre types de titres.",
        not: "Il est vaste. L'adopter entièrement est un projet, pas l'affaire d'un après-midi.",
      },
      {
        name: "ELM / Europass",
        what: "L'European Learning Model — le modèle de données derrière Europass et les titres numériques européens.",
        need: "Vous avez besoin d'une reconnaissance européenne : Europass, niveaux EQF, mobilité transfrontalière.",
        not: "Il est construit pour les mécanismes formels européens ; il ne vous dit pas si vos propres données sont complètes.",
      },
      {
        name: "schema.edu.ee",
        what: "Un vocabulaire national qui fixe le sens local — les termes qu'un régulateur, une école ou un financeur estonien utilise réellement. D'autres pays ont le leur.",
        need: "Vous opérez dans ce pays et les termes locaux doivent être exacts.",
        not: "À lui seul, il ne voyage pas hors de son pays.",
      },
      {
        name: "schema.org",
        what: "Le vocabulaire web général que les moteurs de recherche et les assistants IA lisent déjà.",
        need: "Vous voulez que vos programmes soient compris sur le web ouvert, par la recherche et par les agents IA.",
        not: "Pour l'éducation, il reste sommaire : un simple compteur de crédits et un lien de compétence existent, mais pas de modèle ECTS, de structure des acquis, ni de gestion des versions.",
      },
    ],
    addsHeading: "Ce que Credential Commons ajoute",
    adds: [
      {
        h: "La description avant l'attribution, sans personne dedans",
        p: "Le catalogue, le curriculum, les acquis, le volume — la partie qui existe avant que quiconque s'inscrive, et qui peut donc être publiée ouvertement.",
      },
      {
        h: "Un miroir de conformité",
        p: "Une seule commande vous dit en langage clair ce qui manque. Rien d'autre sur cette page ne vérifie vos données à votre place.",
      },
      {
        h: "Une description, plusieurs sorties",
        p: "Décrivez votre offre une fois, puis exportez vers CTDL, ELM/Europass ou Open Badges 3.0. Vous n'avez pas à miser sur une seule norme.",
      },
      {
        h: "Les mesures européennes",
        p: "Crédits ECTS/EAP, heures académiques ou heures d'horloge, un niveau EQF facultatif, des acquis d'apprentissage structurés — les champs que les financeurs et régulateurs européens demandent réellement.",
      },
      {
        h: "Les versions, conservées",
        p: "À quelle version d'un curriculum un titre appartient. Une signature capture un instant ; elle ne modélise pas l'historique d'un programme.",
      },
    ],
    gapsHeading: "Là où le raccord est encore imparfait",
    gapsP:
      "Être honnête là-dessus fait partie du propos. L'export vers Open Badges 3.0 perd actuellement deux choses qui comptent le plus en Europe : Le champ de crédits d'OB3 ne porte aucune unité, donc les crédits ECTS/EAP doivent quand même voyager comme un alignement ou une extension, et son champ de critères est narratif, donc les acquis d'apprentissage structurés ne s'y retrouvent que de façon approximative. Cet écart est précisément pourquoi une couche de description est nécessaire. Le combler correctement est un travail ouvert — les correspondances vivent dans le dépôt et les pull requests sont bienvenues.",
    close:
      "Rien de tout cela ne vous demande de choisir un camp. Décrivez vos données une fois, sous une forme complète, et la norme à laquelle votre public fait déjà confiance n'est plus qu'à un export.",
    backHome: "← Accueil",
  },
};
