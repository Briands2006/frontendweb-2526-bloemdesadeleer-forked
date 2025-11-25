import List from "../../components/misc/List.jsx";
import AsyncData from "../../components/AsyncData.jsx";
import useSWR from "swr";
import { getAll, deleteById, updateAdmin } from "../../api/index.js";

export default function UsersDashboard() {
  const { data, loading, error } = useSWR("users", getAll);
  const users = data?.users || [];
  console.log(users);

  return (
    <AsyncData isLoading={loading} error={error}>
      <List
        data={users}
        searchKeys={["name", "email"]}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "isAdmin",
            label: "Admin",
            render: (u) => (u.isAdmin ? "Yes" : "No"),
          },
        ]}
        actions={(user) => [
          <select
            key={"role-select"}
            className="bg-gray-700 p-2 rounded-lg"
            value={user.isAdmin ? "true" : "false"}
            onChange={(e) => updateAdmin(user.id, e.target.value === "true")}
          >
            <option value="false">User</option>
            <option value="true">Admin</option>
          </select>,

          <button
            key={"delete-btn"}
            onClick={() => deleteById(user.id)}
            className="bg-red-600 px-3 py-1 rounded-lg"
          >
            Delete
          </button>,
        ]}
      />
    </AsyncData>
  );
}
