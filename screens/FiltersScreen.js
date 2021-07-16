import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primary }}
                // thumbColor={Colors.primary} // looks good on android
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FiltersScreen = (props) => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const dispatch = useDispatch();

    const saveGlutenState = useCallback(
        (newValue) => {
            setIsGlutenFree(newValue);
        },
        [isGlutenFree, dispatch]
    );

    const saveLactoseState = useCallback(
        (newValue) => {
            setIsLactoseFree(newValue);
        },
        [isLactoseFree, dispatch]
    );

    const saveVegetarianState = useCallback(
        (newValue) => {
            setIsVegetarian(newValue);
        },
        [isVegetarian, dispatch]
    );

    const saveVeganState = useCallback(
        (newValue) => {
            setIsVegan(newValue);
        },
        [isVegan, dispatch]
    );

    useEffect(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian,
            vegan: isVegan,
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Filters</Text>
            <FilterSwitch
                label="Gluten Free"
                state={isGlutenFree}
                onChange={saveGlutenState}
            />
            <FilterSwitch
                label="Lactose Free"
                state={isLactoseFree}
                onChange={saveLactoseState}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={saveVegetarianState}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={saveVeganState}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
});

export default FiltersScreen;
