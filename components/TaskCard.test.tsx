import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskCard from './TaskCard';
import { Priority } from '@/types/taskTypes';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));


describe('Given TaskCard is rendered', () => {
  const taskProps = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '20/08/2025',
    priority: 'High' as Priority,
    active: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('When rendered, then it should display task info', () => {
    const { getByText } = render(<TaskCard {...taskProps} />);

    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText(/Due in/i)).toBeTruthy();
    expect(getByText('High')).toBeTruthy(); 
    expect(getByText('In Progress')).toBeTruthy(); 
  });

  it('When delete button is pressed, then dispatch deleteTask action', () => {
    const { getByTestId } = render(<TaskCard {...taskProps} />);
    const deleteButton = getByTestId('task-card-swipable-delete-button');

    fireEvent.press(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'tasks/deleteTask',
      payload: '1',
    }));
  });

  it('When complete button is pressed, then dispatch completeTask action', () => {
    const { getByText } = render(<TaskCard {...taskProps} />);
    const completeButton = getByText('Complete');

    fireEvent.press(completeButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'tasks/completeTask',
      payload: '1',
    }));
  });

  it('Then complete button should be disabled', () => {
    const { getByTestId } = render(<TaskCard {...taskProps} active={false} />);
    const completeButton = getByTestId('task-card-swipable-complete-button');
    expect(completeButton.props.accessibilityState.disabled).toBe(true);
  });
});
