export default function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 bg-black rounded-lg ${color}`}>{icon}</div>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
}