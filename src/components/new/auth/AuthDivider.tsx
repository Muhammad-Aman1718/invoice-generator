import React from "react";

interface AuthDividerProps {
  text?: string; // Optional prop for custom text
}

const AuthDivider: React.FC<AuthDividerProps> = ({ text }) => {
  return (
    <div className="relative flex items-center gap-3">
      <div className="flex-1 border-t  border-[#191970]/10" />
      <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/80">
        {text || "OR EMAIL"}
      </span>
      <div className="flex-1 border-t   border-[#191970]/10 " />
    </div>
  );
};

export default AuthDivider;
