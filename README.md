<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/159424112-2faca207-6e1d-42b7-9b2f-b889cb5a693e.png" alt="Supabase Ecommerce logo">
</p>

We will be building `SuperbaseEcommerce` fullstack application in this article tutorial. This application is simply an online ecommerce shopping site where users can browse all of the products, upload their own products, and even purchase the products(`This functionality will be added in the next series of articles`). It is similar to an Amazon app, but it is simpler because we will not implement any actual payment or shipping procedures. Here's a live demonstration of the final version of the app. This is how your app should look after you finish this tutorial. Feel free to experiment with it to get a sense of all the features we will be implementing.

### Live Demo => [https://supabase-ecommerce.vercel.app](https://supabase-ecommerce.vercel.app)

<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/158058874-6a86646c-c60e-4c39-bc6a-d81974afe635.png" height="250" width="250"alt="Supabase Ecommerce logo">
</p>

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

![prismaSchema](https://user-images.githubusercontent.com/37651620/159417419-f3dbe24b-0041-4306-be72-9090142d5bc3.png)

```js
// prisma.schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

> Note: schema.prisma uses Prisma Schema Language(PSL)

`Prisma-client-js`, the Prisma JavaScript client, is the configured client represented by the `generator` block.

```js
generator client {
  provider = "prisma-client-js"
}
```

Next one is the the provider property of this block represents the type of database we want to use, and the connection url represents how Prisma connects to it.

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Environment variable

Using environment variables in the schema allows you to keep secrets out of the schema file which in turn improves the portability of the schema by allowing you to use it in different environments. Environment variables is created automatically after we fire the `npx prisma init` command.

> Note: Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB (Preview) and CockroachDB (Preview).

```
DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=foo"
```

As you can see, there is an `DATABASE_URL` variable with a dummy connection URL in this environment variable `.env`. So, replace this value with the connection string you obtained from Supabase.

```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bboujxbwamqvgypibdkh.supabase.co:5432/postgres"
```

### Prisma schemas and models

We can begin working on our application's data models now that database is finally connected to your `Next.js`. In Prisma, our application models should be defined within the Prisma schema using the Prisma models. These models represent the entities of our application and are defined by the model blocks in the `schema.prisma` file. Each block contains several fields that represent the data for each entity. So, let's begin by creating the `Product` model, which will define the data schema for our products properties.

#### Defining models

Models represent the entities of your application domain. Models are represented by model blocks and define a number of fields. In this data model, `Product` is the model.

```js
// prisma.schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(cuid())
  image       String?
  title       String
  description String
  status      String?
  price       Float
  authenticity        Int?
  returnPolicy        Int?
  warranty       Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Each field, as shown in our Product model, has at least a name and its type. To learn more about the Scalar types and Prisma schema refrences visit the following links .

- [Data model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#scalar-fields)
- [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Prisma schema reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-fields)

#### Generate Prisma Client

After designning Prisma model, we can begin generating our Prisma Client. We'll need to use Prisma's JavaScript library later in the article to interact with our data from within our `Next.js` app without having to write all of the SQL queries ourselves. But there's more to it. Prisma Client is, in fact, an auto-generated type-safe API designed specifically for our application which will gives us the JavaScript code we need to run queries on our data.

- **Step 1**: Installing prisma client

  ```
  npm install @prisma/client
  ```

  ![PrismaClient](https://user-images.githubusercontent.com/37651620/159432404-3e880b0a-4058-44f9-b922-652e7e389d63.png)

- **step2**: Generating Prisma client

  ```
  npx prisma generate
  ```

  ![Prisma Generate](https://user-images.githubusercontent.com/37651620/159432604-f6586811-262f-4d5f-b79b-5be9c4f1d5ff.png)

#### The @prisma/client npm package

The @prisma/client npm package consists of two key parts:

- The `@prisma/client` module itself, which only changes when you re-install the package
- The `.prisma/client` folder, which is the default location for the unique Prisma Client generated from your schema

`@prisma/client/index.d.ts` exports `.prisma/client`

Finally, after you have done that inside your `./node_modules` folder, you should now find the generated Prisma Client code.

![PrismaGenerate](https://user-images.githubusercontent.com/37651620/159435415-e4765d0e-b5c5-4fc5-9ad2-1ddf381539a4.png)

> Note: You need to re-run the prisma generate command after every change that's made to your Prisma schema to update the generated Prisma Client code.

Here is a graphical illustration of the typical workflow for the Prisma Client generation:

![WorkFlow](https://user-images.githubusercontent.com/37651620/159502666-d8c85d78-02a3-4af0-8f4e-6d29e9193247.png)

> Note also that prisma generate is automatically invoked when you're installing the `@prisma/client` npm package.

The Prisma Client is generated from the Prisma schema and is unique to your project. Each time you change the schema and run prisma generate, the client code changes itself.

![PrismaClient](https://user-images.githubusercontent.com/37651620/159506561-c361008c-6516-44fe-8d98-07ec4688cc38.png)

Pruning in `Node.js` package managers has no effect on the `.prisma` folder.

## Creating a table in `Supabase`

If you look at your database in Supabase, you'll notice there is no table inside it. It's because we haven't yet created the `Product` table.

![DashBoardScrrenshot](https://user-images.githubusercontent.com/37651620/159444118-7a373b58-b972-4bb9-9c8b-ddfd274526bd.png)

The Prisma model we defined in our `schema.prisma` file has not yet been reflected in our database. As a result, we must manually push changes to our data model to our database.

### Pushing the data model

Prisma makes it really very easy to synchonize the schema with our database.So to do that follow the command listed below.

```
npx prisma db push
```

![PrismaDB Push](https://user-images.githubusercontent.com/37651620/159443639-7b95dd91-7a02-4bd1-8603-749ccfa5a0ab.png)

![PushDatabase](https://user-images.githubusercontent.com/37651620/159445495-f28b10b6-7bb1-49d3-a6ab-e044950b51c6.png)

This command is only good for prototyping on the schemas locally.

OR,

```
npx prisma migrate dev
```

This method (`npx prisma migrate dev`) will be used in this article because it is very useful in that it allows us to directly sync our Prisma schema with our database while also allowing us to easily track the changes that we make.

So, to begin using Prisma Migrate, enter the following command into the command prompt and after that enter a name for this first migration when prompted.

![PrismaMigrate](https://user-images.githubusercontent.com/37651620/159447379-c54179e1-e1d1-4f6b-a8fc-d73059b360c4.png)

After you have completed this process successfully, prisma will automatically generate SQL database migration files, and you should be able to see the SQL which should look something like this if you look inside the `prisma` folder.

![FolderStructure](https://user-images.githubusercontent.com/37651620/159448032-a0259fb8-ed70-4275-9676-41f8b6fbc57f.png)

```sql
-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "authenticity" INTEGER,
    "returnPolicy" INTEGER,
    "warranty" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
---
```

Finally, check the Supabase dashboard to see if everything has been successfully synced.

![Supabase](https://user-images.githubusercontent.com/37651620/159447800-82feed93-398d-4a8a-89c1-fbf10a4adf74.png)

## Prisma Studio

Prisma Studio is a visual interface to the data residing inside your database where you can use to quickly visualize and manipulate the data. The cool thing about it is that it runs in entirely on your browser and you don't need to set up any connections because it's already comes with the prisma package. Not only that, from the studio, you can quickly open all of your application's models and interact with them directly via. studio itself.

> Note: There is also desktop application available to download

### Launching Prisma Studio

Launching the prisma studio is really very easy. Literally all you have to do is run the following command from a Prisma project.

```
npx prisma studio
```

![PrismaStudio](https://user-images.githubusercontent.com/37651620/159463409-b9614ad2-5c63-4519-98f2-d2ab791cc604.png)

Now, open your browser and head over to `http://localhost:5555/`. You should be able to see the single table that we've created previously if you've followed all of the steps correctly.

![PrismaStudio](https://user-images.githubusercontent.com/37651620/159463579-2019f826-22c6-484c-a877-319ec6abe170.png)

![PrismaStudio](https://user-images.githubusercontent.com/37651620/159463739-764e709b-9ce9-469b-ada2-dce371a8efad.png)

### Manually adding the records

Lets manually add some records and save the changes that we made.

![PrismaStudio](https://user-images.githubusercontent.com/37651620/159464112-a0575030-4b00-455a-8698-48983f534d39.png)

![DataFilled](https://user-images.githubusercontent.com/37651620/159473084-776a272e-0186-42eb-8905-27e6de0ce1c4.png)

Finally, lets create a functionality to access that data from within our Next.js app, where we can create new records, update existing ones, and delete old ones.

## Interacting with data using Next.js

You should see some demo datas if you look at the `Product` page of your application.

![LandingShopButton](https://user-images.githubusercontent.com/37651620/159481862-f5f5cb2f-52f4-4b52-80a3-2cb63f41a43d.png)

![Product Page](https://user-images.githubusercontent.com/37651620/159481958-aeaab5e3-a495-47f8-acce-980701262a5f.png)

Now, open the file `pages/products.js`, file which represents our app's product page.

```js
// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "products.json";

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

As you can see, products data is comming from `products.json` file.

```json
// products.json
[
  {
    "id": "001",
    "image": "/products/ballpen_300.png",
    "title": "Ball Pen",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "new",
    "warranty": 1,
    "price": 50
  },
  {
    "id": "002",
    "image": "/products/actioncamera_300.png",
    "title": "Go-pro cam",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "new",
    "warranty": 1,
    "price": 30
  },
  {
    "id": "003",
    "image": "/products/alarmclock_300.png",
    "title": "Alarm Clock",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "new",
    "warranty": 1,
    "price": 20
  },
  {
    "id": "004",
    "image": "/products/bangle_600.png",
    "title": "Bangle",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "new",
    "warranty": 2,
    "price": 200
  },
  {
    "id": "005",
    "image": "/products/bed_600.png",
    "title": "Large Bed",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "out of stock!",
    "warranty": 1,
    "price": 105
  },
  {
    "id": "006",
    "image": "/products/binderclip_600.png",
    "title": "Binder clip",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 2,
    "status": "new",
    "warranty": 1,
    "price": 2
  },
  {
    "id": "007",
    "image": "/products/beyblade_600.png",
    "title": "BeyBlade Burst",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 1,
    "status": "out of stock!",
    "warranty": 1,
    "price": 15
  },
  {
    "id": "008",
    "image": "/products/boxinggloves_600.png",
    "title": "Boxing gloves",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authenticity": 100,
    "returnPolicy": 2,
    "status": "new",
    "warranty": 1,
    "price": 45
  }
]
```

This data & information is then passed as a prop from the `Product` component to the `Grid` component. The `Grid` component is then in charge of rendering those data as a grid of Card on the screen.

```js
// Products.js
import PropTypes from "prop-types";
import Card from "@/components/Card";
import { ExclamationIcon } from "@heroicons/react/outline";

const Grid = ({ products = [] }) => {
  const isEmpty = products.length === 0;

  return isEmpty ? (
    <p className="text-purple-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>No data to be displayed.</span>
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
```

Now we want to retrieve data from our database, and we'll do so using Server-Side Rendering (SSR). The ability of an application to convert HTML files on the server into a fully rendered HTML page for the client is known as server-side rendering (SSR). The web browser sends a request for information to the server, which responds immediately by sending the client a fully rendered page.

![SSR](https://user-images.githubusercontent.com/37651620/159494240-00db1ac9-7f1d-4dbe-88ef-0bdd3c196ac5.png)

So, in order to use Server Side Rendering(SSR) with `Next.js`, we must export an asynchronous function `getServerSideProps` from within the file, which exports the page where we want to render out our data. The data returned by the `getServerSideProps` function will then be used by `Next.js` to pre-render our page on each individual request. Let's get started and export this function from our applicartion's `Prodcuts` page.

```js
// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

import products from "products.json";

export async function getServerSideProps() {
  return {
    props: {
      // props for the Home component
    },
  };
}

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

To get the data from supabase, import and instantiate the `generated Prisma client`.

```jsx
// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { PrismaClient } from "@prisma/client";

import products from "products.json";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  return {
    props: {
      // props for the Home component
    },
  };
}

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

Now, Using the `findMany` query, we can get all of the records in our Product table:

```jsx
// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function Products({ products = [] }) {
  return (
    <Layout>
      <div className="mt-8 p-5">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
```

Simply re-run the application, but if you get an error that looks like the one below, you'll need to regenerate the prisma and then re-run the server.

![Error](https://user-images.githubusercontent.com/37651620/159522918-6f09bba1-2577-4118-9ed2-b597bcb90794.png)

As you can see, its fixed now

![Fixed error](https://user-images.githubusercontent.com/37651620/159523214-7b6ff048-327d-4e71-b9f3-f5360102b6f9.png)

Finally, your application should resemble something like this:

![Application Final Demno](https://user-images.githubusercontent.com/37651620/159528273-977d0514-9618-441a-9f7e-3ad461159fa9.png)

Lets give users the functionality to actually create records from the application itself. So, first step is to actually create.

## Create a new records

Head over to the `pages/` folder and make a new file called `addProduct.js`.

![Folder structure](https://user-images.githubusercontent.com/37651620/159563363-3253d40c-e2e0-4ed7-99dd-3f90e642791e.png)

```js
// addProducts.js
import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";

const addProducts = () => {
  const createProduct = () => null;

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto flex-col">
        <h1 className="text-3xl font-medium text-gray-200 justify-center">
          Add your Products
        </h1>
        <div className="mt-8">
          <ProductList
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
```

After that head over to the `ProductList` component and make the following changes to that component.

```js
//components/ProductList.js
import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import AddProductImage from "@/components/AddProductImage";

const ProductSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  status: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  authenticity: Yup.number().positive().integer().min(1).required(),
  returnPolicy: Yup.number().positive().integer().min(1).required(),
  warranty: Yup.number().positive().integer().min(1).required(),
});

const ProductList = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async (image) => {
    // TODO: Upload image to remote storage
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    status: "",
    price: 0,
    authenticity: 1,
    returnPolicy: 1,
    warranty: 1,
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ProductSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Entire your product name..."
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Enter your product description...."
                disabled={disabled}
                rows={3}
              />

              <Input
                name="status"
                type="text"
                label="Status(new/out-of-stock/used)"
                placeholder="Enter your product status...."
                disabled={disabled}
              />

              <Input
                name="price"
                type="number"
                min="0"
                label="Price of the product..."
                placeholder="100"
                disabled={disabled}
              />

              <div className="justify-center">
                <Input
                  name="authenticity"
                  type="number"
                  min="0"
                  label="authenticity(%)"
                  placeholder="2"
                  disabled={disabled}
                />
                <Input
                  name="returnPolicy"
                  type="number"
                  min="0"
                  label="returnPolicy(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
                <Input
                  name="warranty"
                  type="number"
                  min="0"
                  label="warranty(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-success text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-teal-600 focus:ring-opacity-50 hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mb-6 max-w-full">
        <AddProductImage
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>
    </div>
  );
};

ProductList.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    authenticity: PropTypes.number,
    returnPolicy: PropTypes.number,
    warranty: PropTypes.number,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ProductList;
```

After that, go to the `AddProductImage` file inside the component folder and copy the following code.

```js
// AddProductImage.js
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import toast from "react-hot-toast";
import classNames from "classnames";
import { CloudUploadIcon } from "@heroicons/react/outline";

const AddProductImage = ({
  label = "Image",
  initialImage = null,
  objectFit = "cover",
  accept = ".png, .jpg, .jpeg, .gif .jiff",
  sizeLimit = 10 * 1024 * 1024,
  onChangePicture = () => null,
}) => {
  const pictureRef = useRef();
  const [image, setImage] = useState(initialImage ?? null);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState(null);

  const handleOnChangePicture = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileName = file?.name?.split(".")?.[0] ?? "New file";

    reader.addEventListener(
      "load",
      async function () {
        try {
          setImage({ src: reader.result, alt: fileName });
          if (typeof onChangePicture === "function") {
            await onChangePicture(reader.result);
          }
        } catch (err) {
          toast.error("Unable to update image");
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError("");
        reader.readAsDataURL(file);
      } else {
        setPictureError("File size is exceeding 10MB.");
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-200 ">{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={classNames(
          "relative aspect-video overflow-hidden rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition group focus:outline-none",
          image?.src
            ? "hover:opacity-50 disabled:hover:opacity-100"
            : "border-2 border-dotted hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-200"
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ""}
            layout="fill"
            objectFit={objectFit}
          />
        ) : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="shrink-0 rounded-full p-2 bg-gray-200 group-hover:scale-110 group-focus:scale-110 transition">
                <CloudUploadIcon className="w-4 h-4 text-gray-500 transition" />
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture
                  ? "Image Uploading..."
                  : "Upload product Image"}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type="file"
            accept={accept}
            onChange={handleOnChangePicture}
            className="hidden"
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-red-600 text-sm">{pictureError}</span>
      ) : null}
    </div>
  );
};

AddProductImage.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  objectFit: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default AddProductImage;
```

This `addProduct` component renders the entire page's layout, which consist of a form from where you can add the product details and informations.

![Demo](https://user-images.githubusercontent.com/37651620/159575908-1488990b-6982-446d-901a-27d72aeff82e.png)

### API endpoint

Let's actually create a API endpoint that will actually create a new record on our database via `addProduct` function.

```js
const createProduct = () => null;
```

But first, within our `Next.js` application project, let's create an `API` endpoint to handle our `POST` request for creating new records. `Next.js` provides a file based API routing so any file in the `pages/api` folder is mapped to `/api/*` and treated as an API endpoint rather than a page. They're only `server-side` bundles, so they won't add to the size of your `client-side` bundle. So, create a file name called `products.js` inside the `pages/api` folder and inside it create a request handler fucntion like shown below.

```js
export default async function handler(req, res) {}
```

#### Handling `POST` request for `products`

Before we go any further, use `req.method` to check the `HTTP` method of the request inside that `request handler` function. After that, return a 405 status code to the client becasue we are not handlling any kind of HTTP method.

```js
// pages/api/products.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // TODO
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
```

#### Adding new records with Prisma Client

Now, lets use Prisma Client to create a new `Product` record in the database using the data from the current HTTP request.

```js
// pages/api/products.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      image,
      title,
      description,
      status,
      price,
      authenticity,
      returnPolicy,
      warranty,
    } = req.body;
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
```

After that, lets actually initialize `Prisma` and call the `create` function that prisma provides.

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      image,
      title,
      description,
      status,
      price,
      authenticity,
      returnPolicy,
      warranty,
    } = req.body;

    const home = await prisma.product.create({
      data: {
        image,
        title,
        description,
        status,
        price,
        authenticity,
        returnPolicy,
        warranty,
      },
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
```

Finally lets add some try catch block to Handle the error.

```js
// pages/api/products.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        image,
        title,
        description,
        status,
        price,
        authenticity,
        returnPolicy,
        warranty,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          image,
          title,
          description,
          status,
          price,
          authenticity,
          returnPolicy,
          warranty,
        },
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
```

Now that we've created our `API`, let's call the API endpoint. To do so, open the `addProduct.js` file in the `pages` folder and make the following changes to the code, but first, we'll need to install the `axios` package, so do that first.

```bash
npm i axios
```

OR

```bash
yarn add axios
```

![Axios](https://user-images.githubusercontent.com/37651620/159638586-5cf82100-c3dc-4dbc-a4a8-7188408aba4c.png)

```js
//pages/addProducts.js
import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";

const addProducts = () => {
  const createProduct = () => (data) => axios.post("/api/products", data);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto flex-col">
        <h1 className="text-3xl font-medium text-gray-200 justify-center">
          Add your Products
        </h1>
        <div className="mt-8">
          <ProductList
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
```

Now lets re-run the server again.

![image](https://user-images.githubusercontent.com/37651620/159643456-282dfb5e-2963-44f7-920e-1db0cc4cfa4e.png)

After that head over to your browser and go to the `http://localhost:3000/addProducts` route and fill out all the product information and `Submit` it.

![Demo](https://user-images.githubusercontent.com/37651620/159903073-4fd2e7ed-7317-4011-9700-9305fd8e875e.png)
![Demo](https://user-images.githubusercontent.com/37651620/159903115-4347de95-d5e1-4747-8f45-acae6b99d969.png)
![Demo](https://user-images.githubusercontent.com/37651620/159903149-710afad5-015b-4dc3-b3e6-8281a300820f.png)

It will automatically redirect you to the `/products` page and you should be able to see the product that you just added.

![Demo](https://user-images.githubusercontent.com/37651620/159903167-ae9c4c76-aab3-4fff-880b-fb1a1e6a1d70.png)

## Pre-rendering the pages

We've used the `getServerSideProps` function to pre-render the `product` of our app using `Server-Side Rendering(SSR)`. Next.js, on the other hand, comes with a `built-in` pre-rendering method called `Static Generation (SSG)`.

When a page uses Static Generation, the HTML for that page is generated during the build process. That means that when you run next build in production, the page HTML is generated. Each request will then be served with the same HTML. A `CDN` can cache it. You can statically generate pages with or without data using `Next.js`.

![SSG](https://user-images.githubusercontent.com/37651620/159921224-aadedf3e-aaf1-4457-a5f9-486289bd28c6.png)

We can use different `pre-rendering` techniques on our applications when we use a framework like `Next.js`. For something more simple and non-dynamic, we can use `static site generation(SSG)`. For dynamic content and more complex pages, we can use `server-side rendering(SSR)` .

### Dynamic Routing with SSG

We can still statically generate pages with SSG after fetching some external data during the build process, even if SSG generates HTML at build time. [learn more about static generation and dynamic routing](https://nextjs.org/docs/basic-features/pages).

Let's get data at build time by exporting an `async` function called `getStaticProps` from the pages we want to statically generate.

### For Example,

```js
// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://.../posts");
  const posts = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
export default Blog;
```

Let's put Static Generation(SSG) to work in our application. The pages that render each individual `Product` listing are the ones that we'll statically generate at the build time. However, because `product` listings are generated through the users, we could end up with massive amount of pages. As a result, we won't be able to define those routes using predefined paths. Otherwise, we'll end up with a slew of useless files cluttering up our project.

We can easily create dynamic routes in `Next.js`. We just need to add brackets to a page's filename, `[id].js`, to create a dynamic route. However, in our project, we will place that in the `Products` folder. As a result, any route's `ids` will be matched with their specific id value, and the id value will be available inside the React component that renders the associated page.

Now, go to the pages folder and make a new folder called `products`, then make a new file called `[id].js` inside it.

![products](https://user-images.githubusercontent.com/37651620/159926080-e55b1760-02eb-41a6-a8ac-84a4c2c8b49b.png)

And finally paste the following code inside that file.

```jsx
// pages/products/[id].jsx
import Image from "next/image";
import Layout from "@/components/Layout";

const ListedProducts = (product = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListedProducts;
```

Now, let's actually provide the lists of paths of the pages that we want to statically generate, and let's actually fetch some data and match it with the numbers of paths. To do so, we must provide the paths to Next.js that we want to pre-render at build time.This function should return all the paths of the pages to pre-render at build time, along with the corresponding `id` value in the returned object's params property. So for that, we'll be using Prisma to retrieve the IDs for all of the `products` residing on our database.

```js
// pages/products/[id].jsx
import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
// Instantiate Prisma Client
const prisma = new PrismaClient();

const ListedProducts = (product = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export default ListedProducts;
```

The `getStaticProps` function must now be implemented. So, let's get started. As you can see, the first thing we do is use the Prisma findUnique function with the id retrieved from the query params object to get the data of the requested route. Then, if the corresponding home is found in the database, we return it to the `ListedProducts` React component as a prop. If the requested `products` cannot be found, we return an object to tell Next.js to redirect the user to our app's '`products'` page.

```js
// pages/products/[id].jsx
import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
// Instantiate Prisma Client
const prisma = new PrismaClient();

const ListedProducts = (product = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  };
}

export default ListedProducts;
```

Now re-run the server and head back to the browser and open the application.

![Demo](https://user-images.githubusercontent.com/37651620/160119909-00de7d20-ea1c-448e-b674-b9a752f2308b.png)

![Demo](https://user-images.githubusercontent.com/37651620/160119847-283970a1-f083-4427-ac80-535418353cc7.gif)

## Implementing Incremental Static Generation(ISR)

If you try to access a page for a new `product` listing in production, you'll get a `404 error page` instead. To see this in action, build your app and run it as you would in production, because `getStaticProps` runs on every request in development. So, we have different behavior in development that differs from what we would see in `production`. To serve a production build of your application, simply fire up the following command, but make sure to stop the server first.

```bash
yarn build
```

![yarn build](https://user-images.githubusercontent.com/37651620/160135075-4666a8d8-5f74-471d-9b60-aea22b889896.png)

```bash
yarn start
```

![yarn start](https://user-images.githubusercontent.com/37651620/160135296-cfe7f272-b810-4b70-a56b-909dea7d05f5.png)

The main reason for the `404 page` is that we used Static Generation to define the routes `/products/[id].js`, and we only generated pages for the products that were in our database at the time. In other words, after this build process, none of the products our users create will generate a new page. That is why we have a `404 page` instead, because the page simply does not exist at all.To fix this, we'll need to define a fallback that will allow us to continue building pages lazily at runtime.

```js
// pages/products/[id].js
import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
// Instantiate Prisma Client
const prisma = new PrismaClient();

const ListedProducts = (product = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    // ----- SET to TRUE ------
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  };
}

export default ListedProducts;
```

Now that we've set the `fallback` to `true`, the `404` page will no longer be displayed.

![Fallback](https://user-images.githubusercontent.com/37651620/160141955-14e4651c-bfc4-4dc2-8418-53d5b1639bce.gif)

It's also possible to detect whether the fallback version of the page is being rendered with the `Next.js router` and, if so, conditionally render something else, such as a loading spinner, while we wait for the props to get loaded.

```js
const router = useRouter();

if (router.isFallback) {
  return (
    <svg
      role="status"
      class="mr-2 w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-success"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
}
```

Finally your `[id].js` code should look something like this.

```jsx
// pages/products/[id].js
import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ListedProducts = (product = null) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <svg
        role="status"
        class="mr-2 w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-success"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    );
  }

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-6 relative aspect-video bg-gray-400 rounded-lg shadow-md overflow-hidden">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 pt-10">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {product?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-info">
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.status ?? 0} product</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.authenticity ?? 0}% Authentic</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.returnPolicy ?? 0} year return policy</span>
                <span aria-hidden="true"> ) </span>
                <span aria-hidden="true"> - </span>
              </li>
              <li>
                <span aria-hidden="true"> ( </span>
                <span>{product?.warranty ?? 0} year warranty</span>
                <span aria-hidden="true"> ) </span>
              </li>
            </ol>
            <p className="mt-8 text-lg">{product?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  };
}

export default ListedProducts;
```

## Uploading image in Supabase

We've created product records up to this point, but without any images because we haven't yet implemented aby media storage. We'll use Supabase Storage, a fantastic service from Supabase, to store and use media files in our project.

### Creating a bucket in supabase

Buckets are distinct containers for files and folders. It is like a `super folders`. Generally you would create distinct buckets for different Security and Access Rules. For example, you might keep all public files in a `public` bucket, and other files that require logged-in access in a `restricted` bucket.

To create a bucket in Supabase, first navigate to the `storage` section of the dashboard.

![Storage](https://user-images.githubusercontent.com/37651620/160153539-6c318c5c-0dee-4da2-9916-8f8801961afa.gif)

After that, select `Create Bucket` button.

![Storage](https://user-images.githubusercontent.com/37651620/160153764-f0f71f25-a3e0-44cf-90ba-f966397a18be.png)

Next, give the bucket a name; for now, we'll call it `supabase-ecommerce`, and remember to make it public and click on that `Create Button` button.

![Storage](https://user-images.githubusercontent.com/37651620/160154077-c0fe180d-2571-4497-8c58-2ae23e89e660.png)

![Storage](https://user-images.githubusercontent.com/37651620/160154148-e235236a-732e-4008-bb2a-6aa8b9ba592f.png)

![Storage](https://user-images.githubusercontent.com/37651620/160154311-35f95ab3-ce34-43af-a0f4-dc8541c4de93.png)

![Storage](https://user-images.githubusercontent.com/37651620/160154342-74a45f3b-eb85-487d-8b58-5a997477aa17.png)

### Manually uploading image on database

- **Step 1**: Head over to the supabase `Storage` and upload the `products` images.

![Boxing](https://user-images.githubusercontent.com/37651620/160235447-6b9deb1c-0bf6-4a4c-97dc-2732dd220cf4.png)
![Boxing](https://user-images.githubusercontent.com/37651620/160235455-c39b17f7-8d61-4ddb-ac19-2977afe0cbc2.png)

![Action Camera](https://user-images.githubusercontent.com/37651620/160235495-a605f3b4-2505-4284-bfba-14f9c63f533c.png)
![Action Camera](https://user-images.githubusercontent.com/37651620/160235505-34065298-562a-4d40-9aae-d7543087909d.png)

![Jwellery](https://user-images.githubusercontent.com/37651620/160235537-ebc2cb10-9d1a-4311-b208-b340d0627d1c.png)
![Jwellery](https://user-images.githubusercontent.com/37651620/160235568-7ae8f3cc-6d6a-48a7-b58d-23be839eec87.png)

- **Step 2**: Select the product image and copy the `image url`

![Boxing](https://user-images.githubusercontent.com/37651620/160235649-554c8f10-64d3-4ad1-a50d-f3e0faa238fb.png)

![Camera](https://user-images.githubusercontent.com/37651620/160235666-52bdedb1-5740-4e1b-a448-9c41c3abd9a7.png)

![Jwellery](https://user-images.githubusercontent.com/37651620/160235704-d22b5981-5c7a-4615-b630-19322c36d803.png)

- **Step 3**: Open up the `Prisma Studio` by typing `npx prisma studio` inside the command line terminal.

![Prisma Studio](https://user-images.githubusercontent.com/37651620/160236083-fd80ccb4-f7ac-4b4a-9576-ad4f754a9917.png)

![Prisma](https://user-images.githubusercontent.com/37651620/160236136-f6b62776-16c9-4cbc-b9d6-f858ea82157a.png)

- **Step 3**: Now, paste all of the image urls you copied in 'Step 2' inside the image row.

![Image URL](https://user-images.githubusercontent.com/37651620/160236233-9ecfde2d-f335-4cb1-a460-d8c2ae3ea79c.png)

Go back to the application and refresh the page now that you've added all of the `image urls`. You may encounter the error shown below.

![Image URL](https://user-images.githubusercontent.com/37651620/160236310-551486ec-1355-4025-8a0f-af47e51b5ddb.png)

Copy the hostname of your file URL and paste it into the `images.domains` config in the `next.config.js` file to fix the error.

```js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ezkjatblqzjynrebjkpq.supabase.co"],
  },
};
```

After that, restart the server, and you should see images.

![Demo](https://user-images.githubusercontent.com/37651620/160236559-21b8be68-1042-476f-bc9a-8c0aec3b1930.png)
![Demo](https://user-images.githubusercontent.com/37651620/160236563-161dcd5a-f664-4868-ba20-9cbca4652f43.png)
![Demo](https://user-images.githubusercontent.com/37651620/160236579-6f80c2de-accd-4d30-a35b-19a990ca5e48.png)

### Security Rules

We must define some security rules to be able to deal with our image files inside our bucket using the `Supabase API`. So, add the security rules from our `Supabase dashboard`.

- **Step 1**: Head over to the `Storage` section and go to the `Policies` section.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238474-ad39e70f-feff-4bfa-a559-b57cc00a0ac4.png)

- **Step 2**: Create a `New Policy`.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238482-416094e3-5ecf-441f-a8f1-619425257c98.png)

- **Step 3**: Select `Get started quickly`.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238492-b814238e-1723-40ca-bcfc-5b97979974d0.png)

- **Step 4**: Use `Allow access to JPG images in a public folder to anonymous users` this template.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238518-fc9066f6-1031-4f95-90bf-74eda3b7b767.png)

- **Step 5**: Give the `Policy Name` select all the `Operation` and give `bucket_id` and Hit `Review`.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238559-7b2ffdd1-948d-46f9-903a-1e84297d875d.png)

- **Step 6**: `Review` the policy and `save` it.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238568-fd77e15b-4265-499e-a89c-4daaf33a8f07.png)

![Security Rules](https://user-images.githubusercontent.com/37651620/160238578-e542545d-03e9-4072-8466-f3a2eb56c41d.png)

- **Step 8**: Finally you've successfully created a `Storage Policy`.

![Security Rules](https://user-images.githubusercontent.com/37651620/160238595-7be56c15-4a45-4af5-9e02-1bfe13da601a.png)

## Upload a file from application

Let's keep going and add the ability for our application to upload and store our products images. Let's begin by adding a new `API endpoint` to your project's `pages/api/productsImage.js` directory.

```js
// pages/api/productsImage.js
export default async function handler(req, res) {
  if (req.method === "POST") {
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method :${req.method}: not supported.` });
  }
}
```

Now, let's use Supabase JS Client for uploading the image to our Supabase Storage Bucket.To do so, you need to install `@supabase/supabase-js` client library.

```shell
npm i @supabase/supabase-js
```

![Supbase client](https://user-images.githubusercontent.com/37651620/160239578-b753f67d-d04f-4cca-9c98-ec498077bff8.png)

Then, inside your `pages/api/productsImage.js file`, import it and create a new Supabase Client.

```jsx
// pages/api/productsImage.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_API_KEY
);
export default async function handler(req, res) {
  if (req.method === "POST") {
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method :${req.method}: not supported.` });
  }
}
```

After that, go to the Supabase dashboard and click on `Setting > API`.

![API key](https://user-images.githubusercontent.com/37651620/160244953-5476732c-8dd2-44ec-a8ef-545e0da80202.png)

and add all those API keys to your `env` file.

```js
SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a2phdGJscXpqeW5yZWJ-";
SUPABASE_API_URL = "https://ezkjatblqzjynrebjkpq.supabase.co";
SUPABASE_STORAGE_BUCKET = "supabase-ecommerce";
```

Now you need to add three packages to your application. The first one is `base64-arraybuffer` which encodes and decodes base64 to and from ArrayBuffers and another package called `nanoid` which is a very tiny, secure, URL-friendly, unique string ID generator for `JavaScript`.

```
yarn add nanoid base64-arraybuffer
```

![Supabase](https://user-images.githubusercontent.com/37651620/160245715-13f55bc1-415c-4c25-99d2-c239f86646bf.png)

Return to our API endpoint and upload a file to our bucket using the Supabase Client. Obtain the image data from the request's body and verify that it is not empty, then inspect the image data for `Base64 encoding`. After that, save the file to your Supbase storage bucket. With the `SUPABASE_STORAGE_BUCKET` env, you must provide the storage bucket name, the file path, and the decoded Base64 data, as well as the `contentType`. Once the image has been successfully uploaded, we can generate its public URL and return it to the client who initiated the HTTP request and then do some `Error handling` .So finally, your `API endpoint` for `productsImage` should look like this.

```jsx
// pages/api/productsImage.js
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { image } = req.body;

    if (!image) {
      return res.status(500).json({ message: "There is no image" });
    }
    try {
      const imageType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];
      if (!imageType || !base64FileData) {
        return res.status(500).json({ message: "Image data not valid" });
      }
      const fileName = nanoid();
      const ext = imageType.split("/")[1];
      const path = `${fileName}.${ext}`;
      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .upload(path, decode(base64FileData), {
          imageType,
          upsert: true,
        });
      if (uploadError) {
        console.log(uploadError);
        throw new Error("Image upload Failed!!");
      }
      const url = `${process.env.SUPABASE_API_URL.replace(
        ".co"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ message: "Something went horribly wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method :${req.method}: is not supported.` });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};
```

After you have added the API endpoint make the following chnages to the `ProductList`.

```jsx
import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import AddProductImage from "@/components/AddProductImage";
import axios from "axios";

const ProductSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  status: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  authenticity: Yup.number().positive().integer().min(1).required(),
  returnPolicy: Yup.number().positive().integer().min(1).required(),
  warranty: Yup.number().positive().integer().min(1).required(),
});

const ProductList = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/productsImage", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded Image", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload Image", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    status: "",
    price: 0,
    authenticity: 1,
    returnPolicy: 1,
    warranty: 1,
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ProductSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Entire your product name..."
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Enter your product description...."
                disabled={disabled}
                rows={3}
              />

              <Input
                name="status"
                type="text"
                label="Status(new/out-of-stock/used)"
                placeholder="Enter your product status...."
                disabled={disabled}
              />

              <Input
                name="price"
                type="number"
                min="0"
                label="Price of the product..."
                placeholder="100"
                disabled={disabled}
              />

              <div className="justify-center">
                <Input
                  name="authenticity"
                  type="number"
                  min="0"
                  label="authenticity(%)"
                  placeholder="2"
                  disabled={disabled}
                />
                <Input
                  name="returnPolicy"
                  type="number"
                  min="0"
                  label="returnPolicy(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
                <Input
                  name="warranty"
                  type="number"
                  min="0"
                  label="warranty(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-success text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-teal-600 focus:ring-opacity-50 hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mb-6 max-w-full">
        <AddProductImage
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>
    </div>
  );
};

ProductList.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    authenticity: PropTypes.number,
    returnPolicy: PropTypes.number,
    warranty: PropTypes.number,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ProductList;
```

Now lets actually test our final application

![Demo](https://user-images.githubusercontent.com/37651620/160247868-452701cd-85d6-4f16-b60f-7a5e14abc49e.png)

![Demo](https://user-images.githubusercontent.com/37651620/160247968-01060b50-eed4-4308-8a1f-dc85998b4319.png)

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

## Deploying to netlify

First, sign in to netlify or create an account if you don't already have one.

![Demo](https://user-images.githubusercontent.com/37651620/160248728-38468ed9-241f-4ff3-ba25-45ee73725551.png)

You can also log in using a variety of other platforms.

![Demo](https://user-images.githubusercontent.com/37651620/160248732-24493114-228d-4217-b195-393a530bf858.png)

Import your project from github now.

![Demo](https://user-images.githubusercontent.com/37651620/160248905-77307916-5989-46a3-81d1-3624979421a9.png)

Sign-in and connect to your GitHub account.

![Demo](https://user-images.githubusercontent.com/37651620/160248911-5811b5f6-dd33-4fbb-acd2-184e258a5a1b.png)

Look for your project on Github.

![Demo](https://user-images.githubusercontent.com/37651620/160248916-532e28de-66c8-4994-8a40-706715c48cbd.png)

Add all of the configuration, and don't forget to include the environment variables.

![Demo](https://user-images.githubusercontent.com/37651620/160248990-2216e8d3-f47a-4b6f-a989-79fe64f3493e.png)

Yayyy!! 🎉 🎉 Its deployed on Netlify!

![Demoo](https://user-images.githubusercontent.com/37651620/160249677-65e73965-77b8-45c6-b7fd-afb1a06e4c1a.png)

# Conclusion

Congratulations 🎉 🎉!!. You've successfully created a fullstack application with Next.js, Supabase, Prisma and chatwoot.This article may have been entertaining as well as instructive in terms of creating a fully fgledged working ecommerce site from absolute scratch.

Aviyel is a collaborative platform that assists open source project communities in monetizing and long-term sustainability. To know more visit Aviyel.com and find great blogs and events, just like this one! Sign up now for early access, and don't forget to follow us on our socials

# Refrences

- [Managing .env files and setting variables](https://www.prisma.io/docs/guides/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually)
- [A first look at Prisma Studio](https://daily-dev-tips.com/posts/a-first-look-at-prisma-studio/)
- [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching/two-forms)
- [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#scalar-fields)
- [Generating the client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
- [Instantiating the client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client)
- [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Prisma schema reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-fields)
