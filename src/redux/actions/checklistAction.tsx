import trelloAPI from '../../api/trelloAPI';
import { IState } from '../../utils/types';

export const addNewChecklistAction = (state: IState, action: any) => {
  const { newTask, indexIssue, indexTask } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  if (task) {
    task.checkList = task.checkList ? [...task.checkList, newTask] : [newTask];
  }
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const deleteChecklistAction = (state: IState, action: any) => {
  const { indexIssue, indexTask, indexChecklist } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  // Remove the checklist
  if (task) task.checkList = task.checkList.filter((_, i) => i != +indexChecklist);
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const editTitleChecklistAction = (state: IState, action: any) => {
  const { indexIssue, indexTask, indexChecklist, newTitleChecklist } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  const checklist = task?.checkList.find((_, i) => i === +indexChecklist); // Get the checklist
  if (checklist) checklist.titleCheckList = newTitleChecklist;
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const editStateChecklistAction = (state: IState, action: any) => {
  const { indexIssue, indexTask, indexChecklist } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  const checklist = task?.checkList.find((_, i) => i === +indexChecklist); // Get the checklist
  if (checklist) checklist.stateCheckList = !checklist?.stateCheckList;
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const addDescriptionAction = (state: IState, action: any) => {
  const { indexIssue, indexTask, editDescription } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue); // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask); // Get the task
  if (task) task.description = editDescription;
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};

export const dragDropChecklistAction = (state: IState, action: any) => {
  const { indexIssue, indexTask, startCheckIndex, endCheckIndex } = action.payload;
  const issue = state.trelloList.find((_, i) => i === +indexIssue) ?? { issue: [] }; // Get the issue
  const task = issue?.issue.find((_, i) => i === +indexTask) ?? { checkList: [] }; // Get the task
  // Remove the checklist at the startCheckIndex and replace with the new one
  if (startCheckIndex < endCheckIndex) {
    const removedItem = task.checkList.splice(startCheckIndex, 1)[0];
    task.checkList.splice(endCheckIndex === 0 ? 0 : endCheckIndex - 1, 0, removedItem);
  } else if (startCheckIndex > endCheckIndex) {
    const removedItem = task.checkList.splice(startCheckIndex, 1)[0];
    task.checkList.splice(endCheckIndex, 0, removedItem);
  }
  trelloAPI.updateIssues({
    issues: state.trelloList,
  });
};
