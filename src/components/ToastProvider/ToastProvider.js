import React from "react";

import ToastShelf from "../ToastShelf";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setToasts]);

  const context = {
    addToast: (toast) => {
      const nextToasts = [
        ...toasts,
        { id: Math.random(), message: toast.message, variant: toast.variant },
      ];

      setToasts(nextToasts);
    },
  };

  function onDismiss(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={context}>
      {children}
      <ToastShelf toasts={toasts} onDismiss={onDismiss} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
