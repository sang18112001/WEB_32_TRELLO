import { MouseEvent } from 'react';

interface addChildDistance {
   event: MouseEvent<HTMLElement>;
   ulRef: React.RefObject<HTMLUListElement | null>;
   lenChild: number;
}

interface IHorizontalDistance {
   event: MouseEvent<HTMLLIElement>;
   startCoordinate: string;
   index: number;
   ulRef: React.RefObject<HTMLUListElement | null>;
}


interface IVerticalDistance {
   event: MouseEvent<HTMLLIElement>;
   ulRef: React.RefObject<HTMLUListElement | null>;
   dropIndex: number;
   startCoordinateIssue: string;
}

export const addChildDistanceCompute = ({ event, ulRef, lenChild }: addChildDistance) => {
   const { clientX, clientY } = event
   const ul = ulRef.current as HTMLUListElement;
   const button = ul.querySelector('button');
   const buttonRect = button?.getBoundingClientRect();
   if (buttonRect) {
      const { top, left, right, bottom } = buttonRect
      const checkInButton = clientX >= left && clientX < right && clientY >= top && clientY <= bottom
      if (checkInButton) return lenChild != 0 ? lenChild : 0;
   }
}

export const horizonalDistanceCompute = ({ event, startCoordinate, index, ulRef }: IHorizontalDistance) => {
   const ul = Array.from((ulRef.current as HTMLUListElement)?.querySelectorAll('li.childIssue'));
   const li = ul[index]
   const liRect = li.getBoundingClientRect();
   const { clientX, clientY } = event
   const { top, height, x: xDrop, y: yDrop } = liRect
   const { x: xDrag, y: yDrag } = JSON.parse(startCoordinate || '{}');
   const distance = clientY - (top + height / 2)
   const checkDuplicate = xDrag === xDrop && yDrag === yDrop
   if (checkDuplicate) return
   else if (!checkDuplicate && Math.abs(distance) <= height / 2) {
      return distance > 0 ? index + 1 : index;
   }
};

export const verticalDistanceCompute = ({ event, ulRef, dropIndex, startCoordinateIssue }: IVerticalDistance) => {
   const ul = Array.from((ulRef.current as HTMLUListElement)?.querySelectorAll('li.issue'));
   const li = ul[dropIndex]
   const liRect = li.getBoundingClientRect();
   const { clientX, clientY } = event
   const { left, width, x: xDrop, y: yDrop } = liRect
   const { x: xDrag, y: yDrag } = JSON.parse(startCoordinateIssue || '{}');
   const distance = clientX - (left + width / 2)
   const checkDuplicate = xDrag === xDrop && yDrag === yDrop
   if (checkDuplicate) return
   else if (!checkDuplicate && Math.abs(distance) < width / 2) {
      return distance > 0 ? dropIndex + 1 : dropIndex;
   }
}


// export const horizonalDistanceCompute = ({ event, startCoordinate }: IHorizontalDistance) => {
//    const { clientX, clientY } = event;
//    const { x: xDrag, y: yDrag } = JSON.parse(startCoordinate || '{}');
//    const ul = event.currentTarget as HTMLUListElement;
//    const lis = ul.querySelectorAll('li');
//    const button = ul.querySelector('button');
//    const buttonRect = button?.getBoundingClientRect();
//    if (buttonRect) {
//       const { top, left, right, bottom } = buttonRect
//       const checkInButton = clientX >= left && clientX < right && clientY >= top && clientY <= bottom
//       if (checkInButton) return lis ? lis.length : 0;
//    }
//    if (lis) {
//       for (var i = 0; i < lis.length; i++) {
//          const { top, height, x: xDrop, y: yDrop } = lis[i].getBoundingClientRect();
//          const distance = clientY - (top + height / 2)
//          // Check if liDrag === liDrop
//          const checkDuplicate = xDrag === xDrop && yDrag === yDrop
//          if (!checkDuplicate && Math.abs(distance) < height / 2) {
//             return distance > 0 ? i + 1 : i;
//          }
//       }
//    }
// };
