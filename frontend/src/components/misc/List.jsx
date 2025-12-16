import { useState, useMemo } from "react";

export default function List({
  data,
  columns,
  actions,
  searchKeys = [],
}) {
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const filtered = useMemo(() => {
    if (!query.trim()) return data;

    return data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] || "")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    );
  }, [query, data, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortDir]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-3 bg-gray-800 rounded-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="cursor-pointer p-2 text-gray-300"
                onClick={() => toggleSort(col.key)}
              >
                {col.label}
                {sortField === col.key && (
                  <span className="ml-1 text-gray-500">
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
            {actions && <th className="p-2 text-gray-300">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {sorted.map((item) => (
            <tr key={item.id} className="bg-gray-800 rounded">
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              {actions && (
                <td className="p-2">
                  <div className="flex gap-2">{actions(item)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
