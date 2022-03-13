import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "data.json";

export default function Home() {
  return (
    <Layout>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
