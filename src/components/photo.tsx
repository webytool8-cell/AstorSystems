import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";
import { cx } from "./ui";

/** Optimised, openly licensed photograph. Credits are listed on /credits. */
export function Photo({
  name,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const p = photos[name];
  return (
    <Image
      src={p.src}
      width={p.width}
      height={p.height}
      alt={p.alt}
      sizes={sizes}
      priority={priority}
      className={cx("h-full w-full object-cover", className)}
    />
  );
}
