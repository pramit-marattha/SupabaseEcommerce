import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import {
  SparklesIcon,
  MailOpenIcon,
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Confirm = ({ show = false, email = "" }) => (
  <Transition appear show={show} as={Fragment}>
    <div className="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex items-center justify-center h-full p-8">
          <div className="overflow-hidden transition-all transform">
            <h3 className="text-center text-lg font-medium leading-6">
              <div className="flex flex-col justify-center items-center space-y-4">
                <MailOpenIcon className="w-12 h-12 shrink-0 text-teal-500" />
              </div>
              <p className="text-2xl font-semibold mt-2">Confirm your email</p>
            </h3>

            <p className="text-lg text-center mt-4">
              We have sed and email to <strong>{email ?? ""}</strong>.
              <br />
              Check your email and click on that confirmation link.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const LoginModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full my-8 overflow-hidden text-left transition-all transform bg-neutral shadow-2xl sm:rounded-xl max-w-xl relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <div className="flex justify-center">
                    <Link href="/">
                      <a className="flex items-center space-x-1">
                        <img
                          className="shrink-0 w-24 h-24 text-primary"
                          src="https://user-images.githubusercontent.com/37651620/158058874-6a86646c-c60e-4c39-bc6a-d81974afe635.png"
                          alt="Logo"
                        />
                        <span className="text-2xl font-semibold tracking-wide text-gray-400">
                          <span className="text-3xl text-success">S</span>
                          upabase
                          <span className="text-3xl text-success">E</span>
                          commerce
                        </span>
                      </a>
                    </Link>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mt-6 font-bold text-lg sm:text-2xl text-center"
                  >
                    {showSignIn ? "Welcome back!" : "Create an account"}
                  </Dialog.Title>
                  {!showSignIn ? (
                    <Dialog.Description className="mt-2 text-gray-500 text-base text-center">
                      This feature will be implemented in next series of
                      article.
                    </Dialog.Description>
                  ) : null}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LoginModal;
