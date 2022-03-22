// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function Products({ products = [] }) {
  return (
    <Layout>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
