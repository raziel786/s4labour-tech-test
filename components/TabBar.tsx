import React from 'react';
import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

type Props = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export default function TabBar({ tabs, activeTab, onTabPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.segment}>
        {tabs.map((label, index) => {
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;
          const isActive = activeTab === label;

          return (
            <Pressable
              key={label}
              onPress={() => onTabPress(label)}
              style={[
                styles.tab,
                isActive ? styles.activeTab : styles.inactiveTab,
                isFirst && styles.firstTab,
                isLast && styles.lastTab,
              ]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center', 
    paddingVertical: 10,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 16,
    overflow: 'hidden',
    width: windowWidth * 0.92, 
    borderColor:'lightgray',
    borderWidth:1
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'purple',
  },
  inactiveTab: {
    backgroundColor: 'snow',
  },
  firstTab: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  lastTab: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
