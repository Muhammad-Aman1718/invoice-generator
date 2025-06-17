"use client";

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchInvoices, deleteInvoice } from '@/store/features/invoices/invoicesSlice';
import { InvoiceWithRelations } from '@/store/features/invoices/invoicesSlice'; // Correct import
import { format } from 'date-fns';

interface InvoiceListProps {
  onEditInvoice: (invoice: InvoiceWithRelations) => void;
  onViewInvoice: (invoice: InvoiceWithRelations) => void; // For navigating to a detailed view page perhaps
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onEditInvoice, onViewInvoice }) => {
  const dispatch = useAppDispatch();
  const { invoices, loading, error } = useAppSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      dispatch(deleteInvoice(id));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-8">Loading invoices...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Error: {error}</p>;
  }

  if (invoices.length === 0) {
    return <p className="text-center text-gray-500 py-8">No invoices found. Create one to get started!</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-5 text-left text-sm font-semibold">Invoice #</th>
            <th className="py-3 px-5 text-left text-sm font-semibold">Customer</th>
            <th className="py-3 px-5 text-left text-sm font-semibold">Issue Date</th>
            <th className="py-3 px-5 text-left text-sm font-semibold">Due Date</th>
            <th className="py-3 px-5 text-right text-sm font-semibold">Total</th>
            <th className="py-3 px-5 text-center text-sm font-semibold">Status</th>
            <th className="py-3 px-5 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
              <td className="py-3 px-5">{invoice.invoiceNumber || `INV-${invoice.id.substring(0,6)}`}</td>
              <td className="py-3 px-5">{invoice.customer?.name || 'N/A'}</td>
              <td className="py-3 px-5">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</td>
              <td className="py-3 px-5">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</td>
              <td className="py-3 px-5 text-right">
                ${(invoice.totalAmount ?? 0).toFixed(2)}
              </td>
              <td className="py-3 px-5 text-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full
                    ${invoice.status === 'PAID' ? 'bg-green-100 text-green-700' : ''}
                    ${invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${invoice.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' : ''}
                    ${invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-700' : ''}
                    ${invoice.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : ''}`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="py-3 px-5 text-center">
                <button
                  onClick={() => onViewInvoice(invoice)}
                  className="text-blue-600 hover:text-blue-800 mr-2 transition-colors duration-150"
                  title="View Invoice"
                >
                  View
                </button>
                <button
                  onClick={() => onEditInvoice(invoice)}
                  className="text-indigo-600 hover:text-indigo-800 mr-2 transition-colors duration-150"
                  title="Edit Invoice"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(invoice.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150"
                  title="Delete Invoice"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
