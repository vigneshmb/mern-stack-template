export const ThemedCheckBox = ({ name, title, status }) => {
  return (
    <label htmlFor={name} className="inline-flex items-start gap-3">
      <input
        type="checkbox"
        className="my-0.5 size-5 rounded border-gray-300 shadow-sm"
        id={name}
        checked={status}
      />
      {title}
    </label>
  );
};
