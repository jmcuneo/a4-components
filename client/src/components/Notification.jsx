import React, { useEffect } from "react";

export const Notification = ({ type, message }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        // Hide notification after 3 seconds

      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) {
    return null; // Don't render anything if there's no message
  }

  const classNames = `alert alert-${type}`;

  return (
    <div className={classNames} role="alert">
      {message}
    </div>
  );
};
