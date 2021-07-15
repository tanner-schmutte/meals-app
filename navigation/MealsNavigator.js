import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerBackTitle: 'Back',
};

const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: CategoryMealsScreen,
        MealDetail: MealDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const MealsFavTabNavigator = createBottomTabNavigator(
    {
        Meals: {
            screen: MealsNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name="ios-restaurant"
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
        Favorites: {
            screen: FavNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name="ios-star"
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.accent,
            backgroundColor: Colors.primary,
            labelStyle: {
                fontFamily : 'open-sans-bold'
            }
        },
    }
);

const FiltersNavigator = createStackNavigator(
    { Filters: FiltersScreen },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const MainNavigator = createDrawerNavigator(
    {
        MealFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: { drawerLabel: 'Meals' },
        },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.accent,
            labelStyle: {
                fontFamily: 'open-sans-bold',
            },
        },
    }
);

export default createAppContainer(MainNavigator);
