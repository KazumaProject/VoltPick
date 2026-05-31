import { AlertTriangle } from "lucide-react";

export const DISCLAIMER_TEXT =
  "VoltPick helps narrow down candidate electrical components using locally registered manufacturer-sourced data. Final selection must be verified against the manufacturer datasheet, applicable electrical codes, SCCR requirements, wiring method, installation environment, and project specifications.";

export function DisclaimerNotice() {
  return (
    <div className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="leading-6">{DISCLAIMER_TEXT}</p>
    </div>
  );
}
