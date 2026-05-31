import { z } from "zod";
import {
  AC_DC_TYPES,
  APPLICATION_TYPES,
  COMPONENT_CATEGORIES,
  LIFECYCLE_STATUSES,
  MOUNTING_TYPES,
  PHASE_TYPES
} from "./component-categories";

const optionalNumber = z.preprocess(
  (value) => (value === "" || value === undefined || value === null ? null : value),
  z.coerce.number().positive().nullable()
);

export const componentSearchSchema = z.object({
  categories: z.array(z.enum(COMPONENT_CATEGORIES)).default([]),
  voltage: optionalNumber.default(null),
  current: optionalNumber.default(null),
  acDcType: z.enum(AC_DC_TYPES).default("ANY"),
  phase: z.enum(PHASE_TYPES).default("unknown"),
  application: z.union([z.enum(APPLICATION_TYPES), z.literal("any")]).default("any"),
  mounting: z.union([z.enum(MOUNTING_TYPES), z.literal("any")]).default("any"),
  manufacturer: z.string().trim().max(100).default(""),
  lifecycleStatus: z.union([z.enum(LIFECYCLE_STATUSES), z.literal("any")]).default("any"),
  keyword: z.string().trim().max(100).default("")
});

export function parseSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  const categories = firstValue(searchParams.categories);

  return componentSearchSchema.parse({
    categories: categories ? categories.split(",").filter(Boolean) : [],
    voltage: firstValue(searchParams.voltage),
    current: firstValue(searchParams.current),
    acDcType: firstValue(searchParams.acDcType) ?? "ANY",
    phase: firstValue(searchParams.phase) ?? "unknown",
    application: firstValue(searchParams.application) ?? "any",
    mounting: firstValue(searchParams.mounting) ?? "any",
    manufacturer: firstValue(searchParams.manufacturer) ?? "",
    lifecycleStatus: firstValue(searchParams.lifecycleStatus) ?? "any",
    keyword: firstValue(searchParams.keyword) ?? ""
  });
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
