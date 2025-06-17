"use client";

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'; // Assuming hooks are aliased like this
import { fetchCustomers, deleteCustomer } from '@/store/features/customers/customersSlice';
import { Customer } from '@/generated/prisma';

interface CustomerListProps {
  onEditCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onEditCustomer }) => {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(id));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading customers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (customers.length === 0) {
    return <p className="text-center text-gray-500">No customers found. Add one!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{customer.name}</td>
              <td className="py-3 px-4">{customer.email}</td>
              <td className="py-3 px-4">{customer.phone || 'N/A'}</td>
              <td className="py-3 px-4">{customer.address || 'N/A'}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onEditCustomer(customer)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
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

export default CustomerList;
