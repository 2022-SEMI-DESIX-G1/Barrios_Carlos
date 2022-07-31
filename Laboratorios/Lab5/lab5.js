((Utils) => {
	const App = {
		htmlElements: {
			form: document.querySelector('#formulario'),
			input: document.querySelector('#num'),
			confirmacion: document.querySelector('#confirmacion'),
			respuesta: document.querySelector('#respuesta')
		},
		init: () => {
			App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
			App.htmlElements.respuesta.addEventListener('click', App.handlers.onCardClick);
			App.htmlElements.confirmacion.addEventListener('click', App.handlers.onConfirmacionClick);
		},
		utils: {
			...Utils.methods,
		},
		templates: {
			carta: (index, cantidad) => {
				return `<div class="carta" id="carta_${index}" data-index="${index}" data-valor="${cantidad}">
				${cantidad}
				</div>`;
			},
			confirmacion: (index, valor) => {
				return `<div class="eliminar" >
				¿Seguro que desea eliminar esta carta "${valor}"? <a href="#" id="eliminar_si" data-index="${index}"> &nbsp Sí &nbsp </a> &nbsp | &nbsp <a href="#" id="eliminar_no">&nbsp No</a>
				</div>`;
			}
		},
		handlers: {
			onCardClick: (e) => {
				if (e.target.className === 'carta') {
					let index = e.target.dataset.index;
					let valor = e.target.dataset.valor;

					App.utils.resetearCartas();

					document.getElementById('carta_' + index).style.borderColor = 'red';

					App.htmlElements.confirmacion.innerHTML = App.templates.confirmacion(index, valor);
				}
			},
			onConfirmacionClick: (e) => {
				if (e.target.id === 'eliminar_si') {
					let index = 'carta_' + e.target.dataset.index;

					document.getElementById(index).outerHTML = '';
					App.htmlElements.confirmacion.innerHTML = '';
				}

				if (e.target.id === 'eliminar_no') {
					App.htmlElements.confirmacion.innerHTML = '';

					App.utils.resetearCartas();
				}
			},
			onFormSubmit: (e) => {
				e.preventDefault();

				App.htmlElements.respuesta.innerHTML = '';

				const n = App.htmlElements.input.value;
				App.utils.fibonacci(n).forEach(function(valor, index) {
					App.htmlElements.respuesta.innerHTML += App.templates.carta(index, valor);
				});
			}
		}
	};
	App.init();
})(document.Utils);