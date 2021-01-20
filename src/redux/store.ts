import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducers from "./reducers";

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({serializableCheck: false})
});

export default store;