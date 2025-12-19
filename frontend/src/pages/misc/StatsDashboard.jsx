import useSWR from "swr";
import { useState, useEffect } from "react";
import { getAll } from "../../api/index.js";
import { 
  FaServer, FaDatabase, FaClock, 
  FaTerminal, FaCircle, FaInfoCircle, FaExclamationCircle, 
} from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StatsDashboard() {
  const navigate = useNavigate();
  const { data: health } = useSWR("health/liveness", getAll, { refreshInterval: 5000 });
  const { data: readiness } = useSWR("health/readiness", getAll, { refreshInterval: 10000 });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (health) {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        type: health.status === "UP" ? "success" : "error",
        message: `System Check: ${health.message}`,
        service: "Liveness",
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 10));
    }
  }, [health?.timestamp, health]);

  if (!health) return <Loader />;

  return (
    <div className="p-6 bg-transparent min-h-screen text-white font-sans">
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="text-red-600 hover:text-red-500 flex items-center
         mb-6 transition-colors font-bold uppercase text-xs tracking-widest cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Terug naar Admin
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          System <span className="text-red-600">Performance</span>
        </h1>
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <FaCircle 
            className={`animate-pulse ${health.status === "UP" ? "text-green-500" : "text-red-500"}`} 
            size={8} />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Live Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          label="Server Status" 
          value={health.status} 
          icon={<FaServer />} 
          color="text-green-500" 
        />
        <StatCard 
          label="Database" 
          value={readiness?.status === "UP" ? "CONNECTED" : "CONNECTING..."} 
          icon={<FaDatabase />} 
          color="text-blue-500" 
        />
        <StatCard 
          label="Uptime" 
          value={Math.floor(health.uptime / 60) + " Min"} 
          icon={<FaClock />} 
          color="text-yellow-500" 
        />
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gray-800/50 p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-red-600" />
            <span className="text-sm font-black uppercase tracking-widest">System Logbook</span>
          </div>
          <span className="text-[10px] bg-black px-2 py-1 rounded text-gray-500 font-mono">STDOUT / HTTP_TRAFFIC</span>
        </div>
        
        <div className="p-0 max-h-[400px] overflow-y-auto font-mono text-sm">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-900 text-gray-500 text-[10px] uppercase">
              <tr>
                <th className="p-3 border-b border-gray-800">Timestamp</th>
                <th className="p-3 border-b border-gray-800">Service</th>
                <th className="p-3 border-b border-gray-800">Bericht</th>
                <th className="p-3 border-b border-gray-800 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-gray-500 text-xs">{log.time}</td>
                  <td className="p-3 italic text-gray-400">{log.service}</td>
                  <td className="p-3 flex items-center gap-2">
                    {log.type === "success" ? (
                      <FaInfoCircle className="text-blue-500" />
                    ) : (
                      <FaExclamationCircle className="text-red-500" />
                    )}
                    {log.message}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold 
                        ${log.type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {log.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center
                   text-gray-600 italic">Wachten op inkomende systeem logs...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 bg-black/50 border-t border-gray-800 text-[10px] text-gray-500 flex justify-between">
          <span>Auto-refresh: 5000ms</span>
          <span>Buffer: 10 entries</span>
        </div>
      </div>
    </div>
  );
}