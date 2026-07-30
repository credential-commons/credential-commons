// Wide concept diagram for a non-default locale: /<locale>/diagrams/<id>.svg
// The id stays English in every language, because it is a URL.
import { buildDiagrams } from "../../../data/diagrams";
import { locales, type Locale } from "../../../i18n/ui";
import { renderWide, svgResponse, type Diagram } from "../../../lib/diagram";

export function getStaticPaths() {
  return locales
    .filter((l) => l !== "en")
    .flatMap((locale) => buildDiagrams(locale as Locale).map((d) => ({ params: { locale, id: d.id }, props: { d } })));
}

export function GET({ props }: { props: { d: Diagram } }): Response {
  return svgResponse(renderWide(props.d));
}
