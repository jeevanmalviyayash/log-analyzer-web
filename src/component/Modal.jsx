import React, { useEffect } from "react";
import "../css/Modal.css";
const Modal = (props) => {
  const {
    open,
    variant = "success",
    title = "SUCCESS",
    message = "",
    primaryLabel = "Done",
    onPrimary,
    onClose,
    showClose = true,
    secondaryLabel,
    onSecondary,
    onContinue,
  } = props;

  const isSuccess = variant === "success";

  const useLegacy =
    typeof open === "undefined" &&
    typeof onContinue === "function" &&
    typeof message === "string";

  useEffect(() => {
    if (!useLegacy && open) {
      const onEsc = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", onEsc);
      return () => document.removeEventListener("keydown", onEsc);
    }
  }, [useLegacy, open, onClose]);

  if (useLegacy) {
    return (
      <div className="success-modal" role="dialog" aria-modal="true">
        <div className="success-box">
          <div className="success-icon">✔</div>
          <h2>SUCCESS</h2>
          <p>{message}</p>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    );
  }
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} />

      {/* Card */}
      <div className="modal-card-wrap">
        <div className="modal-card">
          <div className="modal-card-header" />

          <div className="modal-card-body">
            {/* Icon */}
            <div className="modal-icon">
              {isSuccess ? (
                <span className="modal-icon-success" aria-hidden="true">
                  ✔
                </span>
              ) : (
                <span className="modal-icon-error" aria-hidden="true">
                  ✖
                </span>
              )}
            </div>

            <h2 className={`modal-title ${isSuccess ? "title-success" : "title-error"}`}>
              {title}
            </h2>

            <p className="modal-message">{message}</p>

            {/* Actions */}
            <div className="modal-actions">
              {secondaryLabel && onSecondary && (
                <button
                  type="button"
                  className="modal-btn-secondary"
                  onClick={onSecondary}
                >
                  {secondaryLabel}
                </button>
              )}

              <button
                type="button"
                className={`modal-btn-primary ${isSuccess ? "btn-success" : "btn-error"}`}
                onClick={onPrimary}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Close button */}
        {showClose && (
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <svg viewBox="0 0 24 24" className="modal-close-svg">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;