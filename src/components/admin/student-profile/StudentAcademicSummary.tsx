import Image from "next/image";

interface StudentAcademicSummaryProps {
  standing: string;
  creditsLeft: number;
}

export default function StudentAcademicSummary({
  standing,
  creditsLeft,
}: StudentAcademicSummaryProps) {
  return (
    <section className="card w-full lg:w-85">
      <h4 className="title border-b border-border-card pb-4">
        Academic Summary
      </h4>

      <div className="flex justify-between items-center gap-2 py-5">
        <div>
          <h6 className="text-text-secondary/70 text-[10px] md:text-xs uppercase">
            standing
          </h6>
          <p className="text-text-primary text-xs md:text-sm font-bold tracking-wider">
            {standing}
          </p>
        </div>

        {/* Purely decorative chart image with no meaningful info — hide from assistive tech instead of a generic/misleading alt like "chart" */}
        <Image
          alt=""
          aria-hidden="true"
          src="/images/chart.png"
          width={80}
          height={40}
          className="h-auto object-contain"
        />
      </div>

      <div className="w-full flex justify-between items-center bg-bg-filter p-4 rounded-sm">
        <h6 className="text-text-secondary text-sm md:text-base">
          Credits Left
        </h6>
        <p className="text-accent text-lg md:text-xl font-bold">
          {creditsLeft}
        </p>
      </div>
    </section>
  );
}
