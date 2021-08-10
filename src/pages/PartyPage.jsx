import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { BattleField, BattleFieldTable, Ship, Shot } from "../components";
import { exist, challenge as socketChallenge, shot, find } from "../socket";
import styles from "./styles.module.css";

const PartyPage = (props) => {
	const { challenge } = props;

	const dispatch = useDispatch();
	const history = useHistory();
	const { key } = useParams();

	const state = useSelector((state) => state.party);
	const defaultShips = useSelector((state) => state.main.ships);

	useEffect(() => {
		if (challenge) {
			if (key) {
				socketChallenge(defaultShips, key);
			} else {
				socketChallenge(defaultShips);
			}
		} else {
			find(defaultShips);
		}
	}, [challenge, defaultShips, dispatch, key, state.key]);

	useEffect(() => {
		if (challenge) {
			history.push({ pathname: `/challenge/${state.key}` });
		}
	}, [state.key, history, challenge]);

	const href = window.location.href;

	const status = useMemo(() => {
		if (state.waiting) {
			if (challenge) {
				return (
					<div style={{ textAlign: "center", fontSize: "30px" }}>
						<span>Ищем соперника</span>
						<pre style={{ fontSize: "12px", userSelect: "text" }}>
							{href}
						</pre>
					</div>
				);
			}

			return (
				<div style={{ textAlign: "center", fontSize: "30px" }}>
					<span>Ищем соперника</span>
				</div>
			);
		}

		if (state.playing) {
			if (state.player1Turn) {
				return (
					<span style={{ textAlign: "center", fontSize: "30px" }}>
						Ваш ход
					</span>
				);
			}

			return (
				<span style={{ textAlign: "center", fontSize: "30px" }}>
					Ход соперника
				</span>
			);
		}

		if (state.player1Win) {
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
	}, [
		challenge,
		href,
		state.player1Turn,
		state.player1Win,
		state.playing,
		state.waiting,
	]);

	const onExit = useCallback(() => {
		exist();
		history.push("/");
	}, [history]);

	if (state.incorrect) {
		return (
			<div className={styles.container} style={{ textAlign: "center" }}>
				<span style={{ textAlign: "center", fontSize: "30px" }}>
					Что-то пошло не так!
				</span>
				<Link to="/">
					<button className={styles.action}>Вернуться</button>
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles["main-content"]}>
				<BattleField>
					<BattleFieldTable />

					{state.ships1.map((ship) => (
						<Ship key={ship.id} {...ship} />
					))}

					{state.shots1.map((shot) => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>

				<div className={styles["main-actions"]}>
					{status}

					<button className={styles.action} onClick={onExit}>
						{(() => {
							if (state.waiting) {
								return "Выйти";
							}

							return state.playing ? "Сдаться" : "Выйти";
						})()}
					</button>
				</div>

				<BattleField>
					<BattleFieldTable hovered onClick={(x, y) => shot(x, y)} />

					{state.ships2.map((ship) => (
						<Ship key={ship.id} {...ship} />
					))}

					{state.shots2.map((shot) => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>
			</div>
		</div>
	);
};

export default PartyPage;
