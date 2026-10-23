# GroceryShop – React Native (Expo) Mobile App

MCA Sem III – Core Elective II: Mobile App Development using React Native
Model Exam Oct 2026 – Major Hackathon

No back end or database is used – all data is held in memory (React Context).

---

## 1. Requirements (install once)

1. **Node.js LTS** (v18 or newer) – https://nodejs.org
2. **Expo Go** app on your phone (Play Store / App Store)
   – or an Android emulator / iOS simulator
3. Phone and laptop must be on the **same Wi-Fi**

Check:

```bash
node -v
npm -v
```

## 2. Run the project

Unzip the folder, open a terminal inside `GroceryShop` and run:

```bash
cd GroceryShop
npm install
npx expo install --fix
npx expo start -c
```

* `npm install` – downloads packages
* `npx expo install --fix` – aligns every package version with your installed Expo SDK (prevents version errors)
* `npx expo start -c` – starts Metro (the `-c` clears cache)

Then:

* Scan the **QR code** with **Expo Go** (Android) or the **Camera app** (iPhone), or
* press **`a`** for Android emulator, **`i`** for iOS simulator, **`w`** for web preview.

If the QR code does not connect (college Wi-Fi blocks it):

```bash
npx expo start --tunnel
```

### If you get an error

| Problem | Fix |
|---|---|
| "Unable to resolve module ..." | `npm install` then `npx expo install --fix` then `npx expo start -c` |
| Reanimated / worklets error | `npx expo install react-native-reanimated react-native-worklets` then `npx expo start -c` |
| Phone can't connect | Same Wi-Fi, or use `npx expo start --tunnel` |
| Version mismatch warning in Expo Go | `npx expo install --fix` |

If your project has no `assets` folder, that is fine – none are required.

## 3. Demo logins

| Role | Email | Password |
|---|---|---|
| Customer | customer@grocery.com | customer123 |
| Admin | admin@grocery.com | admin123 |

You can also create new accounts with **Sign Up** (choose Customer or Admin).
On the Sign In screen, tap **"Use demo … login"** to auto-fill.

## 4. Mapping to the question paper

### Part I – Screens (30)

| # | Screen | File | Users |
|---|---|---|---|
| 1 | Home (Sign Up & Sign In options) | `src/screens/HomeScreen.js` (+ `SignInScreen`, `SignUpScreen`) | Admin & Customer |
| 2 | Daily Grocery Products list | `src/screens/ProductsScreen.js` | Admin & Customer |
| 3 | Profile & Edit Profile | `ProfileScreen.js`, `EditProfileScreen.js` | Customer only |
| 4 | Favorites | `src/screens/FavoritesScreen.js` | Customer only |
| 5 | Product Details | `src/screens/ProductDetailsScreen.js` | Customer only |
| 6 | My Cart | `src/screens/CartScreen.js` | Admin & Customer |

(The paper says "Student" on screens 5 and 6 – treated as Customer.)

### Part II – Navigation (30) – all three are used

| Navigation | Where (`src/navigation/RootNavigator.js`) |
|---|---|
| **Stack** | Home → Sign In / Sign Up (auth flow); Main → Product Details, Edit Profile |
| **Tabs** (bottom) | Products, Favorites, Cart, Profile (Admin sees Products + Cart only) |
| **Drawer** | Side menu with user header, Products, Favorites, My Cart, My Profile, Log Out |

### Part III – Functional requirements (15)

1. **Navigate every screen** – buttons, tabs, drawer, back arrows all work; Admin/Customer see their own screens.
2. **Add single or multiple products to cart**
   * Single: tap the green **+** button on a card (Products or Favorites) or **Add To Basket** on details.
   * Multiple: tick the **checkboxes** on several cards → **"Add N selected to Cart"** bar appears (also **Add All To Cart** on Favorites).
3. **Add / subtract in cart** – **+** and **–** buttons per item (item is removed at 0), ✕ to remove, live total, checkout.

### Basic validation (every form)

* Sign In: valid email, password ≥ 6, correct credentials and role
* Sign Up: name ≥ 3 chars, valid email, 10-digit phone, password ≥ 6, passwords match, duplicate email blocked
* Edit Profile: name, 10-digit phone, address required
* Admin Add Product: name, price > 0, unit required
* Cart: checkout blocked when empty

### Extra (admin)

Admin can **add** (＋ icon, top-right) and **delete** (trash icon) products.

## 5. Project structure

```
GroceryShop/
├── App.js                      # entry – providers + NavigationContainer
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── theme.js                # colours / shadows (green Grocery theme)
    ├── data/products.js        # 14 sample products + demo users
    ├── context/AppContext.js   # auth, products, favourites, cart logic
    ├── utils/validation.js     # validation helpers
    ├── navigation/RootNavigator.js   # Stack + Tabs + Drawer
    ├── components/             # AppButton, AppInput, ProductCard, SelectionBar, RoleSwitch
    └── screens/                # all 9 screens
```

## 6. Note about the Figma design

The app follows the green Grocery-shop style (green primary colour, rounded cards,
search bar, product grid, details page with quantity stepper, cart list with
steppers). Product images use emojis so the app works offline. To match the Figma
more closely, change colours in `src/theme.js` and replace the emoji with images
using `<Image source={{ uri: '...' }} />` in `ProductCard.js`.
