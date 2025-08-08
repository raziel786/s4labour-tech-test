import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TaskCard from './TaskCard';
import TabBar from './TabBar';
import { useIsFocused } from '@react-navigation/native';
import type { Task } from '@/types/taskTypes';

type Props = {
  allTasks: Task[];
};

export default function TabView({ allTasks }: Props) {
  const isFocused = useIsFocused();

  const [activeTab, setActiveTab] = useState<string>('All Tasks');

    useEffect(() => {
    if (isFocused) {
      setActiveTab('All Tasks'); // set the default tab to all tasks when the screen
    }
  }, [isFocused]);

  
  if (allTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5 name="tasks" size={36} color="purple" />
        <Text style={styles.emptyText}>Currently No Tasks</Text>
      </View>
    );
  }

  const activeTasks = allTasks.filter((task: { active: boolean; }) => task.active);
  const completedTasks = allTasks.filter((task: { active: boolean; }) => !task.active);

  const selectData = () => {
    switch (activeTab) {
      case 'In Progress':
        return activeTasks;
      case 'Done':
        return completedTasks;
      default:
        return allTasks;
    }
  };

  const handleTabPress = (tab: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabBar
          tabs={['All Tasks', 'In Progress', 'Done']}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
      <FlatList
        data={selectData()}
        renderItem={({ item }) => <TaskCard {...item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>No items to show</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    paddingTop: 16,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 10,
  },
  emptyList: {
    padding: 20,
    alignItems: 'center',
  },
});
