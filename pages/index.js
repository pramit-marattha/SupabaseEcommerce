import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "data.json";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-primary hover:justify-center">
        <span className="text-3xl text-success">S</span>upaa
        <span className="text-3xl text-success">S</span>hopp
      </h1>
      <p className="text-gray-300 text-xs">Shop as much as you wanttt!!</p>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
