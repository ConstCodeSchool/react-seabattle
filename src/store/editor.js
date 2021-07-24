import { createSlice } from "@reduxjs/toolkit";

import { getDefaultShips, isNormalPosition, randomize } from "../additional";

const initialState = {
	ships: getDefaultShips(),
};

export const editorSlice = createSlice({
	name: "editor",

	initialState,

	reducers: {
		setShips(state, action) {
			state.ships = action.payload;
		},

		place(state, action) {
			const { id, x, y } = action.payload;

			const placed = state.ships.filter(
				(ship) => ship.placed && ship.id !== id
			);

			const ship = state.ships.find((ship) => ship.id === id);

			const normal = isNormalPosition([...placed, { ...ship, x, y }]);

			if (normal) {
				Object.assign(ship, { x, y, placed: true });
			}
		},

		dock(state, action) {
			const id = action.payload;

			const defaultShip = getDefaultShips().find(
				(ship) => ship.id === id
			);
			const ship = state.ships.find((ship) => ship.id === id);

			if (ship && defaultShip) {
				Object.assign(ship, defaultShip);
			}
		},

		random(state) {
			state.ships = randomize();

			for (const ship of state.ships) {
				ship.placed = true;
			}
		},

		reset(state) {
			state.ships = getDefaultShips();
		},

		rotate(state, action) {
			const id = action.payload;

			const ship = state.ships.find((ship) => ship.id === id);

			if (!ship) {
				return;
			}

			if (!ship.placed) {
				ship.direction = ship.direction === "row" ? "column" : "row";
			} else {
				const placed = state.ships.filter(
					(ship) => ship.placed && ship.id !== id
				);

				const normal = isNormalPosition([
					...placed,
					{
						...ship,
						direction: ship.direction === "row" ? "column" : "row",
					},
				]);

				if (normal) {
					ship.direction =
						ship.direction === "row" ? "column" : "row";
				}
			}
		},
	},
});

export const { setShips, place, dock, random, reset, rotate } =
	editorSlice.actions;

export default editorSlice.reducer;
