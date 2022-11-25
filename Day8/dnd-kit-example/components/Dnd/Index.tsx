import {
  DndContext,
  DragOverlay,
  useSensors,
  MouseSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { FormEvent, useState } from "react";
import styles from "/styles/Dnd.module.scss";
import {
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core/dist/types";
import Droppable from "./Droppable";
import Item from "./Item";
import { moveArray, moveBetweenContainers } from "../../utils/Array";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Index = () => {
  const [columns, setColumns] = useState<{
    [key: string]: string[];
  }>({
    Todo: ["Integrate @dnd", "make it draggable"],
    Progress: [],
    Done: [],
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // console.log("start:");
    // console.log(event);
    const { active } = event;
    // console.log(active.id);
    setActiveId(active?.id?.toString());
  };
  const handleDragCancel = (event: DragCancelEvent) => {
    // console.log("Cancel:");
    // console.log(event);
    setActiveId(null);
  };
  const handleDragOver = (event: DragOverEvent) => {
    // console.log("Over:");
    // console.log(event);
    const { active, over } = event;
    const overId = over?.id;
    // console.log(overId)
    if (!overId) {
      return;
    }

    // console.log(active);
    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      //   console.log("Active Container: " + activeContainer);
      //   console.log("Over Container: " + overContainer);

      setColumns((prevColumn) => {
        const activeIndex = active.data.current?.sortable.index;

        const overIndex =
          over.id in prevColumn
            ? prevColumn[overContainer].length + 1
            : over.data.current?.sortable.index;
        // console.log("Active Index: " + activeIndex);
        // console.log("Over Index: " + overIndex);
        return moveBetweenContainers(
          prevColumn,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id.toString()
        );
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log("End:");
    // console.log(event);
    const { over, active } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in columns
          ? columns[overContainer].length + 1
          : over.data.current?.sortable.index;
      setColumns((columns) => {
        let newItem;
        if (activeContainer === overContainer) {
          newItem = {
            ...columns,
            [overContainer]: moveArray(
              columns[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItem = moveBetweenContainers(
            columns,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id.toString()
          );
        }
        return newItem;
      });
    }
  };
  const [showAddInput, setShowAddInput] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.mainContainer}>
        <div className={styles.Projectcards}>
          <div className={styles.boxes}>
           
              {Object.keys(columns).map((column, index) => {
                const items = [...columns[column]];
                return (
            //    <SortableContext
            //   id={"SortableBoxes"}
            //   items={[...Object.keys(columns)]}
            //   strategy={rectSortingStrategy}
            //   key={column}
            // > 
            //        <SortableItem  id={column}>
                    <Droppable
                      id={column}
                      items={items}
                      activeId={activeId ? activeId : ""}
                    />
            //        </SortableItem>
            // </SortableContext>

                );
              })}
          </div>

          <div className={styles.addBox}>
            {showAddInput ? (
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  setColumns((prevValues) => {
                    return {
                      ...prevValues,
                      Todo: [...prevValues.Todo, newTodo],
                    };
                  });
                  //   alert(newTodo);
                  setNewTodo("");
                  setShowAddInput(false);
                }}
                className={styles.addForm}
              >
                <input
                  type="text"
                  placeholder="Add todo"
                  name="newTodo"
                  value={newTodo}
                  onChange={(e) =>
                    setNewTodo((e.target as HTMLInputElement).value)
                  }
                  className={styles.addInput}
                />
                <input type="submit" value="Add" className={styles.addButton} />
              </form>
            ) : (
              <button
                className={styles.addShowButton}
                onClick={(e) => setShowAddInput(true)}
              >
                Add New
              </button>
            )}
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? <Item id={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Index;
