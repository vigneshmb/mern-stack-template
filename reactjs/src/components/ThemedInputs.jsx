export const ThemedInput = ({
  label,
  inputName,
  inputType,
  inputId,
  inputValue,
  errorMsg = '',
  changeHandler,
  divStyle,
  labelStyle,
  iStyle,
  errorStyle = 'text-red-400',
}) => {
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={inputId}>
        {label}
      </label>
      <input
        name={inputName}
        type={inputType}
        id={inputId}
        onChange={(e) => {
          changeHandler(e.target);
        }}
        value={inputValue}
        className={iStyle}
      />
      <span className={errorStyle}>{errorMsg || ''}</span>
    </div>
  );
};

export const ThemedButton = ({ buttonLabel, buttonStyle, buttonHandler }) => {
  return (
    <button className={buttonStyle} onClick={buttonHandler}>
      {buttonLabel}
    </button>
  );
};
