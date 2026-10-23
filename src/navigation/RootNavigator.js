import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProductsScreen from '../screens/ProductsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/* ------------------------------------------------------------------ */
/* (ii) TABS NAVIGATION - bottom tabs (role based)                      */
/* ------------------------------------------------------------------ */
function ShopTabs() {
  const { user, cartCount } = useApp();
  const isAdmin = user.role === 'admin';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12 },
        tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Products: focused ? 'storefront' : 'storefront-outline',
            Favorites: focused ? 'heart' : 'heart-outline',
            Cart: focused ? 'cart' : 'cart-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductsScreen} options={{ title: 'Shop' }} />
      {!isAdmin && <Tab.Screen name="Favorites" component={FavoritesScreen} />}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary },
        }}
      />
      {!isAdmin && <Tab.Screen name="Profile" component={ProfileScreen} />}
    </Tab.Navigator>
  );
}

/* ------------------------------------------------------------------ */
/* (iii) DRAWER NAVIGATION - side menu                                  */
/* ------------------------------------------------------------------ */
function CustomDrawerContent({ navigation }) {
  const { user, signOut, cartCount } = useApp();
  const isAdmin = user.role === 'admin';

  const go = (tab) => {
    navigation.navigate('Shop', { screen: tab });
    navigation.closeDrawer();
  };

  const Item = ({ icon, label, onPress, danger, badge }) => (
    <Pressable style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={22} color={danger ? colors.danger : colors.text} />
      <Text style={[styles.itemText, danger && { color: colors.danger }]}>{label}</Text>
      {!!badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.drawerName}>{user.name}</Text>
        <Text style={styles.drawerRole}>{isAdmin ? 'Admin' : 'Customer'} • {user.email}</Text>
      </View>

      <Item icon="storefront-outline" label="Products" onPress={() => go('Products')} />
      {!isAdmin && <Item icon="heart-outline" label="Favorites" onPress={() => go('Favorites')} />}
      <Item icon="cart-outline" label="My Cart" badge={cartCount} onPress={() => go('Cart')} />
      {!isAdmin && <Item icon="person-outline" label="My Profile" onPress={() => go('Profile')} />}
      <View style={styles.sep} />
      <Item icon="log-out-outline" label="Log Out" danger onPress={signOut} />
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerType: 'front' }}
    >
      <Drawer.Screen name="Shop" component={ShopTabs} />
    </Drawer.Navigator>
  );
}

/* ------------------------------------------------------------------ */
/* (i) STACK NAVIGATION - auth flow + detail screens                    */
/* ------------------------------------------------------------------ */
export default function RootNavigator() {
  const { user } = useApp();
  const isAdmin = user?.role === 'admin';

  return (
    <Stack.Navigator>
      {!user ? (
        // Not logged in: Home (Sign up / Sign in) -> SignIn / SignUp
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: '', headerShadowVisible: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '', headerShadowVisible: false }} />
        </>
      ) : (
        // Logged in: Drawer(Tabs) + pushed screens
        <>
          <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
          {!isAdmin && (
            <>
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ title: 'Product Details', headerTintColor: colors.text }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile', headerTintColor: colors.text }}
              />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: colors.primary,
    padding: 22,
    paddingTop: 50,
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: colors.primary },
  drawerName: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 12 },
  drawerRole: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 22 },
  itemText: { fontSize: 16, fontWeight: '600', color: colors.text, marginLeft: 16, flex: 1 },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  sep: { height: 1, backgroundColor: colors.border, marginVertical: 8, marginHorizontal: 22 },
});
