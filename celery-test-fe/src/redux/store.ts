import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import generationReducer from "./generationSlice";
import { generationSaga } from "./generationSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    generation: generationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(generationSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
