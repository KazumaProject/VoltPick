import { electricalComponents } from "./electrical-components";
import type { ComponentSource } from "@/features/electrical-components/types";

export function groupComponentSources(): ComponentSource[] {
  const sources = new Map<string, ComponentSource>();

  for (const component of electricalComponents) {
    const existing = sources.get(component.sourceUrl);
    if (existing) {
      existing.componentIds.push(component.id);
      continue;
    }

    sources.set(component.sourceUrl, {
      sourceUrl: component.sourceUrl,
      sourceTitle: component.sourceTitle,
      sourceType: component.sourceType,
      manufacturer: component.manufacturer,
      verifiedAt: component.verifiedAt,
      componentIds: [component.id]
    });
  }

  return Array.from(sources.values()).sort(
    (a, b) =>
      a.manufacturer.localeCompare(b.manufacturer) ||
      a.sourceTitle.localeCompare(b.sourceTitle)
  );
}

export const componentSources = groupComponentSources();
