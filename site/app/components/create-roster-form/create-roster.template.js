export const CreateRosterTemplate = () => {
    return`
    <main>
    <h1>Getting started</h1>
    <small>
        Simply fill in the required fields 
        below to generate your new roster.
    </small>
    <form class="centered-form" id="roster-form-container" onsubmit="event.preventDefault();" novalidate>
        <input class="span" type="number" placeholder="Rooste span in days" id="span" name="span" required/>
        <hr>

        <section id="staff-input-div">
        <input class="staff-input" placeholder="Name of staff memeber" id="staff1" required/>
        <input class="staff-input" placeholder="Name of staff member" id="staff2" required/>
        <input class="staff-input" placeholder="Name of staff member" id="staff3" required/>
        </section>
        <i id="staff-input-add" class="fas fa-plus-circle"></i>
        <hr>

        <section id="section-input-div">
        <input class="section-input" placeholder="Name of work section e.g. Packaging" id="section1" required/>
        <input class="section-input" placeholder="Name of work section e.g. Operations" id="section2" required/>
        </section>
        <i  id="section-input-add" class="fas fa-plus-circle"></i>
        <button type="submit" id="generate-rooster">Generate roster</button>

        <small id="form-err-msg"></small>
    </form>
    </main>
        `
}