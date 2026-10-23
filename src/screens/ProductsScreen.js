import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import SelectionBar from '../components/SelectionBar';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { validateRequired, validatePrice, isValid } from '../utils/validation';
import { colors, radius } from '../theme';

// Screen 2: Daily Grocery Food Products list (Admin + Customer)
export default function ProductsScreen({ navigation }) {
  const {
    user,
    products,
    favorites,
    toggleFavorite,
    addToCart,
    addManyToCart,
    addProduct,
    deleteProduct,
  } = useApp();
  const isAdmin = user.role === 'admin';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [products, query, category]
  );

  const toggleSelect = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const addSelected = () => {
    addManyToCart(selected);
    Alert.alert('Added', `${selected.length} product(s) added to cart`);
    setSelected([]);
  };

  const confirmDelete = (p) =>
    Alert.alert('Delete product', `Remove "${p.name}" from the store?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(p.id) },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} hitSlop={10}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.hello}>Hi, {user.name.split(' ')[0]} 👋</Text>
          <Text style={styles.role}>{isAdmin ? 'Admin' : 'Customer'}</Text>
        </View>
        {isAdmin ? (
          <Pressable onPress={() => setShowAdd(true)} hitSlop={10}>
            <Ionicons name="add-circle" size={30} color={colors.primary} />
          </Pressable>
        ) : (
          <View style={{ width: 28 }} />
        )}
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={colors.text} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
        {!!query && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color="#7C7C7C" />
          </Pressable>
        )}
      </View>

      <View style={{ height: 46 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14 }}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.chip, category === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === c && { color: '#fff' }]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>No products found</Text>}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isAdmin={isAdmin}
            selected={selected.includes(item.id)}
            onToggleSelect={() => toggleSelect(item.id)}
            isFav={favorites.includes(item.id)}
            onToggleFav={() => toggleFavorite(item.id)}
            onAdd={() => {
              addToCart(item.id);
              Alert.alert('Added to cart', item.name);
            }}
            onDelete={() => confirmDelete(item)}
            onPress={() => !isAdmin && navigation.navigate('ProductDetails', { id: item.id })}
          />
        )}
      />

      <SelectionBar count={selected.length} onAdd={addSelected} onClear={() => setSelected([])} />

      {isAdmin && (
        <AddProductModal
          visible={showAdd}
          onClose={() => setShowAdd(false)}
          onSave={(p) => {
            addProduct(p);
            setShowAdd(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

// Admin only: add a new product to the list
function AddProductModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', price: '', unit: '', emoji: '🛒', category: 'Fruits' });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const e = {
      name: validateRequired('Product name')(form.name),
      price: validatePrice(form.price),
      unit: validateRequired('Quantity / unit')(form.unit),
    };
    setErrors(e);
    if (!isValid(e)) return;
    onSave({
      name: form.name.trim(),
      price: Number(form.price),
      unit: form.unit.trim(),
      emoji: form.emoji || '🛒',
      category: form.category,
      description: `${form.name.trim()} - fresh from our store.`,
    });
    setForm({ name: '', price: '', unit: '', emoji: '🛒', category: 'Fruits' });
    setErrors({});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBg}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Add Product</Text>
          <AppInput label="Product name" value={form.name} onChangeText={set('name')} autoCapitalize="words" error={errors.name} />
          <AppInput label="Price (₹)" value={form.price} onChangeText={set('price')} keyboardType="decimal-pad" error={errors.price} />
          <AppInput label="Quantity / unit (e.g. 1kg)" value={form.unit} onChangeText={set('unit')} error={errors.unit} />
          <AppInput label="Emoji" value={form.emoji} onChangeText={set('emoji')} maxLength={2} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 }}>
            {CATEGORIES.slice(1).map((c) => (
              <Pressable
                key={c}
                onPress={() => set('category')(c)}
                style={[styles.chip, form.category === c && styles.chipActive, { marginBottom: 6 }]}
              >
                <Text style={[styles.chipText, form.category === c && { color: '#fff' }]}>{c}</Text>
              </Pressable>
            ))}
          </View>
          <AppButton title="Save Product" onPress={submit} style={{ height: 54, marginBottom: 10 }} />
          <AppButton title="Cancel" variant="outline" onPress={onClose} style={{ height: 54 }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  hello: { fontSize: 18, fontWeight: '800', color: colors.text },
  role: { fontSize: 12, color: colors.primary, fontWeight: '700' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 14,
    height: 50,
    borderRadius: radius.md,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: colors.text },
  chip: {
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    marginRight: 8,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.primary, fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40, fontSize: 16 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 14 },
});
