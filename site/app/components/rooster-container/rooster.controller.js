import "./rooster.css";
import { RoosterTemplate } from "./rooster.template";

export const RosterController = (props) => {
  return render(props);
};

function render(model) {
  try {
    const result = RoosterTemplate(model);
    return result;
  } catch (err) {
    alert(err);
    return null;
  }
}
