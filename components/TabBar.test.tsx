import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TabBar from './TabBar';

describe('Given TabBar is rendered with tabs and an active tab', () => {
  const tabs = ['Home', 'Profile', 'Settings'];
  const activeTab = 'Profile';
  const onTabPress = jest.fn();

  test('When rendered, then it should render all tabs', () => {
    const { getByText } = render(
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />
    );
    tabs.forEach(tab => {
      expect(getByText(tab)).toBeTruthy();
    });
  });

  test('When rendered, then the active tab should have active styling', () => {
    const { getByText } = render(
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />
    );
    const activeTabText = getByText(activeTab);
    expect(activeTabText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
    );
  });

  test('When a tab is pressed, then it should call onTabPress with the tab label', () => {
    const { getByText } = render(
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />
    );

    const tabToPress = getByText('Settings');
    fireEvent.press(tabToPress);
    expect(onTabPress).toHaveBeenCalledWith('Settings');
  });
});
