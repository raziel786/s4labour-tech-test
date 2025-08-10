import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated,
{
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import moment from 'moment';
import { deleteTask, completeTask } from '@/redux/slices/Tasks';
import { useDispatch } from 'react-redux';
import { getPriorityColor, formatDueText } from '@/utils/taskHelpers';
import type { Task } from '@/types/taskTypes';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_SWIPE = SCREEN_WIDTH / 3;

export default function TaskCard({
  id,
  title,
  active,
  description,
  dueDate,
  priority,
}: Task) {
  const dispatch = useDispatch();
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
  .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      const newX = event.translationX;

      // Prevent swipe right to complete if task is 
      // already completed and swipe starts from center
      if (translateX.value === 0 && newX > 0 && !active) return;

      if (Math.abs(newX) <= MAX_SWIPE) {
        translateX.value = newX;
      }
    })
    .onEnd(() => {
      if (translateX.value <= -MAX_SWIPE * 0.6) {
        translateX.value = withSpring(-MAX_SWIPE);
      } else if (translateX.value >= MAX_SWIPE * 0.6 && active) {
        translateX.value = withSpring(MAX_SWIPE);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  /**
   * we want day-accurate and not influenced by the current time of day
   */
  const daysLeft = moment(dueDate, 'DD/MM/YYYY').startOf('day')
    .diff(moment().startOf('day'), 'days');

  const onDelete = () => {
    dispatch(deleteTask(id));
    translateX.value = withSpring(0);
  };

  const onComplete = () => {
    dispatch(completeTask(id));
    translateX.value = withSpring(0);
  };

  return (
    <View style={styles.swipeWrapper}>
      <TouchableOpacity  
        testID={`task-card-swipable-delete-button`}
          onPress={onDelete} 
          style={styles.rightAction}
        >
        <View style={styles.deleteButton}>
          <Text style={styles.actionText}>Delete</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        testID={`task-card-swipable-complete-button`}
        onPress={onComplete}
        style={[styles.leftAction, { opacity: active ? 1 : 0.3 }]}
        disabled={!active}
      >
        <View style={styles.completeButton}>
          <Text style={styles.actionText}>Complete</Text>
        </View>
      </TouchableOpacity>
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyle]}>
          <View style={styles.shadowWrapper}>
            <View style={[
              styles.card,
              { borderLeftWidth: 8, borderLeftColor: active ? 'green' : 'black' },
            ]}>
              <View style={styles.tagRow}>
                <Text
                  style={[
                    styles.priorityTag,
                    { backgroundColor: getPriorityColor(priority) },
                  ]}
                >
                  {priority}
                </Text>
                <Text
                  style={[
                    styles.statusTag,
                    { backgroundColor: active ? 'green' : 'black' },
                  ]}
                >
                  {active ? 'In Progress' : 'Completed'}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <Text style={styles.dueText}>{formatDueText(daysLeft)}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeWrapper: {
    marginVertical: 8,
    justifyContent: 'center',
  },
  shadowWrapper: {
    backgroundColor: 'snow',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  leftAction: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: SCREEN_WIDTH / 3,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  rightAction: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: SCREEN_WIDTH / 3,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  deleteButton: {
    padding: 10,
  },
  completeButton: {
    padding: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    padding: 12,
    minHeight: 150,
    overflow:'hidden'
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  dueText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'grey',
    fontStyle: 'italic'
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    gap: 8, 
  },
  priorityTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'white',
    textTransform: 'capitalize',
  },
  statusTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'white',
    textTransform: 'capitalize',
  },
});
