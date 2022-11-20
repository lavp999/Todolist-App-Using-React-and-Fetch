import React from "react";

const Total = (props) => {
	return (<div className="divTotal">
				    <p>{props.total} {props.total == 1 ? "item" : "items"}  left</p>
			</div>
			);
};

export default Total;

