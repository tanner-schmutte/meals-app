import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealScreen = (props) => {
    const renderMealItem = (itemData) => {
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        mealId: itemData.item.id,
                    });
                }}
            />
        );
    };

    const categoryId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(
        (meal) => meal.categoryIds.indexOf(categoryId) >= 0
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item, index) => {
                    item.id;
                }}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(
        (category) => category.id === categoryId
    );

    return { headerTitle: selectedCategory.title };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default CategoryMealScreen;
