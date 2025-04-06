import { call, delay, put, takeLatest } from "redux-saga/effects";
import { generateAssets, getTaskStatus } from "../api/generation";
import {
  generationStarted,
  generationComplete,
  generationFailed,
  startGeneration,
  updateProgress,
  updateMessage,
} from "./generationSlice";
import { SagaIterator } from "redux-saga";
import { States } from "../constants";

function* handleGeneration(
  action: ReturnType<typeof startGeneration>
): SagaIterator {
  try {
    const { userId, params } = action.payload;
    const taskId: string = yield call(generateAssets, userId, params);
    yield put(generationStarted(taskId));

    let done = false;

    while (!done) {
      yield delay(1000);
      const status = yield call(getTaskStatus, taskId);

      if (status.state === States.PROGRESS) {
        const { progress, action } = status.progress;
        yield put(updateProgress(progress));
        yield put(updateMessage(action));
      } else if (status.state === States.SUCCESS) {
        yield put(generationComplete(status.result));
        yield put(updateMessage(""));
        done = true;
      } else if (status.state === States.FAILURE) {
        yield put(generationFailed(status.error));
        yield put(updateMessage(""));
        done = true;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(generationFailed(err.message || "Unknown error"));
  }
}

export function* generationSaga() {
  yield takeLatest(startGeneration.type, handleGeneration);
}
