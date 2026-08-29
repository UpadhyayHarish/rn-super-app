import type {
  AppHistoryState,
  CalculatorRecord,
  CounterRecord,
  ExpenseTrackerRecord,
  GithubProfileRecord,
  HabitTrackerRecord,
  MovieRaterRecord,
  NoteRecord,
  StopwatchRecord,
} from "@/store/historySlice";

export type AppSlug = keyof AppHistoryState;

export const appConfigs: Record<
  AppSlug,
  { title: string; description: string; historyTitle: string }
> = {
  stopwatch: {
    title: "Stopwatch",
    description: "Track time and save lap durations.",
    historyTitle: "Stopwatch History",
  },
  counter: {
    title: "Counter",
    description: "Increment or decrement a value and save progress.",
    historyTitle: "Counter History",
  },
  calculator: {
    title: "Calculator",
    description: "Evaluate expressions and save results.",
    historyTitle: "Calculator History",
  },
  "movie-rater": {
    title: "Movie Rater",
    description: "Rate movies and save your top picks.",
    historyTitle: "Movie Ratings",
  },
  notes: {
    title: "Notes App",
    description: "Write quick notes and save them for later.",
    historyTitle: "Notes History",
  },
  "habit-tracker": {
    title: "Habit Tracker",
    description: "Track habits and save new routines.",
    historyTitle: "Habit History",
  },
  "expense-tracker": {
    title: "Expense Tracker",
    description: "Track expense entries and save spending records.",
    historyTitle: "Expense History",
  },
  "github-profile": {
    title: "GitHub Profile Viewer",
    description: "Lookup a GitHub user and save the profile view.",
    historyTitle: "GitHub History",
  },
};

export const appList = Object.entries(appConfigs).map(([slug, value]) => ({
  slug,
  ...value,
})) as Array<{
  slug: AppSlug;
  title: string;
  description: string;
  historyTitle: string;
}>;

export function isAppSlug(value: string | undefined): value is AppSlug {
  return !!value && Object.hasOwn(appConfigs, value);
}

export function formatAppRecord(app: AppSlug, record: unknown) {
  if (app === "stopwatch") {
    const typed = record as StopwatchRecord;
    return {
      title: `${typed.duration.toFixed(1)}s`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "counter") {
    const typed = record as CounterRecord;
    return {
      title: `Count: ${typed.value}`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "calculator") {
    const typed = record as CalculatorRecord;
    return {
      title: `${typed.expression} = ${typed.result}`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "movie-rater") {
    const typed = record as MovieRaterRecord;
    return {
      title: `${typed.movie} — ${typed.rating}/5`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "notes") {
    const typed = record as NoteRecord;
    return {
      title: typed.note.slice(0, 40) || "Empty note",
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "habit-tracker") {
    const typed = record as HabitTrackerRecord;
    return {
      title: `${typed.habit} (${typed.frequency}x/week)`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "expense-tracker") {
    const typed = record as ExpenseTrackerRecord;
    return {
      title: `${typed.description} — $${typed.amount.toFixed(2)}`,
      subtitle: `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  if (app === "github-profile") {
    const typed = record as GithubProfileRecord;
    const details = [
      typed.name,
      typed.publicRepos != null ? `${typed.publicRepos} repos` : undefined,
    ]
      .filter(Boolean)
      .join(" • ");
    return {
      title: typed.username,
      subtitle: details
        ? `${details} — saved ${new Date(typed.savedAt).toLocaleString()}`
        : `Saved at ${new Date(typed.savedAt).toLocaleString()}`,
    };
  }
  return { title: "Record", subtitle: "" };
}
