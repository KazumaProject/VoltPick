import { SourceBadge } from "./SourceBadge";
import type { ComponentSource } from "../types";

export function SourcesList({ sources }: { sources: ComponentSource[] }) {
  const manufacturers = Array.from(new Set(sources.map((source) => source.manufacturer)));

  return (
    <div className="space-y-6">
      {manufacturers.map((manufacturer) => (
        <section key={manufacturer} className="rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-xl font-semibold">{manufacturer}</h2>
          <div className="space-y-3">
            {sources
              .filter((source) => source.manufacturer === manufacturer)
              .map((source) => (
                <div key={source.sourceUrl} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <a
                        href={source.sourceUrl}
                        className="font-medium text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.sourceTitle}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Verified {source.verifiedAt} · {source.componentIds.length} component
                        {source.componentIds.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <SourceBadge sourceType={source.sourceType} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
