import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { HeartIcon } from "@heroicons/react/solid";

const Card = ({
  id = "",
  image = "",
  title = "",
  status = "",
  authenticity = 0,
  returnPolicy = 0,
  warranty = 0,
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
}) => (
  <Link href={`/products/${id}`}>
    <a className="block w-full p-5">
      <div className="card card-compact w-full bg-neutral shadow-xl">
        <div className="relative bg-success rounded-lg shadow overflow-hidden aspect-video">
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
          <div className="absolute top-2 left-2 badge badge-warning">
            {status ?? ""}
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="mt-2 w-full inline-flex justify-between space-x-4">
              <span className="truncate text-success font-semibold">
                {title ?? ""}
              </span>
              <span className="shrink-0 text-info">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(price ?? 0)}{" "}
                <span className="text-white-500"> /pcs </span>
              </span>
            </div>
          </h2>
          <p>
            <div className="card-actions justify-center pt-2">
              <div className="badge badge-outline">
                {authenticity ?? 0}% authentic
              </div>
              <div className="badge badge-outline">
                {returnPolicy ?? 0} month return policy
              </div>
              <div className="badge badge-outline">
                {warranty ?? 0} years warranty
              </div>
            </div>
          </p>
        </div>
        <div className="card-actions justify-center p-6">
          <button className="btn btn-info">Buy Now</button>
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
