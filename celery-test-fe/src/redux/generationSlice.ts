import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenerationState {
  taskId: string | null;
  progress: string;
  message: string;
  loading: boolean;
  assets: string;
  error?: string;
}

const initialState: GenerationState = {
  taskId: null,
  progress: "",
  message: "",
  loading: false,
  assets: "",
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    startGeneration(
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _: PayloadAction<{ userId: string; params: unknown }>
    ) {
      state.loading = true;
      state.progress = "Initializing...";
      state.assets = "";
    },
    generationStarted(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
    },
    updateProgress(state, action: PayloadAction<string>) {
      state.progress = action.payload;
    },
    updateMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    generationComplete(state, action: PayloadAction<string>) {
      state.assets = action.payload;
      state.loading = false;
      state.progress = "Completed";
    },
    generationFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.progress = "Failed";
      state.error = action.payload;
    },
  },
});

export const {
  startGeneration,
  generationStarted,
  updateProgress,
  updateMessage,
  generationComplete,
  generationFailed,
} = generationSlice.actions;

export default generationSlice.reducer;
