// Narrow variant of the same diagram (400×640) for phones. A wide diagram scaled
// into a 360 px viewport renders its labels at roughly 8 px, which is no longer a
// diagram. Same claim, different composition.
import { diagrams } from "../../../data/diagrams";
import { renderStacked, svgResponse, type Diagram } from "../../../lib/diagram";

export function getStaticPaths() {
  return diagrams.map((d) => ({ params: { id: d.id }, props: { d } }));
}

export function GET({ props }: { props: { d: Diagram } }): Response {
  return svgResponse(renderStacked(props.d));
}
