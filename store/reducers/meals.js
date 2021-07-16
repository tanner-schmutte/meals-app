import { MEALS } from '../../data/dummy-data';
import FiltersScreen from '../../screens/FiltersScreen';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(
                (meal) => meal.id === action.mealId
            );
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find(
                    (meal) => meal.id === action.mealId
                );
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(meal),
                };
            }
        case SET_FILTERS:
            const updatedFilteredMeals = state.meals.filter((meal) => {
                if (action.filters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (action.filters.lactoseFree && !meal.islactoseFree) {
                    return false;
                }
                if (action.filters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (action.filters.vegan && !meal.isVegan) {
                    return false;
                }

                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals };

        default:
            return state;
    }
};

export default mealsReducer;
