import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

// Bottom bar shown when one or more products are ticked.
export default function SelectionBar({ count, onAdd, onClear }) {
  if (!count) return null;
  return (
    <View style={styles.bar}>
      <Pressable onPress={onClear}>
        <Text style={styles.clear}>Clear</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={onAdd}>
        <Text style={styles.btnText}>Add {count} selected to Cart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clear: { color: colors.muted, fontSize: 16, fontWeight: '600' },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
