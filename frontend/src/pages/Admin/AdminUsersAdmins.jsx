/* this screen is for promoting or demoting admin teammates */
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchAllAdmins, updateAdminRole } from '../../api/admin'
import './Admin.css'

const AdminUsersAdmins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [roleSelection, setRoleSelection] = useState('Moderator')

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        setLoading(true)
        const response = await fetchAllAdmins()
        setAdmins(response?.data || [])
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load admins')
        setAdmins([])
      } finally {
        setLoading(false)
      }
    }
    loadAdmins()
  }, [])

  /* open editing panel with selected data */
  const openEditor = (admin) => {
    setEditingAdmin(admin)
    setRoleSelection(admin.role || 'Moderator')
  }

  /* apply role update and close drawer */
  const handleSave = async () => {
    if (!editingAdmin) return
    try {
      await updateAdminRole(editingAdmin._id || editingAdmin.id, roleSelection)
      // Refresh admins list
      const response = await fetchAllAdmins()
      setAdmins(response?.data || [])
      setEditingAdmin(null)
      alert('Admin role updated successfully')
    } catch (err) {
      alert('Failed to update admin role: ' + (err.message || 'Unknown error'))
    }
  }

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="users-section">
          <h2>Admin Team</h2>
          {loading && <div className="content-placeholder">Loading admins...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* list of all admin accounts */}
          <div className="users-grid">
            {!loading && !error && admins.length === 0 && (
              <div className="content-placeholder">No admins found.</div>
            )}
            {admins.map((admin) => (
              <article key={admin._id || admin.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="user-info">
                  <h4>{admin.name || 'Unnamed Admin'}</h4>
                  <p>{admin.email || 'No email'}</p>
                  <p>Role: {admin.role || 'Moderator'}</p>

                  {/* extra metadata */}
                  <span className="status-badge activated">
                    Created: {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
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
            <p>{editingAdmin.name || 'Unnamed Admin'}</p>
            <p>Email: {editingAdmin.email || 'N/A'}</p>
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
