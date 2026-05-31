import type { ElectricalComponent } from "../types";

export function ElectricalComponentSpecTable({ component }: { component: ElectricalComponent }) {
  const rows = [
    ["Rated voltage", format(component.ratedVoltageV, "V")],
    ["Rated current", format(component.ratedCurrentA, "A")],
    ["AC/DC type", component.acDcType],
    ["Phase", component.phase],
    ["Poles", component.poles],
    ["Mounting", component.mounting],
    ["Lifecycle", component.lifecycleStatus],
    ["Source type", component.sourceType]
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={String(label)} className="border-b last:border-b-0">
              <th className="w-48 bg-muted/60 px-4 py-3 font-medium">{label}</th>
              <td className="px-4 py-3">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function format(value: number | string | null, unit: string) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return `${value} ${unit}`;
}
