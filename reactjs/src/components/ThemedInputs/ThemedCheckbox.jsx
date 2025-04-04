export const ThemedCheckBox = ({
  name,
  title,
  description,
  status,
}) => {
  return (
    <div className="-my-3 flex flex-col items-start divide-y divide-gray-200 bg-amber-300">
      <label htmlFor={name} className="inline-flex items-start gap-3">
        <input
          type="checkbox"
          className="my-0.5 size-5 rounded border-gray-300 shadow-sm"
          id={name}
          checked={status}

        />
        <div>
          <span className="font-medium text-gray-700"> {title} </span>
          {description != '' ? (
            <p className="mt-0.5 text-sm text-gray-700">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
              distinctio.
            </p>
          ) : (
            ''
          )}
        </div>
      </label>
    </div>
  );
};
