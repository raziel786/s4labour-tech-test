import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import Button from '@/components/Button';
import TabBar from '@/components/TabBar';
import { addTask } from '@/redux/slices/Tasks';
import moment from 'moment';

export default function AddTask() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Low',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = async () => {
    const { dueDate, ...rest } = task;

    const payload = {
      ...rest,
     dueDate: moment(dueDate).format('DD/MM/YYYY'),
    };
    await dispatch(addTask(payload));
    /**
     * we dont want the back button to render when it goes back to the 'Task Manager"
     * screen, so we simply go back to the original screen.
     */
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          onChangeText={(title) => setTask((prev) => ({ ...prev, title }))}
          value={task.title}
          placeholder="Title"
          placeholderTextColor="grey"
          style={styles.input}
        />
        <TextInput
          onChangeText={(description) =>
            setTask((prev) => ({ ...prev, description }))
          }
          value={task.description}
          placeholder="Description"
          placeholderTextColor="grey"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
        <View style={styles.section}>
          <Text style={styles.label}>Due By:</Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateArea}>
              {task.dueDate.toLocaleDateString()}
            </Text>
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={task.dueDate}
          minimumDate={new Date()}
          onConfirm={(selectedDate) => {
            setTask((prev) => ({ ...prev, dueDate: selectedDate }));
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
        <Text style={styles.label}>Priority:</Text>
        <TabBar
          tabs={['Low', 'Medium', 'High']}
          activeTab={task.priority}
          onTabPress={(priority) => setTask((prev) => ({ ...prev, priority }))}
        />
        <Button
          disabled={
            task.title.trim().length === 0 ||
            task.description.trim().length === 0 ||
            !task.dueDate ||
            task.priority.trim().length === 0
          }
          title="Add Task"
          onPress={handleAddTask}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16
  },
  input: {
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  dateArea: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: 14
  },
  textArea: {
    height: 100,
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    textAlignVertical: 'top',
    marginTop:16
  },
  section: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
