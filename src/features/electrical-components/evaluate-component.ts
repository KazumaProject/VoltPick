import type {
  ComponentSearchInput,
  ComponentSearchResult,
  ElectricalComponent
} from "./types";

const BASE_WARNINGS = [
  "Final selection must be checked against the linked manufacturer source.",
  "SCCR, interrupt rating, enclosure rating, and applicable electrical code are not evaluated by this tool."
];

export function evaluateComponent(
  component: ElectricalComponent,
  input: ComponentSearchInput
): ComponentSearchResult | null {
  let score = 0;
  const reasons: string[] = [];
  const warnings = [...BASE_WARNINGS];
  const matchedFields: string[] = [];
  const missingDataFields: string[] = [];

  if (input.categories.length > 0) {
    if (!input.categories.includes(component.category)) {
      return null;
    }
    score += 20;
    matchedFields.push("category");
    reasons.push("Category matches the selected filter.");
  }

  if (input.voltage !== null) {
    if (component.ratedVoltageV === null) {
      missingDataFields.push("ratedVoltageV");
      warnings.push("Rated voltage is not listed in the local verified data for this component.");
    } else if (component.ratedVoltageV < input.voltage) {
      return null;
    } else {
      score += 20;
      matchedFields.push("ratedVoltageV");
      reasons.push("Rated voltage meets or exceeds the requested voltage.");
    }
  }

  if (input.current !== null) {
    if (component.ratedCurrentA === null) {
      missingDataFields.push("ratedCurrentA");
      warnings.push("Rated current is not listed in the local verified data for this component.");
    } else if (component.ratedCurrentA < input.current) {
      return null;
    } else {
      score += 20;
      matchedFields.push("ratedCurrentA");
      reasons.push("Rated current meets or exceeds the requested current.");
    }
  }

  if (input.acDcType === "ANY") {
    reasons.push("AC/DC type was not constrained.");
  } else if (matchesAcDc(component.acDcType, input.acDcType)) {
    score += 15;
    matchedFields.push("acDcType");
    reasons.push("AC/DC type is compatible.");
  } else {
    return null;
  }

  if (input.phase !== "unknown") {
    if (component.phase === input.phase) {
      score += 10;
      matchedFields.push("phase");
      reasons.push("Phase matches.");
    } else if (input.phase === "three_phase" && component.poles === 3) {
      score += 10;
      matchedFields.push("poles");
      reasons.push("Three-phase search is supported by the verified pole count.");
    }
  }

  if (input.application !== "any") {
    if (component.applications.includes(input.application)) {
      score += 10;
      matchedFields.push("applications");
      reasons.push("Application matches the registered source data.");
    } else {
      score -= 5;
      warnings.push("Application is not an exact match in the local component record.");
    }
  }

  if (input.mounting !== "any") {
    if (component.mounting === input.mounting) {
      score += 5;
      matchedFields.push("mounting");
      reasons.push("Mounting matches.");
    } else if (component.mounting === null) {
      missingDataFields.push("mounting");
    }
  }

  if (input.manufacturer) {
    if (component.manufacturer.toLowerCase() !== input.manufacturer.toLowerCase()) {
      return null;
    }
    matchedFields.push("manufacturer");
    reasons.push("Manufacturer matches.");
  }

  if (input.lifecycleStatus !== "any") {
    if (component.lifecycleStatus !== input.lifecycleStatus) {
      return null;
    }
    score += 5;
    matchedFields.push("lifecycleStatus");
    reasons.push("Lifecycle status matches.");
  }

  if (component.lifecycleStatus === "discontinued") {
    warnings.push("This product is marked as discontinued by the manufacturer source.");
  }

  if (input.keyword) {
    if (!keywordMatches(component, input.keyword)) {
      return null;
    }
    score += 10;
    matchedFields.push("keyword");
    reasons.push("Keyword matches component metadata or source metadata.");
  }

  const sourceConfidence =
    component.missingFields.length === 0 && missingDataFields.length === 0
      ? "manufacturer_verified"
      : "partial_verified";

  return {
    component,
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons: unique(reasons),
    warnings: unique(warnings),
    matchedFields: unique(matchedFields),
    missingDataFields: unique([...component.missingFields, ...missingDataFields]),
    sourceConfidence
  };
}

function matchesAcDc(componentType: string, inputType: string) {
  if (componentType === "ANY" || componentType === "AC_DC") {
    return true;
  }

  if (inputType === "AC_DC") {
    return componentType === "AC" || componentType === "DC";
  }

  return componentType === inputType;
}

function keywordMatches(component: ElectricalComponent, keyword: string) {
  const normalized = keyword.toLowerCase();
  return [
    component.partNumber,
    component.manufacturer,
    component.category,
    component.subCategory ?? "",
    component.description,
    component.sourceTitle,
    ...component.standards,
    ...component.applications,
    ...component.dataNotes
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}
