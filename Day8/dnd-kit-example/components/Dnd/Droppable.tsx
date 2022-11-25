import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import styles from "/styles/Dnd.module.scss";

const Droppable: React.FC<{
  id: string;
  items: string[];
  activeId: string;

}> = ({ id, items}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className={styles.droppable} ref={setNodeRef}>
        <div className={styles.columnHeading}>{id}</div>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
       
      </ul>
    </SortableContext>
  );
};

export default Droppable;
