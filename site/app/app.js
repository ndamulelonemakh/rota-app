import "./styles/global.css";
import "./styles/app.css";

import { AppTemplate } from "./app.template";
import { RosterController, SimpleLoaderComponent, CreateRosterComponent, getFormValue } from "./components/index";
import { makeAsyncGetRequest, isNullOrEmpty, generateDictFromArr } from "./shared/index";

import * as jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * This will inject the bundled components into the main content div defined in public/index.html
 *
 */
const createApp = () => {
  const appRoot = document.querySelector("#root");
  const state = {};
  try {
    localStorage.clear(); // Start with a clean session
    appRoot.innerHTML = AppTemplate(state);
  } catch (error) {
    console.error("Failed to initialise app: ", error);
  }

  const form = new CreateRosterComponent();
  document.getElementById("main-content").innerHTML += form.render();
  document.getElementById("loader-placeholder").innerHTML = SimpleLoaderComponent();
};
/**********************Initialise application************************ */
createApp();

/******Post render************** */
if (document.readyState !== "loading") {
  registerEventListeners();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    registerEventListeners();
  });
}

// Event hanlders
/**
 * Adds event listeners to the form and roster elements.
 */
function registerEventListeners() {
  const formContainer = document.getElementById("main-content");
  const rosterContainer = document.getElementById("roster-container");
  const generateRosterButton = document.getElementById("generate-rooster");
  const formErrorMessage = document.getElementById("form-err-msg");
  const loaderPlaceholder = document.getElementById("loader-placeholder");

  /**
   * Handles submit event on the Generate Roster form.
   */
  async function handleGenerateRosterReq() {
    formErrorMessage.innerText = "";

    const formVal = getFormValue();
    const API_URL_DEV = "http://localhost:7071/api/GenerateRoster";
    const API_URL_PROD = "/api/GenerateRoster";
    let API_URL;
    if (process.env.NODE_ENV === "development") {
      API_URL = API_URL_DEV;
      console.info("Using development API URL: ", API_URL);
    } else {
      API_URL = API_URL_PROD;
    }

    if (isNullOrEmpty(formVal.spanIndays) || formVal.sections.length === 0 || formVal.staff.length === 0) {
      formErrorMessage.innerText = "You need to fill in all fields.";
      return;
    }

    loaderPlaceholder.style.display = "initial";

    try {
      const apiResponse = await Promise.race([
        makeAsyncGetRequest(API_URL, {
          span: formVal.spanIndays,
          sections: formVal.sections.length,
          staff: formVal.staff.length,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 30000)
        ),
      ]);

      renderRoster(apiResponse, formVal);
      formContainer.style.display = "none";
      loaderPlaceholder.style.display = "none";
      rosterContainer.style.display = "initial";
    } catch (error) {
      loaderPlaceholder.style.display = "none";
      formErrorMessage.innerText = error.message;
    }
  }

  /**
   * Handles the click event on a schedule table cell.
   * @param {Event} event - The click event.
   */
  function handleCellClick(event) {
    const clickedCell = event.target;
    alert(`Clicked: ${clickedCell.innerHTML}`);
  }

  generateRosterButton.addEventListener("click", handleGenerateRosterReq);

  const scheduleCells = document.querySelectorAll("#shedule-table td");
  scheduleCells.forEach((cell) => cell.addEventListener("click", handleCellClick));
}

// Helper functions for creating the roster preview screens
function renderRoster(schedule, formValues) {
  const workforce = generateDictFromArr(formValues.staff);
  const departments = generateDictFromArr(formValues.sections);

  document.getElementById("roster-container").innerHTML += RosterController({
    data: schedule,
    rawInputs: {
      span: parseInt(formValues.spanIndays),
      staff: workforce,
      sections: departments,
    },
  });

  initialiseRosterContainerBtns();
}

function initialiseRosterContainerBtns() {
  const formContainer = document.getElementById("main-content");
  const rosterContainer = document.getElementById("roster-container");

  //  // create another roster
  document.getElementById("create-another").addEventListener("click", () => {
    formContainer.style.display = "initial";
    rosterContainer.style.display = "none";
  });

  // Export pdf btn
  document.getElementById("export_to_pdf").addEventListener("click", () => {
    const doc = new jsPDF.jsPDF();
    doc.autoTable({
      html: "#shedule-table",
      theme: "striped",
      headStyles: { fillColor: [155, 89, 182] },
    });
    let finalY = doc.previousAutoTable.finalY;
    doc.text("Xxx - x Day Rooster", 15, finalY + 15);
    doc.save("roster.pdf");
  });
}
