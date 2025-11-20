import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-[500px] flex items-center justify-center bg-transparent">
      <Loader2 className="w-10 h-10 animate-spin text-red-600" />
    </div>
  );
}
