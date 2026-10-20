import Image from "next/image";
import { Building2 } from "lucide-react";
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
  return (
    <figure className={large ? "my-7" : ""}>
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-sora-soft ${large ? "aspect-[16/7] rounded-lg" : "aspect-[16/6]"}`}
      >
        {photo ? (
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
        ) : (
          <div className="flex items-center gap-3 text-sora-deep">
            <Building2
              size={large ? 42 : 32}
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <span className="text-sm font-medium">施設写真準備中</span>
          </div>
        )}
      </div>
      {photo && (
        <figcaption className="mt-2 text-xs text-ink-soft">
          {name} / {photo.credit}
        </figcaption>
      )}
    </figure>
  );
}
