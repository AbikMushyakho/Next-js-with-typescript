import { arrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array: string[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
export const insertAtIndex = (array: string[], index: number, item: string) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const moveArray = (
  array: string[],
  oldIndex: number,
  newIndex: number
) => {
  return arrayMove(array, oldIndex, newIndex);
};
export const moveBetweenContainers = (
    prevItems: { [key: string]: string[] },
    activeContainer: number,
    activeIndex: number,
    overContainer: number,
    overIndex: number,
    item: string
  ) => {
    return {
      ...prevItems,
      [activeContainer]: removeAtIndex(prevItems[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(prevItems[overContainer], overIndex, item),
    };
  };