import type {
  ComponentSearchInput,
  ComponentSearchResult,
  ComponentSort,
  ElectricalComponent
} from "./types";
import { evaluateComponent } from "./evaluate-component";

export function searchComponents(
  components: ElectricalComponent[],
  input: ComponentSearchInput,
  sort: ComponentSort = "best_match"
) {
  const results = components
    .map((component) => evaluateComponent(component, input))
    .filter((result): result is ComponentSearchResult => result !== null);

  return sortResults(results, sort);
}

export function sortResults(results: ComponentSearchResult[], sort: ComponentSort) {
  return [...results].sort((a, b) => {
    if (sort === "manufacturer") {
      return a.component.manufacturer.localeCompare(b.component.manufacturer) || b.score - a.score;
    }

    if (sort === "category") {
      return a.component.category.localeCompare(b.component.category) || b.score - a.score;
    }

    if (sort === "rated_voltage") {
      return (b.component.ratedVoltageV ?? -1) - (a.component.ratedVoltageV ?? -1) || b.score - a.score;
    }

    if (sort === "rated_current") {
      return (b.component.ratedCurrentA ?? -1) - (a.component.ratedCurrentA ?? -1) || b.score - a.score;
    }

    if (sort === "lifecycle_status") {
      return a.component.lifecycleStatus.localeCompare(b.component.lifecycleStatus) || b.score - a.score;
    }

    return b.score - a.score || a.component.manufacturer.localeCompare(b.component.manufacturer);
  });
}
