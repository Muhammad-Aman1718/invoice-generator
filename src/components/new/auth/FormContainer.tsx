import React from "react";

interface FormContainerProps {
  children?: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <section className="w-full max-w-md mx-auto rounded-2xl border overflow-hidden bg-white shadow-xl">
      {/* Amber top bar indicator */}
      <div className="h-1.5 w-full bg-accent " />
      <div className="p-7 sm:p-8 flex flex-col gap-6">{children}</div>
    </section>
  );
};

export default FormContainer;
