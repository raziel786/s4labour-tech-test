import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Given the Button is enabled', () => {
  test('When pressed, then it should call the onPress handler', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Click Me'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

describe('Given the Button is disabled', () => {
  test('When pressed, then it should not call the onPress handler', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText('Click Me'));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  test('When rendered, then it should have disabled text styles', () => {
    const { getByText } = render(
      <Button title="Disabled" onPress={jest.fn()} disabled />
    );

    const textElement = getByText('Disabled');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#ccc' }),
      ])
    );
  });
});

describe('Given a title prop', () => {
  test('When rendered, then it should display the correct text', () => {
    const title = 'Submit';
    const { getByText } = render(
      <Button title={title} onPress={jest.fn()} />
    );

    expect(getByText(title)).toBeTruthy();
  });
});
