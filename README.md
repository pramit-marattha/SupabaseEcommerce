<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/158058874-6a86646c-c60e-4c39-bc6a-d81974afe635.png" alt="Supabase Ecommerce logo">
</p>

`SuperbaseEcommerce` is the the app we'll be building on in this tutorial. It is simply an online ecommerce shopping site where users can browse all of the products, bookmark their favorite products, and even purchase the products. It is similar to an Amazon app, but it is simpler because we will not implement any actual payment or shipping procedures. Here's a live demonstration of the final version of the app. This is how your app should look after you finish this tutorial. Feel free to experiment with it to get a sense of all the features we will be implementing.

![Demo](https://user-images.githubusercontent.com/37651620/159121742-ae459f4d-8767-4319-a39b-1f24bb04545b.png)

![Demo](https://user-images.githubusercontent.com/37651620/158060188-db5fce3a-e840-429b-9b0d-32b064d0cd01.png)

So, in this tutorial, we'll learn how to build this full-stack app with `Next.js`, the react framework, `NextAuth.js`, for implementing passwordless and OAuth authentication, `Supabase`, for persisting app data into a PostgreSQL database and stashing media files and information, and `Prisma`, for making it simple to read and write data from and to the database from our app.

This article tutorial covers many topics and technical concepts necessary to build a modern full-stack app, even if this app is a simplified version of a more advanced ecommerce site like Amazon. You should be able to use all of the technologies covered in this tutorial, including react, nextjs, prisma, supabase, and others, but most importantly, you should be able to build any full-stack app using those technologies. You'll go at your own speed and intensity, with us guiding you along the way. After completing this guide, the goal of this article is to provide you with the tools and techniques you'll need to build a similar app on your own.To put it another way, this tutorial will not only teach you how to use those technologies in great detail, but it will also provide you with the proper mixture of principles and application to help you grasp all of the key concepts so that you can proudly build your own apps from scratch later part on this article.

Let's start with the react portion and build our application. The first step is to install Node.js if it isn't already on your computer. So, go to the official Node.js website and download the most recent version. Node js is required to use the node package manager, abbreviated as npm. Now launch your preferred code editor and navigate to the folder. For this article tutorial, we'll be using the VScode code editor.

### Setting up SupabaseEcommerce project.

There is a [Github repository](https://github.com/pramit-marattha/SupabaseEcommerce) dedicated to this project, which consists of three branches. Clone the [`SupabaseEcommerce-starter`](https://github.com/pramit-marattha/SupabaseEcommerce/tree/SupabaseEcommerce-starter) branch to get started.

![Github](https://user-images.githubusercontent.com/37651620/158067824-de726446-b049-4ebb-9c2f-adbecd571d64.png)

The `Main` branch contains the entire source code of the application, so clone the `SupabaseEcommerce-starter` branch if you want to follow along with the tutorial.

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

Let's dive in and create a beautiful looking UI for our E-commerce application before we start on the backend integration part. Let's start by making a landing page for the app, and then move on to making a product page for it. So, let's create a `Layout` component inside the `components` folder and add the following code to it.

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

Now import the `Layout` and `Grid` components into our `index.js` file, then import the `data.json` file as products and make the changes as follows.

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

The App component is used by Next.js to create pages. You can control the page initialization by simply overriding it. It allows you to do amazing things like: “Persisting layout across page changes”, “Keeping state while navigating pages”, “Custom error handling using componentDidCatch”,”Inject additional data into pages and Add global CSS” are just a few of the great things you can accomplish with it.

In the above `\_app.js` code the Component parameter represents the active page, when you switch routes, Component will change to the new page. As a result, the page will receive any props you pass to Component. Meanwhile pageProps is an empty object that contains the initial props that were preloaded for your page by one of the data fetching methods.
