import { forwardRef } from "react";
import { useSeaBattle } from "../hooks";
import styles from "./styles.module.css";

const BattleFieldTable = forwardRef((props, ref) => {
	const { cellSize } = useSeaBattle();

	return (
		<table ref={ref} className={styles["battlefield-table"]}>
			<tbody>
				{matrix.map((row, y) => (
					<tr key={y}>
						{row.map((item, x) => {
							let markerX = null;
							let markerY = null;

							if (x === 0) {
								markerX = (
									<span
										className={styles.marker}
										style={{ left: `-${cellSize}px` }}
									>
										{y + 1}
									</span>
								);
							}

							if (y === 0) {
								markerY = (
									<span
										className={styles.marker}
										style={{ top: `-${cellSize}px` }}
									>
										{"АБВГДЕЖЗИК"[x]}
									</span>
								);
							}

							return (
								<td
									key={x}
									className={styles["battlefield-item"]}
									style={{
										width: `${cellSize}px`,
										height: `${cellSize}px`,
									}}
								>
									{markerX}
									{markerY}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
});

export default BattleFieldTable;

const matrix = [];

for (let y = 0; y < 10; y++) {
	const row = [];

	for (let x = 0; x < 10; x++) {
		const item = { x, y };
		row.push(item);
	}

	matrix.push(row);
}
