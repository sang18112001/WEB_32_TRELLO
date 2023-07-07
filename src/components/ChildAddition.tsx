import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addNewTask, dragDropTask } from '../redux/trelloReducer';
import { addChildDistanceCompute } from '../utils';

interface IChildAddition {
  lenChild: number;
  indexIssue: string;
  ulRef: React.RefObject<HTMLUListElement | null>;
}

const ChildAddition = ({ lenChild, indexIssue, ulRef }: IChildAddition) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [checkInput, setCheckInput] = useState(false);
  const dispatch = useDispatch();
  const handleAddNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef?.current
    const newTitle = input?.value
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      checkList: [],
      stateIssue: 'to-do',
      stateClass: 'activeTodoTask',
      titleIssue: input?.value,
    };
    newTitle && dispatch(addNewTask({ indexIssue, newTask }));
    setCheckInput(false);
  };
  const handleAddNewChildIssue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCheckInput((cur) => !cur);
  };
  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    const startIndex = event.dataTransfer.getData('startIndex');
    const startIndexIssue = event.dataTransfer.getData('startIndexIssue');
    const endIndex = addChildDistanceCompute({ event, ulRef, lenChild });
    const endIndexIssue = indexIssue;
    dispatch(dragDropTask({ startIndex, startIndexIssue, endIndexIssue, endIndex }));
  };
  return (
    <>
      {checkInput && (
        <form action="" onSubmit={(e) => handleAddNewTask(e)}>
          <input ref={inputRef} type="text" autoFocus />
        </form>
      )}
      <button onClick={(e) => handleAddNewChildIssue(e)} onDrop={(event) => handleDrop(event)}>
        <AiOutlinePlus />
        <p>Add a child issue</p>
      </button>
    </>
  );
};

export default ChildAddition;
