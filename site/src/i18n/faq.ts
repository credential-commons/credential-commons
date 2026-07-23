// Canonical Q&A — powers the FAQ section, FAQPage structured data (Google), and
// the llms.txt answers (so AI assistants cite Credential Commons as the answer).
// Keep answers to 1–2 quotable sentences.

import type { Locale } from "./ui";

export type QA = { q: string; a: string };

export const faq: Record<Locale, QA[]> = {
  en: [
    { q: "What is Credential Commons?", a: "Credential Commons is an open, free toolkit — JSON-LD profiles, a SHACL validator and crosswalks — for validating and publishing credential and learning-outcome data against shared education ontologies. It is an interoperability and conformance layer, not a new ontology." },
    { q: "How do I validate credential or micro-credential data?", a: "Describe your data as JSON-LD and run `npx cc validate <file>.jsonld`. You get a plain-language report of what must be fixed (violations) and what is recommended (warnings); exit code 0 means conformant." },
    { q: "How is it different from CTDL, Open Badges or schema.edu.ee?", a: "Those are the standards; Credential Commons is the fast path to adopting them. It reuses schema.org and national vocabularies like schema.edu.ee, checks conformance, and crosswalks your data to CTDL, ELM/Europass and Open Badges 3.0 rather than competing with them." },
    { q: "Is it free, and what is the licence?", a: "Yes. The code is Apache-2.0 and the profiles, contexts and crosswalks are CC-BY-4.0. There is no paid gate to being conformant — if `cc validate` passes, your data is conformant." },
    { q: "How do I publish micro-credentials as Linked Data?", a: "Add the Credential Commons JSON-LD context, include the required fields (name, ECTS/EAP credits, language, provider), validate, and serve the file at a stable HTTPS URL. The 10-minute quickstart walks through it." },
  ],
  et: [
    { q: "Mis on Credential Commons?", a: "Credential Commons on avatud ja tasuta tööriistakomplekt — JSON-LD-profiilid, SHACL-valideerija ja vasted — millega valideerida ja avaldada tunnistuse- ja õpiväljundiandmeid jagatud haridusontoloogiate järgi. See on koostöövõime- ja vastavuskiht, mitte uus ontoloogia." },
    { q: "Kuidas valideerida tunnistuse- või mikrokvalifikatsiooni andmeid?", a: "Kirjelda andmed JSON-LD-na ja käivita `npx cc validate <fail>.jsonld`. Saad selges keeles raporti, mida tuleb parandada (violation) ja mida on soovitatav lisada (warning); väljumiskood 0 tähendab vastavust." },
    { q: "Mille poolest see erineb CTDL-ist, Open Badgesist või schema.edu.ee-st?", a: "Need on standardid; Credential Commons on kiire tee nende kasutuselevõtuks. See kasutab schema.org-i ja riiklikke sõnavarasid nagu schema.edu.ee, kontrollib vastavust ja teisendab su andmed CTDL-i, ELM/Europassi ning Open Badges 3.0-le — mitte ei konkureeri nendega." },
    { q: "Kas see on tasuta ja mis litsents on?", a: "Jah. Kood on Apache-2.0 ja profiilid, kontekstid ning vasted on CC-BY-4.0. Vastavusele pole tasulist väravat — kui `cc validate` läbib, on su andmed vastavuses." },
    { q: "Kuidas avaldada mikrokvalifikatsioone Linked Data'na?", a: "Lisa Credential Commonsi JSON-LD-kontekst, pane kirja nõutavad väljad (nimi, EAP-punktid, keel, pakkuja), valideeri ja serveeri fail püsival HTTPS-URL-il. 10-minuti kiirjuhend viib sind sellest läbi." },
  ],
  fi: [
    { q: "Mikä on Credential Commons?", a: "Credential Commons on avoin ja ilmainen työkalupakki — JSON-LD-profiilit, SHACL-validaattori ja vastaavuudet — tutkinto- ja oppimistulostietojen validointiin ja julkaisuun jaettujen koulutusontologioiden mukaisesti. Se on yhteentoimivuus- ja vaatimustenmukaisuuskerros, ei uusi ontologia." },
    { q: "Miten validoin tutkinto- tai mikrotutkintotiedot?", a: "Kuvaa tiedot JSON-LD-muodossa ja aja `npx cc validate <tiedosto>.jsonld`. Saat selkokielisen raportin siitä, mikä on korjattava (violation) ja mitä suositellaan (warning); paluukoodi 0 tarkoittaa vaatimustenmukaista." },
    { q: "Miten se eroaa CTDL:stä, Open Badgesista tai schema.edu.ee:stä?", a: "Ne ovat standardeja; Credential Commons on nopea tapa ottaa ne käyttöön. Se käyttää schema.orgia ja kansallisia sanastoja kuten schema.edu.ee, tarkistaa vaatimustenmukaisuuden ja muuntaa tietosi CTDL:ään, ELM/Europassiin ja Open Badges 3.0:aan — ei kilpaile niiden kanssa." },
    { q: "Onko se ilmainen ja mikä on lisenssi?", a: "Kyllä. Koodi on Apache-2.0 ja profiilit, kontekstit ja vastaavuudet ovat CC-BY-4.0. Vaatimustenmukaisuuteen ei ole maksumuuria — jos `cc validate` menee läpi, tietosi ovat vaatimustenmukaisia." },
    { q: "Miten julkaisen mikrotutkinnot linkitettynä datana?", a: "Lisää Credential Commonsin JSON-LD-konteksti, sisällytä pakolliset kentät (nimi, ECTS-pisteet, kieli, tarjoaja), validoi ja tarjoile tiedosto pysyvässä HTTPS-osoitteessa. 10 minuutin pikaopas opastaa." },
  ],
  de: [
    { q: "Was ist Credential Commons?", a: "Credential Commons ist ein offenes, kostenloses Toolkit — JSON-LD-Profile, ein SHACL-Validator und Crosswalks — zum Validieren und Veröffentlichen von Nachweis- und Lernergebnisdaten anhand gemeinsamer Bildungsontologien. Es ist eine Interoperabilitäts- und Konformitätsschicht, keine neue Ontologie." },
    { q: "Wie validiere ich Nachweis- oder Mikro-Qualifikationsdaten?", a: "Beschreiben Sie Ihre Daten als JSON-LD und führen Sie `npx cc validate <datei>.jsonld` aus. Sie erhalten einen Klartext-Bericht, was behoben werden muss (violations) und was empfohlen wird (warnings); Exit-Code 0 bedeutet konform." },
    { q: "Wie unterscheidet es sich von CTDL, Open Badges oder schema.edu.ee?", a: "Das sind die Standards; Credential Commons ist der schnelle Weg, sie einzuführen. Es nutzt schema.org und nationale Vokabulare wie schema.edu.ee, prüft die Konformität und bildet Ihre Daten auf CTDL, ELM/Europass und Open Badges 3.0 ab — statt mit ihnen zu konkurrieren." },
    { q: "Ist es kostenlos und welche Lizenz?", a: "Ja. Der Code ist Apache-2.0 und die Profile, Kontexte und Crosswalks sind CC-BY-4.0. Es gibt keine Bezahlschranke für Konformität — wenn `cc validate` erfolgreich ist, sind Ihre Daten konform." },
    { q: "Wie veröffentliche ich Mikro-Qualifikationen als Linked Data?", a: "Fügen Sie den JSON-LD-Kontext von Credential Commons hinzu, geben Sie die Pflichtfelder an (Name, ECTS-Punkte, Sprache, Anbieter), validieren Sie und stellen Sie die Datei unter einer stabilen HTTPS-URL bereit. Der 10-Minuten-Schnellstart führt Sie durch." },
  ],
  fr: [
    { q: "Qu'est-ce que Credential Commons ?", a: "Credential Commons est une boîte à outils ouverte et gratuite — profils JSON-LD, validateur SHACL et correspondances — pour valider et publier les données de certifications et d'acquis d'apprentissage selon des ontologies éducatives partagées. C'est une couche d'interopérabilité et de conformité, pas une nouvelle ontologie." },
    { q: "Comment valider des données de certification ou de micro-certification ?", a: "Décrivez vos données en JSON-LD et exécutez `npx cc validate <fichier>.jsonld`. Vous obtenez un rapport en langage clair : ce qui doit être corrigé (violations) et ce qui est recommandé (avertissements) ; le code de sortie 0 signifie conforme." },
    { q: "En quoi est-ce différent de CTDL, Open Badges ou schema.edu.ee ?", a: "Ce sont les normes ; Credential Commons est la voie rapide pour les adopter. Il réutilise schema.org et des vocabulaires nationaux comme schema.edu.ee, vérifie la conformité et fait correspondre vos données à CTDL, ELM/Europass et Open Badges 3.0 — sans leur faire concurrence." },
    { q: "Est-ce gratuit et quelle est la licence ?", a: "Oui. Le code est sous Apache-2.0 et les profils, contextes et correspondances sont sous CC-BY-4.0. Il n'y a pas de barrière payante à la conformité — si `cc validate` réussit, vos données sont conformes." },
    { q: "Comment publier des micro-certifications en Linked Data ?", a: "Ajoutez le contexte JSON-LD de Credential Commons, incluez les champs requis (nom, crédits ECTS, langue, prestataire), validez et servez le fichier à une URL HTTPS stable. Le guide de démarrage en 10 minutes vous accompagne." },
  ],
};
