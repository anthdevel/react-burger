import styles from './styles.module.css';
import {FC, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card';
import {scroller} from 'react-scroll';
import {InView} from 'react-intersection-observer';
import {useHistory, useLocation} from 'react-router-dom';
import {EIngredientType} from '../../types/enums';
import {getIngredientDetailsAction} from '../../services/actions/ingredients';
import {useDispatch, useSelector} from '../../services/hooks';

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [tab, setTab] = useState<string>('bun');

  const currentViewsRatio = useRef<any>({});

  const {list: ingredients} = useSelector(store => store.ingredients);

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const main = ingredients.filter(item => item.type === 'main');

  const onClickCard = (id: string) => {
    history.push({
      pathname: `/ingredients/${id}`,
      state: {background: location},
    });

    const ingredient = ingredients.filter(item => item._id === id)[0];

    dispatch(getIngredientDetailsAction(ingredient));
  };

  const onChange = (elemName: string) => {
    return (inView: boolean, entry: IntersectionObserverEntry) => {
      currentViewsRatio.current[elemName] = entry.intersectionRatio;

      const elemNames = Object.keys(currentViewsRatio.current);

      let [max, maxName]: [number, string] = [
        currentViewsRatio.current[elemNames[0]],
        elemNames[0]
      ];

      elemNames.forEach(name => {
        if (currentViewsRatio.current[name] > max) {
          max = currentViewsRatio.current[name];
          maxName = name;
        }
      });

      setTab(maxName);
    };
  };

  const onClickTab = (value: string) => {
    setTab(value);

    scroller.scrollTo(value, {
      duration: 250,
      smooth: 'easeInOut',
      containerId: 'scrollableContainer'
    });
  };

  return (
    <>
      <div className={styles.root}>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value="bun" active={tab === 'bun'} onClick={onClickTab}>
            ??????????
          </Tab>
          <Tab value="sauce" active={tab === 'sauce'} onClick={onClickTab}>
            ??????????
          </Tab>
          <Tab value="main" active={tab === 'main'} onClick={onClickTab}>
            ??????????????
          </Tab>
        </div>
        <div className={styles.content} id="scrollableContainer">
          <InView
            onChange={onChange(EIngredientType.Bun)}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id="bun"
          >
            <section className="pb-10">
              <h2 className="text text_type_main-medium mb-6">??????????</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {buns.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
          <InView
            onChange={onChange(EIngredientType.Sauce)}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id="sauce"
          >
            <section className="pb-10">
              <h2 className="text text_type_main-medium mb-6">??????????</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {sauces.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
          <InView
            onChange={onChange(EIngredientType.Main)}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id="main"
          >
            <section className="pb-10">
              <h2 className="text text_type_main-medium mb-6">??????????????</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {main.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
        </div>
      </div>
    </>
  );
};

export default BurgerIngredients;