import React, { useState } from 'react';

function GroupManager({ groups, guests, addGroup, addGuestToGroup }) {
  const [groupName, setGroupName] = useState('');
  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  
  // New state for creating group with selected guests
  const [newGroupWithMembersName, setNewGroupWithMembersName] = useState('');
  const [selectedGuestIdsForNewGroup, setSelectedGuestIdsForNewGroup] = useState([]);

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    addGroup(groupName);
    setGroupName('');
  };

  const handleAddGuestToGroup = () => {
    if (selectedGroup && selectedGuest) {
      addGuestToGroup(selectedGroup, selectedGuest);
    }
  };

  const toggleGuestSelection = (guestId) => {
    setSelectedGuestIdsForNewGroup(prev => 
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

          {/* Assign Single Guest */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">Asignar Invitado a Grupo</div>
              <div className="card-body">
                <div className="d-flex flex-column gap-2">
                  <select className="form-select" onChange={(e) => setSelectedGroup(e.target.value)} value={selectedGroup}>
                    <option value="">Seleccionar Grupo</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                  <select className="form-select" onChange={(e) => setSelectedGuest(e.target.value)} value={selectedGuest}>
                    <option value="">Seleccionar Invitado</option>
                    {guests.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                  <button className="btn btn-secondary" onClick={handleAddGuestToGroup}>Asignar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Group from Selection */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <strong>Crear Grupo desde Selección</strong>
          </div>
          <div className="card-body">
            <p className="text-muted">Selecciona los invitados y crea un grupo con ellos.</p>
            <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #dee2e6', padding: '10px', borderRadius: '4px' }}>
              {guests.map(guest => (
                <div key={guest.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`check-${guest.id}`}
                    checked={selectedGuestIdsForNewGroup.includes(guest.id)}
                    onChange={() => toggleGuestSelection(guest.id)}
                  />
                  <label className="form-check-label" htmlFor={`check-${guest.id}`}>
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
                Crear Grupo con {selectedGuestIdsForNewGroup.length} Invitados
              </button>
            </form>
          </div>
        </div>

        <h3 className="mt-4">Grupos Existentes</h3>
        <div className="row">
          {groups.map(group => (
            <div key={group.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-header fw-bold">{group.name}</div>
                <ul className="list-group list-group-flush">
                  {group.memberIds.map(memberId => {
                    const member = guests.find(g => g.id === memberId);
                    return <li key={memberId} className="list-group-item">{member ? member.name : 'Unknown'}</li>
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
