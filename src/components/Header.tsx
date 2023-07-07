import { useContext, useRef, useState } from 'react';
import trelloAPI from '../api/trelloAPI';
import { addNewIssue, getIssues } from '../redux/trelloReducer';
import { IIssue } from '../utils/types';
import { BiSearch } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
const Header = () => {
  const dispatch = useDispatch();
  const [checkNew, setCheckNew] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)
  const newIssueHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef?.current
    const newTitle = input?.value
    const newIssue = {
      id: nanoid(),
      issue: [],
      stateIssues: 'to-do',
      titleIssues: newTitle,
    };
    dispatch(addNewIssue(newIssue));
    setCheckNew(false);
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    trelloAPI.getIssues().then((response) => {
      const trelloArray = response.issues;
      const querySearch = e.target.value;
      const newList = trelloArray.filter((trello: IIssue) => trello.titleIssues.includes(querySearch));
      dispatch(getIssues(newList));
    });
  };
  return (
    <header>
      <h3>Trello App</h3>
      <div className="issues_header">
        {checkNew && (
          <form action="" onSubmit={(e) => newIssueHandler(e)}>
            <input type="text" ref={inputRef} autoFocus placeholder='Add a new issue'/>
          </form>
        )}
        <button onClick={() => setCheckNew((cur) => !cur)}>New Issue</button>
        <div className="issues_search">
          <BiSearch />
          <input type="text" onChange={(e) => handleClick(e)} placeholder="Search" />
        </div>
      </div>
    </header>
  );
};

export default Header;
