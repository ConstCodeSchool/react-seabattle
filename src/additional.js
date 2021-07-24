export const isValidCoordinats = (x, y) => 0 <= x && x < 10 && 0 <= y && y < 10;

export const getDefaultShips = () => [
	{ id: 1, x: 0, y: 0, length: 4, direction: "row", placed: false },
	{ id: 2, x: 0, y: 2, length: 3, direction: "row", placed: false },
	{ id: 3, x: 4, y: 2, length: 3, direction: "row", placed: false },
	{ id: 4, x: 0, y: 4, length: 2, direction: "row", placed: false },
	{ id: 5, x: 3, y: 4, length: 2, direction: "row", placed: false },
	{ id: 6, x: 6, y: 4, length: 2, direction: "row", placed: false },
	{ id: 7, x: 0, y: 6, length: 1, direction: "row", placed: false },
	{ id: 8, x: 2, y: 6, length: 1, direction: "row", placed: false },
	{ id: 9, x: 4, y: 6, length: 1, direction: "row", placed: false },
	{ id: 10, x: 6, y: 6, length: 1, direction: "row", placed: false },
];

export const isNormalPosition = (ships) => {
	const matrix = Array(10)
		.fill()
		.map(() => Array(10).fill(0));

	for (const ship of ships) {
		const { direction, length } = ship;

		const dx = direction === "row";
		const dy = direction === "column";

		for (let i = 0; i < length; i++) {
			const x = ship.x + i * dx;
			const y = ship.y + i * dy;

			if (!isValidCoordinats(x, y) || matrix[y][x]) {
				return false;
			}
		}

		if (direction === "row") {
			for (let y = ship.y - 1; y <= ship.y + 1; y++) {
				for (let x = ship.x - 1; x <= ship.x + length; x++) {
					if (isValidCoordinats(x, y)) {
						matrix[y][x] = 1;
					}
				}
			}
		} else {
			for (let y = ship.y - 1; y <= ship.y + length; y++) {
				for (let x = ship.x - 1; x <= ship.x + 1; x++) {
					if (isValidCoordinats(x, y)) {
						matrix[y][x] = 1;
					}
				}
			}
		}
	}
	return true;
};

export const randomize = () => {
	const ships = getDefaultShips();

	for (let i = 0; i < 10 ** 6; i++) {
		for (const ship of ships) {
			ship.x = Math.floor(Math.random() * 10);
			ship.y = Math.floor(Math.random() * 10);
			ship.direction = ["row", "column"][Math.floor(Math.random() * 2)];
		}

		if (isNormalPosition(ships)) {
			return ships;
		}
	}

	return getDefaultShips();
};
