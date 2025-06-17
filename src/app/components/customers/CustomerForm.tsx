"use client";

import React, { useState, useEffect } from 'react';
import { Customer } from '@/generated/prisma';

// Define a type for the customer data that the form will handle.
// Exclude fields that are auto-generated or managed by the backend.
type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

interface CustomerFormProps {
  initialCustomer?: Customer | null; // Customer data for editing, null for creating
  onSubmitForm: (customerData: CustomerFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean; // To disable button during submission
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  initialCustomer,
  onSubmitForm,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (initialCustomer) {
      setFormData({
        name: initialCustomer.name,
        email: initialCustomer.email,
        phone: initialCustomer.phone || '',
        address: initialCustomer.address || '',
      });
    } else {
      // Reset form for new customer
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
  }, [initialCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email) {
      alert('Name and Email are required.'); // Replace with better UX later
      return;
    }
    onSubmitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? (initialCustomer ? 'Saving...' : 'Adding...') : (initialCustomer ? 'Save Changes' : 'Add Customer')}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
