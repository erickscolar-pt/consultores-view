import React from 'react';

export default function Modal ({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <button
          onClick={onClose}
          className="text-black text-2xl absolute top-2 right-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

