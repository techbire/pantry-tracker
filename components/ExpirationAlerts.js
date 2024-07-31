import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';

export default function ExpirationAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const q = query(collection(db, 'pantry'), where('expirationDate', '<=', today));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAlerts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h2>Expiration Alerts</h2>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <p>{alert.name} is expiring on {alert.expirationDate}</p>
        </div>
      ))}
    </div>
  );
}

