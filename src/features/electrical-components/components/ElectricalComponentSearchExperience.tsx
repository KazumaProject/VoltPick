"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ElectricalComponentSearchForm } from "./ElectricalComponentSearchForm";
import { ElectricalComponentResultCard } from "./ElectricalComponentResultCard";
import { EmptySearchState } from "./EmptySearchState";
import { parseSearchParams } from "../search-schema";
import { searchComponents } from "../search-components";
import type { ComponentSearchInput, ComponentSort, ElectricalComponent } from "../types";

const defaultInput: ComponentSearchInput = {
  categories: [],
  voltage: null,
  current: null,
  acDcType: "ANY",
  phase: "unknown",
  application: "any",
  mounting: "any",
  manufacturer: "",
  lifecycleStatus: "any",
  keyword: ""
};

export function ElectricalComponentSearchExperience({
  components,
  manufacturers
}: {
  components: ElectricalComponent[];
  manufacturers: string[];
}) {
  const searchParams = useSearchParams();
  const rawParams = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const input = useMemo(() => safeParseInput(rawParams), [rawParams]);
  const sort = useMemo(() => parseSort(rawParams.sort), [rawParams.sort]);
  const results = searchComponents(components, input, sort);

  return (
    <>
      <ElectricalComponentSearchForm defaultValues={input} manufacturers={manufacturers} sort={sort} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Results</h2>
          <span className="rounded-md border bg-white px-3 py-1 text-sm text-muted-foreground">
            {results.length} candidates
          </span>
        </div>
        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((result) => (
              <ElectricalComponentResultCard key={result.component.id} result={result} />
            ))}
          </div>
        ) : (
          <EmptySearchState />
        )}
      </section>
    </>
  );
}

function safeParseInput(params: Record<string, string | undefined>) {
  try {
    return parseSearchParams(params);
  } catch {
    return defaultInput;
  }
}

function parseSort(value: string | undefined): ComponentSort {
  if (
    value === "manufacturer" ||
    value === "category" ||
    value === "rated_current" ||
    value === "rated_voltage" ||
    value === "lifecycle_status" ||
    value === "best_match"
  ) {
    return value;
  }

  return "best_match";
}
