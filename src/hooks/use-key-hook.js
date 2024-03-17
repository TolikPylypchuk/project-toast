import React from "react";

export function useKey(key, handler) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        handler();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, handler]);
}
