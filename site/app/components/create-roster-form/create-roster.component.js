import "./create-roster.css";
import { CreateRosterTemplate } from "./create-roster.template";

export class CreateRosterComponent {
  constructor() {}

  render() {
    return CreateRosterTemplate();
  }
}

// After render
if (document.readyState !== "loading") {
  addEventListener$();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    addEventListener$();
  });
}

function addEventListener$() {
  document.getElementById("staff-input-add").addEventListener("click", () => {
    addInputToForm("staff-input-div", "staff-input");
  });

  document.getElementById("section-input-add").addEventListener("click", () => {
    addInputToForm("section-input-div", "section-input");
  });
}

function getInputCollections(elementId) {
  const sections = document.getElementsByClassName(elementId);
  return Array.from(sections);
}

export function getFormValue() {
  const span = document.getElementById("span").value;
  const sectionNames = getInputCollections("section-input");
  const staffNmes = getInputCollections("staff-input");

  return {
    spanIndays: span,
    sections: sectionNames.map((item) => item.value),
    staff: staffNmes.map((item) => item.value),
  };
}

function getPlaceholderMsg(areaId) {
  return areaId == "section-input" ? "Name of work section" : "Name of staff memeber";
}

function addInputToForm(formId, areaId) {
  const existingInputsCount = getInputCollections(areaId).length;
  const formContainer = document.getElementById(formId);
  const inputElem = document.createElement("INPUT");
  inputElem.setAttribute("placeholder", getPlaceholderMsg(areaId));
  inputElem.setAttribute("class", areaId);

  if (areaId == "section-input") {
    inputElem.setAttribute("id", `section${existingInputsCount + 1}`);
  } else {
    inputElem.setAttribute("id", `staff${existingInputsCount + 1}`);
  }

  formContainer.appendChild(inputElem);
}
