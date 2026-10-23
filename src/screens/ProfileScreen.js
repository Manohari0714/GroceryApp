import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { colors, radius } from '../theme';

// Screen 3a: Profile (Customer only)
export default function ProfileScreen({ navigation }) {
  const { user, signOut, favorites, cartCount } = useApp();

  const logout = () =>
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: signOut },
    ]);

  const Row = ({ icon, label, value }) => (
    <View style={styles.row}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <View style={{ marginLeft: 14, flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value || 'Not added yet'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} hitSlop={10}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>My Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{cartCount}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Row icon="person-outline" label="Name" value={user.name} />
          <Row icon="mail-outline" label="Email" value={user.email} />
          <Row icon="call-outline" label="Phone" value={user.phone} />
          <Row icon="location-outline" label="Address" value={user.address} />
        </View>

        <AppButton
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          style={{ marginTop: 22 }}
        />
        <AppButton title="Log Out" variant="outline" onPress={logout} style={{ marginTop: 12 }} />
      </ScrollView>
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
  avatarWrap: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 40, fontWeight: '800' },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 12 },
  email: { color: colors.muted, marginTop: 2 },
  stats: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingVertical: 14,
    marginBottom: 18,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: colors.primary },
  statLabel: { color: colors.muted, fontSize: 13 },
  statDivider: { width: 1, backgroundColor: '#C9E5D2' },
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: { color: colors.muted, fontSize: 12 },
  rowValue: { color: colors.text, fontSize: 16, fontWeight: '600', marginTop: 2 },
});
