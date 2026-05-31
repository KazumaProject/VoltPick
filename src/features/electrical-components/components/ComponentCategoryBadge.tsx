import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "../component-labels";
import type { ComponentCategory } from "../types";

export function ComponentCategoryBadge({ category }: { category: ComponentCategory }) {
  return <Badge variant="secondary">{CATEGORY_LABELS[category]}</Badge>;
}
