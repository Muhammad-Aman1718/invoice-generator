import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import customersReducer from './features/customers/customersSlice'; // Import customer reducer
import invoicesReducer from './features/invoices/invoicesSlice'; // Import invoice reducer

export const makeStore = () => {
  return configureStore({
    reducer: {
      customers: customersReducer,
      invoices: invoicesReducer, // Add invoice reducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
export const wrapper = createWrapper<AppStore>(makeStore);
