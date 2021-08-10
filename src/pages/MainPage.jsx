import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BattleField, BattleFieldTable, Ship } from "../components";
import { reset } from "../store/party";
import styles from "./styles.module.css";

const MainPage = () => {
	const ships = useSelector((state) => state.main.ships);
	const dispatch = useDispatch();

	useEffect(() => dispatch(reset(ships)), [dispatch, ships]);

	return (
		<div className={styles.container}>
			<div className={styles["main-content"]}>
				<BattleField>
					<BattleFieldTable />

					{ships.map((ship) => (
						<Ship key={ship.id} {...ship} />
					))}
				</BattleField>

				<div className={styles["main-actions"]}>
					<Link to="/editor">
						<button className={styles.action}>Редактировать</button>
					</Link>
					<Link to="/bot">
						<button className={styles.action}>
							Играть с ботом
						</button>
					</Link>
					<Link to="/party">
						<button className={styles.action}>Играть онлайн</button>
					</Link>
					<Link to="/challenge">
						<button className={styles.action}>Бросить вызов</button>
					</Link>
				</div>

				<BattleField>
					<BattleFieldTable />
				</BattleField>
			</div>
		</div>
	);
};

export default MainPage;
