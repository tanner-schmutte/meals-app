import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealScreen = (props) => {
    const categoryId = props.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(
        (category) => category.id === categoryId
    );

    return (
        <View style={styles.screen}>
            <Text>The Category Meal Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    props.navigation.navigate('MealDetail');
                }}
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
    },
});

export default CategoryMealScreen;
