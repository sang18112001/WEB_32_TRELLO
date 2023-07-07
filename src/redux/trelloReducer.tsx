import { createSlice } from '@reduxjs/toolkit';
import { IIssue } from '../utils/types';
import {
  addNewIssueAction,
  deleteIssueAction,
  dragDropIssueAction,
  editIssueAction,
  getIssuesAction,
} from './actions/issuesAction';
import {
  addNewTaskAction,
  changeStateTaskAction,
  deleteTaskAction,
  dragDropTaskAction,
  editTitleTaskAction,
} from './actions/tasksAction';
import {
  addDescriptionAction,
  addNewChecklistAction,
  deleteChecklistAction,
  dragDropChecklistAction,
  editStateChecklistAction,
  editTitleChecklistAction,
} from './actions/checklistAction';

const trelloSlice = createSlice({
  name: 'trello',
  initialState: {
    trelloList: [] as IIssue[],
  },
  reducers: {
    getIssues: (state, action) => getIssuesAction(state, action),
    addNewIssue: (state, action) => addNewIssueAction(state, action),
    deleteIssue: (state, action) => deleteIssueAction(state, action),
    editIssue: (state, action) => editIssueAction(state, action),
    dragDropIssue: (state, action) => dragDropIssueAction(state, action),
    addNewTask: (state, action) => addNewTaskAction(state, action),
    deleteTask: (state, action) => deleteTaskAction(state, action),
    editTitleTask: (state, action) => editTitleTaskAction(state, action),
    changeStateTask: (state, action) => changeStateTaskAction(state, action),
    dragDropTask: (state, action) => dragDropTaskAction(state, action),
    addNewChecklist: (state, action) => addNewChecklistAction(state, action),
    deleteChecklist: (state, action) => deleteChecklistAction(state, action),
    editTitleChecklist: (state, action) => editTitleChecklistAction(state, action),
    editStateChecklist: (state, action) => editStateChecklistAction(state, action),
    dragDropChecklist: (state, action) => dragDropChecklistAction(state, action),
    addDescription: (state, action) => addDescriptionAction(state, action),
  },
});

// Export reducers
export const trelloReducer = trelloSlice.reducer;
export const {
  getIssues,
  addNewIssue,
  deleteIssue,
  editIssue,
  dragDropIssue,
  addNewTask,
  deleteTask,
  editTitleTask,
  changeStateTask,
  dragDropTask,
  addNewChecklist,
  deleteChecklist,
  editTitleChecklist,
  editStateChecklist,
  dragDropChecklist,
  addDescription,
} = trelloSlice.actions;
