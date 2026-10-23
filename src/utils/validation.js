const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9]{10}$/;

export const validateEmail = (v) => {
  if (!v.trim()) return 'Email is required';
  if (!EMAIL_RE.test(v.trim())) return 'Enter a valid email address';
  return '';
};

export const validatePassword = (v) => {
  if (!v) return 'Password is required';
  if (v.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateName = (v) => {
  if (!v.trim()) return 'Name is required';
  if (v.trim().length < 3) return 'Name must be at least 3 characters';
  return '';
};

export const validatePhone = (v) => {
  if (!v.trim()) return 'Phone number is required';
  if (!PHONE_RE.test(v.trim())) return 'Phone number must be 10 digits';
  return '';
};

export const validateRequired = (label) => (v) => (!String(v).trim() ? `${label} is required` : '');

export const validatePrice = (v) => {
  if (!String(v).trim()) return 'Price is required';
  const n = Number(v);
  if (Number.isNaN(n) || n <= 0) return 'Enter a valid price';
  return '';
};

// Returns true when there are no errors in the errors object.
export const isValid = (errors) => Object.values(errors).every((e) => !e);
