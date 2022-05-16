(() => {
  const Utils = {
    settings: {
      backendBaseUrl: "https://pokeapi.co/api/v2",
    },

      getFormattedBackendUrl: ({ query, searchType }) => {
        return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
      },

      getPokemon: ({ query, searchType = "pokemon" }) => {
        return Utils.fetch({
          url: Utils.getFormattedBackendUrl({ query, searchType }),
          searchType,
        });
      },

      fetch: async ({ url, searchType }) => {
        try {
          const rawResponse = await fetch(url);
          if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
          }
          return rawResponse.json();
        } catch (error) {
          throw error;
        }
      },
  
      getEvolutionChain: async url => {
        let arrSearch = Utils.getArrySearch(url);
        let { evolution_chain } = await Utils.getPokemon({ query: arrSearch[0], searchType: arrSearch[1] });
        arrSearch = Utils.getArrySearch(evolution_chain.url);
        console.log(arrSearch);

        let { chain } = await Utils.getPokemon({ query: arrSearch[0], searchType: arrSearch[1] })

        return Utils.getArryEvolutionChain(chain);
    },

      getArrySearch: url => {
        const arryurl = url.split("/").slice(5, 7).reverse();
        console.log(arryurl);
        return arryurl;
      },

      getArryEvolutionChain: ({ species, is_baby, evolves_to }) => {
        const stack = [];
        stack.push({ name: species.name, is_baby: is_baby });

        while (evolves_to.length > 0) {
            if (evolves_to.length > 1) {
                evolves_to.forEach(({ species, is_baby }) => {
                    stack.push({ name: species.name, is_baby: is_baby });
                });
            } else {
                stack.push({ name: evolves_to[0].species.name, is_baby: evolves_to[0].is_baby });
            }
            evolves_to = evolves_to[0].evolves_to
        }
        return stack;
      },

  };
  document.Utils = Utils;
})();
