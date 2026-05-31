import { AlertTriangle } from "lucide-react";

export function WarningList({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-1.5 text-sm text-amber-950">
      {warnings.slice(0, 4).map((warning) => (
        <li key={warning} className="flex gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
          <span>{warning}</span>
        </li>
      ))}
    </ul>
  );
}
