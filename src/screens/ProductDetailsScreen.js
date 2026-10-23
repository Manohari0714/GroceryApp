import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { formatCurrency } from '../utils/currency';

// Screen 5: Product details (Customer only)
export default function ProductDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { products, favorites, toggleFavorite, addToCart } = useApp();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20 }}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const isFav = favorites.includes(product.id);

  const add = () => {
    addToCart(product.id, qty);
    Alert.alert('Added to cart', `${qty} x ${product.name}`, [
      { text: 'Keep shopping', onPress: () => navigation.goBack() },
      { text: 'View cart', onPress: () => navigation.navigate('Main', { screen: 'Shop', params: { screen: 'Cart' } }) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View style={[styles.hero, { backgroundColor: product.bg }]}>
          <Text style={styles.emoji}>{product.emoji}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.unit}>{product.unit}</Text>
            </View>
            <Pressable onPress={() => toggleFavorite(product.id)} hitSlop={10}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={28}
                color={isFav ? colors.danger : colors.muted}
              />
            </Pressable>
          </View>

          <View style={[styles.row, { marginTop: 18 }]}>
            <View style={styles.qtyWrap}>
              <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} hitSlop={8}>
                <Ionicons name="remove" size={26} color={colors.muted} />
              </Pressable>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{qty}</Text>
              </View>
              <Pressable onPress={() => setQty((q) => q + 1)} hitSlop={8}>
                <Ionicons name="add" size={26} color={colors.primary} />
              </Pressable>
            </View>
            <Text style={styles.price}>{formatCurrency(product.price * qty)}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.section}>Product Detail</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.section}>Category</Text>
            <Text style={styles.value}>{product.category}</Text>
          </View>
          <View style={[styles.row, { marginTop: 14 }]}>
            <Text style={styles.section}>Review</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= Math.round(product.rating) ? 'star' : 'star-outline'}
                  size={18}
                  color={colors.star}
                />
              ))}
              <Text style={[styles.value, { marginLeft: 6 }]}>{product.rating}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 20 }}>
        <AppButton title="Add To Basket" onPress={add} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  hero: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  emoji: { fontSize: 140 },
  body: { padding: 22 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 24, fontWeight: '800', color: colors.text },
  unit: { color: colors.muted, fontSize: 15, marginTop: 4 },
  qtyWrap: { flexDirection: 'row', alignItems: 'center' },
  qtyBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  qtyText: { fontSize: 18, fontWeight: '700', color: colors.text },
  price: { fontSize: 24, fontWeight: '800', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 },
  section: { fontSize: 16, fontWeight: '700', color: colors.text },
  desc: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 8 },
  value: { color: colors.muted, fontWeight: '600' },
});
