import List from "../../components/misc/List.jsx";
import AsyncData from "../../components/AsyncData.jsx";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth.js";
import { getAll, deleteById, updateAdmin } from "../../api/index.js";
import Loader from "../../components/Loader.jsx";

export default function UsersDashboard() {
  const { user: currentUser, ready } = useAuth();
  const { data, loading, error } = useSWR("users", getAll);
  const users = data?.users || [];
  console.log(users);

  const USERS_API_URL = "users";

  if (!ready) {
    return <Loader />;
  }

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
        actions={(user) => {
          console.log("Actions for user:", user.name);
          console.log("id for user: ", user.id);
          console.log("Current user:", currentUser?.name);
          console.log("Current user id: ", currentUser?.id);
          return [
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
              onClick={() => deleteById(USERS_API_URL, { arg: user.id })}
              className="bg-red-600 px-3 py-1 rounded-lg disabled:opacity-50"
              disabled={String(currentUser?.id) === String(user.id)}
            >
              Delete
            </button>,
          ];
        }}
      />
    </AsyncData>
  );
}
