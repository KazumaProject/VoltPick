"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Controller, type Control, type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, Search } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AC_DC_TYPES,
  APPLICATION_TYPES,
  COMPONENT_CATEGORIES,
  LIFECYCLE_STATUSES,
  MOUNTING_TYPES,
  PHASE_TYPES
} from "../component-categories";
import {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  LIFECYCLE_LABELS,
  MOUNTING_LABELS
} from "../component-labels";
import { componentSearchSchema } from "../search-schema";
import type { ComponentSearchInput, ComponentSort } from "../types";

type FormValues = ComponentSearchInput & {
  sort: ComponentSort;
};

const searchFormSchema = componentSearchSchema.extend({
  sort: z
    .enum(["best_match", "manufacturer", "category", "rated_current", "rated_voltage", "lifecycle_status"])
    .default("best_match")
});

export function ElectricalComponentSearchForm({
  defaultValues,
  manufacturers,
  sort
}: {
  defaultValues: ComponentSearchInput;
  manufacturers: string[];
  sort: ComponentSort;
}) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema) as Resolver<FormValues>,
    defaultValues: {
      ...defaultValues,
      sort
    }
  });

  const categoryValues = form.watch("categories") ?? [];
  const defaultsKey = JSON.stringify({ defaultValues, sort });
  useEffect(() => {
    form.reset({ ...defaultValues, sort });
  }, [defaultsKey, defaultValues, form, sort]);

  const selectedCategoryText = useMemo(
    () => (categoryValues.length === 0 ? "All categories" : `${categoryValues.length} selected`),
    [categoryValues.length]
  );

  function submit(values: FormValues) {
    const params = new URLSearchParams();
    if (values.categories.length) params.set("categories", values.categories.join(","));
    if (values.voltage !== null) params.set("voltage", String(values.voltage));
    if (values.current !== null) params.set("current", String(values.current));
    if (values.acDcType !== "ANY") params.set("acDcType", values.acDcType);
    if (values.phase !== "unknown") params.set("phase", values.phase);
    if (values.application !== "any") params.set("application", values.application);
    if (values.mounting !== "any") params.set("mounting", values.mounting);
    if (values.manufacturer) params.set("manufacturer", values.manufacturer);
    if (values.lifecycleStatus !== "any") params.set("lifecycleStatus", values.lifecycleStatus);
    if (values.keyword) params.set("keyword", values.keyword);
    if (values.sort !== "best_match") params.set("sort", values.sort);

    router.push(params.toString() ? `/?${params.toString()}` : "/");
  }

  function reset() {
    form.reset({
      categories: [],
      voltage: null,
      current: null,
      acDcType: "ANY",
      phase: "unknown",
      application: "any",
      mounting: "any",
      manufacturer: "",
      lifecycleStatus: "any",
      keyword: "",
      sort: "best_match"
    });
    router.push("/");
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-5 rounded-lg border bg-white p-5">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="space-y-2 lg:col-span-2">
          <Label>Component categories</Label>
          <details className="rounded-md border bg-background">
            <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{selectedCategoryText}</summary>
            <div className="grid max-h-72 gap-2 overflow-y-auto border-t p-3 sm:grid-cols-2">
              {COMPONENT_CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input accent-teal-700"
                    checked={categoryValues.includes(category)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...categoryValues, category]
                        : categoryValues.filter((value) => value !== category);
                      form.setValue("categories", next, { shouldDirty: true });
                    }}
                  />
                  <span>{CATEGORY_LABELS[category]}</span>
                </label>
              ))}
            </div>
          </details>
        </div>
        <Field label="Voltage">
          <Input step="any" type="number" min="0" placeholder="24" {...form.register("voltage")} />
        </Field>
        <Field label="Current">
          <Input step="any" type="number" min="0" placeholder="0.5" {...form.register("current")} />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <SelectField control={form.control} name="acDcType" label="AC/DC" values={AC_DC_TYPES} />
        <SelectField control={form.control} name="phase" label="Phase" values={PHASE_TYPES} />
        <SelectField
          control={form.control}
          name="application"
          label="Application"
          values={["any", ...APPLICATION_TYPES] as const}
          labels={{ any: "Any", ...APPLICATION_LABELS }}
        />
        <SelectField
          control={form.control}
          name="mounting"
          label="Mounting"
          values={["any", ...MOUNTING_TYPES] as const}
          labels={{ any: "Any", ...MOUNTING_LABELS }}
        />
        <Field label="Manufacturer">
          <Controller
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <select
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="">Any</option>
                {manufacturers.map((manufacturer) => (
                  <option value={manufacturer} key={manufacturer}>
                    {manufacturer}
                  </option>
                ))}
              </select>
            )}
          />
        </Field>
        <SelectField
          control={form.control}
          name="lifecycleStatus"
          label="Lifecycle"
          values={["any", ...LIFECYCLE_STATUSES] as const}
          labels={{ any: "Any", ...LIFECYCLE_LABELS }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <Field label="Keyword">
          <Input maxLength={100} placeholder="part number, manufacturer, category, standard, source" {...form.register("keyword")} />
        </Field>
        <SelectField
          control={form.control}
          name="sort"
          label="Sort"
          values={["best_match", "manufacturer", "category", "rated_current", "rated_voltage", "lifecycle_status"] as const}
          labels={{
            best_match: "Best match",
            manufacturer: "Manufacturer",
            category: "Category",
            rated_current: "Rated current",
            rated_voltage: "Rated voltage",
            lifecycle_status: "Lifecycle status"
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit">
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </Button>
        <Button type="button" variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function SelectField<T extends string>({
  control,
  name,
  label,
  values,
  labels
}: {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  values: readonly T[];
  labels?: Partial<Record<T, string>>;
}) {
  return (
    <Field label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={String(field.value)} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {values.map((value) => (
                <SelectItem value={value} key={value || "any"}>
                  {labels?.[value] ?? value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}
