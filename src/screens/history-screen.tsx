import { useMemo } from "react";

import { AppHistory } from "@/components/app-history";
import { appConfigs, formatAppRecord, type AppSlug } from "@/screens/app-config";
import { clearAppHistory, deleteRecord } from "@/store/historySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function HistoryScreen({ app }: { app: AppSlug }) {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.history[app]);
  const config = appConfigs[app];

  const items = useMemo(
    () =>
      records.map((record) => ({
        id: record.id,
        ...formatAppRecord(app, record),
      })),
    [app, records],
  );

  return (
    <AppHistory
      title={config.historyTitle}
      items={items}
      onDelete={(id) => dispatch(deleteRecord({ app, id }))}
      onClear={() => dispatch(clearAppHistory(app))}
    />
  );
}

export function createHistoryScreen(app: AppSlug) {
  return function AppHistoryRoute() {
    return <HistoryScreen app={app} />;
  };
}
