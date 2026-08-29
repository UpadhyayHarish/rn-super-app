import type { ComponentType } from "react";

import type { AppSlug } from "@/screens/app-config";
import { createHistoryScreen } from "@/screens/history-screen";
import CalculatorScreen from "@/screens/calculator/index";
import CounterScreen from "@/screens/counter/index";
import ExpenseTrackerScreen from "@/screens/expense-tracker/index";
import GithubProfileScreen from "@/screens/github-profile/index";
import HabitTrackerScreen from "@/screens/habit-tracker/index";
import MovieRaterScreen from "@/screens/movie-rater/index";
import NotesScreen from "@/screens/notes/index";
import StopwatchScreen from "@/screens/stopwatch/index";
import type { RootStackParamList } from "./types";

type ScreenComponent = ComponentType<object>;

export type AppScreenEntry = {
  slug: AppSlug;
  screenName: keyof RootStackParamList;
  historyScreenName: keyof RootStackParamList;
  title: string;
  historyTitle: string;
  Screen: ScreenComponent;
  HistoryScreen: ScreenComponent;
};

export const appScreenRegistry: AppScreenEntry[] = [
  {
    slug: "stopwatch",
    screenName: "Stopwatch",
    historyScreenName: "StopwatchHistory",
    title: "Stopwatch",
    historyTitle: "Stopwatch History",
    Screen: StopwatchScreen,
    HistoryScreen: createHistoryScreen("stopwatch"),
  },
  {
    slug: "counter",
    screenName: "Counter",
    historyScreenName: "CounterHistory",
    title: "Counter",
    historyTitle: "Counter History",
    Screen: CounterScreen,
    HistoryScreen: createHistoryScreen("counter"),
  },
  {
    slug: "calculator",
    screenName: "Calculator",
    historyScreenName: "CalculatorHistory",
    title: "Calculator",
    historyTitle: "Calculator History",
    Screen: CalculatorScreen,
    HistoryScreen: createHistoryScreen("calculator"),
  },
  {
    slug: "movie-rater",
    screenName: "MovieRater",
    historyScreenName: "MovieRaterHistory",
    title: "Movie Rater",
    historyTitle: "Movie Ratings",
    Screen: MovieRaterScreen,
    HistoryScreen: createHistoryScreen("movie-rater"),
  },
  {
    slug: "notes",
    screenName: "Notes",
    historyScreenName: "NotesHistory",
    title: "Notes App",
    historyTitle: "Notes History",
    Screen: NotesScreen,
    HistoryScreen: createHistoryScreen("notes"),
  },
  {
    slug: "habit-tracker",
    screenName: "HabitTracker",
    historyScreenName: "HabitTrackerHistory",
    title: "Habit Tracker",
    historyTitle: "Habit History",
    Screen: HabitTrackerScreen,
    HistoryScreen: createHistoryScreen("habit-tracker"),
  },
  {
    slug: "expense-tracker",
    screenName: "ExpenseTracker",
    historyScreenName: "ExpenseTrackerHistory",
    title: "Expense Tracker",
    historyTitle: "Expense History",
    Screen: ExpenseTrackerScreen,
    HistoryScreen: createHistoryScreen("expense-tracker"),
  },
  {
    slug: "github-profile",
    screenName: "GithubProfile",
    historyScreenName: "GithubProfileHistory",
    title: "GitHub Profile",
    historyTitle: "GitHub History",
    Screen: GithubProfileScreen,
    HistoryScreen: createHistoryScreen("github-profile"),
  },
];

export const routeMap = Object.fromEntries(
  appScreenRegistry.map((entry) => [
    entry.slug,
    {
      screen: entry.screenName,
      history: entry.historyScreenName,
    },
  ]),
) as Record<
  AppSlug,
  {
    screen: keyof RootStackParamList;
    history: keyof RootStackParamList;
  }
>;
