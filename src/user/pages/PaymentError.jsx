import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

function PaymentError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 bg-white border border-red-100 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Payment Failed
        </h1>

        <p className="text-gray-500 mt-3 font-medium leading-relaxed max-w-sm mx-auto">
          Something went wrong during checkout. Your card has <strong>not</strong> been charged. Please try again or contact support if the problem persists.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/all-events">
            <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-pink-500/20">
              Browse Events
            </button>
          </Link>

          <Link to="/">
            <button className="w-full border-2 border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition">
              <ArrowLeft size={16} /> Back to Home
            </button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 font-semibold mt-6">
          Error code: PAYMENT_CANCELLED
        </p>
      </div>
    </div>
  );
}

export default PaymentError;