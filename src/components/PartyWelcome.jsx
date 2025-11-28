import React, { useState } from 'react';

function PartyWelcome({ onJoinParty, onCreateParty }) {
  const [partyCode, setPartyCode] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (partyCode.trim().length === 6) {
      onJoinParty(partyCode.trim().toUpperCase());
    } else {
      alert('El código debe tener 6 caracteres.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Bienvenido</h2>
        
        <form onSubmit={handleJoin} className="mb-4">
          <div className="mb-3">
            <label htmlFor="partyCode" className="form-label">Código de Fiesta</label>
            <input
              type="text"
              className="form-control text-uppercase text-center fs-4"
              id="partyCode"
              value={partyCode}
              onChange={(e) => setPartyCode(e.target.value)}
              placeholder="XXXXXX"
              maxLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 btn-lg">
            Unirse a Fiesta
          </button>
        </form>

        <div className="text-center border-top pt-3">
          <p className="text-muted mb-2">¿No tienes una fiesta?</p>
          <button onClick={onCreateParty} className="btn btn-outline-success w-100">
            Crear Nueva Fiesta
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartyWelcome;
