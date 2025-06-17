"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addNewInvoice,
  updateInvoice,
  setCurrentInvoice,
  fetchInvoices, // To ensure invoices are loaded initially if not already
} from '@/store/features/invoices/invoicesSlice';
import { fetchCustomers } from '@/store/features/customers/customersSlice';
import InvoiceList from '@/app/components/invoices/InvoiceList';
import InvoiceForm from '@/app/components/invoices/InvoiceForm';
import Modal from '@/app/components/common/Modal';
import { InvoiceWithRelations, CreateInvoiceDto, UpdateInvoiceDto } from '@/store/features/invoices/invoicesSlice';

const InvoicesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentInvoice, loading: isSubmittingInvoice } = useAppSelector((state) => state.invoices);
  const { customers } = useAppSelector((state) => state.customers);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchInvoices()); // Load invoices for the list
    if (customers.length === 0) {
      dispatch(fetchCustomers()); // Load customers for the form dropdown
    }
  }, [dispatch, customers.length]);

  const handleOpenModalForCreate = () => {
    dispatch(setCurrentInvoice(null));
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (invoice: InvoiceWithRelations) => {
    dispatch(setCurrentInvoice(invoice));
    setIsModalOpen(true);
  };

  const handleViewInvoiceDetails = (invoice: InvoiceWithRelations) => {
    // For now, this will also open the modal, but could navigate to a dedicated page
    // e.g., router.push(`/invoices/${invoice.id}`);
    dispatch(setCurrentInvoice(invoice));
    // For a read-only view, you might have a different modal or page
    // Or the form could be made read-only based on a prop.
    // For this task, we'll just re-use the edit modal.
    setIsModalOpen(true);
    console.log("Viewing invoice (currently opens edit modal):", invoice.id);
  };


  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(setCurrentInvoice(null));
  }, [dispatch]);

  const handleSubmitForm = useCallback(
    async (invoiceData: CreateInvoiceDto | UpdateInvoiceDto) => {
      try {
        if ('id' in invoiceData && invoiceData.id) { // Type guard for UpdateInvoiceDto
          await dispatch(updateInvoice(invoiceData as UpdateInvoiceDto)).unwrap();
        } else {
          await dispatch(addNewInvoice(invoiceData as CreateInvoiceDto)).unwrap();
        }
        handleCloseModal();
      } catch (error) {
        console.error("Failed to save invoice:", error);
        // Error should be handled in slice and potentially shown in form or via toast
        // Modal remains open for user to correct or retry
      }
    },
    [dispatch, handleCloseModal]
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Invoices
        </h1>
        <button
          onClick={handleOpenModalForCreate}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
        >
          Create New Invoice
        </button>
      </div>

      <InvoiceList
        onEditInvoice={handleOpenModalForEdit}
        onViewInvoice={handleViewInvoiceDetails}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={currentInvoice ? 'Edit Invoice' : 'Create New Invoice'}
        >
          <InvoiceForm
            initialInvoice={currentInvoice}
            onSubmitForm={handleSubmitForm}
            onCancel={handleCloseModal}
            isSubmitting={isSubmittingInvoice}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoicesPage;
