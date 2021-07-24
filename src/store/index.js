import { configureStore } from "@reduxjs/toolkit";

import editorReducer from "./editor";
import mainReducer from "./main";

const store = configureStore({
	reducer: {
		editor: editorReducer,
		main: mainReducer,
	},
});

export default store;
