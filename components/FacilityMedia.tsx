import Image from "next/image";
import type { FacilityGuide } from "@/data/facility-guide";

export default function FacilityMedia({
  name,
  photo,
  large = false,
}: {
  name: string;
  photo?: FacilityGuide["photo"];
  large?: boolean;
}) {
  if (!photo) return null;
  return (
    <figure className={large ? "my-7" : ""}>
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-sora-soft ${large ? "aspect-[16/7] rounded-lg" : "aspect-[16/6]"}`}
      >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              large
                ? "(max-width: 800px) 100vw, 800px"
                : "(max-width: 768px) 100vw, 560px"
            }
            className="object-cover"
          />
      </div>
      {photo && (
        <figcaption className="mt-2 text-xs text-ink-soft">
          {name} / {photo.credit}
        </figcaption>
      )}
    </figure>
  );
}
