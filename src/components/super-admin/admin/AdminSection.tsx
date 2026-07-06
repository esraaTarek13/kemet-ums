import { FiPlus } from "react-icons/fi";
import AdminStats from "./AdminStats";
import AdminsTable from "./admin-table/AdminsTable";

export default function AdminSection() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="title">Admin Management</h3>
        <button
          type="button"
          className="btn btn-dark flex items-center gap-2 py-2"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" />
          <span className="text-sm md:text-base">Create New Admin</span>
        </button>
      </div>

      <AdminStats />

      <AdminsTable />
    </>
  );
}
