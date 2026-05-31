import { Badge } from "@/components/ui/badge";
import { SOURCE_TYPE_LABELS } from "../component-labels";
import type { SourceType } from "../types";

export function SourceBadge({ sourceType }: { sourceType: SourceType }) {
  return <Badge variant="outline">{SOURCE_TYPE_LABELS[sourceType]}</Badge>;
}
