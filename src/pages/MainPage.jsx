import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BattleField, BattleFieldTable, Ship } from "../components";
import styles from "./styles.module.css";

const MainPage = () => {
	const ships = useSelector((state) => state.main.ships);

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
					<button className={styles.action}>Играть онлайн</button>
					<button className={styles.action}>Бросить вызов</button>
				</div>

				<BattleField>
					<BattleFieldTable />
				</BattleField>
			</div>
		</div>
	);
};

export default MainPage;
