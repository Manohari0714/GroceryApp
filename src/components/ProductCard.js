import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { formatCurrency } from '../utils/currency';

/**
 * Grid card used on Products and Favorites screens.
 * - checkbox (top-left) lets the user select multiple products
 * - heart toggles favourite (customer only)
 * - "+" adds a single product to the cart
 */
export default function ProductCard({
  product,
  selected,
  onToggleSelect,
  onPress,
  onAdd,
  isFav,
  onToggleFav,
  isAdmin,
  onDelete,
}) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.topRow}>
        {!isAdmin || onToggleSelect ? (
          <Pressable hitSlop={8} onPress={onToggleSelect}>
            <Ionicons
              name={selected ? 'checkbox' : 'square-outline'}
              size={22}
              color={selected ? colors.primary : '#BDBDBD'}
            />
          </Pressable>
        ) : (
          <View />
        )}
        {isAdmin ? (
          <Pressable hitSlop={8} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        ) : (
          <Pressable hitSlop={8} onPress={onToggleFav}>
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={22}
              color={isFav ? colors.danger : '#BDBDBD'}
            />
          </Pressable>
        )}
      </View>

      <View style={[styles.imageBox, { backgroundColor: product.bg }]}>
        <Text style={styles.emoji}>{product.emoji}</Text>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.unit} numberOfLines={1}>
        {product.unit}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Pressable style={styles.addBtn} onPress={onAdd}>
          <Ionicons name="add" size={26} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  cardSelected: { borderColor: colors.primary, borderWidth: 2 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  imageBox: {
    height: 90,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  emoji: { fontSize: 52 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  unit: { fontSize: 13, color: colors.muted, marginTop: 2, marginBottom: 10 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: '700', color: colors.text },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
