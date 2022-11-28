import React, {useState, useEffect } from "react";
import ElementoLista from "./elementoLista.jsx";
import Total from "./total.jsx";
import {leerLista, modificaLista, borraLista}  from "../api.js"

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
/* Funciones para el tratamiento de API                                                               */
/* -------------------------------------------------------------------------------------------------  */
function creaLista(){
	fetch(servidor, {
		method: "POST",
		body: JSON.stringify([]),
		headers: { "Content-Type": "application/json" }
	  })
	  .then(resp => { return resp; })
	  .then(data => { setLista([]); })
	  .catch(error => { console.log("Mi_Error",error);  });
}

function leerLista(){
	fetch(servidor)
	.then((resp) => {return resp.json();})
	.then((resp) => {
		if (resp.msg == "This use does not exists, first call the POST method first to create the list for this username")
			creaLista();
		else
			setLista(resp);
	})
	.catch(error => {setLista([]);	});
}

function modificaLista(miLista){
	fetch(servidor, {method: "PUT",
					 body: JSON.stringify(miLista),
					 headers: {"Content-Type": "application/json"}
	 				})
	.then(resp => { return resp.json(); })
	.then(data => { setLista(miLista);  })
	.catch(error => {console.log("Mi Error",error);});
}

function borraLista(){
	fetch(servidor, {method: "DELETE",
					 headers: {"Content-Type": "application/json"}
					})
	.then(resp => {	return resp.json();		})
	.then(data => {	creaLista(); })
	.catch(error => {console.log("Mi Error",error);});
}
	
/* -------------------------------------------------------------------------------------------------  */
/* Cargo la lista al cargar la aplicación                                                             */
/* -------------------------------------------------------------------------------------------------  */

	useEffect(()=>{
		leerLista();
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
