import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ShopCards from "@/components/ShopCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ShopCards />
      <Footer />
    </Layout>
  );
}
