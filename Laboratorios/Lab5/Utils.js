(() => {
  const Utils = {
    methods: {
      fibonacci: (cantidad) => {
        const arr = [];
        let fib;
        let fib1 = 0;
        let fib2 = 1;
        let proxFib;

        for (let i = 1; i <= cantidad; i++) {
          fib = fib1;
          proxFib = fib1 + fib2;
          fib1 = fib2;
          fib2 = proxFib;

          arr.push(fib);
        }
        return arr;
      },
      resetearCartas: () => {
        let cartas = document.getElementsByClassName('carta');

        for (let i = 0; i < cartas.length; i++) {
          cartas[i].style.borderColor = 'grey';
        }

      }
    }
  }
  document.Utils = Utils;
})();