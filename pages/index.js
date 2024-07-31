import Head from "next/head";
import { useState } from "react";
import PantryForm from "../components/PantryForm";
import PantryList from "../components/PantryList";
import ExpirationAlerts from "../components/ExpirationAlerts";
import ShoppingList from "../components/ShoppingList";

export default function Home() {
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleItemAdded = () => {
    setUpdateFlag(!updateFlag); // Toggle the flag to trigger re-render
  };

  return (
    <div>
      <Head>
        <title>Pantry Tracker</title>
        <meta name="description" content="Track your pantry items with ease" />
      </Head>
      <main>
        <h1>Pantry Tracker</h1>
        <PantryForm onItemAdded={handleItemAdded} />
        <PantryList updateFlag={updateFlag} />
        <ShoppingList />
        <ExpirationAlerts />
        
        
      </main>
    </div>
  );
}
