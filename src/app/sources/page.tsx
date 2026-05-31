import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { componentSources } from "@/data/component-sources";
import { SourcesList } from "@/features/electrical-components/components/SourcesList";

export default function SourcesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to search
        </Link>
      </Button>

      <header className="border-b pb-5">
        <h1 className="text-3xl font-semibold">Manufacturer Sources</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Source records are grouped by manufacturer and linked directly to the manufacturer page, datasheet, or catalog used by the local dataset.
        </p>
      </header>

      <SourcesList sources={componentSources} />
    </main>
  );
}
