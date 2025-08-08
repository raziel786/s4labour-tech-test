import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import TabView from '@/components/TabView';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import Button from '@/components/Button'
import type { RootState } from '@/redux/store';

export default function TaskManager() {
  const router = useRouter();
  const { tasks } = useSelector((state: RootState) => state.taskList);

  return (
    <SafeAreaView style={styles.container}>
      <TabView allTasks={tasks} />
      <Button
        onPress={() => router.push('/AddTask')}
        title="Add New Task" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
