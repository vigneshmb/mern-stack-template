import { useState } from 'react';

import {
  createTask,
  getAlltasks,
  updateTaskStatusByID,
} from '#Api/tasksApi.js';
import { ThemedCheckBox } from '#Components/ThemedInputs/ThemedCheckbox.jsx';
import { ThemedInput } from '#Components/ThemedInputs/ThemedInputs.jsx';
import { useTaskContext } from '#Contexts/TaskContext.jsx';
import useBooleanToggle from '#Hooks/useBooleanToggle.jsx';
import useEffectOnlyMount from '#Hooks/useEffectOnlyMount.jsx';
import { getObjEmptyValues, updateArrOfObjByKey } from '#Utils/arrayObjectUtils.js';
import toast from 'react-hot-toast';

export default function Boards() {
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
                <BoardItem1
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

const BoardItem = ({ board, index }) => {
  const { title, isChecked, description } = board;
  const name = `checkbox${index}`;

  return (
    <>
      <div className="flex flex-col items-stretch gap-4 bg-indigo-400 dark:bg-amber-100 rounded-2xl p-2">
        <h3 className="text-lg/tight font-medium text-gray-900">
          {title || 'come here'}
        </h3>

        <p className="mt-0.5 text-gray-700">
          {description ||
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio nesciunt quas non animi.'}
        </p>
      </div>

      <ThemedCheckBox name={name} title={title} description={description} />
    </>
  );
};

const BoardItem1 = ({ board, index, reloadTasks }) => {
  const { title, isCompleted, description, _id } = board;
  const name = `checkbox${index}`;
  const [statusLoader, setStatusLoader] = useBooleanToggle(false);

  const updateStatus = async (name, value) => {
    setStatusLoader.on();
    await updateTaskStatusByID(name, { isCompleted: value }).then((resp) => {
      const { data, msg, error, status } = resp;
      if (error) {
        toast.error(msg || 'Please try later');
      } else if (status == 200 || data) {
        toast.success(msg);
        reloadTasks(data);
        setStatusLoader.off();
      }
    });
    setStatusLoader.off();
  };

  const handleChange = ({ name, checked }) => {
    console.log(name, checked);
    updateStatus(name, checked);
  };

  return (
    <div className="my-2 flex flex-col items-start divide-y divide-gray-200 bg-indigo-300 dark:bg-amber-300 rounded border-2 p-1">
      <label htmlFor={name} className="inline-flex items-start gap-3">
        <input
          type="checkbox"
          className="my-0.5 size-5 rounded border-gray-300 shadow-sm"
          id={name}
          name={_id}
          checked={isCompleted}
          onChange={(e) => {
            handleChange(e.target);
          }}
          disabled={statusLoader}
        />
        <div>
          <span
            className={`font-medium text-gray-700 ${isCompleted && 'line-through'}`}
          >
            {' '}
            {title}{' '}
          </span>
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

const CreateTask = ({ reloadTasks }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
  });

  const [addTaskLoader, setAddTaskLoader] = useBooleanToggle(false);

  const handleValidation = (fieldName, fieldvalue) => {
    let errorMsg = '';
    if (fieldName === 'title' && fieldvalue === '') {
      errorMsg = 'Please enter data';
    }

    setFormErrors((prevErrors) => {
      return {
        ...prevErrors,
        [fieldName]: errorMsg,
      };
    });
  };
  const handleChange = ({ name, value }) => {
    handleValidation(name, value);
    setTaskData((prev) => {
      let newData = {
        ...prev,
        [name]: value,
      };

      return newData;
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    Object.keys(taskData).map((name) => handleValidation(name, taskData[name]));
    const noErrors = formErrors?.title == '';
    if (!noErrors) {
      toast.error('Please enter data');
      return null;
    }
    const apiData = getObjEmptyValues(taskData, 1);
    console.log(apiData);

    setAddTaskLoader.on();
    await createTask({
      ...apiData,
    })
      .then((resp) => {
        const { status, msg } = resp;
        if (status === 201) {
          toast.success(`${resp.msg}`);
          setAddTaskLoader.off();
          reloadTasks();
        } else {
          toast.error(msg);
          setAddTaskLoader.off();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err}`);
        setAddTaskLoader.off();
      });
  };

  const { title, description } = taskData;
  const { title: titleError, description: descriptionError } = formErrors;

  const iStyle =
    'rounded p-1 ring-2 ring-indigo-300 dark:ring-amber-200 focus:border-indigo-500 focus:bg-indigo-200 dark:border-amber-300 dark:focus:border-amber-500 dark:focus:bg-slate-700';
  return (
    <div className=" bg-slate-600 rounded-md">
      <div className="bg-slate-700">
        <h1 className="text-3xl p-2 font-extrabold dark:text-amber-200 text-zinc-100 text-center">
          Create New Task
        </h1>
      </div>
      <div className="flex flex-col items-stretch justify-around">
        <ThemedInput
          label={'Title'}
          inputName={'title'}
          inputType={'title'}
          inputId={'title'}
          inputValue={title}
          errorMsg={titleError || ''}
          changeHandler={handleChange}
          divStyle={'flex flex-col mx-3 my-1 p-1'}
          labelStyle={'font-bold my-1'}
          iStyle={iStyle}
        />

        <ThemedInput
          label={'Description'}
          inputName={'description'}
          inputType={'description'}
          inputId={'description'}
          inputValue={description}
          errorMsg={descriptionError || ''}
          changeHandler={handleChange}
          divStyle={'flex flex-col mx-3 my-1 p-1'}
          labelStyle={'font-bold my-1'}
          iStyle={iStyle}
          multiLine
        />
        <div className="flex justify-center items-center mx-2 my-3 p-1">
          <button
            name="login"
            type="submit"
            className={`
              bg-indigo-600 text-zinc-100 dark:bg-amber-400 dark:text-slate-800
              hover:bg-indigo-700
              hover:text-zinc-100
              dark:hover:bg-amber-400
              dark:hover:text-slate-800
              rounded p-2 m-1 hover:scale-105 duration-200 ease-in-out`}
            onClick={handleAddTask}
            disabled={addTaskLoader}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
