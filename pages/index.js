import { useState } from 'react';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import { Container } from '@mui/material';

export default function Home() {
  const [item, setItem] = useState({ name: '', quantity: '' });
  const [editing, setEditing] = useState(false);

  return (
    <Container>
      <h1>Pantry Tracker</h1>
      <PantryForm item={item} setItem={setItem} editing={editing} setEditing={setEditing} />
      <PantryList setItem={setItem} setEditing={setEditing} />
    </Container>
  );
}
