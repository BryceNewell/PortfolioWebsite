import Image from "next/image";
import { img, type ImageKey } from "@/data/images";
import { ZoomImage } from "./ZoomImage";

/** A phone-shaped frame around an app screenshot. With `zoom`, clicking opens it full size. */
export function PhoneFrame({
  image,
  alt = "",
  sizes,
  className = "",
  priority = false,
  zoom = false,
}: {
  image: ImageKey;
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  zoom?: boolean;
}) {
  const i = img(image);
  return (
    <div
      className={`overflow-hidden rounded-[8%/3.6%] border-[0.3rem] border-ink-700 bg-ink-800 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}
    >
      {zoom ? (
        <ZoomImage image={i} alt={alt} sizes={sizes} className="[&_img]:!h-auto" />
      ) : (
        <Image
          src={i.src}
          width={i.width}
          height={i.height}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}
