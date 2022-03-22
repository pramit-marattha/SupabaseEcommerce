import Layout from "@/components/Layout";
import ListingForm from "@/components/ListingForm";

const addProducts = () => {
  const createProduct = () => null;

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">
          Fill out the form below to list a new home.
        </p>
        <div className="mt-8">
          <ListingForm
            buttonText="Add home"
            redirectPath="/"
            onSubmit={createProduct}
          />
        </div>
      </div>
    </Layout>
  );
};

export default addProducts;
