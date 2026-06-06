type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  tone?: "paper" | "mist" | "white";
};

const toneClass = {
  paper: "bg-paper",
  mist: "bg-mist",
  white: "bg-white"
};

export function Section({ id, eyebrow, title, description, children, tone = "paper" }: SectionProps) {
  return (
    <section id={id} className={`${toneClass[tone]} px-5 py-16 sm:px-8 lg:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-sea">{eyebrow}</p> : null}
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
          {description ? <p className="mt-5 text-lg leading-8 text-ink/75">{description}</p> : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
