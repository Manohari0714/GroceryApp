import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function AppButton({ title, onPress, variant = 'primary', style, disabled }) {
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        outline ? styles.outline : styles.primary,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={[styles.text, outline && { color: colors.primary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 62,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  primary: { backgroundColor: colors.primary },
  outline: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.primary },
  text: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
