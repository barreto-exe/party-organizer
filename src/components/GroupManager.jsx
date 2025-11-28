import React, { useState } from 'react';

function GroupManager({ 
  groups, 
  guests, 
  addGroup, 
  deleteGroup, 
  updateGroupName, 
  addGuestsToGroup, 
  removeGuestFromGroup 
}) {
  const [groupName, setGroupName] = useState('');
  
  // New state for creating group with selected guests
  const [newGroupWithMembersName, setNewGroupWithMembersName] = useState('');
  const [selectedGuestIdsForNewGroup, setSelectedGuestIdsForNewGroup] = useState([]);

  // State for batch adding to existing group
  const [selectedGroupForBatch, setSelectedGroupForBatch] = useState('');
  const [selectedGuestIdsForBatch, setSelectedGuestIdsForBatch] = useState([]);

  // State for editing group name
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    addGroup(groupName);
    setGroupName('');
  };

  const toggleGuestSelection = (guestId, setter) => {
    setter(prev => 
      prev.includes(guestId) 
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  const handleCreateGroupWithMembers = (e) => {
    e.preventDefault();
    if (!newGroupWithMembersName.trim() || selectedGuestIdsForNewGroup.length === 0) return;
    addGroup(newGroupWithMembersName, selectedGuestIdsForNewGroup);
    setNewGroupWithMembersName('');
    setSelectedGuestIdsForNewGroup([]);
  };

  const handleBatchAddToGroup = (e) => {
    e.preventDefault();
    if (!selectedGroupForBatch || selectedGuestIdsForBatch.length === 0) return;
    addGuestsToGroup(selectedGroupForBatch, selectedGuestIdsForBatch);
    setSelectedGroupForBatch('');
    setSelectedGuestIdsForBatch([]);
  };

  const startEditingGroup = (group) => {
    setEditingGroupId(group.id);
    setEditGroupName(group.name);
  };

  const saveGroupEdit = () => {
    if (editGroupName.trim()) {
      updateGroupName(editingGroupId, editGroupName);
    }
    setEditingGroupId(null);
    setEditGroupName('');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Gestión de Grupos</h2>

        <div className="row">
          {/* Create Empty Group */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">Crear Grupo Vacío</div>
              <div className="card-body">
                <form onSubmit={handleAddGroup} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Nombre del grupo"
                  />
                  <button type="submit" className="btn btn-primary">Crear</button>
                </form>
              </div>
            </div>
          </div>

          {/* Batch Add to Existing Group */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">Agregar Miembros a Grupo Existente</div>
              <div className="card-body">
                <div className="mb-2">
                  <select 
                    className="form-select mb-2" 
                    value={selectedGroupForBatch} 
                    onChange={(e) => setSelectedGroupForBatch(e.target.value)}
                  >
                    <option value="">Seleccionar Grupo</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="mb-2" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #dee2e6', padding: '5px', borderRadius: '4px' }}>
                  {guests.map(guest => (
                    <div key={`batch-${guest.id}`} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check-batch-${guest.id}`}
                        checked={selectedGuestIdsForBatch.includes(guest.id)}
                        onChange={() => toggleGuestSelection(guest.id, setSelectedGuestIdsForBatch)}
                      />
                      <label className="form-check-label" htmlFor={`check-batch-${guest.id}`}>
                        {guest.name}
                      </label>
                    </div>
                  ))}
                </div>
                <button 
                  className="btn btn-secondary w-100" 
                  onClick={handleBatchAddToGroup}
                  disabled={!selectedGroupForBatch || selectedGuestIdsForBatch.length === 0}
                >
                  Agregar Seleccionados
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Group from Selection */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <strong>Crear Nuevo Grupo desde Selección</strong>
          </div>
          <div className="card-body">
            <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #dee2e6', padding: '10px', borderRadius: '4px' }}>
              {guests.map(guest => (
                <div key={`new-${guest.id}`} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`check-new-${guest.id}`}
                    checked={selectedGuestIdsForNewGroup.includes(guest.id)}
                    onChange={() => toggleGuestSelection(guest.id, setSelectedGuestIdsForNewGroup)}
                  />
                  <label className="form-check-label" htmlFor={`check-new-${guest.id}`}>
                    {guest.name}
                  </label>
                </div>
              ))}
            </div>
            <form onSubmit={handleCreateGroupWithMembers} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={newGroupWithMembersName}
                onChange={(e) => setNewGroupWithMembersName(e.target.value)}
                placeholder="Nombre del nuevo grupo"
              />
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={selectedGuestIdsForNewGroup.length === 0 || !newGroupWithMembersName.trim()}
              >
                Crear Grupo
              </button>
            </form>
          </div>
        </div>

        <h3 className="mt-4">Grupos Existentes</h3>
        <div className="row">
          {groups.map(group => (
            <div key={group.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  {editingGroupId === group.id ? (
                    <div className="d-flex gap-1 w-100">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={editGroupName} 
                        onChange={(e) => setEditGroupName(e.target.value)}
                      />
                      <button className="btn btn-sm btn-success" onClick={saveGroupEdit}><i className="bi bi-check"></i></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditingGroupId(null)}><i className="bi bi-x"></i></button>
                    </div>
                  ) : (
                    <>
                      <span className="fw-bold text-truncate" title={group.name}>{group.name}</span>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => startEditingGroup(group)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => { if(window.confirm('¿Eliminar grupo?')) deleteGroup(group.id) }}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <ul className="list-group list-group-flush">
                  {group.memberIds.map(memberId => {
                    const member = guests.find(g => g.id === memberId);
                    return (
                      <li key={memberId} className="list-group-item d-flex justify-content-between align-items-center p-2">
                        <span className="text-truncate">{member ? member.name : 'Unknown'}</span>
                        <button 
                          className="btn btn-sm btn-link text-danger p-0" 
                          title="Remover del grupo"
                          onClick={() => removeGuestFromGroup(group.id, memberId)}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </li>
                    );
                  })}
                  {group.memberIds.length === 0 && <li className="list-group-item text-muted fst-italic">Sin miembros</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupManager;
