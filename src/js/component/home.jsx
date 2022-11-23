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
		if (evento.keyCode == 13 && evento.target.value != ""){ 
			modificaLista([...lista, {"label": evento.target.value, "done" :false}]);
			setInputValue('');
		}
	}


/* -------------------------------------------------------------------------------------------------  */
/* Funciones para el tratamiento de API                                                             */
/* -------------------------------------------------------------------------------------------------  */
function creaLista(){
	fetch(servidor, {
		method: "POST",
		body: JSON.stringify([]),
		headers: { "Content-Type": "application/json" }
	  })
	  .then(resp => { return resp; })
	  .then(data => { console.log("Resultado: ", data); })
	  .catch(error => { console.log("Mi_Error",error);  });
}

function leerLista(){
	fetch(servidor)
	.then((resp) =>
	 {	
		if (resp.status == 200)
			 return resp.json(); 
	})
	.then((resp) => {
		if (!Array.isArray(resp) || (resp.length == 0)){
			setLista([]);
		}else{
			let miArray = [];
			resp.forEach(element => {
				miArray.push({"label": element.label, "done" :false});
			})
			setLista(miArray);
		}
	})
}


function modificaLista(miLista){

	fetch(servidor, {
		method: "PUT",
		body: JSON.stringify(miLista),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  return resp.json();   // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  setLista(miLista);    // lo se.... miLista local, setLista global...... pero este lenguaje no invita a muchas cosas, la verdad :-)
	  })
	  .catch(error => {
		  console.log("Mi Error",error);
	  });
}

function borraLista(){

	fetch(servidor, {
		method: "DELETE",
		headers: {"Content-Type": "application/json"}
		})
		.then(resp => {
			return resp.json();       // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//creaLista();	
			leerLista([]);
		})
		.catch(error => {
			console.log("Mi Error",error);
		});
}
	
/* -------------------------------------------------------------------------------------------------  */
/* Cargo la lista al cargar la aplicación                                                             */
/* -------------------------------------------------------------------------------------------------  */

	useEffect(()=>{
		leerLista();
		if (!Array.isArray(lista) || (lista.length == 0)){
			creaLista();
			leerLista();
		}
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
						<ElementoLista	lista = {lista} 
										modificaLista = {modificaLista}
						/>
						<hr />
						<Total	total={lista.length} 
								borraLista={borraLista}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
