import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getAlltasks } from '#Api/tasksApi.js';
import { ThemedInput } from '#Components/ThemedInputs/ThemedInputs.jsx';
import { ThemedCheckBox } from '#Components/ThemedInputs/ThemedCheckbox.jsx';

export default function Boards() {
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    getAlltasks().then((resp) => setBoardData(resp.data || [{}]));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 m-2">
      {boardData && boardData.length > 0 ? (
        <>
          {boardData.map((board, index) => {
            return <BoardItem1 board={board} key={board._id} index={index} />;
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
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

const BoardItem1 = ({ board, index }) => {
  const { title, isChecked, description } = board;
  const name = `checkbox${index}`;

  return (
    <>
      <ThemedCheckBox name={name} title={title} description={description} />
    </>
  );
};