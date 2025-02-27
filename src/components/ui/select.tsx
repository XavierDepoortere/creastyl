// Définir une interface pour le type d'option
interface OptionType {
  value: string;
  label: string;
}

// Modifier le composant Select pour utiliser cette interface
export function Select({ options }: { options: OptionType[] }) {
  return (
    <select>
      {options.map((option: OptionType) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
