import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "products.json";

export default function Products() {
  return (
    <Layout>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
