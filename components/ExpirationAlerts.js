import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ExpirationAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchExpiredItems = async () => {
      const q = query(
        collection(db, "pantryItems"),
        where("expirationDate", "<=", new Date().toISOString().split("T")[0])
      );
      const querySnapshot = await getDocs(q);
      const expiredItems = [];
      querySnapshot.forEach((doc) => {
        expiredItems.push(doc.data());
      });
      setAlerts(expiredItems);
    };

    fetchExpiredItems();
  }, []);

  return (
    <div>
      <h2>Expiration Alerts</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              {alert.item} has expired or is about to expire on {alert.expirationDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items are about to expire.</p>
      )}
    </div>
  );
};

export default ExpirationAlerts;
