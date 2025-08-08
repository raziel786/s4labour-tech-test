import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
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
      <View style={styles.button}>
        <Button
          onPress={() => router.push('/AddTask')}
          title="Add New Task" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    paddingHorizontal: 16
  }
});
