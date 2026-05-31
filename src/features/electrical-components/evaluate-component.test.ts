import { describe, expect, it } from "vitest";
import { electricalComponents } from "@/data/electrical-components";
import { componentSources, groupComponentSources } from "@/data/component-sources";
import { generateStaticParams } from "@/app/components/[id]/page";
import { evaluateComponent } from "./evaluate-component";
import { searchComponents } from "./search-components";
import type { ComponentSearchInput, ElectricalComponent } from "./types";

const baseInput: ComponentSearchInput = {
  categories: [],
  voltage: 24,
  current: 0.5,
  acDcType: "DC",
  phase: "dc",
  application: "control_circuit",
  mounting: "any",
  manufacturer: "",
  lifecycleStatus: "any",
  keyword: ""
};

describe("manufacturer-sourced component data", () => {
  it("all component records have real sourceUrl", () => {
    expect(electricalComponents.length).toBeGreaterThanOrEqual(25);
    for (const component of electricalComponents) {
      expect(component.sourceUrl).toMatch(/^https:\/\/.+\..+/);
      expect(component.sourceUrl).not.toMatch(/example\.com|localhost|placeholder/i);
    }
  });

  it("all component records have sourceTitle", () => {
    for (const component of electricalComponents) {
      expect(component.sourceTitle.trim().length).toBeGreaterThan(0);
    }
  });

  it("data contains no forbidden placeholder wording", () => {
    const forbidden = /\b(sample|mock|fake|dummy|demo)\b/i;
    for (const component of electricalComponents) {
      const text = [component.description, component.sourceTitle, ...component.dataNotes].join(" ");
      expect(text).not.toMatch(forbidden);
    }
  });

  it("records do not use placeholder-looking ids", () => {
    for (const component of electricalComponents) {
      expect(component.id).not.toMatch(/^0+$|^component-\d+$/);
    }
  });
});

describe("evaluateComponent", () => {
  it("voltage lower than required rejects", () => {
    const component = get("siemens-6ep1333-4ba00");
    expect(evaluateComponent(component, { ...baseInput, voltage: 48 })).toBeNull();
  });

  it("current lower than required rejects", () => {
    const component = get("mersen-atmr1");
    expect(evaluateComponent(component, { ...baseInput, current: 2, acDcType: "AC_DC" })).toBeNull();
  });

  it("DC input rejects AC-only", () => {
    const component = get("schneider-lc1d09b7");
    expect(evaluateComponent(component, baseInput)).toBeNull();
  });

  it("AC input rejects DC-only", () => {
    const component = get("siemens-6ep1333-4ba00");
    expect(evaluateComponent(component, { ...baseInput, acDcType: "AC" })).toBeNull();
  });

  it("keyword mismatch rejects", () => {
    const component = get("phoenix-uk-5-n");
    expect(evaluateComponent(component, { ...baseInput, keyword: "nonexistent-part" })).toBeNull();
  });

  it("missing voltage does not create a false voltage match", () => {
    const component = get("phoenix-pt-2-5-pe");
    const result = evaluateComponent(component, { ...baseInput, current: null, acDcType: "ANY" });

    expect(result).not.toBeNull();
    expect(result!.matchedFields).not.toContain("ratedVoltageV");
    expect(result!.missingDataFields).toContain("ratedVoltageV");
    expect(result!.warnings).toContain("Rated voltage is not listed in the local verified data for this component.");
  });

  it("category filter works", () => {
    const results = searchComponents(electricalComponents, {
      ...baseInput,
      categories: ["power_supply"],
      current: null,
      acDcType: "DC"
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.component.category === "power_supply")).toBe(true);
  });

  it("lifecycle filter works", () => {
    const results = searchComponents(electricalComponents, {
      ...baseInput,
      voltage: null,
      current: null,
      acDcType: "ANY",
      lifecycleStatus: "discontinued"
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.component.lifecycleStatus === "discontinued")).toBe(true);
  });

  it("discontinued product displays warning", () => {
    const result = evaluateComponent(get("rockwell-1769-l24er-qbfc1b"), {
      ...baseInput,
      voltage: null,
      current: null,
      acDcType: "ANY"
    });

    expect(result!.warnings).toContain("This product is marked as discontinued by the manufacturer source.");
  });

  it("score caps at 100", () => {
    const result = evaluateComponent(get("schneider-gv2me10"), {
      categories: ["motor_starter"],
      voltage: 480,
      current: 6,
      acDcType: "AC",
      phase: "three_phase",
      application: "motor",
      mounting: "din_rail",
      manufacturer: "Schneider Electric",
      lifecycleStatus: "active",
      keyword: "TeSys"
    });

    expect(result!.score).toBe(100);
  });

  it("static params are generated from local data", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(electricalComponents.length);
    expect(params).toContainEqual({ id: electricalComponents[0].id });
  });

  it("source page groups sources correctly", () => {
    const grouped = groupComponentSources();
    expect(grouped).toHaveLength(componentSources.length);
    expect(grouped.every((source) => source.componentIds.length > 0)).toBe(true);
    expect(new Set(grouped.map((source) => source.sourceUrl)).size).toBe(grouped.length);
  });
});

function get(id: string): ElectricalComponent {
  const component = electricalComponents.find((item) => item.id === id);
  if (!component) {
    throw new Error(`Missing component ${id}`);
  }
  return component;
}
