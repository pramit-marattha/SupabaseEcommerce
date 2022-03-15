import Layout from "@/components/Layout";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 flex flex-col md:flex-row space-y-8 md:space-y-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="max-w-xs lg:max-w-md space-y-10 w-5/6 mx-auto md:w-full text-center md:text-left">
            <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
              Shop whenever and however you want from wherever you are..{" "}
            </h1>
            <p className="font-secondary text-gray-500 text-base md:text-lg lg:text-xl">
              SuperbaseEcommerce improves and streamlines your shopping
              experience..
            </p>
            <div className="flex space-x-4">
              <PrimaryButton text="Register" link="/" />
              <SecondaryButton text="Let's Shop!" link="/products" />
            </div>
          </div>
        </div>
        <motion.div
          className="w-full md:w-1/2 transform scale-x-125 lg:scale-x-100"
          initial={{ opacity: 0, translateY: 60 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, translateY: 0 }}
        >
          <img
            alt="hero-img"
            src="https://user-images.githubusercontent.com/37651620/158060188-db5fce3a-e840-429b-9b0d-32b064d0cd01.png"
            className="mx-auto object-cover shadow rounded-tr-extraLarge rounded-bl-extraLarge w-full h-96 sm:h-112 md:h-120"
          />
        </motion.div>
      </div>

      {/* Services Benifits */}
      <div className="relative mt-32">
        <div className="absolute inset-0 h-full w-full overflow-hidden mx-auto">
          <div className="w-4/5 h-full mx-auto rounded-full transform scale-x-150"></div>
        </div>
      </div>
    </Layout>
  );
}
