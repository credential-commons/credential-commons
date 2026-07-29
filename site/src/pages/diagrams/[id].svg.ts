// Wide concept diagram (960×504 — exactly the 1200×630 social-card ratio, so the
// shared card fills the frame with no letterbox). Rasterised to .png + .og.png
// after the build by scripts/rasterize-diagrams.mjs.
import { diagrams } from "../../data/diagrams";
import { renderWide, svgResponse, type Diagram } from "../../lib/diagram";

export function getStaticPaths() {
  return diagrams.map((d) => ({ params: { id: d.id }, props: { d } }));
}

export function GET({ props }: { props: { d: Diagram } }): Response {
  return svgResponse(renderWide(props.d));
}
