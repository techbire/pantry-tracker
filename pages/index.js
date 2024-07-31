import Head from "next/head";
import PantryForm from "../components/PantryForm";
import PantryList from "../components/PantryList";
import ExpirationAlerts from "../components/ExpirationAlerts";
import ShoppingList from "../components/ShoppingList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pantry Tracker</title>
        <meta name="description" content="Track your pantry items with ease" />
      </Head>
      <main>
        <h1>Pantry Tracker</h1>
        <PantryForm />
        <ExpirationAlerts />
        <ShoppingList />
        <PantryList />
      </main>
    </div>
  );
}
