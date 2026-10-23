import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { colors } from '../theme';

// Screen 1: Home / Welcome screen with Sign up & Sign in options
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.logo}>🥕</Text>
          <Text style={styles.title}>Welcome{'\n'}to our store</Text>
          <Text style={styles.subtitle}>Get your daily groceries in as fast as one hour</Text>
        </View>

        <View style={styles.actions}>
          <Text style={styles.label}>Continue as</Text>
          <AppButton
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
            style={{ marginBottom: 14 }}
          />
          <AppButton
            title="Sign Up"
            variant="outline"
            onPress={() => navigation.navigate('SignUp')}
          />
          <Text style={styles.hint}>Admin and Customer accounts are both supported</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  page: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  hero: { flex: 0.6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { color: '#fff', fontSize: 38, fontWeight: '800', textAlign: 'center', lineHeight: 44 },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 16, textAlign: 'center', marginTop: 12 },
  actions: {
    flex: 0.4,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 34,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  label: { color: colors.muted, fontWeight: '600', marginBottom: 14, textAlign: 'center' },
  hint: { textAlign: 'center', color: colors.muted, fontSize: 13, marginTop: 16 },
});
