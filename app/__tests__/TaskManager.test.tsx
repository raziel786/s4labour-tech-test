import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskManager from '../TaskManager';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(), 
}));

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true, 
}));

const mockTasks = [
  { id: '1', title: 'Task 1', description: 'Desc 1', dueDate: '2025-08-20', priority: 'High', active: true },
  { id: '2', title: 'Task 2', description: 'Desc 2', dueDate: '2025-08-21', priority: 'Low', active: false },
];

const useSelector = require('react-redux').useSelector as jest.Mock;

describe('Given TaskManager component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('When rendered, then it should display tasks from redux state', () => {
    useSelector.mockImplementation((selectorFn: any) =>
      selectorFn({ taskList: { tasks: mockTasks } })
    );

    const { getByText } = render(<TaskManager />);

    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('When "Add New Task" button is pressed, then router.push is called with /AddTask', () => {
    const useRouter = require('expo-router').useRouter;
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    useSelector.mockImplementation((selectorFn: any) =>
      selectorFn({ taskList: { tasks: mockTasks } })
    );

    const { getByText } = render(<TaskManager />);
    const addButton = getByText('Add New Task');
    fireEvent.press(addButton);

    expect(mockPush).toHaveBeenCalledWith('/AddTask');
  });
});
