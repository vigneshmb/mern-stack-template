import { getAlltasks } from '#Api/tasksApi.js';
import { getUser } from '#Api/usersApi.js';
import useBooleanToggle from '#Hooks/useBooleanToggle.jsx';
import useEffectOnlyMount from '#Hooks/useEffectOnlyMount.jsx';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const TaskContext = createContext({
  taskData: {},
  updateTaskData: () => {},
  isTaskLoading: false,
  setIsTaskLoading: () => {},
});

export const TaskProvider = ({ children }) => {
  const [isTaskLoading, setIsTaskLoading] = useBooleanToggle(false);
  const [taskData, setTaskData] = useState({});

  useEffectOnlyMount(() => {
    async function fetchTaskDetails() {
      setIsTaskLoading.on();
      await getAlltasks().then((resp) => {
        const { status, data, msg, error } = resp;
        if (error || status !== 200) {
          toast.error(msg || 'Please try later');
        }
        setIsTaskLoading.off();
        setTaskData(data);
      });
      setIsTaskLoading.off();
    }
    fetchTaskDetails();
  }, []);

  const updateTaskData = (data = {}) => {
    setIsTaskLoading.on();
    setTaskData(data);
    setIsTaskLoading.off();
  };

  const value = {
    taskData,
    updateTaskData,
    isTaskLoading,
    setIsTaskLoading,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
