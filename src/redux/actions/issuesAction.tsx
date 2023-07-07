import trelloAPI from '../../api/trelloAPI';
import { IIssue, IState } from '../../utils/types';

export const getIssuesAction = (state: IState, action: any) => {
  state.trelloList = action.payload;
};

export const addNewIssueAction = (state: IState, action: any) => {
  state.trelloList = [...state.trelloList, action.payload];
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const deleteIssueAction = (state: IState, action: any) => {
  state.trelloList = state.trelloList.filter((_, i) => i != +action.payload);
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const editIssueAction = (state: IState, action: any) => {
  const { index, titleIssue } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +index); // Get the issue
  if (issue) issue.titleIssues = titleIssue;
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const dragDropIssueAction = (state: IState, action: any) => {
  const { startIndex, endIndex } = action.payload;
  const removedItem = state.trelloList.splice(startIndex, 1)[0];
  if (startIndex < endIndex) {
    state.trelloList.splice(endIndex === 0 ? 0 : endIndex - 1, 0, removedItem);
  } else if (startIndex > endIndex) {
    state.trelloList.splice(endIndex, 0, removedItem);
  }
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};
