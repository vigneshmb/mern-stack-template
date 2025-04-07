
import {
    getAlltasks
} from '#Api/tasksApi.js';
import { useTaskContext } from '#Contexts/TaskContext.jsx';
import useEffectOnlyMount from '#Hooks/useEffectOnlyMount.jsx';
import { updateArrOfObjByKey } from '#Utils/arrayObjectUtils.js';
import { CreateTask, TaskItem } from './TaskComponents';

export default function TaskList() {
  const { isTaskLoading, setIsTaskLoading, taskData, updateTaskData } =
    useTaskContext();

  useEffectOnlyMount(() => {
    loadAlltasks();
  }, []);

  const loadAlltasks = async () => {
    setIsTaskLoading.on();
    await getAlltasks().then((resp) => updateTaskData(resp.data || [{}]));
    setIsTaskLoading.off();
  };

  const loadTaskByID = (data) => {
    console.log(data, taskData);
    const newData = updateArrOfObjByKey(taskData,"_id",data)
    updateTaskData(newData);
  };

  return (
    <div className="m-3 p-2 flex">
      <div className="w-1/2 mx-2">
        <CreateTask reloadTasks={loadAlltasks} />
      </div>
      <div className="w-2/2 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mx-2 px-2 bg-slate-600 rounded-lg">
        {!isTaskLoading && taskData && taskData.length > 0 ? (
          <>
            {taskData.map((board, index) => {
              return (
                <TaskItem
                  board={board}
                  key={board._id}
                  index={index}
                  reloadTasks={loadTaskByID}
                />
              );
            })}
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}



