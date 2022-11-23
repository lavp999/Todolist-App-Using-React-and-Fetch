import React from "react";

const Total = (props) => {
	return (<div className="divTotal">
				    <p>{props.total} {props.total == 1 ? "item" : "items"}  left</p>
					<button onClick={props.borraLista}>Borrar Lista</button>
			</div>
			);
};

export default Total;

