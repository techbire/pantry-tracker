import { useState } from 'react';

export default function ShoppingList() {
  const [list, setList] = useState([]);

  const addItem = (item) => {
    setList([...list, item]);
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Add input and button to manually add items to the list */}
    </div>
  );
}
