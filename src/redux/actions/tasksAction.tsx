import trelloAPI from '../../api/trelloAPI';
import { IChildIssue, IIssue, IState } from '../../utils/types';

export const addNewTaskAction = (state: IState, action: any) => {
  const { newTask, indexIssue } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  if (issue) issue.issue = issue.issue ? [...issue.issue, newTask] : [newTask];
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const deleteTaskAction = (state: IState, action: any) => {
  const { stringIndex, indexIssue } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  if (issue) issue.issue = issue.issue.filter((_, i) => i != +stringIndex);
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const editTitleTaskAction = (state: IState, action: any) => {
  const { newTitleTask, indexIssue, indexTask } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  if (task) task.titleIssue = newTitleTask;
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const changeStateTaskAction = (state: IState, action: any) => {
  const { stringIndex, indexIssue, aquiredIssue, aquiredClass } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +stringIndex); // Get the task
  if (task) {
    task.stateIssue = aquiredIssue;
    task.stateClass = aquiredClass;
  }
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const dragDropTaskAction = (state: IState, action: any) => {
  const { startIndexIssue, endIndexIssue, startIndex, endIndex } = action.payload;
  const issueStart = state.trelloList.find((_, i) => i === +startIndexIssue) ?? { issue: [] };
  const issueEnd = state.trelloList.find((_, i) => i === +endIndexIssue) ?? { issue: [] };
  if (endIndexIssue !== startIndexIssue) {
    const removedItem = issueStart.issue.splice(startIndex, 1)[0];
    issueEnd.issue?.splice(endIndex, 0, removedItem) ?? (issueEnd.issue = [removedItem]);
  } else if (startIndex < endIndex) {
    const removedItem = issueStart.issue.splice(startIndex, 1)[0];
    issueStart.issue.splice(endIndex === 0 ? 0 : endIndex - 1, 0, removedItem);
  } else if (startIndex > endIndex) {
    const removedItem = issueStart.issue.splice(startIndex, 1)[0];
    issueStart.issue.splice(endIndex, 0, removedItem);
  }
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};
