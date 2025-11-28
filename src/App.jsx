import { useState, useEffect } from 'react'
import './App.css'
import GuestList from './components/GuestList'
import GroupManager from './components/GroupManager'
import Dashboard from './components/Dashboard'

function App() {
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('partyGuests');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('partyGroups');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('dashboard') // 'guests', 'groups', 'dashboard'

  useEffect(() => {
    localStorage.setItem('partyGuests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('partyGroups', JSON.stringify(groups));
  }, [groups]);

  const addGuest = (name) => {
    const newGuest = {
      id: crypto.randomUUID(),
      name,
      arrived: false
    }
    setGuests([...guests, newGuest])
  }

  const addGuests = (names) => {
    const newGuests = names.map(name => ({
      id: crypto.randomUUID(),
      name,
      arrived: false
    }));
    setGuests([...guests, ...newGuests]);
  }

  const addGroup = (name, initialMemberIds = []) => {
    const newGroup = {
      id: crypto.randomUUID(),
      name,
      memberIds: initialMemberIds,
      photoTaken: false
    }
    setGroups([...groups, newGroup])
  }

  const addGuestToGroup = (groupId, guestId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        if (group.memberIds.includes(guestId)) return group;
        return { ...group, memberIds: [...group.memberIds, guestId] }
      }
      return group
    }))
  }

  const toggleGuestArrival = (guestId) => {
    setGuests(guests.map(guest => {
      if (guest.id === guestId) {
        return { ...guest, arrived: !guest.arrived }
      }
      return guest
    }))
  }

  const toggleGroupPhoto = (groupId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return { ...group, photoTaken: !group.photoTaken }
      }
      return group
    }))
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="container-lg py-4 flex-grow-1 d-flex flex-column align-items-center">
        <div className="w-100" style={{ maxWidth: '1200px' }}>
        <h1 className="text-center mb-4 display-5 fw-bold text-primary">Organizador de Fotos</h1>
        <nav className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
          <button className={`btn ${view === 'guests' ? 'btn-primary' : 'btn-outline-primary'} px-4`} onClick={() => setView('guests')}>
            <i className="bi bi-people-fill me-2"></i>Invitados
          </button>
          <button className={`btn ${view === 'groups' ? 'btn-primary' : 'btn-outline-primary'} px-4`} onClick={() => setView('groups')}>
            <i className="bi bi-collection-fill me-2"></i>Grupos
          </button>
          <button className={`btn ${view === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} px-4`} onClick={() => setView('dashboard')}>
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </button>
        </nav>

        <main className="flex-grow-1">
          {view === 'guests' && (
            <GuestList guests={guests} addGuest={addGuest} addGuests={addGuests} />
          )}
          {view === 'groups' && (
            <GroupManager 
              groups={groups} 
              guests={guests} 
              addGroup={addGroup} 
              addGuestToGroup={addGuestToGroup} 
            />
          )}
          {view === 'dashboard' && (
            <Dashboard 
              guests={guests} 
              groups={groups} 
              toggleGuestArrival={toggleGuestArrival} 
              toggleGroupPhoto={toggleGroupPhoto} 
            />
          )}
        </main>
        
        <footer className="text-center text-muted mt-5 small">
          <p>&copy; {new Date().getFullYear()} Party Organizer App</p>
        </footer>
        </div>
      </div>
    </div>
  )
}

export default App
