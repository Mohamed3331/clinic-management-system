import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast("🦄 You need to Authneticate to perform CRUD operations", {
    position: "bottom-left",
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
