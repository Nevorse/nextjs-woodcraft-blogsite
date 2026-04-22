"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  // DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const DndDataContext = createContext<{ activeId: string | null }>({ activeId: null });
export const useDndData = () => useContext(DndDataContext);

type ItemType = {
  id: string;
};

type DndSortableGridProps<T extends ItemType> = {
  itemState: T[];
  setItemState: React.Dispatch<React.SetStateAction<T[]>>;
  initialItems?: T[];
  children: React.ReactNode;
};

export default function DndSortableGrid<T extends ItemType>({
  itemState,
  setItemState,
  initialItems = [],
  children,
}: DndSortableGridProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // const activeItem = itemState.find((item) => (item.id === activeId ? item : null));

  const prevInitialItemsRef = useRef(initialItems);

  useEffect(() => {
    // initialItems kullanan komponentler için
    // initialItems prop'u değiştiğinde state'i direkt set etmek yerine farkı hesaplar:
    // - Yeni resimler => sıranın sonuna eklenir
    // - Silinen resimler => çıkarılır (handleOptimisticDeleteImage zaten anlık kaldırıyor)
    // - Kaydedilmemiş sıralama bozulmaz
    const prevIds = new Set(prevInitialItemsRef.current.map((item) => item.id));
    const currentPropIds = new Set(initialItems.map((item) => item.id));

    const newImages = initialItems.filter((item) => !prevIds.has(item.id));
    const deletedIds = new Set([...prevIds].filter((id) => !currentPropIds.has(id)));

    if (newImages.length > 0 || deletedIds.size > 0) {
      setItemState((prev) => [
        ...newImages,
        ...prev.filter((item) => !deletedIds.has(item.id)),
      ]);
    }

    prevInitialItemsRef.current = initialItems;
  }, [initialItems]);

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    setItemState((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <DndContext
      id="cover-page-images-dragndrop"
      sensors={DndSensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DndDataContext.Provider value={{ activeId }}>
        <SortableContext
          items={itemState.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndDataContext.Provider>

    </DndContext>
  );
}

{
  /* Overlay için dummy kullan */
}

{
  /* <DragOverlay>
        {activeItem ? (
          <AdminCompCardDummy itemData={activeItem} image="1" />
        ) : null}
      </DragOverlay> */
}
