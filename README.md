<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/158058874-6a86646c-c60e-4c39-bc6a-d81974afe635.png" alt="Supabase Ecommerce logo">
</p>

`SuperbaseEcommerce` is the the app we'll be building on in this tutorial. It is simply an online ecommerce shopping site where users can browse all of the products, bookmark their favorite products, and even purchase the products. It is similar to an Amazon app, but it is simpler because we will not implement any actual payment or shipping procedures. Here's a live demonstration of the final version of the app. This is how your app should look after you finish this tutorial. Feel free to experiment with it to get a sense of all the features we will be implementing.

![Demo](https://user-images.githubusercontent.com/37651620/159170940-d8c210c4-5b9d-47f7-b5d8-547bea3106fc.png)

![Demo](https://user-images.githubusercontent.com/37651620/159170944-b48ead6f-6482-4234-a5ea-7b20335ca7fe.png)

So, in this tutorial, we'll learn how to build this full-stack app with `Next.js`, the react framework, `NextAuth.js`, for implementing passwordless and OAuth authentication, `Supabase`, for persisting app data into a PostgreSQL database and stashing media files and information, and `Prisma`, for making it simple to read and write data from and to the database from our app.

This article tutorial covers many topics and technical concepts necessary to build a modern full-stack app, even if this app is a simplified version of a more advanced ecommerce site like Amazon. You should be able to use all of the technologies covered in this tutorial, including react, nextjs, prisma, supabase, and others, but most importantly, you should be able to build any full-stack app using those technologies. You'll go at your own speed and intensity, with us guiding you along the way. After completing this guide, the goal of this article is to provide you with the tools and techniques you'll need to build a similar app on your own.To put it another way, this tutorial will not only teach you how to use those technologies in great detail, but it will also provide you with the proper mixture of principles and application to help you grasp all of the key concepts so that you can proudly build your own apps from scratch later part on this article.

Let's start with the react portion and build our application. The first step is to install Node.js if it isn't already on your computer. So, go to the official Node.js website and download the most recent version. Node js is required to use the node package manager, abbreviated as npm. Now launch your preferred code editor and navigate to the folder. For this article tutorial, we'll be using the VScode code editor.

### Setting up SupabaseEcommerce project.

There is a [Github repository](https://github.com/pramit-marattha/SupabaseEcommerce) dedicated to this project, which consists of three branches. Clone the [`SupabaseEcommerce-starter`](https://github.com/pramit-marattha/SupabaseEcommerce/tree/SupabaseEcommerce-starter) branch to get started.

![Github](https://user-images.githubusercontent.com/37651620/158067824-de726446-b049-4ebb-9c2f-adbecd571d64.png)

The `Main` branch contains the entire `final` source code of the application, so clone the `SupabaseEcommerce-starter` branch if you want to follow along with this tutorial.

```
git clone --branch SupabaseEcommerce-starter https://github.com/pramit-marattha/SupabaseEcommerce.git
```

After that, head over to the cloned directory and install the dependencies before starting the `Next.js` development server:

```bash
cd SupabaseEcommerce
yarn add all
yarn dev
```

You can now check if everything is working properly by going to `http://localhost:3000` and editing `pages/index.js`, then viewing the updated result in your browser.For more information on how to use `create-next-app`, you can review the [create-next-app documentation](https://nextjs.org/docs/api-reference/create-next-app).

![Documentation](https://user-images.githubusercontent.com/37651620/158068425-c3087d4a-14fb-46ac-a99c-10cd6412624f.png)

It usually only takes a few minutes to get everything set up. So, for this project we will be using `yarn` to add packages to a project, which will install and configure everything for us so that we can get started right away with an excellent starter template. It's time to start our development server, so head over to that `SupabaseEcommerce` folder and type `yarn add all` and then `yarn dev` and the browser will instantly open our starter template `Next.js` appplication.

![Demo](https://user-images.githubusercontent.com/37651620/158068726-0b8eafe8-6c4d-45eb-98cf-ef64faf58103.png)

Your application’s folder structure should look something like this.

![Folder structure](https://user-images.githubusercontent.com/37651620/158068978-ce6f3ba8-1571-46e9-840a-4c9a79f01666.png)

So you might be curious about the source of the content. Remember that all of our source code is housed in the pages folder, and react/next will inject it into the root div element. Let’s take a look at our pages folder, which contains some javascript files and one API folder.

![Pages](https://user-images.githubusercontent.com/37651620/158071549-8daff075-bf73-4873-96ca-ab3cd473848d.png)

Before we dive any further lets actually create a landing page for our site.

so before we even begin first you need to install `framer-motion` library.

![Framer Motion](https://user-images.githubusercontent.com/37651620/158306049-86478da8-4e06-473d-bfec-493196a228de.png)

Let's dive in and create a beautiful looking UI for our E-commerce application before we start on the backend integration part. Let's start by making a landing page for the app, and then move on to making a product page for it. So, inside the `components` folder, create a `Layout` component and add the following code to it. This component is simply a basic layout for our application that includes a navigation bar & menus as well as the functionality to display our application's registration/login modal.

```jsx
// components/Layout.js
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import AuthModal from "./AuthModal";
import { Menu, Transition } from "@headlessui/react";
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const menuItems = [
  {
    label: "List a new home",
    icon: PlusIcon,
    href: "/list",
  },
  {
    label: "My homes",
    icon: HomeIcon,
    href: "/homes",
  },
  {
    label: "Favorites",
    icon: HeartIcon,
    href: "/favorites",
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    onClick: () => null,
  },
];

const Layout = ({ children = null }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const user = null;
  const isLoadingUser = false;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>SupaaShop | A new way to shop!</title>
        <meta name="title" content="SupaaShopp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col font-['Poppins'] bg-[linear-gradient(90deg, #161122 21px, transparent 1%) center, linear-gradient(#161122 21px, transparent 1%) center, #a799cc]">
        <header className="h-28 w-full shadow-lg">
          <div className="h-full container mx-auto">
            <div className="h-full px-5 flex justify-between items-center space-x-5">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <img
                    className="shrink-0 w-24 h-24 text-primary"
                    src="https://user-images.githubusercontent.com/37651620/158058874-6a86646c-c60e-4c39-bc6a-d81974afe635.png"
                    alt="Logo"
                  />
                  <span className="text-2xl font-semibold tracking-wide text-white">
                    <span className="text-3xl text-success">S</span>upabase
                    <span className="text-3xl text-success">E</span>commerce
                  </span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/create">
                  <a className="ml-4 px-4 py-5 rounded-md bg-info text-primary hover:bg-primary hover:text-info focus:outline-none focus:ring-4 focus:ring-primaryfocus:ring-opacity-50  font-semibold transition">
                    Register shop !
                  </a>
                </Link>
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || "Avatar"}
                            layout="fill"
                          />
                        ) : (
                          <UserIcon className="text-gray-400 w-6 h-6" />
                        )}
                      </div>
                      <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                          <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || "Avatar"}
                                layout="fill"
                              />
                            ) : (
                              <UserIcon className="text-gray-400 w-6 h-6" />
                            )}
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                        <div className="py-2">
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className="px-2 last:border-t last:pt-2 last:mt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link href={href}>
                                      <a className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
                                        <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                        <span>{label}</span>
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="ml-4 px-4 py-5 rounded-md bg-info hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-primary hover:text-info font-extrabold transition"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto">
          <div className="px-4 py-12">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>

        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
```

Let's create a 'Hero' section of our landing page after you've successfully created a layout for the application. To do so, simply paste the following code into that section. So, in this section, we'll add an image on the right, a large text heading, and two buttons on the left.Note that we are styling our project with the absolute power of `tailwind css` and `framer-motion` to add some beautiful transition animation to the image .Since we've already created buttons on our starter template, you won't have to worry about creating them from scratch; instead, you can simply import them from the components and use them.

```jsx
// components/Hero.js
import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 flex flex-col md:flex-row space-y-8 md:space-y-0">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <div className="max-w-xs lg:max-w-md space-y-10 w-5/6 mx-auto md:w-full text-center md:text-left">
          <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
            Shop <span className="text-success">whenever</span> and{" "}
            <span className="text-success">however</span> you want from,{" "}
            <span className="text-success">wherever</span> you are..{" "}
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
          src="./assets/shop.svg"
          className="mx-auto object-cover shadow rounded-tr-extraLarge rounded-bl-extraLarge w-full h-96 sm:h-112 md:h-120"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
```

Now, before re-running the server, import this `Hero` component into the `index.js` file and wrap it in the Layout component to see the changes you've made.

```jsx
// index.js
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
```

This is how your landing page should appear.

![Demo](https://user-images.githubusercontent.com/37651620/159169803-0d0ed5ff-0084-45d8-b2b9-f802d4e69d2b.png)

After you've finished with the `Hero` section, go ahead and create a `ShopCards` component, where we'll simply list the demo features that this application offers and add some images, so your final code for the `ShopCards` component should look like this.

```jsx
// components/ShopCards.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ShopCards = () => {
  const [tab, setTab] = useState(1);

  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
  }, [tab]);
  return (
    <section className="relative">
      <div
        className="absolute inset-0 pointer-events-none pb-26"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-3xl mb-4">Features</h1>
            <p className="text-xl text-gray-500">
              List of features that SuperbaseEcommerce provides.
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-12 md:pt-20">
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-16">
                <div className="" data-aos="zoom-y-out" ref={tabs}>
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0, translateY: 60 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.8, translateY: 0 }}
                  >
                    <img
                      alt="hero-img"
                      src="./assets/webShop.svg"
                      className="mx-auto object-cover shadow rounded-tr-extraLarge rounded-bl-extraLarge w-full h-96 sm:h-112 md:h-120"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto py-12 flex flex-col md:flex-row space-y-8 md:space-y-0">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6 pr-12"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">All of our awesome features</h3>
                <p className="text-xl text-black"></p>
              </div>
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-success hover:shadow-lg"
                      : "bg-success border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-gray-600">
                      Register/Login Feature
                    </div>
                    <div className="text-gray-600">
                      User can login and save their products for later purchase.
                    </div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-purple-200 hover:shadow-lg"
                      : "bg-success border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-gray-600">
                      Add to cart
                    </div>
                    <div className="text-gray-600">
                      User can add the products/items to their cart
                    </div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-purple-200 hover:shadow-lg"
                      : "bg-success border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-gray-600">
                      Security
                    </div>
                    <div className="text-gray-600">
                      Hassle free secure login and registration process.
                    </div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 4
                      ? "bg-white shadow-md border-purple-200 hover:shadow-lg"
                      : "bg-success border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(4);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-gray-600">
                      Personalized shops
                    </div>
                    <div className="text-gray-600">
                      User can create/register their very own shop and add their
                      own products.
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCards;
```

Again, before re-running the server, import this `ShopCards` component into the `index.js` file and wrap it in the `Layout` component & below the `Hero` component to see the changes you've made.

```jsx
// index.js
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ShopCards from "@/components/ShopCards";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ShopCards />
    </Layout>
  );
}
```

For the time being, this is how your landing page should appear.

![Demo](https://user-images.githubusercontent.com/37651620/159170136-4c2d9b7e-dc6a-4f7d-b897-bee33ac7f338.png)

Finally, let's add a Footer section, so make a `Footer` component and paste the code below into it.

```jsx
// components/Footer.js
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
          <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pb-12 md:pb-20">
                <div
                  className="relative bg-success rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden"
                  data-aos="zoom-y-out"
                >
                  <div
                    className="absolute right-0 bottom-0 pointer-events-none hidden lg:block"
                    aria-hidden="true"
                  ></div>

                  <div className="relative flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-center lg:text-left lg:max-w-xl">
                      <h6 className="text-gray-600 text-3xl font-medium mb-2">
                        Sign-up for the early access!{" "}
                      </h6>
                      <p className="text-gray-100 text-lg mb-6">
                        SuperbaseEcommerce improves and streamlines your
                        shopping experience.. !
                      </p>
                      <form className="w-full lg:w-auto">
                        <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-xl lg:mx-0">
                          <input
                            type="email"
                            className="w-full appearance-none bg-purple-100 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-black placeholder-gray-500"
                            placeholder="Enter your email…"
                            aria-label="Enter your email…"
                          />
                          <a
                            className="btn text-white bg-info hover:bg-success shadow"
                            href="#"
                          >
                            Sign-Up!
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t-2 border-solid">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <Link
                href="#"
                className="flex justify-center items-center text-blue-400 hover:text-gray-900 bg-blue-100 hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
                <svg
                  className="w-8 h-8 fill-current "
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link
                href="#"
                className="flex justify-center items-center text-white hover:text-gray-900 bg-black hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </Link>
            </li>
          </ul>

          <div className="flex-shrink-0 mr-2">
            <Link href="/" className="block" aria-label="SuperbaseEcommerce">
              <img
                className="object-cover h-20 w-full"
                src="https://user-images.githubusercontent.com/37651620/159121520-fe42bbf1-a2af-4baf-bdd8-7efad8523202.png"
                alt="SupabaseEcommerce"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

> Note: Again, before re-running the server, import this `Footer` component into the `index.js` file and wrap it in the `Layout` component & below the `ShopCards` component to see the changes you've made.

```jsx
// index.js
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
```

So, if you re-run the server, this is what your application should look like.

![Demo Footer](https://user-images.githubusercontent.com/37651620/159170273-6b13b471-5d96-4e7e-88f4-9551edc253b6.png)

The structure of your component folders should resemble something like this.

![Demo](https://user-images.githubusercontent.com/37651620/159170780-1308379d-4532-4d9f-b2d7-f069b9564eac.png)

Congratulationss!! Now that you've successfully created a landing page for the application, let's move on to the core of the matter: creating the product section of the application.

So, Now let’s look at the `_app.js` file.

```jsx
// _app.js
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
```

The App component is used by `Next.js` to create pages. You can control the page initialization by simply overriding it. It allows you to do amazing things like: `Persisting layout across page changes`, `Keeping state while navigating pages`, `Custom error handling using componentDidCatch`,`Inject additional data into pages and Add global styles/CSS` are just a few of the great things you can accomplish with it.

In the above `\_app.js` code the Component parameter represents the active page, when you switch routes, Component will change to the new page. As a result, the page will receive any props you pass to Component. Meanwhile `pageProps` is an empty object that contains the initial props that were preloaded for your page by one of the data fetching methods.

Now, inside the `pages` folder, create a new page called `products.js` and import the `Layout` and `Grid` components, then import the `data.json` file as products and make the following changes to it.

```jsx
// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "data.json";

export default function Products() {
  return (
    <Layout>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
```

## Database Configurations

Before jumping directly on our application, we'll be utilizing the power of `Supabase` to create a `PostgreSQL` database, the `Prisma schema` to define the app data model, and Next.js to connect those two together. So, let's get started building our database.

### Supabase Configurartion

Creating a PostgreSQL database in Supabase is as simple as starting a new project. Head over to [supabase.com](https://supabase.com/) and `Sign-in` to your account.

![Supabase](https://user-images.githubusercontent.com/37651620/159206560-3b46e8b2-ded2-4146-97e3-4a640b72c8b7.png)

After you've successfully signed in, you should see something similar to this.

![New project](https://user-images.githubusercontent.com/37651620/159206701-23d739cc-37d7-47b6-bf39-63c4e04c3400.png)

Now, select `New project` button. Fill in your project's required details and again click `Create Project` button and wait for the new database to load.

![Create Project](https://user-images.githubusercontent.com/37651620/159207037-87f64dbe-baf6-45b3-81c5-c9c9d9dd65c3.png)

![Creating project](https://user-images.githubusercontent.com/37651620/159207145-ef6283f0-96b2-4e24-b537-a449c8c2f8b5.png)

After the supabase configured the project, your dashboard should look something similar to this.

![SupabaseDashboard](https://user-images.githubusercontent.com/37651620/159207301-ba504656-531f-4782-a806-25b9d6169322.png)

### Creating a connection URL

Follow the steps outlined below to retrieve your database connection URL after your database has been successfully created. We'll need it to use Prisma in our Next.js app to query and create data.

- **Step1** : Head over to the `Settings tab`(Located at the left side)

![Setting Tab](https://user-images.githubusercontent.com/37651620/159232832-0ecb374c-1185-464d-b1ba-99b82c650119.png)

- **Step2** : Click the `Database` tab in the sidebar (Located on the left side)

![Database](https://user-images.githubusercontent.com/37651620/159232570-299da821-d7ec-4b35-bef8-7f6b55a86327.png)

- **Step3** : Head over to the bottom of the page to find the `Connection string` section, then select `Nodejs` and copy the URL.

![Connection string](https://user-images.githubusercontent.com/37651620/159337831-bed01290-cd64-4b48-8afa-a37fc35e2540.png)

## Initializing Prisma

Prisma is a next-generation ORM that can be used in Node.js and TypeScript applications to access a database. W eare going to use prisma fo our application because it includes all of the code we need to run our queries. It will save us a lot of time and keep us from having to write a bunch of boilerplate codes.

### Installing prisma

#### Prisma CLI installation

The Prisma command line interface (CLI) is the primary command-line interface for interacting with your Prisma project. It can create new project assets, generate Prisma Client, and analyze existing database structures via introspection to create your application models automatically.

```
npm i prisma
```

![Prisma Installation](https://user-images.githubusercontent.com/37651620/159416387-5caea0cc-d44b-4cb4-ba9d-7cc2b02a086c.png)

#### Initialize prisma

Once you've installed the Prisma CLI, run the following command to get `Prisma` started in your `Next.js` application. It will then create a `/prisma` directory and the `schema.prisma` file within it inside your particular project folder. so, inside it we will be adding all the configuration for our application.

```
npx prisma init
```

---

### Chatwoot Configuration

#### Chatwoot configuration on Heroku

Let's get started by creating a chatwoot instance on Heroku.

- **Step First**: Create a free Heroku account by going to `https://www.heroku.com/` and then going to the chatwoot GitHub repository and clicking the `Deploy to Heroku` button in the readme section.

![Heroku](https://user-images.githubusercontent.com/37651620/154656511-8dfe366d-91f3-4ce6-b62f-e0685f7e5e0c.png)

![deploy](https://user-images.githubusercontent.com/37651620/154667615-9bcbba5d-55a3-4c8a-b424-1fd16f2d5a8c.png)

- **Step Second**: After you click that button, you'll be able to see the basic setup that chatwoot has already completed. Give the `App name` and replace the `FRONTEND_URL` with the `App name` you just gave, then click `Deploy App`.

![installation](https://user-images.githubusercontent.com/37651620/154667713-39521f5d-1e13-4590-b183-0e91605ea52a.png)

![URL config](https://user-images.githubusercontent.com/37651620/154667860-ec3bc9a5-1893-4c1f-a6e5-b947f53aee48.png)

- **Step Third**: Depending on your PC, network status, and server location, the program may take 10 to 15 minutes to install.

![deploying](https://user-images.githubusercontent.com/37651620/154668003-faacf254-27b6-4d62-b423-7c966c8b96fd.png)

- **Step Fourth**: After the app has been deployed, go to the settings panel in the dashboard.

![settings](https://user-images.githubusercontent.com/37651620/154668111-b7143eaa-949e-4e68-b359-2efbe96dd5f9.png)

- **Step Fifth**: The domain section can be found in the settings menu. In a new window, open that URL. Finally, you've configured chatwoot in Heroku successfully.

![domain](https://user-images.githubusercontent.com/37651620/154668214-c0cb9408-f40c-46bc-aa22-c94bb03b449b.png)

- **Step Sixth**: Inside the Resources section, make sure the `web` and `worker` resources are enabled.

![Resource section](https://user-images.githubusercontent.com/37651620/154669168-ca27814f-0246-47e7-9043-2ca2f597decc.png)

- **Step Seventh**: You should be able to log onto your chatwoot account if everything went smoothly.

![login](https://user-images.githubusercontent.com/37651620/154668422-8193c13b-c929-45f8-a2dc-9ab03d0db75d.png)

So, your first account has been created successfully.The main benefit of deploying chatwoot on Heroku is that you have full control over your entire application and your entire data.

#### Chatwoot cloud setup

There is another way to get started with [chatwoot](https://www.chatwoot.com/) which is the cloud way so this is the most straightforward way to get started is to register directly on the chatwoots [website](https://www.chatwoot.com/).

![chatwoot](https://user-images.githubusercontent.com/37651620/154645706-797c98f2-6a4b-4103-bacd-2f62e661ce2f.png)

- **Step First**: Fill out all of the required information to create an account.

![Sign up](https://user-images.githubusercontent.com/37651620/154647221-b2c786ff-becf-4793-90a3-2d407d475982.png)

- **Step Second**: You'll get an email asking you to confirm your account after you've signed up.

![Account Confirm](https://user-images.githubusercontent.com/37651620/154648298-2f3e1115-e08c-47c6-a718-f53815971f6a.png)

- **Step Third**: Proceed to login after you've confirmed your account by clicking the "Confirm my account" option.

![Login](https://user-images.githubusercontent.com/37651620/154648416-31972c34-a9e7-4c8e-b546-6f8c23a6cf73.png)

- **Step Fourth**: You may now visit the Chatwoot dashboard and begin connecting it with plethora of platform (websites, Facebook, Twitter, etc.).

![Chatwoot dashboard](https://user-images.githubusercontent.com/37651620/154648980-c1e6330a-3b59-4eae-a0a6-67a9bdb9bf3a.png)

##### Chatwoot Cloud Configuration

- **Step First**: Let's set up an inbox. The inbox channel acts as a communication hub where everything can be managed, including live-chat, a Facebook page, a Twitter profile, email, and WhatsApp.

![inbox channel](https://user-images.githubusercontent.com/37651620/154649555-f612e58f-c8f6-409f-9489-923dd21faa24.png)

- **Step Second**: Now, configure a website and domain name, as well as all of the heading and tagline information like shown below

![Website Domain](https://user-images.githubusercontent.com/37651620/154650303-51d77789-1b5e-4c0c-a6ef-183f4f37101e.png)

- **Step Third**: Finally, to control your mailbox, add "Agents." Keep in mind that only the "Agents" who have been authorized will have full access to the inbox.

![agents](https://user-images.githubusercontent.com/37651620/154650376-71e0d61c-8186-4e3f-8d25-eba2384ccde3.png)

- **Step Fourth**: Blammmm!. The website channel has been created successfully.

![website channel code](https://user-images.githubusercontent.com/37651620/154650930-c24a192f-b86a-4f6a-92eb-99222a2faecc.png)

The website channel must now be connected. Simply copy and paste the entire javascript code provided by chatwoot.Now, head back to our react app and create a new `component` folder and inside that folder create a new file/component called `ChatwootWidget` and inside it create a script which helps to loads the Chatwoot asynchronously. Simply follow the exact same steps outlined in the following code below.

```js
// ChatwootWidget.js
import { useEffect } from "react";

const ChatwootWidget = () => {
  useEffect(() => {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "expanded_bubble",
    };

    (function (d, t) {
      var BASE_URL = "https://app.chatwoot.com";
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: ""// add you secret token here,
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatwootWidget;
```

The best part about chatwoot is that you can customize it to your liking. For example, you can modify the position of the floating bubble, extend it, change the language, and hide the message bubble. All it takes is the addition of the following line of code.

```js
window.chatwootSettings = {
  hideMessageBubble: false,
  position: "right",
  locale: "en",
  type: "expanded_bubble",
};
```

Finally, it's time to import the ChatwootWidget component into our `_app_.js` file. To do so, simply navigate to the `_app_.js` file and import the chatwoot widget, then render that component. Your final code of `_app_.js` should look like this.

```jsx
// _app.js.js
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import ChatwootWidget from "@/components/ChatwootWidget";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <ChatwootWidget />
    </>
  );
}

export default MyApp;
```

Now that you've completed the chatwoot integration, your finished project should resemble something like this.

![Demo](https://user-images.githubusercontent.com/37651620/159338768-74294b10-5ed6-474f-973c-2d26ecd1b467.png)

![Demo](https://user-images.githubusercontent.com/37651620/159338798-54c1f63b-ad86-4a7e-a2d4-587c43c98365.png)
