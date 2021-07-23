// import { BattleField, BattleFieldTable, Ship, Shot } from "./components";

import { Switch, Route } from "react-router-dom";

import { BotPage, EditorPage, MainPage } from "./pages";

const App = () => {
	return (
		<Switch>
			<Route path="/editor" component={EditorPage} />
			<Route path="/bot" component={BotPage} />
			<Route path="/" component={MainPage} />
		</Switch>
	);
	// return (
	// 	<>
	// 		<BattleField style={{ margin: "30px" }}>
	// 			<BattleFieldTable />

	// 			<Ship x={0} y={0} length={4} direction="row" />
	// 			<Ship x={2} y={2} length={2} direction="column" killed />

	// 			<Shot x={0} y={2} status="missed" />
	// 			<Shot x={0} y={4} status="hitted" />
	// 		</BattleField>
	// 	</>
	// );
};

export default App;

/*
<BattleField style={{ margin: "30px" }}>
	<BattleFieldTable
		columns={12}
		rows={5}
		signed={false}
		axisX={(n) => n + 1}
		axisY={(n) => "АБВГДЕЖЗИКЛМ"[n]}
	/>
</BattleField>
*/
