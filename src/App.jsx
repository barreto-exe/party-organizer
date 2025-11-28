import { useState, useEffect } from 'react'
import { ref, onValue, push, set, update } from "firebase/database";
import { database } from './firebase';
import './App.css'
import GuestList from './components/GuestList'
import GroupManager from './components/GroupManager'
import Dashboard from './components/Dashboard'
import PartyWelcome from './components/PartyWelcome'

function App() {
  const [partyId, setPartyId] = useState(() => localStorage.getItem('currentPartyId') || null);
  const [guests, setGuests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    if (!partyId) {
      // Reset state when no party is selected
      // We can skip this if we ensure partyId is null on mount
      return;
    }

    localStorage.setItem('currentPartyId', partyId);

    const guestsRef = ref(database, `parties/${partyId}/guests`);
    const groupsRef = ref(database, `parties/${partyId}/groups`);

    const unsubscribeGuests = onValue(guestsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedGuests = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setGuests(loadedGuests);
    });

    const unsubscribeGroups = onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedGroups = data ? Object.entries(data).map(([id, val]) => ({ 
        id, 
        ...val,
        memberIds: val.memberIds || [] 
      })) : [];
      setGroups(loadedGroups);
    });

    return () => {
      unsubscribeGuests();
      unsubscribeGroups();
    };
  }, [partyId]);

  const generatePartyCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateParty = () => {
    const newCode = generatePartyCode();
    setPartyId(newCode);
  };

  const handleJoinParty = (code) => {
    setPartyId(code);
  };

  const handleLeaveParty = () => {
    setPartyId(null);
    localStorage.removeItem('currentPartyId');
  };

  const addGuest = (name) => {
    if (!partyId) return;
    const guestsRef = ref(database, `parties/${partyId}/guests`);
    const newGuestRef = push(guestsRef);
    set(newGuestRef, {
      name,
      arrived: false
    });
  }

  const addGuests = (names) => {
    if (!partyId) return;
    const guestsRef = ref(database, `parties/${partyId}/guests`);
    const updates = {};
    names.forEach(name => {
      const newGuestKey = push(guestsRef).key;
      updates[newGuestKey] = { name, arrived: false };
    });
    update(guestsRef, updates);
  }

  const addGroup = (name, initialMemberIds = []) => {
    if (!partyId) return;
    const groupsRef = ref(database, `parties/${partyId}/groups`);
    const newGroupRef = push(groupsRef);
    set(newGroupRef, {
      name,
      memberIds: initialMemberIds,
      photoTaken: false
    });
  }

  const addGuestToGroup = (groupId, guestId) => {
    if (!partyId) return;
    const group = groups.find(g => g.id === groupId);
    if (group && !group.memberIds.includes(guestId)) {
      const groupRef = ref(database, `parties/${partyId}/groups/${groupId}`);
      update(groupRef, {
        memberIds: [...group.memberIds, guestId]
      });
    }
  }

  const toggleGuestArrival = (guestId) => {
    if (!partyId) return;
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      const guestRef = ref(database, `parties/${partyId}/guests/${guestId}`);
      update(guestRef, {
        arrived: !guest.arrived
      });
    }
  }

  const toggleGroupPhoto = (groupId) => {
    if (!partyId) return;
    const group = groups.find(g => g.id === groupId);
    if (group) {
      const groupRef = ref(database, `parties/${partyId}/groups/${groupId}`);
      update(groupRef, {
        photoTaken: !group.photoTaken
      });
    }
  }

  if (!partyId) {
    return (
      <div className="min-vh-100 d-flex flex-column bg-light">
        <div className="container py-4 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <h1 className="text-center mb-4 display-5 fw-bold text-primary">Organizador de Fotos</h1>
          <PartyWelcome onJoinParty={handleJoinParty} onCreateParty={handleCreateParty} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="container-lg py-4 flex-grow-1 d-flex flex-column align-items-center">
        <div className="w-100" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6 fw-bold text-primary m-0">Fiesta: {partyId}</h1>
          <button onClick={handleLeaveParty} className="btn btn-outline-danger btn-sm">Salir</button>
        </div>
        
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
