import React, {useState, useEffect } from "react";
import ElementoLista from "./elementoLista.jsx";
import Total from "./total.jsx";

const servidor = 'http://assets.breatheco.de/apis/fake/todos/user/lavp999';

//create your first component
const Home = () => {
	const [inputValue, setInputValue ] = useState('');
	const [lista, setLista ] = useState([]);

	function asigna(evento){
		setInputValue(evento.target.value);
	}

	function sumaToDo(evento){
		if (evento.keyCode == 13 && evento.target.value != "") {
			fetch(servidor, {
				method: "PUT",
				body: JSON.stringify([...lista, {"label": evento.target.value, "done" :false}]),
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			  .then(resp => {
				  console.log(resp.ok);     // Será true (verdad) si la respuesta es exitosa.
				  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				  return resp.json();       // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			  })
			  .then(data => {
				  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				  setLista([...lista, {"label": evento.target.value, "done" :false}]);
				  setInputValue('');
				  console.log("data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			  })
			  .catch(error => {
				  //manejo de errores
				  console.log("Mi Error",error);
			  });
		}
	}

/* -------------------------------------------------------------------------------------------------  */
/* Cargo la lista al cargar la aplicación                                                             */
/* -------------------------------------------------------------------------------------------------  */

	useEffect(()=>{
		fetch(servidor)
		.then((resp) =>
		 {	
			// console.log("Mi respuesta: ", resp.json());
			// console.log("Mi estatus: ", resp.status);
			if (resp.status == 200)
				 return resp.json(); 
			//else return new Promise(); hacer el post?
		})
		.then((resp) => {
			let miArray = [];
			resp.forEach(element => {
				// setLista([...lista, {"label": element.label, "done" :false}]);
				miArray.push({"label": element.label, "done" :false});
			})
			setLista(miArray);
		})
	}, []);

/* -------------------------------------------------------------------------------------------------  */
/* -------------------------------------------------------------------------------------------------  */

	return (
		<div>
			<div className="cajaBlanca">
				<div className="text-center">
					<p className="titulo">todos</p>
				</div>
				<div className="tarjeta">
					<div className="soporteCaja">
						<input className="cajaInput" type="text" onChange={asigna} value={inputValue} onKeyDown={sumaToDo}/>
					</div>
					<div>
						<ElementoLista lista={lista} setLista={setLista} borrado={}/>
						<hr />
						<Total total={lista.length} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
