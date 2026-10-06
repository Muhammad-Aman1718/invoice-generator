import { METHOD_BADGE_STYLES } from "@/src/constant/apiDocs";
import type { ApiEndpointCardProps } from "@/src/types/types";

export default function ApiEndpointCard({ endpoint }: ApiEndpointCardProps) {
  return (
    <li className="panel p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-lg px-2 py-0.5 font-mono text-[11px] font-bold ${METHOD_BADGE_STYLES[endpoint.method]}`}
        >
          {endpoint.method}
        </span>
        <code className="break-all font-mono text-sm font-bold text-navy">{endpoint.path}</code>
      </div>
      <p className="text-sm text-navy-500">{endpoint.desc}</p>
      {endpoint.body && (
        <pre className="custom-scrollbar mt-3 overflow-x-auto rounded-xl bg-navy p-4 text-xs leading-relaxed text-navy-100">
          {endpoint.body}
        </pre>
      )}
    </li>
  );
}
