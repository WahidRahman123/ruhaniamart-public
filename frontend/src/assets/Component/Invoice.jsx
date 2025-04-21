import React from "react";

const Invoice = () => (
  <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto mt-5">
    <h1 className="text-2xl font-bold text-center mb-4">INVOICE</h1>
    <div className="border-b pb-4 mb-4">
      <p><strong>Company:</strong> </p>
      <p><strong>Address:</strong> </p>
      <p><strong>Phone:</strong> </p>
      <p><strong>Email:</strong> </p>
    </div>
    <div className="border-b pb-4 mb-4">
      <p><strong>Bill To:</strong></p>
      <p><strong>Name:</strong> </p>
      <p><strong>Address:</strong> </p>
      <p><strong>Email:</strong> </p>
    </div>
    <table className="w-full border-collapse border border-gray-200 mb-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Item</th>
          <th className="border p-2">Qty</th>
          <th className="border p-2">Unit Price</th>
          <th className="border p-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item, index) => (
          <tr key={index}>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        ))} */}

        <tr>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
        </tr>
      </tbody>
    </table>
    <div className="text-right">
      <p><strong>Subtotal:</strong> </p>
      <p><strong>Shipping:</strong> </p>
      <p><strong>Discount:</strong> </p>
      <p className="text-xl font-bold mt-2"><strong>Grand Total:</strong> </p>
    </div>
    <div className="border-t pt-4 mt-4">
      <p><strong>Payment Method:</strong> </p>
      <p><strong>Transaction ID:</strong> </p>
    </div>
  </div>
);

export default Invoice;
