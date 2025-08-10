import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TabView from './TabView';
import type { Task } from '@/types/taskTypes';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    dueDate: '2025-08-20',
    priority: 'High',
    active: true,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    dueDate: '2025-08-21',
    priority: 'Low',
    active: false,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    dueDate: '2025-08-22',
    priority: 'Medium',
    active: true,
  },
];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true, 
}));

describe('Given TabView is rendered', () => {
  test('When rendered with no tasks, then it shows empty state', () => {
    const { getByText } = render(<TabView allTasks={[]} />);
    expect(getByText('Currently No Tasks')).toBeTruthy();
  });

  test('When rendered with tasks, then it shows all tasks by default', () => {
    const { getByText } = render(<TabView allTasks={mockTasks} />);
    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
    expect(getByText('Task 3')).toBeTruthy();
  });

  describe('When user switches tabs', () => {
    test('Then it should show only active tasks for "In Progress"', () => {
      const { getByText, queryByText, queryAllByText } = render(<TabView allTasks={mockTasks} />);
      fireEvent.press(queryAllByText('In Progress')[0]);

      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 3')).toBeTruthy();
      expect(queryByText('Task 2')).toBeNull();
    });

    test('Then it should show only completed tasks for "Done"', () => {
      const { getByText, queryByText } = render(<TabView allTasks={mockTasks} />);
      fireEvent.press(getByText('Done'));

      expect(getByText('Task 2')).toBeTruthy();
      expect(queryByText('Task 1')).toBeNull();
      expect(queryByText('Task 3')).toBeNull();
    });

    test('Then it should show no items message if no tasks for the selected tab', () => {
      const tasksWithNoDone: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          dueDate: '2025-08-20',
          priority: 'High',
          active: true,
        },
        {
          id: '3',
          title: 'Task 3',
          description: 'Description 3',
          dueDate: '2025-08-22',
          priority: 'Medium',
          active: true,
        },
      ];
      const { getByText } = render(<TabView allTasks={tasksWithNoDone} />);
      fireEvent.press(getByText('Done'));

      expect(getByText('No items to show')).toBeTruthy();
    });
  });
});
