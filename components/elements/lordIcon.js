import lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

defineLordIconElement(lottie.loadAnimation);

const LordIcon = ({src}) => (
  <lord-icon
    trigger="morph"
    src={src}
  />
);
export default LordIcon;
