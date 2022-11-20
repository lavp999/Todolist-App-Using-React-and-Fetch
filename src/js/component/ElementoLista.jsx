import React from "react";

const borraElementos = (elemento) => {
	setLista(lista.filter((e, i) => i != elemento));
};

const listaItems = (miArray, miFunc) => miArray.map((elemento, index) => {
									return (<div className="divTareas" key={`dv-${index}`} >
												<p> {elemento.label}</p>
												<button className="btn" key={index} onClick={()=>miFunc(miArray.filter((e, i) => i != index))}> <i className="fas fa-trash-alt" /> </button>
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