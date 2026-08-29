import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

import type { AppSlug } from "@/screens/app-config";

type BaseRecord = {
  id: string;
  savedAt: string;
};

export type StopwatchRecord = BaseRecord & { duration: number };
export type CounterRecord = BaseRecord & { value: number };
export type CalculatorRecord = BaseRecord & {
  expression: string;
  result: string;
};
export type MovieRaterRecord = BaseRecord & { movie: string; rating: number };
export type NoteRecord = BaseRecord & { note: string };
export type HabitTrackerRecord = BaseRecord & {
  habit: string;
  frequency: number;
};
export type ExpenseTrackerRecord = BaseRecord & {
  description: string;
  amount: number;
};
export type GithubProfileRecord = BaseRecord & {
  username: string;
  name?: string;
  publicRepos?: number;
};

export type AppHistoryState = {
  stopwatch: StopwatchRecord[];
  counter: CounterRecord[];
  calculator: CalculatorRecord[];
  "movie-rater": MovieRaterRecord[];
  notes: NoteRecord[];
  "habit-tracker": HabitTrackerRecord[];
  "expense-tracker": ExpenseTrackerRecord[];
  "github-profile": GithubProfileRecord[];
};

const initialState: AppHistoryState = {
  stopwatch: [],
  counter: [],
  calculator: [],
  "movie-rater": [],
  notes: [],
  "habit-tracker": [],
  "expense-tracker": [],
  "github-profile": [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    saveStopwatch: (
      state,
      action: PayloadAction<Omit<StopwatchRecord, "id" | "savedAt">>,
    ) => {
      state.stopwatch.push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveCounter: (
      state,
      action: PayloadAction<Omit<CounterRecord, "id" | "savedAt">>,
    ) => {
      state.counter.push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveCalculator: (
      state,
      action: PayloadAction<Omit<CalculatorRecord, "id" | "savedAt">>,
    ) => {
      state.calculator.push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveMovieRater: (
      state,
      action: PayloadAction<Omit<MovieRaterRecord, "id" | "savedAt">>,
    ) => {
      state["movie-rater"].push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveNote: (
      state,
      action: PayloadAction<Omit<NoteRecord, "id" | "savedAt">>,
    ) => {
      state.notes.push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveHabit: (
      state,
      action: PayloadAction<Omit<HabitTrackerRecord, "id" | "savedAt">>,
    ) => {
      state["habit-tracker"].push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveExpense: (
      state,
      action: PayloadAction<Omit<ExpenseTrackerRecord, "id" | "savedAt">>,
    ) => {
      state["expense-tracker"].push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    saveGithubProfile: (
      state,
      action: PayloadAction<Omit<GithubProfileRecord, "id" | "savedAt">>,
    ) => {
      state["github-profile"].push({
        id: nanoid(),
        savedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    deleteRecord: (
      state,
      action: PayloadAction<{ app: AppSlug; id: string }>,
    ) => {
      const { app, id } = action.payload;
      state[app] = state[app].filter((record) => record.id !== id) as never;
    },
    clearAppHistory: (state, action: PayloadAction<AppSlug>) => {
      state[action.payload] = [] as never;
    },
  },
});

export const {
  saveStopwatch,
  saveCounter,
  saveCalculator,
  saveMovieRater,
  saveNote,
  saveHabit,
  saveExpense,
  saveGithubProfile,
  deleteRecord,
  clearAppHistory,
} = historySlice.actions;

export default historySlice.reducer;
