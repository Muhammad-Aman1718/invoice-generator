// @/lib/toast.ts
import { toast } from "sonner";

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description: description,
      duration: 3000,
    });
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description: description,
      duration: 6000,
    });
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description: description,
      duration: 3000,
    });
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description: description,
      duration: 3000,
    });
  },

  // Loading toast jo bad mein update ho sake
  loading: (message: string) => {
    return toast.loading(message);
  },

  dismiss: (id?: string | number) => {
    toast.dismiss(id);
  },
};
