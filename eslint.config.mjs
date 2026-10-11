import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // .agents and .claude hold vendored agent skills (third-party code, kept unmodified).
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".agents/**", ".claude/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Logos/signatures are user-supplied data URLs; next/image adds nothing there.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
