import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { HeartIcon } from "@heroicons/react/solid";

const Card = ({
  id = "",
  image = "",
  title = "",
  authenticity = 0,
  returnPolicy = 0,
  warranty = 0,
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
}) => (
  <Link href={`/homes/${id}`}>
    <a className="block w-full">
      <div className="relative bg-gray-200 rounded-lg shadow overflow-hidden aspect-video">
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="hover:opacity-80 transition"
          />
        ) : null}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onClickFavorite === "function") {
              onClickFavorite(id);
            }
          }}
          className="absolute top-2 right-2"
        >
          <HeartIcon
            className={`w-7 h-7 drop-shadow-lg transition ${
              favorite ? "text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>
      <div className="mt-2 w-full inline-flex justify-between space-x-4">
        <span className="truncate text-gray-700 font-semibold">
          {title ?? ""}
        </span>
        <span className="shrink-0">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price ?? 0)}{" "}
          <span className="text-gray-500">/per items </span>
        </span>
      </div>
      <ol className="inline-flex items-center space-x-1 text-gray-500">
        <li>
          <span>{authenticity ?? 0} authenticity</span>
          <span aria-hidden="true"> · </span>
        </li>
        <li>
          <span>{returnPolicy ?? 0} returnPolicy</span>
          <span aria-hidden="true"> · </span>
        </li>
        <li>
          <span>{warranty ?? 0} warranty</span>
        </li>
      </ol>
    </a>
  </Link>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  authenticity: PropTypes.number,
  returnPolicy: PropTypes.number,
  warranty: PropTypes.number,
  price: PropTypes.number,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default Card;
