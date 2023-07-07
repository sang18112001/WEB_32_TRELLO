import React, { useEffect, useState } from 'react';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
import { MdChecklist } from 'react-icons/md';
import { IoMdList } from 'react-icons/io';
import { RiWindow2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addDescription, addNewChecklist, editTitleTask } from '../redux/trelloReducer';
import ChecklistRender from './ChecklistRender';
import { useSelector } from 'react-redux';
import { getTrello } from '../redux/store';

interface IChildIssueBox {
  setIndexTask: React.Dispatch<React.SetStateAction<string>>;
  indexIssue: string;
  indexTask: string;
}

const ChildIssueBox = ({ setIndexTask, indexIssue, indexTask }: IChildIssueBox) => {
  const trelloState = useSelector(getTrello);
  const { trelloList } = trelloState;
  const issues = trelloList.find((_, i) => i === +indexIssue)?.issue;
  const childIssue = issues?.find((_, i) => i === +indexTask);
  const checkLists = childIssue?.checkList || [];
  const titleTask = childIssue?.titleIssue;
  const description = childIssue?.description;
  const [checkWishlist, setCheckChecklist] = useState(false);
  const [checkDescription, setCheckDescription] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [newTitleTask, setNewTitleTask] = useState('');
  const [checkTitleChild, setCheckTitleChild] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      stateCheckList: false,
      titleCheckList: title,
    };
    title && dispatch(addNewChecklist({ newTask, indexIssue, indexTask }));
    setCheckChecklist(false);
  };
  return (
    <div className="childIssueBox" draggable={false}>
      <div className="childIssueBox_container">
        <div className="childIssueBox_header">
          <div className="childIssueBoxTitle">
            <RiWindow2Fill />
            <h2 onClick={() => setCheckTitleChild(true)}>{titleTask}</h2>
          </div>
          {checkTitleChild && (
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(editTitleTask({ newTitleTask, indexIssue, indexTask }));
                setCheckTitleChild(false);
              }}
            >
              <input
                type="text"
                onBlur={() => setCheckTitleChild(false)}
                onChange={(e) => setNewTitleTask(e.target.value)}
                defaultValue={titleTask}
                autoFocus
              />
            </form>
          )}
        </div>
        <div className="childIssueBox_mainContent">
          <div className="childIssueBox_left">
            {description && (
              <>
                <div className="childIssueBox_description">
                  <div className="descriptionTitle">
                    <IoMdList />
                    <h3>Description</h3>
                  </div>
                </div>
                {!checkDescription && <p className="descriptionContent">{description}</p>}
              </>
            )}
            {checkDescription && (
              <div className="addDescription">
                <h4>Add your description:</h4>
                <textarea
                  rows={8}
                  onChange={(e) => e.target.value && setEditDescription(e.target.value)}
                  autoFocus
                  defaultValue={description}
                />
                <div className="addBox">
                  <button
                    className="add"
                    onClick={(e) => {
                      e.preventDefault();
                      editDescription && dispatch(addDescription({ indexIssue, indexTask, editDescription }));
                      setCheckDescription(false);
                    }}
                  >
                    Add
                  </button>
                  <button className="cancel" onClick={() => setCheckDescription(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {checkLists.length > 0 && (
              <div className="childIssueBox_checklist">
                <div className="checkListTitle">
                  <MdChecklist />
                  <h3>Checklist</h3>
                </div>
                <ChecklistRender checkLists={checkLists} indexIssue={indexIssue} indexTask={indexTask} />
              </div>
            )}
            {checkWishlist && (
              <form action="" onSubmit={(e) => handleSubmit(e)}>
                <h4>Add checkbox:</h4>
                <input type="text" onChange={(e) => setTitle(e.target.value)} autoFocus />
              </form>
            )}
          </div>
          <div className="childIssueBox_right">
            <p>Add to card</p>
            <button onClick={() => setCheckChecklist((cur) => !cur)}>
              <MdChecklist />
              <span>Checklist</span>
            </button>
            <button onClick={() => setCheckDescription((cur) => !cur)}>
              <IoMdList />
              <span>Description</span>
            </button>
          </div>
          <div className="closeChecklist">
            <GrFormClose onClick={() => setIndexTask('')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildIssueBox;
