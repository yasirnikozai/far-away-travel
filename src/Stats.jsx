export function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Your packing list is empty. Start adding some items!</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((s) => s.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0; // Prevent NaN

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Everything is packed, let's go!"
          : `${numItems} items in your list, and you have already packed ${numPacked} (${percentage}%) items.`}
      </em>
    </footer>
  );
}
