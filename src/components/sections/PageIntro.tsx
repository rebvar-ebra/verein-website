import Image from "next/image";
export function PageIntro({
  title,
  text,
  eyebrow,
  eyebrowLogo,
}: {
  title: string;
  text: string;
  eyebrow?: string;
  eyebrowLogo?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-12 pt-14 text-center md:pb-16 md:pt-16">
      {eyebrowLogo ? (
        <Image src={eyebrowLogo} alt="Neuer Tag e.V." width={700} height={263} className="mx-auto mb-5 h-auto w-60 sm:w-72" />
      ) : eyebrow ? (
        <p className="eyebrow mb-4 text-olive">{eyebrow}</p>
      ) : null}
      <h1 className="section-title">{title}</h1>
      <p className="mt-6 text-base leading-7 text-ink">{text}</p>
    </div>
  );
}
