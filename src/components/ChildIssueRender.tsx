import React, { useState, useRef, useEffect, useContext } from 'react';
import { IChildIssue } from '../utils/types';
import { useDispatch } from 'react-redux';
import { addNewTask, deleteTask, dragDropTask } from '../redux/trelloReducer';
import { MdClose } from 'react-icons/md';
import ChildIssueBox from './ChildIssueBox';
import ChildStateBox from './ChildStateBox';
import ChildAddition from './ChildAddition';
import { horizonalDistanceCompute } from '../utils';

const ChildIssueRender = ({ childIssue, indexIssue }: { childIssue: IChildIssue[]; indexIssue: string }) => {
  const [checkStateBox, setCheckStateBox] = useState('');
  const dispatch = useDispatch();
  const [indexTask, setIndexTask] = useState('');
  const ulRef = useRef<HTMLUListElement>(null);
  const handleDrop = (event: React.DragEvent<HTMLLIElement>, index: number) => {
    event.preventDefault();
    const startClass = event.dataTransfer.getData('startClass');
    if (startClass === 'childIssue') {
      const startIndex = event.dataTransfer.getData('startIndex');
      const startIndexIssue = event.dataTransfer.getData('startIndexIssue');
      const startCoordinate = event.dataTransfer.getData('startCoordinate');
      const endIndex = horizonalDistanceCompute({ event, startCoordinate, index,ulRef });
      const endIndexIssue = indexIssue;
      dispatch(dragDropTask({ startIndex, startIndexIssue, endIndexIssue, endIndex }));
    }
  };
  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, index: number) => {
    const targetElement = event.target as HTMLLIElement;
    const startCoordinate = targetElement.getBoundingClientRect();
    event.dataTransfer.setData('startIndex', String(index));
    event.dataTransfer.setData('startClass', targetElement.className);
    event.dataTransfer.setData('startCoordinate', JSON.stringify(startCoordinate));
  };
  const handleDragStartIssue = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData('startIndexIssue', indexIssue);
  };
  return (
    <div className="childIssueContainer" onDragStart={(e) => handleDragStartIssue(e)}>
      <ul ref={ulRef}className="childIssueRender" onDragOver={(event) => event.preventDefault()}>
        {childIssue.length > 0 &&
          childIssue.map((eachChild: IChildIssue, index: number) => {
            const stringIndex = String(index);
            return (
              <li
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDrop={(event) => handleDrop(event, index)}
                className="childIssue"
              >
                <div className="chidlIssueMain">
                  <h4
                    className={eachChild.stateClass === 'activeClosedTask' ? 'activeClosedTaskHeader' : ''}
                    onClick={() => setIndexTask(String(index))}
                    key={index}
                  >
                    {eachChild.titleIssue}
                  </h4>
                  <div className="stateChildIssue">
                    <div
                      className="stateChildTitle"
                      onClick={() => setCheckStateBox((cur) => (cur === stringIndex ? '' : stringIndex))}
                    >
                      <p className={eachChild.stateClass}>{eachChild.stateIssue}</p>
                    </div>
                    {checkStateBox === stringIndex && (
                      <ChildStateBox
                        stringIndex={stringIndex}
                        indexIssue={indexIssue}
                        eachChild={eachChild}
                        setCheckStateBox={setCheckStateBox}
                      />
                    )}
                  </div>
                  <div className="removeTask" onClick={() => dispatch(deleteTask({ stringIndex, indexIssue }))}>
                    <MdClose />
                  </div>
                </div>
              </li>
            );
          })}
        <ChildAddition indexIssue={indexIssue} lenChild = {childIssue.length} ulRef={ulRef}/>
      </ul>
      {indexTask && <ChildIssueBox setIndexTask={setIndexTask} indexIssue={indexIssue} indexTask={indexTask} />}
    </div>
  );
};

export default ChildIssueRender;
