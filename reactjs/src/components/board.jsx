import PropTypes from 'prop-types';

import { getAlltasks } from '#Api/tasks.js';
import { useEffect, useState } from 'react';

export default function Boards() {
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    getAlltasks().then((res) => setBoardData(res.data || [{}]));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 m-2">
      {boardData && boardData.length > 0 ? (
        <>
          {boardData.map((board) => {
            return <BoardItem board={board} key={board._id} />;
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

const BoardItem = ({ board }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 bg-zinc-900 dark:bg-amber-100 rounded-2xl p-2">
      <h3 className="text-lg/tight font-medium text-gray-900">
        {board?.title || 'come here'}
      </h3>

      <p className="mt-0.5 text-gray-700">
        {board?.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio nesciunt quas non animi.'}
      </p>
    </div>
  );
};
