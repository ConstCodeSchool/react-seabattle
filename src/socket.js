import { io } from "socket.io-client";
import { dispatch } from "./store";
import { incorrect, update } from "./store/party";

const socket = io();

// обновление состояния партии
socket.on("party.update", (party) => dispatch(update(party)));

// ошибка. Чаще всего вызывается из-за неверного ship массива.
socket.on("party.incorrect", () => dispatch(incorrect()));

// поиск случайной партии. Принимает массив кораблей.
export const find = (ships) => socket.emit("party.find", ships);

// бросить/принять вызов. Первый аргумент массив кораблей. Второй аргумент не обязательный ключ принимаемого вызова.
export const challenge = (ships, key) =>
	socket.emit("party.challenge", ships, key);

// сдаться
export const surrender = () => socket.emit("party.surrender");

// выйти из партии (сдаться если соперник все еще в партии)
export const exist = () => socket.emit("party.exit");

// выстрел. Принимает координаты выстрела.
export const shot = (x, y) => socket.emit("party.shot", x, y);
