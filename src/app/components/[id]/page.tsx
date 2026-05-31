import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { electricalComponents } from "@/data/electrical-components";
import { ComponentCategoryBadge } from "@/features/electrical-components/components/ComponentCategoryBadge";
import { DisclaimerNotice } from "@/features/electrical-components/components/DisclaimerNotice";
import { ElectricalComponentSpecTable } from "@/features/electrical-components/components/ComponentSpecTable";
import { LifecycleBadge } from "@/features/electrical-components/components/LifecycleBadge";
import { SourceBadge } from "@/features/electrical-components/components/SourceBadge";

type DetailProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return electricalComponents.map((component) => ({ id: component.id }));
}

export default async function ComponentDetailPage({ params }: DetailProps) {
  const { id } = await params;
  const component = electricalComponents.find((item) => item.id === id);

  if (!component) {
    notFound();
  }

  const links = [
    ["Manufacturer source", component.sourceUrl],
    ["Datasheet", component.datasheetUrl],
    ["Manufacturer", component.manufacturerUrl],
    ["CAD", component.cadUrl]
  ].filter(([, url]) => Boolean(url));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to search
        </Link>
      </Button>

      <section className="space-y-4 rounded-lg border bg-white p-6">
        <div className="flex flex-wrap items-center gap-2">
          <ComponentCategoryBadge category={component.category} />
          <LifecycleBadge status={component.lifecycleStatus} />
          <SourceBadge sourceType={component.sourceType} />
          {component.subCategory ? <Badge variant="outline">{component.subCategory}</Badge> : null}
        </div>
        <div>
          <h1 className="break-words text-3xl font-semibold">{component.partNumber}</h1>
          <p className="mt-1 text-sm font-medium text-primary">{component.manufacturer}</p>
          <p className="mt-4 leading-7 text-muted-foreground">{component.description}</p>
        </div>
      </section>

      <DisclaimerNotice />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Ratings</h2>
        <ElectricalComponentSpecTable component={component} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoPanel title="Applications" values={component.applications} />
        <InfoPanel title="Standards" values={component.standards} fallback="No standards listed in local verified data." />
        <InfoPanel title="Verified fields" values={component.verifiedFields} />
        <InfoPanel title="Missing fields" values={component.missingFields} fallback="No missing fields listed." />
      </section>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold">Source</h2>
        <div className="space-y-2 text-sm">
          <p className="font-medium">{component.sourceTitle}</p>
          <p className="text-muted-foreground">Verified {component.verifiedAt}</p>
          <div className="flex flex-wrap gap-2">
            {links.map(([label, url]) => (
              <Button asChild variant="outline" size="sm" key={label}>
                <a href={url ?? "#"} target="_blank" rel="noreferrer">
                  {label}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <InfoPanel title="Data notes" values={component.dataNotes} fallback="No data notes listed." />
    </main>
  );
}

function InfoPanel({
  title,
  values,
  fallback = "No values listed."
}: {
  title: string;
  values: string[];
  fallback?: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge key={value} variant="outline">
              {value}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{fallback}</p>
      )}
    </div>
  );
}
