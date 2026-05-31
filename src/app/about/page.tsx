import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerNotice } from "@/features/electrical-components/components/DisclaimerNotice";

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to search
        </Link>
      </Button>

      <header className="border-b pb-5">
        <h1 className="text-3xl font-semibold">About VoltPick</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          VoltPick searches locally registered manufacturer-sourced electrical component data.
        </p>
      </header>

      <DisclaimerNotice />

      <section className="space-y-4 rounded-lg border bg-white p-6 leading-7 text-muted-foreground">
        <p>
          VoltPick is an engineering support tool for narrowing down candidate components using verified fields stored in the application.
          It is designed for quick comparison across part numbers, manufacturers, lifecycle status, and basic ratings.
        </p>
        <p>
          It is not a replacement for manufacturer datasheet review, applicable electrical code review, SCCR calculation, short-circuit
          evaluation, wiring method review, installation environment review, customer specification review, or final engineering approval.
        </p>
        <p>
          When a manufacturer source does not provide a single verified value for a field, VoltPick leaves that field blank in the local
          record rather than guessing.
        </p>
      </section>
    </main>
  );
}
