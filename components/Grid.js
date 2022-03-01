import PropTypes from "prop-types";
import Card from "@/components/Card";
import { ExclamationIcon } from "@heroicons/react/outline";

const Grid = ({ products = [] }) => {
  const isEmpty = products.length === 0;

  const toggleFavorite = async (id) => {
    // TODO: Add/remove product from the authenticated user's favorites
  };

  return isEmpty ? (
    <p className="text-purple-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} {...product} onClickFavorite={toggleFavorite} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  products: PropTypes.array,
};

export default Grid;
