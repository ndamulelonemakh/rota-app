export const AppTemplate = (props) => {
  return `
    <div class="grid-container">
        <section class="top-nav">
            <h1>Rota App</h1>
        </section>

        <section class="header shadow-lg">
            <p>
            <h2>What is rota?</h2>
            <span>
              Rota is a simple web app that 
              helps you create fair rosters
              within a few seconds.
            </p>
        </section>
        <section id="main-content" class="main-content shadow-md">
        <div id="loader-placeholder">....</div>
        </section>

        <section id="roster-container" class="roster-container shadow-md">
        </section>

        <section class="footer" id="footer">
            &copy <a href="https:/twitter.com/ndamulelonemakh">N Nemakhavhani</a>, 2024. All rights reserved.
        </section>
    </div>
    `;
};
