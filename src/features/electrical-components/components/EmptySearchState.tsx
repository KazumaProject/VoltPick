import { SearchX } from "lucide-react";

export function EmptySearchState() {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed bg-white p-8 text-center">
      <SearchX className="mb-3 h-9 w-9 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-lg font-semibold">No candidate components found</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        Adjust the selected category, ratings, AC/DC type, or keyword and search again.
      </p>
    </div>
  );
}
