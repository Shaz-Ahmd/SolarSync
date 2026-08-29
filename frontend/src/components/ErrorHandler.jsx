import React from "react";

const ErrorHandler = ({ error }) => {
  if (!error) {
    return null;
  }

  const message =
    typeof error === "string"
      ? error
      : error?.message ||
        "An unexpected error occurred";

  return (
    <div className="error-handler">
      <div className="error-banner">
        ⚠ {message}
      </div>
    </div>
  );
};

export default ErrorHandler;