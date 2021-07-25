import { forwardRef } from "react";
import PropTypes from "prop-types";
import { useSeaBattle } from "../hooks";
import styles from "./styles.module.css";
import classNames from "classnames";

const BattleFieldTable = forwardRef((props, ref) => {
	const { hovered, onClick } = props;
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
									className={classNames({
										[styles["battlefield-item"]]: true,
										[styles["battlefield-item__hovered"]]:
											hovered,
									})}
									style={{
										width: `${cellSize}px`,
										height: `${cellSize}px`,
									}}
									onClick={() => onClick(x, y)}
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

BattleFieldTable.propTypes = {
	hovered: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

BattleFieldTable.defaultProps = {
	hovered: false,
	onClick() {},
};

const matrix = [];

for (let y = 0; y < 10; y++) {
	const row = [];

	for (let x = 0; x < 10; x++) {
		const item = { x, y };
		row.push(item);
	}

	matrix.push(row);
}
