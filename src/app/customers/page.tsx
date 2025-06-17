"use client";

import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewCustomer, updateCustomer, setCurrentCustomer } from '@/store/features/customers/customersSlice';
import CustomerList from '@/app/components/customers/CustomerList';
import CustomerForm from '@/app/components/customers/CustomerForm';
import Modal from '@/app/components/common/Modal'; // Assuming a Modal component exists
import { Customer } from '@/generated/prisma';

type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

const CustomersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentCustomer, loading: isSubmitting } = useAppSelector((state) => state.customers);

  const handleOpenModalForCreate = () => {
    dispatch(setCurrentCustomer(null)); // Clear any existing customer for new form
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (customer: Customer) => {
    dispatch(setCurrentCustomer(customer));
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(setCurrentCustomer(null)); // Clear current customer when modal closes
  }, [dispatch]);

  const handleSubmitForm = useCallback(async (customerData: CustomerFormData) => {
    try {
      if (currentCustomer) {
        // Update existing customer
        await dispatch(updateCustomer({ id: currentCustomer.id, ...customerData })).unwrap();
      } else {
        // Add new customer
        await dispatch(addNewCustomer(customerData)).unwrap();
      }
      handleCloseModal(); // Close modal on successful submission
    } catch (error) {
      // Error is handled by the slice and displayed, or you can add specific UI here
      console.error("Failed to save customer:", error);
      // Keep modal open for user to correct or retry
    }
  }, [dispatch, currentCustomer, handleCloseModal]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={handleOpenModalForCreate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150 ease-in-out"
        >
          Add New Customer
        </button>
      </div>

      <CustomerList onEditCustomer={handleOpenModalForEdit} />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentCustomer ? 'Edit Customer' : 'Add New Customer'}>
          <CustomerForm
            initialCustomer={currentCustomer}
            onSubmitForm={handleSubmitForm}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomersPage;
