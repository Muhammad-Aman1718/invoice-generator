import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { Invoice, Customer, InvoiceItem, InvoiceStatus } from '@/generated/prisma';

// Define a type that includes relations for an Invoice
export interface InvoiceWithRelations extends Invoice {
  customer: Customer;
  items: InvoiceItem[];
}

// Define types for thunk arguments where needed
// For creating an invoice, we don't need the full InvoiceWithRelations
// We need customerId, items, and other invoice fields.
export type CreateInvoiceDto = Omit<Invoice, 'id' | 'createdAt' | 'updatedAt' | 'totalAmount' | 'customer' | 'items' | 'userId'> & {
  customerId: string;
  userId?: string; // Optional
  items: Omit<InvoiceItem, 'id' | 'invoiceId' | 'total'>[]; // Items don't have id or invoiceId when creating
};

// For updating an invoice
export type UpdateInvoiceDto = Partial<Omit<Invoice, 'createdAt' | 'updatedAt' | 'customer' | 'items' | 'userId'>> & {
  id: string; // ID is required for update
  customerId?: string;
  userId?: string;
  items?: Omit<InvoiceItem, 'invoiceId' | 'total'>[]; // Items might have id if they are existing, or not if new
};


// Define the state interface
interface InvoiceState {
  invoices: InvoiceWithRelations[];
  currentInvoice: InvoiceWithRelations | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
  loading: false,
  error: null,
};

// Async Thunks

// Fetch all invoices
export const fetchInvoices = createAsyncThunk<InvoiceWithRelations[], void, { rejectValue: string }>(
  'invoices/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<InvoiceWithRelations[]>('/api/invoices');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch invoices');
    }
  }
);

// Fetch invoice by ID
export const fetchInvoiceById = createAsyncThunk<InvoiceWithRelations, string, { rejectValue: string }>(
  'invoices/fetchInvoiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<InvoiceWithRelations>(`/api/invoices/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch invoice');
    }
  }
);

// Add new invoice
export const addNewInvoice = createAsyncThunk<InvoiceWithRelations, CreateInvoiceDto, { rejectValue: string }>(
  'invoices/addNewInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<InvoiceWithRelations>('/api/invoices', invoiceData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to add invoice');
    }
  }
);

// Update invoice
export const updateInvoice = createAsyncThunk<InvoiceWithRelations, UpdateInvoiceDto, { rejectValue: string }>(
  'invoices/updateInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const { id, ...data } = invoiceData;
      const response = await axiosInstance.put<InvoiceWithRelations>(`/api/invoices/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to update invoice');
    }
  }
);

// Delete invoice
export const deleteInvoice = createAsyncThunk<string, string, { rejectValue: string }>(
  'invoices/deleteInvoice',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/invoices/${id}`);
      return id; // Return the id of the deleted invoice
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to delete invoice');
    }
  }
);

// Create the slice
const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setCurrentInvoice: (state, action: PayloadAction<InvoiceWithRelations | null>) => {
      state.currentInvoice = action.payload;
    },
    clearInvoiceError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchInvoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<InvoiceWithRelations[]>) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch invoices';
      })
      // fetchInvoiceById
      .addCase(fetchInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action: PayloadAction<InvoiceWithRelations>) => {
        state.loading = false;
        state.currentInvoice = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch invoice by ID';
      })
      // addNewInvoice
      .addCase(addNewInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewInvoice.fulfilled, (state, action: PayloadAction<InvoiceWithRelations>) => {
        state.loading = false;
        state.invoices.unshift(action.payload); // Add to the beginning of the list
        state.currentInvoice = action.payload;
      })
      .addCase(addNewInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to add new invoice';
      })
      // updateInvoice
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action: PayloadAction<InvoiceWithRelations>) => {
        state.loading = false;
        state.invoices = state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        );
        if (state.currentInvoice?.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update invoice';
      })
      // deleteInvoice
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
        if (state.currentInvoice?.id === action.payload) {
          state.currentInvoice = null;
        }
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete invoice';
      });
  },
});

export const { setCurrentInvoice, clearInvoiceError } = invoicesSlice.actions;
export default invoicesSlice.reducer;
