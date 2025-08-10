import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTask from '../AddTask';
import { StyleSheet } from 'react-native';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));


describe('Given AddTask component', () => {
  const useRouter = require('expo-router').useRouter;
  const useDispatch = require('react-redux').useDispatch;

  const mockBack = jest.fn();
  const mockDispatch = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ back: mockBack });
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should render inputs and controls correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddTask />);

    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
    expect(getByText(/Due By:/i)).toBeTruthy();
    expect(getByText('Low')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('should update title and description inputs', () => {
    const { getByPlaceholderText } = render(<AddTask />);

    const titleInput = getByPlaceholderText('Title');
    fireEvent.changeText(titleInput, 'New Task Title');
    expect(titleInput.props.value).toBe('New Task Title');

    const descriptionInput = getByPlaceholderText('Description');
    fireEvent.changeText(descriptionInput, 'Task Description');
    expect(descriptionInput.props.value).toBe('Task Description');
  });


  it('should update priority when tab is pressed', () => {
    const { getByText } = render(<AddTask />);
    /**
     * 1) styles are in an array due to conditional rendering, so lets flatten them into a single object
     * 2) Low is is default bold, where as Medium and High are not. Expect that to change depending on which 
     * button is pressed
     */
    let styles = StyleSheet.flatten(getByText('Low').props.style);
    expect(styles.fontWeight).toBe('bold');
    
    styles = StyleSheet.flatten(getByText('Medium').props.style);
    expect(styles).not.toHaveProperty('fontWeight');
    
    styles = StyleSheet.flatten(getByText('High').props.style);
    expect(styles).not.toHaveProperty('fontWeight');
    /**
     * when Medium is pressed
     */
    fireEvent.press(getByText('Medium'));
    styles = StyleSheet.flatten(getByText('Medium').props.style);
    expect(styles.fontWeight).toBe('bold');
    /**
     * when High is pressed
     */
    fireEvent.press(getByText('High'));
    styles = StyleSheet.flatten(getByText('High').props.style);
    expect(styles.fontWeight).toBe('bold');
  });

  it('should disable Add Task button when fields are invalid', () => {
    const { getByTestId, getByPlaceholderText } = render(<AddTask />);

    const addButton = getByTestId('add-task-button');
    expect(addButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(getByPlaceholderText('Title'), 'Title');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Description');

    expect(addButton.props.accessibilityState.disabled).toBe(false);
  });

  it('should dispatch addTask and call router.back when Add Task pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<AddTask />);

    fireEvent.changeText(getByPlaceholderText('Title'), 'Title');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Description');

    const addButton = getByText('Add Task');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockBack).toHaveBeenCalled();
    });
  });
});
