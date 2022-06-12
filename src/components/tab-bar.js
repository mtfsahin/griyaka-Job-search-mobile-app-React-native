import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from './button'
import {Search,List,Message,User} from './icons'

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' , backgroundColor:'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
      
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        return label === 'Searchmain' ? (
          
            <Button key={label} flex={1} onPress={onPress} >
                <Search />
            </Button>
        ):(
          <Button key={label} height={78} flex={1} onPress={onPress}>
            {label === 'Application' && <List/>}
            {label === 'Messages' && <Message/>}
            {label === 'ProfileMain' && <User/>}
          </Button>
        );
      })}
    </View>
  );
}

export default TabBar;