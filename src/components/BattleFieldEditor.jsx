import BattleField from "./BattleField";
import BattleFieldTable from "./BattleFieldTable";
import Dock from "./Dock";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { useMemo, useRef } from "react";
import DraggableShip from "./DraggableShip";
import { useDrop } from "react-dnd";
import { useSeaBattle } from "../hooks";

const BattleFieldEditor = (props) => {
	const { ships, onPlace, onDock, onRotate } = props;

	const dockedShips = useMemo(() => ships.filter((x) => !x.placed), [ships]);
	const placedShips = useMemo(() => ships.filter((x) => x.placed), [ships]);

	const { cellSize } = useSeaBattle();
	const placeRef = useRef();

	const [, dockDrop] = useDrop(() => ({
		accept: "SHIP",
		drop(item) {
			onDock(item.id);
		},
	}));

	const [, placeDrop] = useDrop(() => ({
		accept: "SHIP",

		drop(item, monitor) {
			const mouseStart = monitor.getInitialClientOffset();
			const mouseFinish = monitor.getClientOffset();
			const shipStart = monitor.getInitialSourceClientOffset();
			const rect = placeRef.current.getBoundingClientRect();

			const x = Math.floor(
				(mouseFinish.x -
					rect.left -
					mouseStart.x +
					shipStart.x +
					cellSize / 2) /
					cellSize
			);

			const y = Math.floor(
				(mouseFinish.y -
					rect.top -
					mouseStart.y +
					shipStart.y +
					cellSize / 2) /
					cellSize
			);

			onPlace(item.id, x, y);
		},
	}));

	placeDrop(placeRef);

	return (
		<div className={styles["battlefield-constructor"]}>
			<Dock ref={dockDrop}>
				{dockedShips.map((ship) => (
					<DraggableShip
						key={ship.id}
						{...ship}
						onClick={() => onRotate(ship.id)}
					/>
				))}
			</Dock>

			<BattleField>
				<BattleFieldTable ref={placeRef} />

				{placedShips.map((ship) => (
					<DraggableShip
						key={ship.id}
						{...ship}
						onClick={() => onRotate(ship.id)}
					/>
				))}
			</BattleField>
		</div>
	);
};

export default BattleFieldEditor;

BattleFieldEditor.propTypes = {
	ships: PropTypes.array.isRequired,
	onPlace: PropTypes.func.isRequired,
	onDock: PropTypes.func.isRequired,
	onRotate: PropTypes.func.isRequired,
};
