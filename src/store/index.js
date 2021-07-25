import { configureStore } from "@reduxjs/toolkit";

import botReducer from "./bot";
import editorReducer from "./editor";
import mainReducer from "./main";

const store = configureStore({
	reducer: {
		bot: botReducer,
		editor: editorReducer,
		main: mainReducer,
	},
});

export default store;
