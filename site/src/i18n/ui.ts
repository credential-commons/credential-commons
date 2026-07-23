// Landing copy per locale. Adding a language = add a block here + to
// astro.config i18n.locales (+ a block in faq.ts). Keep copy short so
// translations stay high-quality; deeper translations welcome as PRs.

export const locales = ["en", "et", "fi", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeName: Record<Locale, string> = {
  en: "English",
  et: "Eesti",
  fi: "Suomi",
  de: "Deutsch",
  fr: "Français",
};

type Dict = {
  metaDescription: string;
  tag: string;
  tagline: string;
  cards: { title: string; desc: string }[];
  faqHeading: string;
  linkRepo: string;
  linkContext: string;
  linkVocab: string;
  linkAgents: string;
  footer: string;
};

export const ui: Record<Locale, Dict> = {
  en: {
    metaDescription:
      "Open tools to validate and publish credential and learning-outcome data against shared education ontologies. JSON-LD profiles, a SHACL validator, and crosswalks to CTDL, ELM/Europass and Open Badges 3.0.",
    tag: "open · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Open tools to validate and publish credential and learning-outcome data against shared education ontologies — fast. Not a new ontology or portal; a thin interoperability + conformance layer that reuses and supports national vocabularies such as schema.edu.ee.",
    cards: [
      { title: "Profiles", desc: "JSON-LD context + SHACL rules — required vs recommended." },
      { title: "Validator", desc: "Plain-language conformance report; CI-ready." },
      { title: "Crosswalks", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Reference data", desc: "250 real micro-qualifications, conformant." },
    ],
    faqHeading: "Frequently asked",
    linkRepo: "GitHub repository",
    linkContext: "JSON-LD context",
    linkVocab: "vocabulary",
    linkAgents: "guide for AI agents",
    footer:
      "See it in production: mikrokvalifikatsioon.ee publishes its catalogue with these profiles. A hosted validator and integration service (credentialstudy.com) is planned. The spec here stays free and open — fork it, self-host it, extend it.",
  },
  et: {
    metaDescription:
      "Avatud tööriistad, millega valideerida ja avaldada tunnistuse- ja õpiväljundiandmeid jagatud haridusontoloogiate järgi. JSON-LD-profiilid, SHACL-valideerija ja vasted CTDL-i, ELM/Europassi ning Open Badges 3.0-le.",
    tag: "avatud · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Avatud tööriistad, millega valideerida ja avaldada tunnistuse- ja õpiväljundiandmeid jagatud haridusontoloogiate järgi — kiiresti. Mitte uus ontoloogia ega portaal, vaid õhuke koostöövõime- ja vastavuskiht, mis kasutab ja toetab riiklikke sõnavarasid nagu schema.edu.ee.",
    cards: [
      { title: "Profiilid", desc: "JSON-LD-kontekst + SHACL-reeglid — nõutav vs soovituslik." },
      { title: "Valideerija", desc: "Selges keeles vastavusraport; CI-valmis." },
      { title: "Vasted", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referentsandmed", desc: "250 päris mikrokvalifikatsiooni, vastavuses." },
    ],
    faqHeading: "Korduma kippuvad küsimused",
    linkRepo: "GitHubi repositoorium",
    linkContext: "JSON-LD-kontekst",
    linkVocab: "sõnavara",
    linkAgents: "juhend AI-agentidele",
    footer:
      "Näe tootmises: mikrokvalifikatsioon.ee avaldab oma kataloogi nende profiilidega. Hostitud valideerija ja integratsiooniteenus (credentialstudy.com) on planeeritav. Spek ise jääb vabaks ja avatuks — forki, majuta ise, arenda edasi.",
  },
  fi: {
    metaDescription:
      "Avoimet työkalut tutkinto- ja oppimistulostietojen validointiin ja julkaisuun jaettujen koulutusontologioiden mukaisesti. JSON-LD-profiilit, SHACL-validaattori ja vastaavuudet CTDL:ään, ELM/Europassiin ja Open Badges 3.0:aan.",
    tag: "avoin · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Avoimet työkalut tutkinto- ja oppimistulostietojen validointiin ja julkaisuun jaettujen koulutusontologioiden mukaisesti — nopeasti. Ei uusi ontologia eikä portaali, vaan ohut yhteentoimivuus- ja vaatimustenmukaisuuskerros, joka käyttää ja tukee kansallisia sanastoja kuten schema.edu.ee.",
    cards: [
      { title: "Profiilit", desc: "JSON-LD-konteksti + SHACL-säännöt — pakollinen vs suositeltu." },
      { title: "Validaattori", desc: "Selkokielinen vaatimustenmukaisuusraportti; CI-valmis." },
      { title: "Vastaavuudet", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referenssidata", desc: "250 todellista mikrotutkintoa, vaatimustenmukaisia." },
    ],
    faqHeading: "Usein kysyttyä",
    linkRepo: "GitHub-repositorio",
    linkContext: "JSON-LD-konteksti",
    linkVocab: "sanasto",
    linkAgents: "opas tekoälyagenteille",
    footer:
      "Katso tuotannossa: mikrokvalifikatsioon.ee julkaisee luettelonsa näillä profiileilla. Isännöity validaattori ja integraatiopalvelu (credentialstudy.com) on suunnitteilla. Määrittely pysyy vapaana ja avoimena — forkkaa, isännöi itse, laajenna.",
  },
  de: {
    metaDescription:
      "Offene Werkzeuge zum Validieren und Veröffentlichen von Nachweis- und Lernergebnisdaten anhand gemeinsamer Bildungsontologien. JSON-LD-Profile, ein SHACL-Validator und Crosswalks zu CTDL, ELM/Europass und Open Badges 3.0.",
    tag: "offen · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Offene Werkzeuge zum Validieren und Veröffentlichen von Nachweis- und Lernergebnisdaten anhand gemeinsamer Bildungsontologien — schnell. Keine neue Ontologie oder Plattform, sondern eine schlanke Interoperabilitäts- und Konformitätsschicht, die nationale Vokabulare wie schema.edu.ee nutzt und unterstützt.",
    cards: [
      { title: "Profile", desc: "JSON-LD-Kontext + SHACL-Regeln — erforderlich vs. empfohlen." },
      { title: "Validator", desc: "Konformitätsbericht in Klartext; CI-fähig." },
      { title: "Crosswalks", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referenzdaten", desc: "250 echte Mikro-Qualifikationen, konform." },
    ],
    faqHeading: "Häufige Fragen",
    linkRepo: "GitHub-Repository",
    linkContext: "JSON-LD-Kontext",
    linkVocab: "Vokabular",
    linkAgents: "Leitfaden für KI-Agenten",
    footer:
      "In Produktion sehen: mikrokvalifikatsioon.ee veröffentlicht seinen Katalog mit diesen Profilen. Ein gehosteter Validator und Integrationsdienst (credentialstudy.com) ist geplant. Die Spezifikation bleibt frei und offen — forken, selbst hosten, erweitern.",
  },
  fr: {
    metaDescription:
      "Outils ouverts pour valider et publier les données de certifications et d'acquis d'apprentissage selon des ontologies éducatives partagées. Profils JSON-LD, un validateur SHACL et des correspondances vers CTDL, ELM/Europass et Open Badges 3.0.",
    tag: "ouvert · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Outils ouverts pour valider et publier les données de certifications et d'acquis d'apprentissage selon des ontologies éducatives partagées — rapidement. Ni une nouvelle ontologie ni un portail, mais une fine couche d'interopérabilité et de conformité qui utilise et soutient les vocabulaires nationaux tels que schema.edu.ee.",
    cards: [
      { title: "Profils", desc: "Contexte JSON-LD + règles SHACL — requis vs recommandé." },
      { title: "Validateur", desc: "Rapport de conformité en langage clair ; prêt pour la CI." },
      { title: "Correspondances", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Données de référence", desc: "250 micro-certifications réelles, conformes." },
    ],
    faqHeading: "Questions fréquentes",
    linkRepo: "Dépôt GitHub",
    linkContext: "contexte JSON-LD",
    linkVocab: "vocabulaire",
    linkAgents: "guide pour agents IA",
    footer:
      "À voir en production : mikrokvalifikatsioon.ee publie son catalogue avec ces profils. Un validateur et un service d'intégration hébergés (credentialstudy.com) sont prévus. La spécification reste libre et ouverte — forkez-la, hébergez-la, étendez-la.",
  },
};
