/* this screen is for promoting or demoting admin teammates */
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminUsersAdmins = () => {
  const { adminData, updateAdminRole } = useMockData()
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [roleSelection, setRoleSelection] = useState('Moderator')

  const openEditor = (admin) => {
    setEditingAdmin(admin)
    setRoleSelection(admin.role)
  }

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
          <div className="users-grid">
            {adminData.adminUsers.map((admin) => (
              <article key={admin.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="user-info">
                  <h4>{admin.name}</h4>
                  <p>{admin.role}</p>
                  <span className="status-badge activated">
                    Last Login: {admin.lastLogin}
                  </span>
                  <button type="button" className="btn-ghost" onClick={() => openEditor(admin)}>
                    Manage Access
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {editingAdmin && (
          <section className="users-section detail-panel">
            <h2>Update Role</h2>
            <p>{editingAdmin.name}</p>
            <label>
              Role
              <select value={roleSelection} onChange={(event) => setRoleSelection(event.target.value)}>
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Auditor">Auditor</option>
              </select>
            </label>
            <div className="panel-actions">
              <button type="button" className="btn-primary-solid compact" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn-ghost compact" onClick={() => setEditingAdmin(null)}>
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
