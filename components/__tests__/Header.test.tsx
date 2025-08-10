import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../Header';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('Given Header is rendered', () => {
  const useRouter = require('expo-router').useRouter;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('When rendered, then it should show the back button', () => {
    useRouter.mockReturnValue({ back: jest.fn() });

    const { getByTestId } = render(<Header showBackButton={true} />);
    const backButton = getByTestId('back-button'); 
    expect(backButton).toBeTruthy();
  });

  test('When the back button is pressed, then it should call router.back()', () => {
    const mockBack = jest.fn();
    useRouter.mockReturnValue({ back: mockBack });

    const { getByTestId } = render(<Header showBackButton={true} />);
    const backButton = getByTestId('back-button');

    fireEvent.press(backButton);
    expect(mockBack).toHaveBeenCalled();
  });

  test('When showBackButton is false, then back button is not shown', () => {
    useRouter.mockReturnValue({ back: jest.fn() });

    const { queryByTestId } = render(<Header showBackButton={false} />);
    expect(queryByTestId('back-button')).toBeNull();
  });
});
