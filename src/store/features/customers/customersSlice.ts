import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance'; // Assuming this path is correct
import { Customer } from '@/generated/prisma'; // Assuming this path is correct

// Define the interface for a single customer (if not already globally defined)
// Re-using Prisma's Customer type directly is often a good practice.

// Define the state interface
interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null,
};

// Async Thunks

// Fetch all customers
export const fetchCustomers = createAsyncThunk<Customer[], void, { rejectValue: string }>(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Customer[]>('/api/customers');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch customers');
    }
  }
);

// Fetch customer by ID
export const fetchCustomerById = createAsyncThunk<Customer, string, { rejectValue: string }>(
  'customers/fetchCustomerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Customer>(`/api/customers/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch customer');
    }
  }
);

// Add new customer
export const addNewCustomer = createAsyncThunk<Customer, Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>, { rejectValue: string }>(
  'customers/addNewCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Customer>('/api/customers', customerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to add customer');
    }
  }
);

// Update customer
export const updateCustomer = createAsyncThunk<Customer, Partial<Customer> & { id: string }, { rejectValue: string }>(
  'customers/updateCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const { id, ...data } = customerData;
      const response = await axiosInstance.put<Customer>(`/api/customers/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to update customer');
    }
  }
);

// Delete customer
export const deleteCustomer = createAsyncThunk<string, string, { rejectValue: string }>(
  'customers/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/customers/${id}`);
      return id; // Return the id of the deleted customer
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || 'Failed to delete customer');
    }
  }
);

// Create the slice
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Synchronous reducers can be added here if needed
    setCurrentCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.currentCustomer = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchCustomers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch customers';
      })
      // fetchCustomerById
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentCustomer = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.currentCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch customer by ID';
      })
      // addNewCustomer
      .addCase(addNewCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customers.push(action.payload);
        state.currentCustomer = action.payload; // Optionally set current customer
      })
      .addCase(addNewCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to add new customer';
      })
      // updateCustomer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customers = state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        );
        if (state.currentCustomer?.id === action.payload.id) {
          state.currentCustomer = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update customer';
      })
      // deleteCustomer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        if (state.currentCustomer?.id === action.payload) {
          state.currentCustomer = null;
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete customer';
      });
  },
});

export const { setCurrentCustomer, clearError } = customersSlice.actions;
export default customersSlice.reducer;
