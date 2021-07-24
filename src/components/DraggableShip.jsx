import { useSeaBattle } from "../hooks";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useMemo } from "react";
import classNames from "classnames";
import { useDrag } from "react-dnd";

const DraggableShip = (props) => {
	const { id, x, y, length, direction, killed, onClick } = props;

	const { cellSize } = useSeaBattle();

	const [collected, drag] = useDrag(() => ({
		type: "SHIP",
		item: { id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const style = useMemo(() => {
		const style = {};

		const along = length * cellSize + length - 1;
		const across = cellSize;

		if (direction === "row") {
			style.width = `${along}px`;
			style.height = `${across}px`;
		} else {
			style.width = `${across}px`;
			style.height = `${along}px`;
		}

		const offsetX = x * (cellSize + 1);
		const offsetY = y * (cellSize + 1);

		style.left = `${offsetX}px`;
		style.top = `${offsetY}px`;

		return style;
	}, [cellSize, direction, length, x, y]);

	if (collected.isDragging) {
		return null;
	}

	return (
		<div
			ref={drag}
			className={classNames(styles.ship, {
				[styles["ship-killed"]]: killed,
			})}
			style={style}
			onClick={onClick}
		/>
	);
};

export default DraggableShip;

DraggableShip.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
	direction: PropTypes.oneOf(["row", "column"]).isRequired,
	killed: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

DraggableShip.defaultProps = {
	killed: false,
	onClick() {},
};
