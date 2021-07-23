import { Link } from "react-router-dom";
import { BattleField, BattleFieldTable, Ship } from "../components";
import styles from "./styles.module.css";

const MainPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles["main-content"]}>
				<BattleField>
					<BattleFieldTable />

					<Ship x={0} y={0} length={4} direction="row" />
					<Ship x={2} y={2} length={2} direction="column" />
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
