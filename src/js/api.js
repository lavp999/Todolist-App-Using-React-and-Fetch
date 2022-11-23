import React, {useState, useEffect } from "react";

const servidor = 'http://assets.breatheco.de/apis/fake/todos/user/lavp999';

/* -------------------------------------------------------------------------------------------------  */
/* Funciones para el tratamiento de API                                                             */
/* -------------------------------------------------------------------------------------------------  */
function creaLista(){
	fetch(servidor, {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  return resp;       // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  //setLista(data); // Es que no retorna la lista
	  })
	  .catch(error => {
		  console.log("Mi_Error",error);
	  });
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
		  return resp.json();       // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  .then(data => {
		  setLista(miLista); // lo se.... miLista local, setLista global...... pero este lenguaje no invita a muchas cosas, la verdad :-)
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
			creaLista();	
			leerLista();
		})
		.catch(error => {
			console.log("Mi Error",error);
		});
}
	