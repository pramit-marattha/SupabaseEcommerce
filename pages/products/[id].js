import Image from "next/image";
import Layout from "@/components/Layout";

const ListedProducts = (product = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
              </li>
              <li>
                <span>{product?.warranty ?? 0} year warranty</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListedProducts;
