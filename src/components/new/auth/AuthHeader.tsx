import { FileText } from "lucide-react";
import React from "react";

const DARK_BLUE = "#191970";
const AMBER = "#FFC107";
const MUTED_TEXT = "#475569";

interface AuthHeaderProps {
  // Add any props if needed in the future
  title?: string;
  discription?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, discription }) => {
  return (
    <header className="text-center space-y-2">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2"
        style={{ background: DARK_BLUE }}
      >
        <FileText size={24} style={{ color: AMBER }} aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-black tracking-tight text-[#191970]">
        {title}
      </h1>
      <p className="text-sm font-medium" style={{ color: MUTED_TEXT }}>
        {discription}
      </p>
    </header>
  );
};

export default AuthHeader;
