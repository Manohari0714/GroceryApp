import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import SelectionBar from '../components/SelectionBar';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

// Screen 4: Favorites (Customer only)
export default function FavoritesScreen({ navigation }) {
  const { products, favorites, toggleFavorite, addToCart, addManyToCart } = useApp();
  const [selected, setSelected] = useState([]);

  const favProducts = products.filter((p) => favorites.includes(p.id));

  const toggleSelect = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const addSelected = () => {
    addManyToCart(selected);
    Alert.alert('Added', `${selected.length} favourite(s) added to cart`);
    setSelected([]);
  };

  const addAll = () => {
    addManyToCart(favProducts.map((p) => p.id));
    Alert.alert('Added', 'All favourites added to cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} hitSlop={10}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>Favorites</Text>
        <View style={{ width: 28 }} />
      </View>

      {favProducts.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 60 }}>💚</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySub}>Tap the heart on any product to save it here</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favProducts}
            keyExtractor={(i) => i.id}
            numColumns={2}
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                selected={selected.includes(item.id)}
                onToggleSelect={() => toggleSelect(item.id)}
                isFav
                onToggleFav={() => {
                  toggleFavorite(item.id);
                  setSelected((s) => s.filter((x) => x !== item.id));
                }}
                onAdd={() => {
                  addToCart(item.id);
                  Alert.alert('Added to cart', item.name);
                }}
                onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
              />
            )}
          />
          {selected.length > 0 ? (
            <SelectionBar count={selected.length} onAdd={addSelected} onClear={() => setSelected([])} />
          ) : (
            <View style={{ padding: 16 }}>
              <AppButton title="Add All To Cart" onPress={addAll} />
            </View>
          )}
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
});
