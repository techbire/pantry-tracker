import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const ExpirationAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [warningAlerts, setWarningAlerts] = useState([]);

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    // Create query for expired items
    const expiredQuery = query(
      collection(db, "pantryItems"),
      where("expirationDate", "<=", today.toISOString().split("T")[0])
    );

    // Create query for items about to expire
    const warningQuery = query(
      collection(db, "pantryItems"),
      where("expirationDate", "<=", nextWeek.toISOString().split("T")[0]),
      where("expirationDate", ">", today.toISOString().split("T")[0])
    );

    // Real-time listener for expired items
    const unsubscribeExpired = onSnapshot(expiredQuery, (snapshot) => {
      const expiredItems = [];
      snapshot.forEach((doc) => {
        expiredItems.push(doc.data());
      });
      setAlerts(expiredItems);
    });

    // Real-time listener for items about to expire
    const unsubscribeWarning = onSnapshot(warningQuery, (snapshot) => {
      const warningItems = [];
      snapshot.forEach((doc) => {
        warningItems.push(doc.data());
      });
      setWarningAlerts(warningItems);
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeExpired();
      unsubscribeWarning();
    };
  }, []);

  // Function to format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <h2>Expiration Alerts</h2>
      {alerts.length > 0 && (
        <div>
          <h3>Expired Items:</h3>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                {alert.item} has expired.
              </li>
            ))}
          </ul>
        </div>
      )}
      {warningAlerts.length > 0 && (
        <div>
          <h3>Items About to Expire:</h3>
          <ul>
            {warningAlerts.map((alert, index) => (
              <li key={index}>
                {alert.item} is about to expire on {formatDate(alert.expirationDate)}.
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpirationAlerts;
