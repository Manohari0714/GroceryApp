import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Toggle between the two user types: Customer / Admin
export default function RoleSwitch({ role, onChange }) {
  return (
    <View style={styles.wrap}>
      {['customer', 'admin'].map((r) => (
        <Pressable
          key={r}
          onPress={() => onChange(r)}
          style={[styles.item, role === r && styles.active]}
        >
          <Text style={[styles.text, role === r && { color: '#fff' }]}>
            {r === 'customer' ? 'Customer' : 'Admin'}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: 4,
    marginBottom: 22,
  },
  item: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 11 },
  active: { backgroundColor: colors.primary },
  text: { fontWeight: '700', color: colors.primary, fontSize: 16 },
});
