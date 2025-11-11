"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const Toast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // simulate creating a session and show toast
    console.log("Session created");
    const timeoutId = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [showToast]);

  return (
    <>
      <Button
        className="flex items-center justify-center"
        onClick={() => setShowToast(true)}
      >
        Create session
      </Button>

      {/* Toast notification — centered near bottom, pill with icon */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute right-4 bottom-8 z-50"
        >
          <div className="flex items-center gap-4 bg-slate-800/90 text-white rounded-xl px-5 py-3 border border-slate-700/40 shadow-sm">
            <div className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-600/40">
              <Check className="size-4 text-white" />
            </div>
            <span className="text-sm font-medium">
              New session added successfully
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
