import { CheckCircle2 } from "lucide-react";

export function MatchReasonList({ reasons }: { reasons: string[] }) {
  if (reasons.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-1.5 text-sm text-emerald-950">
      {reasons.slice(0, 4).map((reason) => (
        <li key={reason} className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <span>{reason}</span>
        </li>
      ))}
    </ul>
  );
}
