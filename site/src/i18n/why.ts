// "Why Credential Commons" page copy per locale. Same story as docs/what-travels.md
// and the case studies, told plainly for people (not machines). Keep it short and
// warm; deeper translations welcome as PRs.

import type { Locale } from "./ui";

export type WhyDict = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  lede: string;
  sections: { h: string; p: string }[];
  readersHeading: string;
  readers: { who: string; p: string }[];
  close: string;
  backHome: string;
};

export const why: Record<Locale, WhyDict> = {
  en: {
    metaTitle: "Why Credential Commons",
    metaDescription:
      "Why a shared, neutral language for credentials matters — for learners, schools, AI agents and employers.",
    heading: "Why Credential Commons",
    lede:
      "A common language that lets a person's proven skills travel from one organisation to the next — so growth continues instead of starting over.",
    sections: [
      {
        h: "Every school is a nursery",
        p: "A training organisation helps one skill's seedling get a strong start. The learner owns the tree. Sooner or later it is transplanted — to another school, an employer, further into life — and grows on beyond the nursery's reach.",
      },
      {
        h: "The fruit and the label",
        p: "The fruit is the learner's real knowledge and skills. A certificate does not replace the fruit — it is the label that makes it recognised, visible and trusted. But a label only works if the next organisation can read it.",
      },
      {
        h: "One shared language",
        p: "Credential Commons is the shared language on the label. It is infrastructure, not an authority: it issues no stamp of its own, it carries each issuer's credential in a form anyone can read. And it is deliberately small — it holds only what must survive the transplant. Less is more: the smaller the core, the more places it fits.",
      },
    ],
    readersHeading: "What each reader gets",
    readers: [
      {
        who: "For the learner",
        p: "Your growth is recognised wherever this language is spoken. You never start from zero. You carry proof anyone can read — and you save your time.",
      },
      {
        who: "For a school — and its agent",
        p: "Trust and build on what a learner already grew, instead of replanting from seed. A new or transforming school can adopt the language in no time — even an AI agent can pick it up at once, organise a scattered system, and show exactly what is missing. Then your own system grows organically, the way a tree later grows more trees.",
      },
      {
        who: "For employers and clients",
        p: "A credential you can actually read and trust — because it speaks one language, and rests on data that was cleaned, not just claimed.",
      },
    ],
    close:
      "So knowledge grows like a forest — one growth continuing the next — not like a single tree fenced inside one garden.",
    backHome: "← Home",
  },

  et: {
    metaTitle: "Miks Credential Commons",
    metaDescription:
      "Miks on ühine, neutraalne tunnistuste keel oluline — õppijale, koolile, AI-agendile ja tööandjale.",
    heading: "Miks Credential Commons",
    lede:
      "Ühine keel, mis laseb inimese tõendatud oskustel liikuda ühest organisatsioonist teise — nii et kasv jätkub, mitte ei alga otsast peale.",
    sections: [
      {
        h: "Iga kool on puukool",
        p: "Koolitusorganisatsioon aitab ühe oskuse istikul tugevalt alustada. Puu kuulub õppijale. Varem või hiljem istutatakse ta ümber — teise kooli, tööandja juurde, edasi ellu — ja kasvab su käeulatusest väljas.",
      },
      {
        h: "Vili ja silt",
        p: "Vili on õppija päris teadmised ja oskused. Tunnistus ei asenda vilja — ta on silt, mis teeb vilja tunnustatuks, nähtavaks ja usaldusväärseks. Aga silt töötab ainult siis, kui järgmine organisatsioon oskab seda lugeda.",
      },
      {
        h: "Üks ühine keel",
        p: "Credential Commons on ühine keel selle sildi peal. Ta on taristu, mitte autoriteet: ta ei löö oma templit, vaid kannab iga väljaandja tunnistust kujul, mida igaüks loeb. Ja ta on meelega väike — hoiab ainult seda, mis peab ümberistutuse üle elama. Vähem on rohkem: mida väiksem tuum, seda rohkematesse kohtadesse ta mahub.",
      },
    ],
    readersHeading: "Mida igaüks saab",
    readers: [
      {
        who: "Õppijale",
        p: "Sinu kasv on tunnustatud kõikjal, kus seda keelt räägitakse. Sa ei alusta kunagi nullist. Sa kannad tõendit, mida igaüks loeb — ja hoiad kokku oma aega.",
      },
      {
        who: "Koolile — ja tema agendile",
        p: "Usalda ja ehita selle peale, mis õppijas juba kasvas, selle asemel et uuesti seemnest istutada. Uus või muutuv kool võtab keele kasutusse hetkega — isegi AI-agent haarab selle kohe, korrastab segase süsteemi ja näitab täpselt, mis puudu on. Ja siis kasvab su enda süsteem orgaaniliselt, samamoodi nagu puu hiljem ise puid kasvatab.",
      },
      {
        who: "Tööandjale ja kliendile",
        p: "Tunnistus, mida saab päriselt lugeda ja usaldada — sest ta räägib üht keelt ja tugineb andmetele, mis on puhastatud, mitte ainult väidetud.",
      },
    ],
    close:
      "Nii kasvab teadmine nagu mets — üks kasv jätkab teist — mitte nagu üksik puu, ühe tara sisse suletud.",
    backHome: "← Avaleht",
  },

  fi: {
    metaTitle: "Miksi Credential Commons",
    metaDescription:
      "Miksi yhteinen, neutraali todistuskieli on tärkeä — oppijalle, koululle, tekoälyagentille ja työnantajalle.",
    heading: "Miksi Credential Commons",
    lede:
      "Yhteinen kieli, jonka avulla henkilön todennetut taidot siirtyvät organisaatiosta toiseen — niin että kasvu jatkuu eikä ala alusta.",
    sections: [
      {
        h: "Jokainen koulu on taimitarha",
        p: "Koulutusorganisaatio auttaa yhden taidon taimea saamaan vahvan alun. Puu kuuluu oppijalle. Ennemmin tai myöhemmin se istutetaan uudelleen — toiseen kouluun, työnantajalle, eteenpäin elämään — ja kasvaa tarhan ulottumattomissa.",
      },
      {
        h: "Hedelmä ja merkki",
        p: "Hedelmä on oppijan todellinen tieto ja taito. Todistus ei korvaa hedelmää — se on merkki, joka tekee siitä tunnustetun, näkyvän ja luotettavan. Mutta merkki toimii vain, jos seuraava organisaatio osaa lukea sen.",
      },
      {
        h: "Yksi yhteinen kieli",
        p: "Credential Commons on yhteinen kieli merkissä. Se on infrastruktuuria, ei auktoriteetti: se ei lyö omaa leimaansa, vaan kantaa kunkin myöntäjän todistusta muodossa, jonka kuka tahansa lukee. Ja se on tarkoituksella pieni — se pitää vain sen, minkä on selvittävä uudelleenistutuksesta. Vähemmän on enemmän: mitä pienempi ydin, sitä useampaan paikkaan se sopii.",
      },
    ],
    readersHeading: "Mitä kukin saa",
    readers: [
      {
        who: "Oppijalle",
        p: "Kasvusi tunnustetaan kaikkialla, missä tätä kieltä puhutaan. Et koskaan aloita nollasta. Kannat todistetta, jonka kuka tahansa lukee — ja säästät aikaasi.",
      },
      {
        who: "Koululle — ja sen agentille",
        p: "Luota siihen, mitä oppijassa jo kasvoi, ja rakenna sen varaan sen sijaan että istuttaisit uudelleen siemenestä. Uusi tai muuttuva koulu ottaa kielen käyttöön hetkessä — jopa tekoälyagentti omaksuu sen heti, järjestää hajanaisen järjestelmän ja näyttää tarkalleen, mitä puuttuu. Sitten oma järjestelmäsi kasvaa orgaanisesti, samoin kuin puu myöhemmin kasvattaa lisää puita.",
      },
      {
        who: "Työnantajille ja asiakkaille",
        p: "Todistus, jonka voi todella lukea ja johon voi luottaa — koska se puhuu yhtä kieltä ja perustuu dataan, joka on siivottu eikä vain väitetty.",
      },
    ],
    close:
      "Näin tieto kasvaa kuin metsä — yksi kasvu jatkaa toista — eikä kuin yksittäinen puu yhden aidan sisällä.",
    backHome: "← Etusivu",
  },

  de: {
    metaTitle: "Warum Credential Commons",
    metaDescription:
      "Warum eine gemeinsame, neutrale Sprache für Nachweise wichtig ist — für Lernende, Schulen, KI-Agenten und Arbeitgeber.",
    heading: "Warum Credential Commons",
    lede:
      "Eine gemeinsame Sprache, mit der die nachgewiesenen Fähigkeiten eines Menschen von einer Organisation zur nächsten wandern — damit Wachstum weitergeht, statt neu zu beginnen.",
    sections: [
      {
        h: "Jede Schule ist eine Baumschule",
        p: "Eine Bildungsorganisation hilft dem Setzling einer Fähigkeit zu einem starken Start. Der Baum gehört der lernenden Person. Früher oder später wird er verpflanzt — an eine andere Schule, zu einem Arbeitgeber, weiter ins Leben — und wächst außerhalb der Reichweite der Baumschule.",
      },
      {
        h: "Die Frucht und das Etikett",
        p: "Die Frucht ist das echte Wissen und Können der lernenden Person. Ein Zeugnis ersetzt die Frucht nicht — es ist das Etikett, das sie anerkannt, sichtbar und vertrauenswürdig macht. Doch ein Etikett wirkt nur, wenn die nächste Organisation es lesen kann.",
      },
      {
        h: "Eine gemeinsame Sprache",
        p: "Credential Commons ist die gemeinsame Sprache auf dem Etikett. Es ist Infrastruktur, keine Autorität: es vergibt kein eigenes Siegel, sondern trägt das Zeugnis jedes Ausstellers in einer Form, die jeder lesen kann. Und es ist bewusst klein — es hält nur, was die Verpflanzung überleben muss. Weniger ist mehr: je kleiner der Kern, desto mehr Orte passen dazu.",
      },
    ],
    readersHeading: "Was jeder davon hat",
    readers: [
      {
        who: "Für die lernende Person",
        p: "Dein Wachstum wird überall anerkannt, wo diese Sprache gesprochen wird. Du fängst nie bei null an. Du trägst einen Nachweis, den jeder lesen kann — und sparst deine Zeit.",
      },
      {
        who: "Für eine Schule — und ihren Agenten",
        p: "Vertraue dem, was in einer lernenden Person schon gewachsen ist, und baue darauf auf, statt neu aus dem Samen zu pflanzen. Eine neue oder sich wandelnde Schule übernimmt die Sprache im Nu — selbst ein KI-Agent greift sie sofort auf, ordnet ein verstreutes System und zeigt genau, was fehlt. Dann wächst dein eigenes System organisch, so wie ein Baum später selbst Bäume wachsen lässt.",
      },
      {
        who: "Für Arbeitgeber und Kunden",
        p: "Ein Nachweis, den man wirklich lesen und dem man vertrauen kann — weil er eine Sprache spricht und auf Daten beruht, die bereinigt und nicht nur behauptet wurden.",
      },
    ],
    close:
      "So wächst Wissen wie ein Wald — ein Wachstum setzt das nächste fort — nicht wie ein einzelner Baum, eingezäunt in einem Garten.",
    backHome: "← Startseite",
  },

  fr: {
    metaTitle: "Pourquoi Credential Commons",
    metaDescription:
      "Pourquoi un langage commun et neutre pour les titres compte — pour les apprenants, les écoles, les agents IA et les employeurs.",
    heading: "Pourquoi Credential Commons",
    lede:
      "Un langage commun qui permet aux compétences avérées d'une personne de voyager d'une organisation à l'autre — pour que la croissance continue au lieu de recommencer.",
    sections: [
      {
        h: "Chaque école est une pépinière",
        p: "Un organisme de formation aide le jeune plant d'une compétence à prendre un bon départ. L'arbre appartient à l'apprenant. Tôt ou tard il est transplanté — vers une autre école, un employeur, plus loin dans la vie — et grandit hors de portée de la pépinière.",
      },
      {
        h: "Le fruit et l'étiquette",
        p: "Le fruit, ce sont les connaissances et compétences réelles de l'apprenant. Un certificat ne remplace pas le fruit — il est l'étiquette qui le rend reconnu, visible et fiable. Mais une étiquette ne sert que si l'organisation suivante sait la lire.",
      },
      {
        h: "Un seul langage commun",
        p: "Credential Commons est le langage commun sur l'étiquette. C'est une infrastructure, pas une autorité : il n'appose aucun sceau, il porte le certificat de chaque émetteur sous une forme lisible par tous. Et il est délibérément petit — il ne garde que ce qui doit survivre à la transplantation. Moins, c'est plus : plus le cœur est petit, plus il trouve sa place partout.",
      },
    ],
    readersHeading: "Ce que chacun y gagne",
    readers: [
      {
        who: "Pour l'apprenant",
        p: "Votre progression est reconnue partout où l'on parle ce langage. Vous ne repartez jamais de zéro. Vous portez une preuve que chacun peut lire — et vous gagnez du temps.",
      },
      {
        who: "Pour une école — et son agent",
        p: "Faites confiance à ce qui a déjà poussé chez un apprenant et construisez dessus, au lieu de replanter depuis la graine. Une école nouvelle ou en transformation adopte le langage en un instant — même un agent d'IA le saisit aussitôt, organise un système épars et montre exactement ce qui manque. Ensuite votre propre système grandit de façon organique, comme un arbre finit par faire pousser d'autres arbres.",
      },
      {
        who: "Pour les employeurs et les clients",
        p: "Un titre que l'on peut vraiment lire et auquel on peut se fier — parce qu'il parle un seul langage et repose sur des données nettoyées, non pas simplement déclarées.",
      },
    ],
    close:
      "Ainsi le savoir grandit comme une forêt — une croissance en prolongeant une autre — et non comme un arbre isolé, clôturé dans un seul jardin.",
    backHome: "← Accueil",
  },
};
