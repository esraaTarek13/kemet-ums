import AdminStats from "./AdminStats";
import AdminsTable from "./admin-table/AdminsTable";
import AddAdminModal from "./add-admin/AddAdminModal";

export default function AdminSection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title">Admin Management</h3>
        <AddAdminModal />
      </div>

      <AdminStats />

      <AdminsTable />
    </>
  );
}
