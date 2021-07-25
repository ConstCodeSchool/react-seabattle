import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BattleField, BattleFieldTable, Ship, Shot } from "../components";
import { reset, shoot } from "../store/bot";
import styles from "./styles.module.css";

const BotPage = () => {
	const dispatch = useDispatch();

	const state = useSelector((state) => state.bot);
	const defaultShips = useSelector((state) => state.main.ships);

	const [showBot, setShowBot] = useState(false);

	useEffect(() => {
		dispatch(reset(defaultShips));
	}, [defaultShips, dispatch]);

	const status = useMemo(() => {
		if (state.playing) {
			return (
				<span style={{ textAlign: "center", fontSize: "30px" }}>
					Ваш ход!
				</span>
			);
		}

		if (state.playerWin) {
			return (
				<span style={{ textAlign: "center", fontSize: "30px" }}>
					Поздравляю с победой!
				</span>
			);
		}

		return (
			<span style={{ textAlign: "center", fontSize: "30px" }}>
				Увы, вы проиграли.
			</span>
		);
	}, [state.playerWin, state.playing]);

	return (
		<div className={styles.container}>
			<div className={styles["main-content"]}>
				<BattleField>
					<BattleFieldTable />

					{state.playerShips.map((ship) => (
						<Ship key={ship.id} {...ship} />
					))}

					{state.playerShots.map((shot) => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>

				<div className={styles["main-actions"]}>
					{status}
					<button
						className={styles.action}
						onClick={() => dispatch(reset(defaultShips))}
					>
						Переиграть
					</button>
					<button
						className={styles.action}
						onClick={() => setShowBot((x) => !x)}
					>
						Показать бота
					</button>
					<Link to="/">
						<button
							className={styles.action}
							onClick={() => dispatch(reset(defaultShips))}
						>
							Сдаться
						</button>
					</Link>
				</div>

				<BattleField>
					<BattleFieldTable
						hovered
						onClick={(x, y) => dispatch(shoot({ x, y }))}
					/>

					{state.botShips
						.filter((ship) => ship.killed || showBot)
						.map((ship) => (
							<Ship key={ship.id} {...ship} />
						))}

					{state.botShots.map((shot) => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>
			</div>
		</div>
	);
};

export default BotPage;
