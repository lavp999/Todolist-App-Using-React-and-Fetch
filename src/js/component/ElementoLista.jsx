import React from "react";

const servidor = 'http://assets.breatheco.de/apis/fake/todos/user/lavp999';

const borraElementos = (miFunc, miArray, index) => {
	miFunc(miArray.filter((e, i) => i != index));

	fetch(servidor, {
		method: "PUT",
		body: JSON.stringify(miArray),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log("Lista:", miArray.filter((e, i) => i != index));
		  console.log(resp.ok);     // Será true (verdad) si la respuesta es exitosa.
		  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
		  console.log("Texto:", resp.text()); // Intentará devolver el resultado exacto como cadena (string)
		  console.log("res ", resp.json()); //esto imprimirá en la consola el objeto exacto recibido del servidor
		  return resp.json();       // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log("data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => {
		  //manejo de errores
		  console.log("Mi Error",error);
	  });


};

const listaItems = (miArray, miFunc) => miArray.map((elemento, index) => {
									return (<div className="divTareas" key={`dv-${index}`} >
												<p> {elemento.label}</p>
												<button className="btn" key={index} onClick={()=>borraElementos(miFunc, miArray, index)}> <i className="fas fa-trash-alt" /> </button>
											</div>
											)
								});
								
const ElementoLista = (props) => {
	return (<>
                {listaItems(props.lista, props.setLista)}
			</>
			);
};

export default ElementoLista;