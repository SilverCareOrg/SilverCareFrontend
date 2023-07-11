import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from "react";
import axios_api from '../axios_api';
import '../styles/styles.css';
import {
    ImHappy
  } from "react-icons/im";

export default function RegistrationService({ onClose, service_id}) {
  const [open, setOpen] = useState(true)
  const wrapperRef = useRef(null);
  const cancelButtonRef = useRef(null)
  const [err, setErr] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    email: "invalid email",
    phone_number: "invalid phone number",
    senior_name: "invalid senior_name"
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose prop to close the CartPanel
  };

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

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { senior_name, adult_name, phone_number, companion, email } = document.forms[0];
    axios_api.post("http://127.0.0.1:8000/add_to_cart", {
        service_id: service_id,
        senior_name: senior_name.value,
        adult_name: adult_name.value,
        phone_number: phone_number.value,
        companion: companion.value,
        email: email.value
    }, {sameSite: 'none', withCredentials: true})
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
            setIsSubmitted(true);
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="login-error">{errorMessages.message}</div>
    );

  const renderFinish = (
    <div className="login-form">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Activitate adăugată în coș!</div>
    </div>
  )

  const renderForm = (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label>Nume senior </label>
          <input type="login-text" name="senior_name" required />
          {renderErrorMessage("senior_name")}
        </div>
        <div className="login-input-container">
          <label>Nume adult </label>
          <input type="login-text" name="adult_name"/>
        </div>
        <div className="login-input-container">
          <label>Număr de telefon </label>
          <input type="login-password" name="phone_number" required />
          {renderErrorMessage("phone_number")}
        </div>
        <div className="login-input-container">
          <label>Însoțitor</label>
          <input type="login-password" name="companion"/>
        </div>
        <div className="login-input-container">
          <label>Email</label>
          <input type="login-password" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="registrationService-button-container" onClick={handleSubmit}>
            <button>Adaugă în coș</button>
        </div>
      </form>
    </div>
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel ref={wrapperRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
                      <ImHappy className="h-6 w-6 text-green-700" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Înregistrare activitate
                      </Dialog.Title>
                      {!isSubmitted && <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Vă rugăm introduceți următoarele detalii pentru a vă putea înregistra în cadrul activitiății alese.
                        </p>
                      </div>}
                    </div>
                  </div>
                </div>
                {isSubmitted ? renderFinish : renderForm}
                <div className="bg-white px-4 py-3 sm:flex  sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    {isSubmitted ? <div>Continuă cumpărăturile</div> : <div>Cancel</div>}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
