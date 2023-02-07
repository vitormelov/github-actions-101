import styles from "./SuggestionsList.module.css";

export default function SuggestionsList({ suggestions, onSelect }) {
  return (
    <ul
      data-testid="results-list"
      className="border border-primary rounded-md w-96 text-lg bg-white"
    >
      {(suggestions || []).map((item) => (
        <li
          key={item.id}
          className="p-1"
          onMouseDown={() => onSelect && onSelect(item)}
        >
          <span className={styles.highlight}>{item.title || item.name}</span>
        </li>
      ))}
    </ul>
  );
}
