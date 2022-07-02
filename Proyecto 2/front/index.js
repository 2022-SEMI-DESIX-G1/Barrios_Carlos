(() => {
  const App = {
    config: {
      apiBaseUrl: "http://localhost:3000/pokemon",
    },
    htmlElements: {
      form: document.querySelector(".pokemon-form"),
      input: document.querySelector("#pokemon-input"),
      results: document.getElementById("results-cont"),
      ckSprites: document.getElementById("sprites"),
      ckLocation: document.getElementById("ubicacion"),
      ckCadena: document.getElementById("chain"),
    },
    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.handleFormSubmit
      );
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();
        const pokemon = App.htmlElements.input.value;
        const url = App.utils.getUrl({ pokemon });
        const { data } = await axios.post(url);
        const evo = await axios.get(url);
        console.log(evo);

        const renderedTemplate = App.templates.pokemonCard({ data }, evo.data);
        console.log({ data });
        App.htmlElements.results.innerHTML = renderedTemplate;
      },    
    },
    
    templates: {
      
      errorCard: () => `<h1 class="err">Error</h1>`,
      pokemonCard: ({ data }, evo) => {

        var evolutionList = evo.evol.map(
          (element) =>
            `
            <tr>
             <td>
                ${element}
              </td>
              </tr>
            `
        );
        var locationList = evo.lug.map(
          (element) =>
            `
            <tr>
              <td>
                ${element}
              </td>
              </tr>  
           `
        );
        return `<div class="results">
                  <h2>${data.data.name} (${data.data.id})</h2>
                  <div class="card general">
                  <table>
                    <tr>
                      <th>
                        Altura
                      </th>
                      <th>
                        Peso
                      </th>
                      
                    </tr>
                    <tr>
                      <td>
                      ${data.data.height}
                      </td>
                      <td>
                      ${data.data.weight}
                      </td>
                    </tr>
                  </table>
                  </div>
                    
                  <div class="card sprites general"> 
                    <h4>Experiencia</h4>
                    <p>${data.data.base_experience}</p>
                  </div>
                  ${
                    App.htmlElements.ckSprites.checked ?
                    `<div class="card sprites general">
                    <h4>Sprites</h4>
                    <div class="imgs">
                    <img class="i" src="${data.data.sprites.front_default}" alt="" srcset="">

                    <img class="i" src="${data.data.sprites.back_default}" alt="" srcset="">

                    <img class="${data.data.sprites.back_female != null ? "visible i" : "d-none" }" src="${data.data.sprites.back_female}" alt="" srcset="">

                    <img class="${data.data.sprites.front_female != null ? "visible i" : "d-none" }i" src="${data.data.sprites.front_female}" alt="" srcset="">

                    <img class="i" src="${data.data.sprites.front_shiny}" alt="" srcset="">

                    <img class="i" src="${data.data.sprites.back_shiny}" alt="" srcset="">
                    </div> 
                  </div>`:""
                  }

                  ${
                    App.htmlElements.ckLocation.checked ?
                    `<div class="card ubicacion">
                        <table class="tabla">
                        <thead>
                          <tr>
                            <th>Ubicación</th>
                          </tr>
                          </thead>
                          <tbody>
                          ${locationList.join("")}
                          </tbody>
                        </table>
                      </div>`
                      :
                       ""
                  }

                  ${
                    App.htmlElements.ckCadena.checked  ?
                    `<div class="card cadena">
                        <table class="tabla">
                        <thead>
                        <tr>
                          <th>Cadena de evolución</th>
                          </tr>
                        </thead>
                        <tbody>
                        ${evolutionList.join("")}
                        </tbody>
                        </table>
                      </div>`:""
                  }
                  
                </div>
                  `;
      },
    },
    utils: {
      getUrl: ({ pokemon }) => {
        return `${App.config.apiBaseUrl}/${pokemon}`;
      },
    }
  };
  App.init();
})();
