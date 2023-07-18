import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom';
import {  Transition, Dialog, PaperProps } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from "react";
import axios_api from '../api/axios_api';
import SingleProduct from "./SingleProduct";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CartPanel({ onClose }) {
  const [open, setOpen] = useState(true)
  const wrapperRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [price_total, setPriceTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [typeCheckout, setTypeCheckout] = useState(0);
  const [popUpColor, setPopUpColor] = useState("bg-green-300");

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose prop to close the CartPanel
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].service_price !== "free") {
            total += parseFloat(products[i].service_price);
        }
    }
    return total;
  };

  useEffect(() => {
    const total = calculateTotalPrice();
    setPriceTotal(total);
  }, [products]);

  const handleRemoveButton = (id, price) => {
    let tmp_price = price
    axios_api.delete("/remove_from_cart", {withCredentials: true, data: {id: id}}).then((response) => {
        if (response.status === 200) {
            const json = response.data;
            setProducts(json);
            let total = price_total - tmp_price;
            total < 0 ? total = 0 : total = total;
            setPriceTotal(total);
        }
    }).catch((error) => {
        console.log("Error:", error);
    });
    };

  const handlePopup = () => {

    setCheckout(false);
    handleClose();
  };

  const handleCheckout = () => {
    setCheckout(true);
   
    axios_api.post("/checkout_send_email", {withCredentials: true}).then((response) => {
      if (response) {
        var res = response.data["message"];
        if (res != null && res === "Nu exista servicii in cos!") {
          setTypeCheckout(1);
          setPopUpColor("bg-yellow-200")
        } else if (res != null) {
          setTypeCheckout(0);
        }
      }
    }).catch((error) => {
        console.log("Error:", error);
    });
    
  };

  useEffect(() => { 
    const getData = async () => {
      try {

        axios_api.get("/get_cart", {withCredentials: true}).then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setProducts(json);
            let total = 0;
        }
        }).catch((error) => {
          console.log("Error:", error);
        });
      } catch (err) {
        setErr(err.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          onClose(); // Call the provided onClose function when clicking outside the modal
        }
      };
  
      const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
          onClose(); // Call the provided onClose function when the Escape key is pressed
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleEscapeKey);
      };
  }, [wrapperRef]);

  return (
    <div>
      {!checkout && <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opa city-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel ref={wrapperRef} className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Coș de cumpărături</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={handleClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {products.map((product) => (
                                <li key={product.service_id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={require(`../images/${product.service_image_path}`)}
                                      alt={product.service_image_path}
                                      className="h-full w-full object-cover object-center" />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.service_name}</a>
                                        </h3>
                                        <p className="ml-4"></p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-green-500 font-medium">{product.service_price == "free" ? "Gratis" : product.service_price + " Ron"}  </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => handleRemoveButton(product.service_id, product.service_price)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>{price_total} Ron</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Taxele sunt calculate la momentul achiziției.</p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Continuă plata
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={handleClose}
                            >
                              &nbsp;  Continuă cumpărăturile
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>}
      {checkout &&
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opa city-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="pointer-events-none fixed flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className = {popUpColor}>
                  <Dialog.Panel ref={wrapperRef} className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex flex-col shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white-900">{typeCheckout === 0 ? "Felicitări!":
                                        "Atenționare!"}</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={handlePopup}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-6 sm:px-6">
                        <p className=""> {typeCheckout === 0 ? "Înregistrarea dumneavoastră a fost realizată cu succes! Verificați email-ul pentru mai multe detalii.":
                                        "Momentan nu aveți nimic în coșul de cumpărături!"}</p>
                      </div>

                    </div>
                    <div>
                    </div>
                  </Dialog.Panel>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>}
    </div>
  )
}