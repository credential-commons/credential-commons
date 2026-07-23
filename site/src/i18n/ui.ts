// Landing copy per locale. Adding a language = add a column here + to
// astro.config i18n.locales. Keep copy short so translations stay high-quality.

export const locales = ["en", "et", "fi", "de"] as const;
export type Locale = (typeof locales)[number];

export const localeName: Record<Locale, string> = {
  en: "English",
  et: "Eesti",
  fi: "Suomi",
  de: "Deutsch",
};

type Dict = {
  htmlLang: string;
  metaDescription: string;
  tag: string;
  tagline: string;
  cards: { title: string; desc: string }[];
  linkRepo: string;
  linkContext: string;
  linkVocab: string;
  linkLlms: string;
  linkAgents: string;
  footer: string;
};

export const ui: Record<Locale, Dict> = {
  en: {
    htmlLang: "en",
    metaDescription:
      "Open tools to validate and publish credential and learning-outcome data against shared education ontologies. JSON-LD profiles, a SHACL validator, and crosswalks to CTDL, ELM/Europass and Open Badges 3.0.",
    tag: "open · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Open tools to validate and publish credential and learning-outcome data against shared education ontologies — fast. Not a new ontology or portal; a thin interoperability + conformance layer, and an ally of national vocabularies like schema.edu.ee.",
    cards: [
      { title: "Profiles", desc: "JSON-LD context + SHACL rules — required vs recommended." },
      { title: "Validator", desc: "Plain-language conformance report; CI-ready." },
      { title: "Crosswalks", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Reference data", desc: "250 real micro-qualifications, conformant." },
    ],
    linkRepo: "GitHub repository",
    linkContext: "JSON-LD context",
    linkVocab: "vocabulary",
    linkLlms: "llms.txt",
    linkAgents: "guide for AI agents",
    footer:
      "A hosted validator and integration service run on this open spec at credentialstudy.com. The spec here stays free and open — fork it, self-host it, extend it.",
  },
  et: {
    htmlLang: "et",
    metaDescription:
      "Avatud tööriistad, millega valideerida ja avaldada tunnistuse- ja õpiväljundiandmeid jagatud haridusontoloogiate järgi. JSON-LD-profiilid, SHACL-valideerija ja vasted CTDL-i, ELM/Europassi ning Open Badges 3.0-le.",
    tag: "avatud · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Avatud tööriistad, millega valideerida ja avaldada tunnistuse- ja õpiväljundiandmeid jagatud haridusontoloogiate järgi — kiiresti. Mitte uus ontoloogia ega portaal, vaid õhuke koostöövõime- ja vastavuskiht ning liitlane riiklikele sõnavaradele nagu schema.edu.ee.",
    cards: [
      { title: "Profiilid", desc: "JSON-LD-kontekst + SHACL-reeglid — nõutav vs soovituslik." },
      { title: "Valideerija", desc: "Selges keeles vastavusraport; CI-valmis." },
      { title: "Vasted", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referentsandmed", desc: "250 päris mikrokvalifikatsiooni, vastavuses." },
    ],
    linkRepo: "GitHubi repositoorium",
    linkContext: "JSON-LD-kontekst",
    linkVocab: "sõnavara",
    linkLlms: "llms.txt",
    linkAgents: "juhend AI-agentidele",
    footer:
      "Hostitud valideerija ja integratsiooniteenus jooksevad selle avatud speki peal aadressil credentialstudy.com. Spek ise jääb vabaks ja avatuks — forki, majuta ise, arenda edasi.",
  },
  fi: {
    htmlLang: "fi",
    metaDescription:
      "Avoimet työkalut tutkinto- ja oppimistulostietojen validointiin ja julkaisuun jaettujen koulutusontologioiden mukaisesti. JSON-LD-profiilit, SHACL-validaattori ja vastaavuudet CTDL:ään, ELM/Europassiin ja Open Badges 3.0:aan.",
    tag: "avoin · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Avoimet työkalut tutkinto- ja oppimistulostietojen validointiin ja julkaisuun jaettujen koulutusontologioiden mukaisesti — nopeasti. Ei uusi ontologia eikä portaali, vaan ohut yhteentoimivuus- ja vaatimustenmukaisuuskerros ja kansallisten sanastojen kuten schema.edu.ee liittolainen.",
    cards: [
      { title: "Profiilit", desc: "JSON-LD-konteksti + SHACL-säännöt — pakollinen vs suositeltu." },
      { title: "Validaattori", desc: "Selkokielinen vaatimustenmukaisuusraportti; CI-valmis." },
      { title: "Vastaavuudet", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referenssidata", desc: "250 todellista mikrotutkintoa, vaatimustenmukaisia." },
    ],
    linkRepo: "GitHub-repositorio",
    linkContext: "JSON-LD-konteksti",
    linkVocab: "sanasto",
    linkLlms: "llms.txt",
    linkAgents: "opas tekoälyagenteille",
    footer:
      "Isännöity validaattori ja integraatiopalvelu toimivat tämän avoimen määrittelyn päällä osoitteessa credentialstudy.com. Määrittely pysyy vapaana ja avoimena — forkkaa, isännöi itse, laajenna.",
  },
  de: {
    htmlLang: "de",
    metaDescription:
      "Offene Werkzeuge zum Validieren und Veröffentlichen von Nachweis- und Lernergebnisdaten anhand gemeinsamer Bildungsontologien. JSON-LD-Profile, ein SHACL-Validator und Crosswalks zu CTDL, ELM/Europass und Open Badges 3.0.",
    tag: "offen · Apache-2.0 / CC-BY-4.0 · v0.1",
    tagline:
      "Offene Werkzeuge zum Validieren und Veröffentlichen von Nachweis- und Lernergebnisdaten anhand gemeinsamer Bildungsontologien — schnell. Keine neue Ontologie oder Plattform, sondern eine schlanke Interoperabilitäts- und Konformitätsschicht und ein Verbündeter nationaler Vokabulare wie schema.edu.ee.",
    cards: [
      { title: "Profile", desc: "JSON-LD-Kontext + SHACL-Regeln — erforderlich vs. empfohlen." },
      { title: "Validator", desc: "Konformitätsbericht in Klartext; CI-fähig." },
      { title: "Crosswalks", desc: "CTDL · ELM/Europass · Open Badges 3.0." },
      { title: "Referenzdaten", desc: "250 echte Mikro-Qualifikationen, konform." },
    ],
    linkRepo: "GitHub-Repository",
    linkContext: "JSON-LD-Kontext",
    linkVocab: "Vokabular",
    linkLlms: "llms.txt",
    linkAgents: "Leitfaden für KI-Agenten",
    footer:
      "Ein gehosteter Validator und Integrationsdienst laufen auf dieser offenen Spezifikation unter credentialstudy.com. Die Spezifikation bleibt frei und offen — forken, selbst hosten, erweitern.",
  },
};
