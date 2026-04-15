import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity 
      style={[styles.button, isPrimary ? styles.primary : styles.secondary]} 
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primary: {
    backgroundColor: '#1E293B', // Slate Dark
  },
  secondary: {
    backgroundColor: '#E2E8F0', // Gray Light
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#334155',
  }
});