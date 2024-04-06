export const RoosterTemplate = (model) => {
  const today = new Date();
  const employeeNamesMap = model.rawInputs.staff;
  const tableColumns = createTableColumns(model.rawInputs.sections);
  const scheduleRows = createScheduleRows(model.data, employeeNamesMap);

    return `
    <article class="content-wrapper">
        <h1 class="heading mb-1" onclick="createStepper()">Your ${model.rawInputs.span} day roster</h1>
        <section id="daily-view">
            Generated on : ${today}
        </section>

        <section id="calender-view">
            <table id="shedule-table">
                <tr id="schedule-headings">
                  ${ tableColumns == undefined? "":tableColumns}
                </tr>
                ${scheduleRows}
            </table>
            
        </section>
        <button class="btn-primary" id="export_to_pdf">Export to pdf</button>
        <button class="btn-outline-primary" id="create-another">Create new roster</button>
    </article>

    <div class="stepper shadow-md">
    <setion>
        <h4 class="heading">Detailed View - <small>Mr ....</small></h4>
    </section>

    <!--Begin stepper-->
    <div class="md-stepper-horizontal orange">
      <div class="md-step active done">
        <div class="md-step-circle"><span>1</span></div>
        <div class="md-step-title">Day ..</div>
        <div class="md-step-bar-left"></div>
        <div class="md-step-bar-right"></div>
      </div>
      <div class="md-step active editable">
        <div class="md-step-circle"><span>2</span></div>
        <div class="md-step-title">Day ..</div>
        <div class="md-step-optional">Optional</div>
        <div class="md-step-bar-left"></div>
        <div class="md-step-bar-right"></div>
      </div>
      <div class="md-step active">
        <div class="md-step-circle"><span>3</span></div>
        <div class="md-step-title">Day ..</div>
        <div class="md-step-bar-left"></div>
        <div class="md-step-bar-right"></div>
      </div>
      <div class="md-step">
        <div class="md-step-circle"><span>4</span></div>
        <div class="md-step-title">Day ..</div>
        <div class="md-step-bar-left"></div>
        <div class="md-step-bar-right"></div>
      </div>
    </div>
    <!--End stepper-->
    </div>
    `;
};

// Display/Presentation logic
const createTableColumns = (sectionsMap)=>{
  let tableCols = "<th>Day</th>";
  for(let k in sectionsMap){
    if(k) tableCols += `<th>${sectionsMap[k]}</th>`;
  }
  return tableCols;
}



const createScheduleRows = (data, names) => {
  let rows = "";
  for (let key in data) {
    let currDate = incrementDate(parseInt(key));
    let rowDataCells = getDataCells(data[key], names); 
    let row = `
        <tr>
            <td>${currDate}</td>
            ${rowDataCells}
        </tr>
        `;
    rows += row;
  }
  return rows;
};

function getDataCells(rowGroup,names){
  let rowCells = "";
  for(let i in rowGroup){
    rowCells += `<td>${names[ rowGroup[i] ]}</td>`
  }
  return rowCells;
}

function incrementDate(incrementBy) {
  const today = new Date();
  today.setDate(today.getDate() + incrementBy);
  return today.toDateString();
}
