import React, { useRef, useState, useMemo } from "react";
import { uploadLogFile, addManualError } from "../service/uploadService";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../css/Upload.css";

const MAX_SIZE_MB = 50;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const ACCEPTED_EXT = [".log", ".txt"];
const ACCEPTED_MIME = ["text/plain", "application/octet-stream", ""];

const MESSAGES = {
  upload: {
    successTitle: "Success!",
    successDesc: "The file was uploaded successfully.",
    needFile: "Please select a file before uploading.",
    invalidFile: (exts, maxMb) => `Invalid file. Only ${exts.join(", ")} up to ${maxMb}MB`,
    unauthorized: "You are not authorized. Please login again.",
    tooLarge: "File too large. Please use a smaller file.",
    cancelled: "Upload cancelled.",
    failedTitle: "Error",
    failedDescDefault: "Sorry, the file has failed to upload.",
    failed: "Upload failed. Please try again.",
  },
  manual: {
    successTitle: "Success!",
    successDesc: "The manual error was added successfully.",
    fixErrors: "Please fix the errors above.",
    unauthorized: "You are not authorized. Please login again.",
    failedTitle: "Error",
    failedDescDefault: "Sorry, failed to add the manual error.",
    failed: "Failed to add error. Please try again.",
    fieldRequired: {
      errorMessage: "Error message is required.",
      errorLevel: "Error level is required.",
      source: "Source is required.",
      errorType: "Error type is required.",
    },
  },
};

const UploadLogsPage = () => {
  const fileInputRef = useRef(null);
  const abortRef = useRef(null);

  // Step toggle exactly like your screenshots
  const [step, setStep] = useState("upload"); // 'upload' | 'manual'

  // Upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Manual entry state
  const [manualError, setManualError] = useState({
    errorMessage: "",
    errorLevel: "ERROR",
    source: "",
    errorType: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [manualLoading, setManualLoading] = useState(false);

  // Modals
  const [uploadModal, setUploadModal] = useState({
    open: false,
    variant: "success",
    title: "",
    description: "",
  });
  const [manualModal, setManualModal] = useState({
    open: false,
    variant: "success",
    title: "",
    description: "",
  });

  // Helpers
  const acceptAttr = useMemo(() => [...ACCEPTED_EXT, "text/plain"].join(","), []);

  const isValidFile = (file) => {
    if (!file) return false;
    const name = file.name?.toLowerCase() ?? "";
    const type = file.type ?? "";
    const size = file.size ?? 0;

    const validExt = ACCEPTED_EXT.some((ext) => name.endsWith(ext));
    const validType = ACCEPTED_MIME.includes(type);
    const validSize = size <= MAX_SIZE;
    return validExt && validType && validSize;
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const resetManual = () => {
    setManualError({
      errorMessage: "",
      errorLevel: "ERROR",
      source: "",
      errorType: "",
    });
    setFieldErrors({});
  };

  // Upload handlers
  const handleFileChange = (e) => {
    setProgress(0);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidFile(file)) {
      setUploadModal({
        open: true,
        variant: "error",
        title: MESSAGES.upload.failedTitle,
        description: MESSAGES.upload.invalidFile(ACCEPTED_EXT, MAX_SIZE_MB),
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setProgress(0);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!isValidFile(file)) {
      setUploadModal({
        open: true,
        variant: "error",
        title: MESSAGES.upload.failedTitle,
        description: MESSAGES.upload.invalidFile(ACCEPTED_EXT, MAX_SIZE_MB),
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadModal({
        open: true,
        variant: "error",
        title: MESSAGES.upload.failedTitle,
        description: MESSAGES.upload.needFile,
      });
      return;
    }

    setUploadLoading(true);
    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const token = localStorage.getItem("token");

      await uploadLogFile(
        selectedFile,
        token,
        (event) => {
          if (event?.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
        abortController.signal
      );

      setUploadModal({
        open: true,
        variant: "success",
        title: MESSAGES.upload.successTitle,
        description: MESSAGES.upload.successDesc,
      });
      resetUpload();
    } catch (err) {
      const status = err?.response?.status;
      let desc = MESSAGES.upload.failedDescDefault;

      if (abortController.signal.aborted) {
        desc = MESSAGES.upload.cancelled;
      } else if (status === 401 || status === 403) {
        desc = MESSAGES.upload.unauthorized;
      } else if (status === 413) {
        desc = MESSAGES.upload.tooLarge;
      } else {
        desc = err?.response?.data ?? err?.message ?? MESSAGES.upload.failed;
      }

      setUploadModal({
        open: true,
        variant: "error",
        title: MESSAGES.upload.failedTitle,
        description: desc,
      });
    } finally {
      setUploadLoading(false);
      abortRef.current = null;
    }
  };

  const cancelUpload = () => {
    if (abortRef.current) abortRef.current.abort();
  };

  // Manual handlers
  const validateManual = () => {
    const errors = {};
    if (!manualError.errorMessage.trim())
      errors.errorMessage = MESSAGES.manual.fieldRequired.errorMessage;
    if (!manualError.errorLevel.trim())
      errors.errorLevel = MESSAGES.manual.fieldRequired.errorLevel;
    if (!manualError.source.trim())
      errors.source = MESSAGES.manual.fieldRequired.source;
    if (!manualError.errorType.trim())
      errors.errorType = MESSAGES.manual.fieldRequired.errorType;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddError = async () => {
    if (!validateManual()) {
      setManualModal({
        open: true,
        variant: "error",
        title: MESSAGES.manual.failedTitle,
        description: MESSAGES.manual.fixErrors,
      });
      return;
    }

    setManualLoading(true);
    try {
      const token = localStorage.getItem("token");
      await addManualError(manualError, token);

      setManualModal({
        open: true,
        variant: "success",
        title: MESSAGES.manual.successTitle,
        description: MESSAGES.manual.successDesc,
      });
      resetManual();
    } catch (err) {
      const status = err?.response?.status;
      const desc =
        status === 401 || status === 403
          ? MESSAGES.manual.unauthorized
          : err?.response?.data ?? err?.message ?? MESSAGES.manual.failed;

      setManualModal({
        open: true,
        variant: "error",
        title: MESSAGES.manual.failedTitle,
        description: desc || MESSAGES.manual.failedDescDefault,
      });
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <div className="ul-page">
      <div className="ul-container">
        <header className="ul-header">
          <h1 className="ul-title">Log Analyzer</h1>
          <p className="ul-subtitle">
            Perform actions sequentially on one page: upload a log file, or add a manual error.
          </p>
        </header>

        {step === "upload" && (
          <section className="ul-card">
            <div className="ul-card-header-row">
              <h2 className="ul-card-title">Upload a log file</h2>
            </div>
            <p className="ul-card-note">
              Supported types: <span className="ul-note-strong">{ACCEPTED_EXT.join(", ")}</span>. Max size: {MAX_SIZE_MB}MB.
            </p>

            <div
              className={`ul-dropzone ${dragActive ? "ul-dropzone-active" : ""} ${
                uploadLoading ? "ul-disabled" : ""
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              aria-label="File dropzone"
            >
              <div className="ul-dropzone-icon">⬇️</div>
              <p className="ul-dropzone-text">Drag & drop your log file here</p>
              <div className="ul-dropzone-actions">
                <button
                  type="button"
                  className="ul-outline-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadLoading}
                >
                  Browse
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptAttr}
                  className="ul-hidden-input"
                  onChange={handleFileChange}
                  disabled={uploadLoading}
                  aria-label="Upload log file"
                />
              </div>

              {selectedFile && (
                <span className="ul-file-label" aria-live="polite">
                  {selectedFile.name}
                </span>
              )}
            </div>

            {progress > 0 && uploadLoading && (
              <div className="ul-progress" aria-label="Upload progress">
                <div className="ul-progress-bar" style={{ width: `${progress}%` }} />
              </div>
            )}

            <div className="ul-actions">
              <button
                className={`ul-primary-btn ${!selectedFile || uploadLoading ? "ul-btn-disabled" : ""}`}
                onClick={handleUpload}
                disabled={!selectedFile || uploadLoading}
                aria-busy={uploadLoading ? "true" : "false"}
              >
                {uploadLoading ? "Uploading..." : "Upload & Analyze"}
              </button>

              <button
                type="button"
                className="ul-secondary-btn"
                onClick={resetUpload}
                disabled={uploadLoading}
              >
                Reset
              </button>

            <button
                type="button"
                className="ul-link-btn"
                onClick={() => setStep("manual")}
                disabled={uploadLoading}
                title="Add manual error instead"
              >
                Add manual error instead
              </button>
            </div>
          </section>
        )}

        {step === "manual" && (
          <section className="ul-card">
            <div className="ul-card-header-row">
              <h2 className="ul-card-title">Add a manual error</h2>
              <button
                type="button"
                className="ul-secondary-outline-btn"
                onClick={() => setStep("upload")}
                disabled={manualLoading}
                title="Back to upload"
              >
                ← Back to upload
              </button>
            </div>
            <p className="ul-card-note">
              Use this when you want to record an error message that isn’t present in a file.
            </p>

            <div className="ul-form-grid">
              <div className="ul-form-field ul-col-2">
                <label className="ul-label">
                  Error message <span className="ul-required">*</span>
                </label>
                <textarea
                  rows={3}
                  className={`ul-input ${fieldErrors.errorMessage ? "ul-input-error" : ""}`}
                  placeholder="Describe the error or paste a stack trace snippet"
                  value={manualError.errorMessage}
                  onChange={(e) => setManualError({ ...manualError, errorMessage: e.target.value })}
                />
                {fieldErrors.errorMessage && (
                  <p className="ul-error-text">{fieldErrors.errorMessage}</p>
                )}
              </div>

              <div className="ul-form-field">
                <label className="ul-label">
                  Error level <span className="ul-required">*</span>
                </label>
                <select
                  className={`ul-input ${fieldErrors.errorLevel ? "ul-input-error" : ""}`}
                  value={manualError.errorLevel}
                  onChange={(e) => setManualError({ ...manualError, errorLevel: e.target.value })}
                >
                  <option value="ERROR">ERROR</option>
                </select>
                {fieldErrors.errorLevel && (
                  <p className="ul-error-text">{fieldErrors.errorLevel}</p>
                )}
              </div>

              <div className="ul-form-field">
                <label className="ul-label">
                  Source <span className="ul-required">*</span>
                </label>
                <input
                  type="text"
                  className={`ul-input ${fieldErrors.source ? "ul-input-error" : ""}`}
                  placeholder="e.g., com.example.MyClass"
                  value={manualError.source}
                  onChange={(e) => setManualError({ ...manualError, source: e.target.value })}
                />
                {fieldErrors.source && <p className="ul-error-text">{fieldErrors.source}</p>}
              </div>

              <div className="ul-form-field">
                <label className="ul-label">
                  Error type <span className="ul-required">*</span>
                </label>
                <input
                  type="text"
                  className={`ul-input ${fieldErrors.errorType ? "ul-input-error" : ""}`}
                  placeholder="e.g., NullPointerException, IOException"
                  value={manualError.errorType}
                  onChange={(e) => setManualError({ ...manualError, errorType: e.target.value })}
                />
                {fieldErrors.errorType && <p className="ul-error-text">{fieldErrors.errorType}</p>}
              </div>
            </div>

            <div className="ul-actions">
              <button
                className={`ul-success-btn ${manualLoading ? "ul-btn-disabled" : ""}`}
                onClick={handleAddError}
                disabled={manualLoading}
                aria-busy={manualLoading ? "true" : "false"}
              >
                {manualLoading ? "Saving Error ..." : "Add Manual Error"}
              </button>

              <button
                type="button"
                className="ul-secondary-btn"
                onClick={resetManual}
                disabled={manualLoading}
              >
                Reset
              </button>
            </div>
          </section>
        )}

        <Modal
          open={uploadModal.open}
          variant={uploadModal.variant}
          title={uploadModal.title}
          description={uploadModal.description}
          primaryLabel={uploadModal.variant === "success" ? "Done" : "Try again"}
          onPrimary={() => {
            setUploadModal((m) => ({ ...m, open: false }));
          }}
          onClose={() => setUploadModal((m) => ({ ...m, open: false }))}
        />

        <Modal
          open={manualModal.open}
          variant={manualModal.variant}
          title={manualModal.title}
          description={manualModal.description}
          primaryLabel={manualModal.variant === "success" ? "Done" : "Try again"}
          onPrimary={() => setManualModal((m) => ({ ...m, open: false }))}
          onClose={() => setManualModal((m) => ({ ...m, open: false }))}
        />
      </div>
    </div>
  );
};

export default UploadLogsPage;
