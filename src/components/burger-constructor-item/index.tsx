import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';
import {REPLACE_DESIGN_ITEMS} from '../../services/actions/design';

// TODO: any
const BurgerConstructorItem = (props: any) => {
  const {
    uniqueId,
    index,
    name,
    price,
    image,
    onRemove
  } = props;

  const dispatch = useDispatch();

  // TODO: any
  const ref = useRef<any>(null);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: REPLACE_DESIGN_ITEMS,
      payload: {
        dragIndex,
        hoverIndex
      },
    });
  };

  const [, drop] = useDrop({
    accept: 'constructor-item',
    // TODO: any
    hover(item: any, monitor) {
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

      // TODO: any
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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

BurgerConstructorItem.propTypes = {
  uniqueId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default BurgerConstructorItem;