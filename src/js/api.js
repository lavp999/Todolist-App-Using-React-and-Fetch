import React, {useState, useEffect } from "react";

const servidor = 'http://assets.breatheco.de/apis/fake/todos/user/lavp999';

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
	  .then(data => { return []; })
	  .catch(error => { console.log("Mi_Error",error);  });

	  return [];
}

export function leerLista(){
	let miLista = [];

	fetch(servidor)
	.then((resp) => {return resp.json();})
	.then((resp) => {
		console.log("mia",resp.status, resp.msg)
		if (resp.msg == "This use does not exists, first call the POST method first to create the list for this username")
			miLista =  creaLista();
		else
			miLista = resp;
	})
	.catch(error => {setLista([]);	});

	return miLista;

}

export function modificaLista(miLista){
	let nuevaLista = miLista;
	
	fetch(servidor, {method: "PUT",
					 body: JSON.stringify(miLista),
					 headers: {"Content-Type": "application/json"}
	 				})
	.then(resp => { return resp.json(); })
	.then(data => { nuevaLista = data  })
	.catch(error => {console.log("Mi Error",error);});

	return nuevaLista;
}

function borraLista(){
	fetch(servidor, {method: "DELETE",
					 headers: {"Content-Type": "application/json"}
					})
	.then(resp => {	return resp.json();		})
	.then(data => {	return creaLista(); })
	.catch(error => {console.log("Mi Error",error);});

	return [];
}

export { borraLista };
