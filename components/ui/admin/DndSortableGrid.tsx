"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";

type ItemType = {
  id: string;
};

type DndSortableGridProps<T extends ItemType> = {
  itemState: T[];
  setItemState: React.Dispatch<React.SetStateAction<T[]>>;
  children: React.ReactNode;
};

export default function DndSortableGrid<T extends ItemType>({
  itemState,
  setItemState,
  children,
}: DndSortableGridProps<T>) {
  const DndSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItemState((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      const arr = arrayMove(prev, oldIndex, newIndex);
      return arr;
    });
  };
  return (
    <DndContext
      id="cover-page-images-dragndrop"
      sensors={DndSensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemState.map((i) => i.id)} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
