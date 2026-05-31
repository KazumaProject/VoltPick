import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { electricalComponents } from "@/data/electrical-components";
import { DisclaimerNotice } from "@/features/electrical-components/components/DisclaimerNotice";
import { ElectricalComponentSearchExperience } from "@/features/electrical-components/components/ElectricalComponentSearchExperience";

export default function HomePage() {
  const manufacturers = Array.from(new Set(electricalComponents.map((component) => component.manufacturer))).sort();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" aria-hidden="true" />
            VoltPick
          </div>
          <h1 className="text-3xl font-semibold tracking-normal">Electrical Component Search</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Search locally registered manufacturer-sourced component records by basic electrical and application criteria.
          </p>
        </div>
        <nav className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/sources/">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Sources
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about/">
              <Info className="h-4 w-4" aria-hidden="true" />
              About
            </Link>
          </Button>
        </nav>
      </header>

      <DisclaimerNotice />
      <Suspense fallback={<div className="rounded-lg border bg-white p-5 text-sm text-muted-foreground">Loading search...</div>}>
        <ElectricalComponentSearchExperience components={electricalComponents} manufacturers={manufacturers} />
      </Suspense>
    </main>
  );
}
