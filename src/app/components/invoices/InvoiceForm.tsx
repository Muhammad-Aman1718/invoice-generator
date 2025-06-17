"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers } from '@/store/features/customers/customersSlice';
import { Customer, InvoiceStatus, InvoiceItem as PrismaInvoiceItem } from '@/generated/prisma';
import { InvoiceWithRelations, CreateInvoiceDto, UpdateInvoiceDto } from '@/store/features/invoices/invoicesSlice';
import { format, parseISO } from 'date-fns';

type InvoiceItemForm = Omit<PrismaInvoiceItem, 'id' | 'invoiceId' | 'total'> & { tempId: string }; // Add tempId for list keys

interface InvoiceFormProps {
  initialInvoice?: InvoiceWithRelations | null;
  onSubmitForm: (invoiceData: CreateInvoiceDto | UpdateInvoiceDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialInvoice,
  onSubmitForm,
  onCancel,
  isSubmitting = false,
}) => {
  const dispatch = useAppDispatch();
  const { customers, loading: customersLoading, error: customersError } = useAppSelector((state) => state.customers);

  // Form state
  const [customerId, setCustomerId] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>(''); // Not in Prisma schema, but common
  const [issueDate, setIssueDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [status, setStatus] = useState<InvoiceStatus>(InvoiceStatus.DRAFT);
  const [items, setItems] = useState<InvoiceItemForm[]>([]);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);

  useEffect(() => {
    if (initialInvoice) {
      setCustomerId(initialInvoice.customerId);
      setInvoiceNumber(initialInvoice.invoiceNumber || '');
      setIssueDate(format(parseISO(initialInvoice.issueDate as unknown as string), 'yyyy-MM-dd'));
      setDueDate(format(parseISO(initialInvoice.dueDate as unknown as string), 'yyyy-MM-dd'));
      setStatus(initialInvoice.status);
      setItems(initialInvoice.items.map(item => ({ ...item, tempId: crypto.randomUUID() })));
      setNotes(initialInvoice.notes || '');
    } else {
      // Reset form for new invoice
      setCustomerId('');
      setInvoiceNumber(''); // Potentially generate this on backend or here
      setIssueDate(format(new Date(), 'yyyy-MM-dd'));
      setDueDate(format(new Date(), 'yyyy-MM-dd'));
      setStatus(InvoiceStatus.DRAFT);
      setItems([{ tempId: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }]);
      setNotes('');
    }
  }, [initialInvoice]);

  const handleAddItem = () => {
    setItems([...items, { tempId: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (tempId: string) => {
    setItems(items.filter(item => item.tempId !== tempId));
  };

  const handleItemChange = (tempId: string, field: keyof Omit<InvoiceItemForm, 'tempId' | 'invoiceId'>, value: string | number) => {
    setItems(items.map(item => item.tempId === tempId ? { ...item, [field]: value } : item));
  };

  const calculateItemTotal = (item: InvoiceItemForm) => item.quantity * item.unitPrice;
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  // For simplicity, tax/discount are not implemented here but can be added as state variables

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      alert('Please select a customer.'); return;
    }
    if (items.length === 0) {
      alert('Please add at least one invoice item.'); return;
    }
    if (items.some(i => !i.description || i.quantity <= 0 || i.unitPrice < 0)) {
        alert('Please ensure all items have a description, positive quantity, and non-negative price.'); return;
    }


    const invoiceData = {
      customerId,
      invoiceNumber: invoiceNumber || null, // Handle optional invoice number
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      status,
      items: items.map(({ tempId, ...itemData }) => itemData), // Remove tempId before submitting
      notes,
      // totalAmount will be calculated on the backend
    };

    if (initialInvoice) {
      onSubmitForm({ id: initialInvoice.id, ...invoiceData });
    } else {
      onSubmitForm(invoiceData as CreateInvoiceDto);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1 bg-white">
      {/* Customer and Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customer" className={labelClass}>Customer <span className="text-red-500">*</span></label>
          {customersLoading && <p>Loading customers...</p>}
          {customersError && <p className="text-red-500">Error loading customers.</p>}
          <select id="customer" name="customer" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required className={inputClass}>
            <option value="" disabled>Select a customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="invoiceNumber" className={labelClass}>Invoice Number</label>
          <input type="text" name="invoiceNumber" id="invoiceNumber" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="issueDate" className={labelClass}>Issue Date <span className="text-red-500">*</span></label>
          <input type="date" name="issueDate" id="issueDate" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="dueDate" className={labelClass}>Due Date <span className="text-red-500">*</span></label>
          <input type="date" name="dueDate" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Status <span className="text-red-500">*</span></label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value as InvoiceStatus)} required className={inputClass}>
            {Object.values(InvoiceStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Items</h3>
        {items.map((item, index) => (
          <div key={item.tempId} className="grid grid-cols-12 gap-3 p-3 border rounded-md">
            <div className="col-span-12 md:col-span-5">
              <label htmlFor={`item-desc-${index}`} className={labelClass}>Description <span className="text-red-500">*</span></label>
              <input type="text" id={`item-desc-${index}`} value={item.description} onChange={(e) => handleItemChange(item.tempId, 'description', e.target.value)} required className={inputClass} placeholder="Item description"/>
            </div>
            <div className="col-span-6 md:col-span-2">
              <label htmlFor={`item-qty-${index}`} className={labelClass}>Qty <span className="text-red-500">*</span></label>
              <input type="number" id={`item-qty-${index}`} value={item.quantity} onChange={(e) => handleItemChange(item.tempId, 'quantity', parseFloat(e.target.value) || 0)} required className={inputClass} min="1"/>
            </div>
            <div className="col-span-6 md:col-span-2">
              <label htmlFor={`item-price-${index}`} className={labelClass}>Unit Price <span className="text-red-500">*</span></label>
              <input type="number" id={`item-price-${index}`} value={item.unitPrice} onChange={(e) => handleItemChange(item.tempId, 'unitPrice', parseFloat(e.target.value) || 0)} required className={inputClass} step="0.01" min="0"/>
            </div>
            <div className="col-span-10 md:col-span-2">
              <label className={labelClass}>Total</label>
              <p className="mt-1 block w-full px-3 py-2 sm:text-sm text-gray-700">${calculateItemTotal(item).toFixed(2)}</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end">
              {items.length > 1 && (
                <button type="button" onClick={() => handleRemoveItem(item.tempId)} className="text-red-500 hover:text-red-700 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add Item
        </button>
      </div>

      {/* Notes and Summary */}
      <div>
        <label htmlFor="notes" className={labelClass}>Notes</label>
        <textarea name="notes" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputClass} />
      </div>

      <div className="text-right space-y-1">
        <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
        {/* Add Tax/Discount fields and logic here if needed */}
        <p className="text-xl font-bold">Total: ${subtotal.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting || customersLoading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          {isSubmitting ? (initialInvoice ? 'Saving...' : 'Creating...') : (initialInvoice ? 'Save Changes' : 'Create Invoice')}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
