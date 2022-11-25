import styles from "/styles/Dnd.module.scss";

interface ItemProps {
  id: string;
  dragOverlay?: any;
}
const Item: React.FC<ItemProps> = ({ id, dragOverlay }) => {
  return (
    <div
      //   style={{
      //     cursor: dragOverlay ? "grabbing" : "grab",
      //   }}
      className={styles.item}
    >
      {id}
    </div>
  );
};
export default Item;
