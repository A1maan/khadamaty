/* this screen is for promoting or demoting admin teammates */
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminUsersAdmins = () => {
  /* load current admins + function to change roles */
  const { adminData, updateAdminRole } = useMockData()

  /* tracks which admin is being edited */
  const [editingAdmin, setEditingAdmin] = useState(null)

  /* the role currently selected in the editor panel */
  const [roleSelection, setRoleSelection] = useState('Moderator')

  /* open editing panel with selected data */
  const openEditor = (admin) => {
    setEditingAdmin(admin)
    setRoleSelection(admin.role)
  }

  /* apply role update and close drawer */
  const handleSave = () => {
    if (!editingAdmin) return
    updateAdminRole(editingAdmin.id, roleSelection)
    setEditingAdmin(null)
  }

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="users-section">
          <h2>Admin Team</h2>

          {/* list of all admin accounts */}
          <div className="users-grid">
            {adminData.adminUsers.map((admin) => (
              <article key={admin.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="user-info">
                  <h4>{admin.name}</h4>
                  <p>{admin.role}</p>

                  {/* extra metadata */}
                  <span className="status-badge activated">
                    Last Login: {admin.lastLogin}
                  </span>

                  {/* open editor panel for this admin */}
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => openEditor(admin)}
                  >
                    Manage Access
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* slide-out panel for updating an admin's role */}
        {editingAdmin && (
          <section className="users-section detail-panel">
            <h2>Update Role</h2>
            <p>{editingAdmin.name}</p>
            <label>
              Role
              {/* select new role for the admin */}
              <select
                value={roleSelection}
                onChange={(event) => setRoleSelection(event.target.value)}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Auditor">Auditor</option>
              </select>
            </label>

            <div className="panel-actions">
              {/* apply changes */}
              <button
                type="button"
                className="btn-primary-solid compact"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => setEditingAdmin(null)}
              >
                Cancel
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AdminUsersAdmins
