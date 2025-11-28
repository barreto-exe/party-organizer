import React from 'react';

function Dashboard({ guests, groups, toggleGuestArrival, toggleGroupPhoto }) {
  
  const isGroupReady = (group) => {
    if (group.memberIds.length === 0) return false;
    return group.memberIds.every(memberId => {
      const guest = guests.find(g => g.id === memberId);
      return guest && guest.arrived;
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center">Dashboard de la Fiesta</h2>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h3 className="h5 mb-0">Check-in Invitados</h3>
            </div>
            <div className="card-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {guests.length === 0 ? <p className="text-muted">No hay invitados.</p> : (
                <div className="list-group">
                  {guests.map(guest => (
                    <label key={guest.id} className={`list-group-item list-group-item-action d-flex align-items-center cursor-pointer ${guest.arrived ? 'list-group-item-success' : ''}`}>
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        checked={guest.arrived}
                        onChange={() => toggleGuestArrival(guest.id)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span className={guest.arrived ? 'text-decoration-line-through' : ''}>{guest.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h3 className="h5 mb-0">Estado de los Grupos</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {groups.length === 0 ? <p className="text-muted p-3">No hay grupos creados.</p> : groups.map(group => {
                  const ready = isGroupReady(group);
                  let cardClass = 'card h-100 border-secondary';
                  let headerClass = 'card-header';
                  
                  if (group.photoTaken) {
                    cardClass = 'card h-100 border-info bg-light';
                    headerClass = 'card-header bg-info text-white';
                  } else if (ready) {
                    cardClass = 'card h-100 border-success';
                    headerClass = 'card-header bg-success text-white';
                  }

                  return (
                    <div key={group.id} className="col-md-6 col-lg-4 mb-3">
                      <div className={cardClass}>
                        <div className={headerClass}>
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="h6 mb-0">{group.name}</h4>
                            {ready && !group.photoTaken && <span className="badge bg-light text-success">¡Listo!</span>}
                            {group.photoTaken && <span className="badge bg-light text-info">Foto OK</span>}
                          </div>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled mb-3 small">
                            {group.memberIds.map(memberId => {
                              const guest = guests.find(g => g.id === memberId);
                              return (
                                <li key={memberId} className="d-flex align-items-center mb-1">
                                  <span className={`badge me-2 ${guest?.arrived ? 'bg-success' : 'bg-secondary'}`} style={{ width: '10px', height: '10px', padding: 0, borderRadius: '50%' }}> </span>
                                  <span className={guest?.arrived ? 'text-decoration-line-through text-muted' : ''}>
                                    {guest ? guest.name : 'Unknown'}
                                  </span>
                                </li>
                              );
                            })}
                            {group.memberIds.length === 0 && <li className="text-muted fst-italic">Vacío</li>}
                          </ul>
                          
                          {ready && (
                            <div className="form-check mt-2 pt-2 border-top">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`photo-${group.id}`}
                                checked={group.photoTaken}
                                onChange={() => toggleGroupPhoto(group.id)}
                              />
                              <label className="form-check-label fw-bold" htmlFor={`photo-${group.id}`}>
                                Foto Tomada
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
