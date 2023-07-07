import { ICheckList } from '../utils/types';
import { useDispatch } from 'react-redux';
import { deleteChecklist, dragDropChecklist, editStateChecklist, editTitleChecklist } from '../redux/trelloReducer';
import { AiFillDelete, AiFillCheckCircle, AiFillEdit } from 'react-icons/ai';
import { useRef, useState } from 'react';
import { horizonalDistanceCompute } from '../utils';

interface IChecklistRender {
  checkLists: ICheckList[];
  indexIssue: string;
  indexTask: string;
}

const ChecklistRender = ({ checkLists, indexIssue, indexTask }: IChecklistRender) => {
  const dispatch = useDispatch();
  const [checkInput, setCheckInput] = useState('');
  const [newTitleChecklist, setNewTitleChecklist] = useState('');
  const ulRef = useRef<HTMLUListElement>(null);
  const handleDrop = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const startCheckIndex = event.dataTransfer.getData('startCheckIndex');
    const startCoordinate = '';
    // const endCheckIndex = horizonalDistanceCompute({ event, startCoordinate });
    // dispatch(dragDropChecklist({ indexIssue, indexTask, startCheckIndex, endCheckIndex }));
  };
  const handleDragStart = (event: React.DragEvent, index: number) => {
    event.dataTransfer.setData('startCheckIndex', String(index));
    const target = event.target as HTMLElement;
    target.classList.add('activeOnDrag');
    event.stopPropagation();
  };
  const handleDragEnd = (event: React.DragEvent) => {
    const target = event.target as HTMLElement;
    target.classList.remove('activeOnDrag');
  };
  return (
    <ul ref={ulRef} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      {checkLists.map((checkList, index) => {
        const indexChecklist = String(index);
        return (
          <li
            key={index}
            className={checkList.stateCheckList ? 'activeResolvedChecklist' : ''}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="checklistContainer">
              <div className="checklistMain">
                <p>{checkList.titleCheckList}</p>
                {checkInput === indexChecklist && (
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(editTitleChecklist({ indexIssue, indexTask, indexChecklist, newTitleChecklist }));
                      setCheckInput('');
                    }}
                  >
                    <input
                      type="text"
                      autoFocus
                      onChange={(e) => setNewTitleChecklist(e.target.value)}
                      defaultValue={checkList.titleCheckList}
                    />
                  </form>
                )}
              </div>
              <div className="checklistModify">
                <AiFillCheckCircle
                  className="doneChecklist"
                  onClick={() => dispatch(editStateChecklist({ indexIssue, indexTask, indexChecklist }))}
                />
                <AiFillEdit onClick={() => setCheckInput((cur) => (cur === indexChecklist ? '' : indexChecklist))} />
                <AiFillDelete onClick={() => dispatch(deleteChecklist({ indexIssue, indexTask, indexChecklist }))} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChecklistRender;
