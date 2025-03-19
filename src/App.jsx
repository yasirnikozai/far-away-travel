import { useState } from "react";
import { Logo } from "./Logo";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItem(item) {
    setItems((items) => [...items, item]); // item should be an object
  }

  function handleRemove(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clear() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleItem={handleItem} />
      <PackingList
        items={items}
        clear={clear}
        onRemove={handleRemove}
        handleToggle={handleToggle}
      />
      <Stats items={items} />
    </div>
  );
}

function Form({ handleItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    handleItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for the trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemove, handleToggle, clear }) {
  const [sortby, setSortBy] = useState("input");

  let sortedItems; // Create a copy to avoid mutating state
  if (sortby === "input") sortedItems = items;

  if (sortby === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortby === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemove={onRemove}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={clear}>Clear All</button>
      </div>
    </div>
  );
}

function Item({ item, onRemove, handleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        <button onClick={() => onRemove(item.id)}>&times;</button>
      </span>
    </li>
  );
}
