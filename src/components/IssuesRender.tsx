import React, { useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { getTrello } from '../redux/store';
import { IIssue } from '../utils/types';
import { useDispatch } from 'react-redux';
import { deleteIssue, dragDropIssue, editIssue } from '../redux/trelloReducer';
import { AiFillDelete } from '@react-icons/all-files/ai/AiFillDelete';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import ChildIssueRender from './ChildIssueRender';
import { verticalDistanceCompute } from '../utils';

const IssuesRender = () => {
  const trelloState = useSelector(getTrello);
  const dispatch = useDispatch();
  const { trelloList } = trelloState;
  const [checkInputEdit, setCheckInputEdit] = useState('');
  const [titleIssue, setTittleIssue] = useState('');
  const ulRef = useRef<HTMLUListElement | null>(null);
  const handleDrop = (event: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    event.preventDefault();
    const startClass = event.dataTransfer.getData('startClass');
    if (startClass === 'issue') {
      const startIndex = event.dataTransfer.getData('startIndexIssue');
      const startCoordinateIssue = event.dataTransfer.getData('startCoordinateIssue');
      const endIndex = verticalDistanceCompute({ event, ulRef, dropIndex, startCoordinateIssue });
      endIndex != undefined && Number(startIndex) != endIndex && dispatch(dragDropIssue({ startIndex, endIndex }));
    }
  };
  const handleDragStart = (event: React.DragEvent, startIndex: number) => {
    const targetElement = event.target as HTMLLIElement;
    const startCoordinateIssue = targetElement.getBoundingClientRect();
    event.dataTransfer.setData('startIndexIssue', String(startIndex));
    event.dataTransfer.setData('startClass', targetElement.className);
    event.dataTransfer.setData('startCoordinateIssue', JSON.stringify(startCoordinateIssue));
  };
  return (
    <div className="issues_container">
      <ul className="issues" ref={ulRef}>
        {trelloList.map((issue: IIssue, index: number) => {
          const issueList = issue.issue || [];
          const closedIssue = issueList.filter((issue) => issue && issue.stateIssue === 'closed');
          const percenClosedIssue = Math.floor((closedIssue.length / issueList.length) * 100);
          return (
            <li
              className="issue"
              key={index}
              draggable
              onDragOver={(event) => event.preventDefault()}
              onDragStart={(event) => handleDragStart(event, index)}
              onDrop={(event) => handleDrop(event, index)}
            >
              <div className="issue_container">
                <div className="issue_header">
                  <div className="issue_headerMain">
                    <div className="issue_tittle">
                      <h1>{issue.titleIssues}</h1>
                      {checkInputEdit === String(index) && (
                        <form
                          action=""
                          onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(editIssue({ index, titleIssue }));
                            setCheckInputEdit('');
                          }}
                        >
                          <input
                            type="text"
                            onBlur={() => setCheckInputEdit('')}
                            onChange={(e) => setTittleIssue(e.target.value)}
                            defaultValue={issue.titleIssues}
                            autoFocus
                          />
                        </form>
                      )}
                    </div>
                    <div className="issue_modify">
                      <AiFillDelete onClick={() => dispatch(deleteIssue(index))} />
                      <AiFillEdit
                        onClick={() => {
                          setCheckInputEdit((cur) => (cur === String(index) ? '' : String(index)));
                        }}
                      />
                    </div>
                  </div>
                  {issueList.length !== 0 && (
                    <div className="tasksBar">
                      <div className="taskPercent">
                        <div className="taskClosedPercent" style={{ width: `${percenClosedIssue}%` }}></div>
                      </div>
                      <div className="taskNumber">
                        {closedIssue.length} / {issueList.length}
                      </div>
                    </div>
                  )}
                </div>
                <ChildIssueRender childIssue={issueList} indexIssue={String(index)} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IssuesRender;
