import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState(
    VARIANT_OPTIONS[0]
  );
  const [toasts, setToasts] = React.useState([]);

  function onSubmit(event) {
    event.preventDefault();

    const nextToasts = [
      ...toasts,
      { id: Math.random(), message, variant: selectedVariant },
    ];

    setToasts(nextToasts);
    setMessage("");
    setSelectedVariant(VARIANT_OPTIONS[0]);
  }

  function onDismiss(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf items={toasts} onDismiss={onDismiss} />

      <form onSubmit={onSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map((variant) => (
            <div
              key={variant}
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <label htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name={`variant-${variant}`}
                  value={variant}
                  checked={selectedVariant === variant}
                  onChange={(event) => setSelectedVariant(event.target.value)}
                />
                {variant}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
