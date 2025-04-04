export const ThemedButton = ({ buttonLabel, buttonStyle, buttonHandler }) => {
    return (
      <button className={buttonStyle} onClick={buttonHandler}>
        {buttonLabel}
      </button>
    );
  };
  