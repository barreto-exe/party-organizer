import React, { useState } from 'react';

function GuestList({ guests, addGuest, addGuests, deleteGuest, updateGuestName }) {
  const [name, setName] = useState('');
  const [batchNames, setBatchNames] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addGuest(name);
    setName('');
  };

  const handleBatchSubmit = (e) => {
    e.preventDefault();
    if (!batchNames.trim()) return;
    const names = batchNames.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length > 0) {
      addGuests(names);
      setBatchNames('');
    }
  };

  const startEditing = (guest) => {
    setEditingId(guest.id);
    setEditName(guest.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      updateGuestName(editingId, editName);
    }
    setEditingId(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Lista de Invitados</h2>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">Agregar Individual</div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del invitado"
                  />
                  <button type="submit" className="btn btn-primary">Agregar</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">Agregar en Lote</div>
              <div className="card-body">
                <form onSubmit={handleBatchSubmit}>
                  <textarea
                    className="form-control mb-2"
                    value={batchNames}
                    onChange={(e) => setBatchNames(e.target.value)}
                    placeholder="Nombres (uno por línea)"
                    rows="3"
                  />
                  <button type="submit" className="btn btn-secondary w-100">Agregar Lista</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-4">Invitados Registrados ({guests.length})</h3>
        <ul className="list-group mt-3">
          {guests.map((guest) => (
            <li key={guest.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingId === guest.id ? (
                <div className="d-flex gap-2 w-100">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button className="btn btn-sm btn-success" onClick={saveEdit}><i className="bi bi-check"></i></button>
                  <button className="btn btn-sm btn-secondary" onClick={cancelEdit}><i className="bi bi-x"></i></button>
                </div>
              ) : (
                <>
                  <span>{guest.name}</span>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => startEditing(guest)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => { if(window.confirm('¿Eliminar invitado?')) deleteGuest(guest.id) }}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;
