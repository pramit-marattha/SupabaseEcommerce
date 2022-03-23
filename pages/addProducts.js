import Layout from "@/components/Layout";
import ListingForm from "@/components/ListingForm";

const addProducts = () => {
  const createProduct = () => (data) => axios.post("/api/products", data);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto flex-col">
        <h1 className="text-3xl font-medium text-gray-200 justify-center">
          Add your Products
        </h1>
        <div className="mt-8">
          <ListingForm
            buttonText="Add Product"
            redirectPath="/products"
            onSubmit={createProduct}
          />
        </div>
      </div>
    </Layout>
  );
};

export default addProducts;
