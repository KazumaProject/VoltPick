import Link from "next/link";
import { ArrowUpRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComponentSearchResult } from "../types";
import { ComponentCategoryBadge } from "./ComponentCategoryBadge";
import { MatchReasonList } from "./MatchReasonList";
import { RatingBadge } from "./RatingBadge";
import { WarningList } from "./WarningList";
import { LifecycleBadge } from "./LifecycleBadge";
import { SourceBadge } from "./SourceBadge";

export function ElectricalComponentResultCard({ result }: { result: ComponentSearchResult }) {
  const { component } = result;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <ComponentCategoryBadge category={component.category} />
              <LifecycleBadge status={component.lifecycleStatus} />
              <SourceBadge sourceType={component.sourceType} />
              <span className="text-sm text-muted-foreground">{component.manufacturer}</span>
            </div>
            <CardTitle className="break-words">{component.partNumber}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{component.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-md border bg-accent px-3 py-2 text-accent-foreground">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{result.score}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 bg-white p-5">
        <div className="flex flex-wrap gap-2">
          <RatingBadge label="V" value={component.ratedVoltageV} />
          <RatingBadge label="A" value={component.ratedCurrentA} />
          <RatingBadge label="AC/DC" value={component.acDcType} />
          <RatingBadge label="Mount" value={component.mounting} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <MatchReasonList reasons={result.reasons} />
          <WarningList warnings={result.warnings} />
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/components/${component.id}/`}>
            Details
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
