import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast("🦄 Wow so easy!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const ToastWarning = () => {
  useEffect(() => {
    notify();
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ToastWarning;
