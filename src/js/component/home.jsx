import React, {useState } from "react";
import ElementoLista from "./elementoLista.jsx";
import Total from "./total.jsx";

//create your first component
const Home = () => {
	const [inputValue, setInputValue ] = useState('');
	const [lista, setLista ] = useState([]);

	function asigna(evento){
		setInputValue(evento.target.value);
	}

	function sumaToDo(evento){
		if (evento.keyCode == 13 && evento.target.value != "") {
			setLista([...lista, evento.target.value]);
			setInputValue("");
		}
	}

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
						<ElementoLista lista={lista} setLista={setLista} />
						<hr />
						<Total total={lista.length} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
