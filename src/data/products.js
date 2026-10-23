export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat'];

const USD_TO_INR = 83;

export const INITIAL_PRODUCTS = [
  { id: 'p1', name: 'Organic Bananas', price: 4.99 * USD_TO_INR, unit: '7pcs, Priceg', category: 'Fruits', emoji: '🍌', bg: '#FFF6D6', rating: 4.5, description: 'Fresh organic bananas, naturally sweet and rich in potassium. Perfect for breakfast, smoothies or a quick snack.' },
  { id: 'p2', name: 'Red Apple', price: 4.99 * USD_TO_INR, unit: '1kg, Priceg', category: 'Fruits', emoji: '🍎', bg: '#FDE8E8', rating: 4.6, description: 'Crisp and juicy red apples picked at peak ripeness. A great source of fibre and vitamin C.' },
  { id: 'p3', name: 'Fresh Oranges', price: 3.49 * USD_TO_INR, unit: '1kg, Priceg', category: 'Fruits', emoji: '🍊', bg: '#FFEBD6', rating: 4.4, description: 'Sweet and tangy oranges loaded with vitamin C. Ideal for fresh juice or eating as they are.' },
  { id: 'p4', name: 'Bell Pepper Red', price: 1.99 * USD_TO_INR, unit: '1kg, Priceg', category: 'Vegetables', emoji: '🫑', bg: '#FDE0E0', rating: 4.3, description: 'Crunchy red bell peppers with a mildly sweet flavour. Great for salads, stir fries and grilling.' },
  { id: 'p5', name: 'Fresh Carrots', price: 2.29 * USD_TO_INR, unit: '1kg, Priceg', category: 'Vegetables', emoji: '🥕', bg: '#FFEBD6', rating: 4.5, description: 'Farm fresh carrots, rich in beta-carotene. Enjoy them raw, roasted or in soups.' },
  { id: 'p6', name: 'Ginger', price: 2.99 * USD_TO_INR, unit: '250gm, Priceg', category: 'Vegetables', emoji: '🫚', bg: '#F5ECDD', rating: 4.2, description: 'Aromatic ginger root for teas, curries and marinades. Known for its soothing properties.' },
  { id: 'p7', name: 'Fresh Tomato', price: 1.49 * USD_TO_INR, unit: '1kg, Priceg', category: 'Vegetables', emoji: '🍅', bg: '#FDE3E3', rating: 4.4, description: 'Ripe, juicy tomatoes ideal for salads, sauces and everyday cooking.' },
  { id: 'p8', name: 'Fresh Milk', price: 1.89 * USD_TO_INR, unit: '1L, Priceg', category: 'Dairy', emoji: '🥛', bg: '#E8F1FB', rating: 4.7, description: 'Pure, pasteurised full cream milk delivered fresh every day. Rich in calcium and protein.' },
  { id: 'p9', name: 'Farm Eggs', price: 3.99 * USD_TO_INR, unit: '12pcs, Priceg', category: 'Dairy', emoji: '🥚', bg: '#FFF3E0', rating: 4.6, description: 'Free-range farm eggs packed with protein. Perfect for breakfast, baking and more.' },
  { id: 'p10', name: 'Cheddar Cheese', price: 5.49 * USD_TO_INR, unit: '250gm, Priceg', category: 'Dairy', emoji: '🧀', bg: '#FFF5CC', rating: 4.5, description: 'Matured cheddar cheese with a rich, sharp taste. Great for sandwiches and cooking.' },
  { id: 'p11', name: 'Whole Wheat Bread', price: 2.49 * USD_TO_INR, unit: '1 loaf, Priceg', category: 'Bakery', emoji: '🍞', bg: '#F7EBDD', rating: 4.3, description: 'Soft whole wheat bread baked fresh daily with no added preservatives.' },
  { id: 'p12', name: 'Butter Croissant', price: 1.79 * USD_TO_INR, unit: '2pcs, Priceg', category: 'Bakery', emoji: '🥐', bg: '#FFF0D9', rating: 4.6, description: 'Flaky, buttery croissants baked golden every morning.' },
  { id: 'p13', name: 'Chicken Breast', price: 7.99 * USD_TO_INR, unit: '500gm, Priceg', category: 'Meat', emoji: '🍗', bg: '#FDEDE4', rating: 4.4, description: 'Fresh, skinless and boneless chicken breast. High in protein and perfect for any recipe.' },
  { id: 'p14', name: 'Fresh Fish', price: 9.49 * USD_TO_INR, unit: '500gm, Priceg', category: 'Meat', emoji: '🐟', bg: '#E4F2F7', rating: 4.5, description: 'Daily catch fish, cleaned and ready to cook. A great source of omega-3.' },
];

// Demo accounts so you can log in immediately (no backend / database).
export const SEED_USERS = [
  { id: 'u-admin', role: 'admin', name: 'Store Admin', email: 'admin@grocery.com', password: 'admin123', phone: '9000000001', address: 'Head Office, Coimbatore' },
  { id: 'u-demo', role: 'customer', name: 'Demo Customer', email: 'customer@grocery.com', password: 'customer123', phone: '9000000002', address: '12, Gandhi Street, Coimbatore' },
];
