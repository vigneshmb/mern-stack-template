export const ThemedLoader = () => {
  return (
    <div className="flex flex-row gap-1 bg-indigo-300/50 dark:bg-amber-300/50 w-full h-full justify-center items-center">
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce [animation-delay:-.5s]"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-amber-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};
