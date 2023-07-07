const handleDrop = (event: React.DragEvent, index: number, isEmpty: boolean) => {
   event.preventDefault();
   const startIndex = event.dataTransfer.getData('startIndex');
   const startIndexIssue = event.dataTransfer.getData('indexIssue');
   const endIndex = index;
   const endIndexIssue = indexIssue;
   dispatch(dragDropTask({ startIndex, startIndexIssue, endIndexIssue, endIndex, isEmpty }));
 };
 const handleDrag = (event: React.DragEvent, index: number) => {
   event.dataTransfer.setData('startIndex', String(index));
   const target = event.target as HTMLDivElement;
   target.classList.add('activeOnDrag');
 };
 const handleDragOver = (event: React.DragEvent) => {
   event.preventDefault();
 };
 const handleDragEnd = (event: React.DragEvent) => {
   const target = event.target as HTMLDivElement;
   target.classList.remove('activeOnDrag');
 };
 const testOnDrop = (event: React.DragEvent) => {
   console.log(event);
 }