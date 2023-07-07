export interface IState {
   trelloList: IIssue[];
}

export interface IIssue {
   id: string;
   titleIssues: string;
   stateIssues: string;
   issue: IChildIssue[]
}

export interface IChildIssue {
   id: string;
   titleIssue: string;
   stateIssue: string;
   stateClass: string;
   description: string;
   checkList: ICheckList[]
}

export interface ICheckList {
   id: string;
   titleCheckList: string;
   stateCheckList: boolean;
}