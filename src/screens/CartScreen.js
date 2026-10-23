import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { colors, radius } from '../theme';
import { formatCurrency } from '../utils/currency';

// Screen 6: My Cart (Admin + Customer) - add / subtract items
export default function CartScreen({ navigation }) {
  const { cartItems, cartTotal, increment, decrement, removeFromCart, clearCart } = useApp();

  const checkout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add some products first.');
      return;
    }
    Alert.alert('Order placed 🎉', `Total paid: ${formatCurrency(cartTotal)}`, [
      { text: 'OK', onPress: clearCart },
    ]);
  };

  const confirmRemove = (item) =>
    Alert.alert('Remove item', `Remove ${item.name} from cart?`, [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: () => removeFromCart(item.id) },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} hitSlop={10}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>My Cart</Text>
        <View style={{ width: 28 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 60 }}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add products from the store to see them here</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 18 }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={[styles.thumb, { backgroundColor: item.bg }]}>
                  <Text style={{ fontSize: 38 }}>{item.emoji}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Pressable onPress={() => confirmRemove(item)} hitSlop={10}>
                      <Ionicons name="close" size={22} color={colors.muted} />
                    </Pressable>
                  </View>
                  <Text style={styles.unit}>{item.unit}</Text>
                  <View style={[styles.rowBetween, { marginTop: 10 }]}>
                    <View style={styles.qtyRow}>
                      <Pressable style={styles.qtyBtn} onPress={() => decrement(item.id)}>
                        <Ionicons name="remove" size={20} color={colors.muted} />
                      </Pressable>
                      <Text style={styles.qty}>{item.qty}</Text>
                      <Pressable style={styles.qtyBtn} onPress={() => increment(item.id)}>
                        <Ionicons name="add" size={20} color={colors.primary} />
                      </Pressable>
                    </View>
                    <Text style={styles.price}>{formatCurrency(item.price * item.qty)}</Text>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(cartTotal)}</Text>
            </View>
            <AppButton title="Go to Checkout" onPress={checkout} style={{ marginTop: 14 }} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 12 },
  emptySub: { color: colors.muted, marginTop: 6, textAlign: 'center' },
  item: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumb: { width: 82, height: 82, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, marginRight: 6 },
  unit: { color: colors.muted, fontSize: 13, marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontSize: 17, fontWeight: '700', marginHorizontal: 14, color: colors.text },
  price: { fontSize: 17, fontWeight: '800', color: colors.text },
  footer: { padding: 18, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontSize: 18, color: colors.muted, fontWeight: '600' },
  totalValue: { fontSize: 22, fontWeight: '800', color: colors.text },
});
