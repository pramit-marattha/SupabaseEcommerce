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
  <Link href={`/products/${id}`}>
    <a className="block w-full p-5">
      <div className="card card-compact w-96 bg-base-100 shadow-xl p-3">
        <div className="relative bg-neutral rounded-lg shadow overflow-hidden aspect-video">
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
                favorite ? "text-rose-500" : "text-white"
              }`}
            />
          </button>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="mt-2 w-full inline-flex justify-between space-x-4">
              <span className="truncate text-accent font-semibold">
                {title ?? ""}
              </span>
              <span className="shrink-0">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(price ?? 0)}{" "}
                <span className="text-white-500">/per items </span>
              </span>
            </div>
          </h2>
          <p>
            <ol className="inline-flex items-center space-x-1 text-xs text-white-200 rounded-md py-4">
              <li>
                <span>{authenticity ?? 0}% authentic</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{returnPolicy ?? 0} month return policy</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{warranty ?? 0} years warranty</span>
              </li>
            </ol>
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>
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
