import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string,
  badge?: string;
  image: string;
  title: string;
  category: string;
  colors: number;
  price: string;
  width?: number;
  height?: number;
};

export default function Card({
  id,
  badge,
  image,
  title,
  category,
  colors,
  price,
  width = 500,  // default width
  height = 500, // default height
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block group">
      <div className="relative w-full overflow-hidden font-jost">
        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-red text-light-100 text-caption px-3 py-1 rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative w-full">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={width}
              height={height}
              className="object-contain"
            />
          ): null}
        </div>

        {/* Content */}
        <div className="py-4">
          <div className="flex justify-between items-start">
            <h3 className="text-body-medium text-dark-900">{title}</h3>
            <span className="text-body-medium text-dark-900">{price}</span>
          </div>
          <p className="text-caption text-dark-700">{category}</p>
          {/* <p className="text-footnote text-dark-500">{colors} Colour</p> */}
        </div>
      </div>
    </Link>
  );
}
