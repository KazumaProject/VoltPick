import { Badge } from "@/components/ui/badge";
import { LIFECYCLE_LABELS } from "../component-labels";
import type { LifecycleStatus } from "../types";

export function LifecycleBadge({ status }: { status: LifecycleStatus }) {
  const variant = status === "discontinued" ? "warning" : status === "active" ? "success" : "outline";

  return <Badge variant={variant}>{LIFECYCLE_LABELS[status]}</Badge>;
}
