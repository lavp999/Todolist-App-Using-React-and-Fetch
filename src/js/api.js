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
	  .then(data => { setLista([]); })
	  .catch(error => { console.log("Mi_Error",error);  });
}

export function leerLista(){
	fetch(servidor)
	.then((resp) => {return resp.json();})
	.then((resp) => {
		console.log("mia",resp.status, resp.msg)
		if (resp.msg == "This use does not exists, first call the POST method first to create the list for this username")
			creaLista();
		else
			setLista(resp);
	})
	.catch(error => {setLista([]);	});
}

export function modificaLista(miLista){
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

export { creaLista, borraLista };
