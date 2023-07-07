import React from 'react';
import { listIssueState } from '../utils/constants';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { changeStateTask } from '../redux/trelloReducer';
import { useDispatch } from 'react-redux';
import { IChildIssue } from '../utils/types';

interface IChildStateBox {
  stringIndex: string;
  indexIssue: string;
  eachChild: IChildIssue;
  setCheckStateBox: React.Dispatch<React.SetStateAction<string>>;
}

const ChildStateBox: React.FC<IChildStateBox> = ({ stringIndex, indexIssue, eachChild, setCheckStateBox }) => {
  const dispatch = useDispatch();
  return (
    <div className="stateChildBox">
      {listIssueState.map((state, index) => {
        const changeStateTaskObj = {
          stringIndex,
          indexIssue,
          aquiredIssue: state.stateIssue,
          aquiredClass: state.stateClass,
        };
        if (eachChild.stateIssue != state.stateIssue) {
          return (
            <div className="stateBoxItem" key={index}>
              <h4 className="stateBoxItem_left">{state.stateName}</h4>
              <div className="stateBoxItem_right">
                <AiOutlineArrowRight />
                <p
                  className={state.stateClass}
                  key={index}
                  onClick={() => {
                    dispatch(changeStateTask(changeStateTaskObj));
                    setCheckStateBox('');
                  }}
                >
                  {state.stateIssue}
                </p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ChildStateBox;
