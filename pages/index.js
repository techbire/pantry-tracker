import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import ShoppingList from '../components/ShoppingList';
import ExpirationAlerts from '../components/ExpirationAlerts';
import BarcodeScanner from '../components/BarcodeScanner';

export default function Home() {
  const handleBarcodeDetected = (code) => {
    console.log('Detected barcode:', code);
    // Implement functionality to add item using the detected barcode
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pantry Tracker</title>
        <meta name="description" content="Track your pantry items and manage expiration dates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pantry Tracker</h1>

        <section>
          <h2>Manage Your Pantry</h2>
          <PantryForm />
          <PantryList />
        </section>

        <section>
          <h2>Expiration Alerts</h2>
          <ExpirationAlerts />
        </section>

        <section>
          <h2>Shopping List</h2>
          <ShoppingList />
        </section>

        <section>
          <h2>Barcode Scanner</h2>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src="/vercel.svg" alt="Vercel Logo" />
          </span>
        </a>
      </footer>
    </div>
  );
}
