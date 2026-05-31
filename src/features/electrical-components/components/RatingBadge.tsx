import { Badge } from "@/components/ui/badge";

export function RatingBadge({ label, value }: { label: string; value: string | number | null }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <Badge variant="outline" className="bg-white">
      {label}: {value}
    </Badge>
  );
}
