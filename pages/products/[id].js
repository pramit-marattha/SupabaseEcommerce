import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
// Instantiate Prisma Client
const prisma = new PrismaClient();

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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  };
}

export default ListedProducts;
