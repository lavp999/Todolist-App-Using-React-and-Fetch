import React from "react";

const servidor = 'http://assets.breatheco.de/apis/fake/todos/user/lavp999';

const borraElementos = (miArray, index, miModificaLista) => {
	miModificaLista(miArray.filter((e, i) => i != index));
};

const listaItems = (miArray, modificaLista) => miArray.map((elemento, index) => {
									return (<div className="divTareas" key={`dv-${index}`} >
												<p>{elemento.label}</p>
												<button className="btn" key={index} onClick={()=>borraElementos(miArray, index, modificaLista)}> <i className="fas fa-trash-alt" /> </button>
											</div>
											)
});
								
const ElementoLista = (props) => {
	return (<>
                {listaItems(props.lista, props.modificaLista)}
			</>
			);
};

export default ElementoLista;