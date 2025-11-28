import React, { useState } from 'react';

function GuestList({ guests, addGuest, addGuests }) {
  const [name, setName] = useState('');
  const [batchNames, setBatchNames] = useState('');

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
            <li key={guest.id} className="list-group-item">{guest.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;
