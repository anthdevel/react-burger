import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import {FC, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';
import {REPLACE_CONSTRUCTOR_ITEMS} from '../../services/actions/constructor';
import {Nullable} from '../../types/types';

interface IBurgerConstructorItemProps {
  readonly key: string
  readonly uniqueId: string
  readonly index: number
  readonly name: string
  readonly price: number
  readonly image: string
  readonly onRemove: (id: string) => void
}

interface IDragItem {
  index: number
  readonly uniqueId: string
}

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = (props) => {
  const {
    uniqueId,
    index,
    name,
    price,
    image,
    onRemove
  } = props;

  const dispatch = useDispatch();

  const ref = useRef<Nullable<HTMLDivElement>>(null);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: REPLACE_CONSTRUCTOR_ITEMS,
      payload: {
        dragIndex,
        hoverIndex
      },
    });
  };

  const [, drop] = useDrop({
    accept: 'constructor-item',
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'constructor-item',
    item: {index, uniqueId},
  });

  drag(drop(ref));

  return (
    <div className={styles.item} ref={ref}>
      <div className={styles.itemDrag}>
        <DragIcon type="primary"/>
      </div>
      <div className={styles.itemMain}>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => onRemove(uniqueId)}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorItem;