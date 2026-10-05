import React from "react";

interface AuthButtonProps {
  isLoading?: boolean;
  title?: string | React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoading,
  onClick,
  title,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={onClick}
      className="w-full h-12 rounded-xl text-sm font-semibold transition-all bg-primary text-white hover:bg-[#FFC107] hover:text-[#191970] disabled:opacity-50 shadow-lg shadow-blue-900/10"
    >
      {title}
    </button>
  );
};

export default AuthButton;
