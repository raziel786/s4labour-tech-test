import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
};

export default function Button({ title, onPress, disabled = false, testID }: ButtonProps) {
  return (
    <TouchableOpacity
    testID={testID}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    marginVertical:32,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'darkgrey',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledButtonText: {
    color: '#ccc',
  },
});
