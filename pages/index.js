import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "data.json";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">
        WELCOMEE! to <span className="text-3xl text-teal-500">Supaa Shop</span>
      </h1>
      <p className="text-gray-500">Shop as much as you wanttt!!</p>
      <div className="mt-8">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
