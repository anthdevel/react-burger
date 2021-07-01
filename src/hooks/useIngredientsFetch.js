import {useEffect, useState} from 'react';
import {URL_INGREDIENTS} from '../utils';

const useIngredientsFetch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      setHasError(false);

      fetch(URL_INGREDIENTS)
        .then(response => response.json())
        .then(({data}) => {
          setIngredients(data);
        })
        .catch(error => {
          setHasError(true);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
    },
    []
  );
  return {
    ingredients,
    hasError,
    isLoading,
  }
}

export default useIngredientsFetch;