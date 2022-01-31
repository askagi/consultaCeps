 const App = {
     // Função principal 

 }

 const statesList = document.querySelector('#states');
 const citiesList = document.querySelector('#cities');
 const stateInput = document.querySelector('#state');
 const cityInput = document.querySelector('#city');
 const publicPlaceInput = document.querySelector('#public_place');

 const responsePromiseStates = fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
 responsePromiseStates.then(response => {
     const responseBodyStates = response.json();
     responseBodyStates.then(data => {
         data.forEach(state => {
             statesList.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`;
             //  console.log(`<option value="${state.nome}">${state.sigla}</option>`);
         })
     })
 });


 stateInput.addEventListener('change', () => {
     citiesList.innerHTML = '';
     cityInput.value = '';
     publicPlaceInput.value = '';
     const responsePromiseCities = fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateInput.value.trim()}/municipios`);
     responsePromiseCities.then(response => {
         const responseBodyCities = response.json();
         responseBodyCities.then(cities => {
             cities.forEach(city => {
                 citiesList.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
                 //  console.log(city.nome);
             })
         })
     })
 });


 const DOM = {
     // Trabalhos com o Document Objects Model
     addressesContainer: document.querySelector('#data-table tbody'),

     clearAddress() {
         this.addressesContainer.innerHTML = ''
     },
     addAddress(address) {
         const tr = document.createElement('tr');
         tr.innerHTML = DOM.innerHTMLAddress(address);
         DOM.addressesContainer.appendChild(tr);
     },

     innerHTMLAddress(address) {
         const { cep, logradouro, bairro, localidade, uf } = address;
         const html = `
      <td>${cep}</td>
      <td>${logradouro}</td>
      <td>${bairro}</td>
      <td>${localidade}</td>
      <td>${uf}</td>
      `;
         return html;
     },
 }

 const Form = {
     // Trabalhos com o Form 

     //Capturar dados do formulário
     state: document.querySelector('#state'),
     city: document.querySelector('#city'),
     public_place: document.querySelector('#public_place'),
     //  statesList: document.querySelector('#states'),

     getValue() {
         return {
             state: Form.state.value,
             city: Form.city.value,
             public_place: Form.public_place.value,
         }
     },

     formValidate() {
         const { state, city, public_place } = Form.getValue();
         if (state.trim() === '' || city.trim() === '' || public_place === '') {
             throw new Error("Por favor, preencha todos dos campos");
         }
     },

     // acionar o envio dados para a requisição
     async submit(event) {
         event.preventDefault();
         try {
             Form.formValidate();
             const response = await Api.dataParseJson();
             DOM.clearAddress();
             response.forEach(DOM.addAddress);
             // Api.dataParseJson().forEach(item =>{console.log(item.cep);})

         } catch (error) {
             alert(error.message);
         }

     }
 }

 const Api = {
     find() {
         const { state, city, public_place } = Form.getValue();
         return fetch(`https://viacep.com.br/ws/${state}/${city}/${public_place}/json/`);
     },
     async dataParseJson() {
         const response = await Api.find();
         const data = await response.json();
         return await data;
     }
 }
















 // const form = document.querySelector('#form_data');
 // const Form = {
 //      state: document.querySelector('#state'),
 //      city: document.querySelector('#city'),
 //      public_place: document.querySelector('#public_place'),

 //      getValue() {
 //          return {
 //              state: Form.state.value,
 //              city: Form.city.value,
 //              public_place: Form.public_place.value,
 //          }
 //      }
 // }

 // const DOM = {
 //     addressContainer: document.querySelector('#data-table tbody'),
 //     // mostrar dos dados na tela 

 // }

 // form.addEventListener('submit', event => {
 //     event.preventDefault();
 //     console.log(Form.getValue());
 //     doSubmit();

 // })

 // async function doSubmit() {

 //     // ceps.innerHTML = `<p>${uf.value}</p> <p>${city.value}</p> <p>${public_place.value}</p>`
 //     const {state, city, public_place} = await Form.getValue();
 //     const cepsResponse = await findCeps(state, city, public_place);
 //     const data = await cepsResponse.json();
 //     console.log(data);


 //     data.map(({cep, logradouro, bairro, localidade, uf } = item, index) => {
 //         const li = document.createElement('li');
 //         const span_cep = document.createElement('span');
 //         const span_public_place = document.createElement('span');
 //         const span_neighborhood = document.createElement('span');
 //         const span_locale = document.createElement('span');
 //         const span_state = document.createElement('span');

 //         span_cep.innerHTML = `CEP: ${cep}`;
 //         span_public_place.innerHTML = logradouro;
 //         span_neighborhood.innerHTML = bairro;
 //         span_locale.innerHTML = localidade;
 //         span_state.innerHTML = uf;

 //         li.append(span_cep, span_public_place, span_neighborhood, span_locale, span_state )


 //         ul.appendChild(li);
 //         ceps.appendChild(ul);



 //     })

 // }