export const registerBody = {
  name: '',
  email: '',
  password: '',
  image: '',
};

export const loginBody = {
  email: '',
  password: '',
};

export const purchaseBody = {
  name: '',
  cardNumber: '',
  cvv: '',
  expirationDate: '',
};

const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email must be valid',
    },
  },
  password: {
    required: 'Password is required',
  },
};

export const validationRegisterRules = {
  ...validationRules,
  name: {
    required: 'Name is required',
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters',
    },
  },
  image: {
    required: 'Image is required',
    pattern: {
      value: /\.(jpg|jpeg|png)$/i,
      message: 'Image must be a .jpg, .jpeg, or .png file',
    },
  },
};

export const validationLoginRules = {
  ...validationRules,
};

export const validationPurchaseBody = {
  name: {
    required: 'Name is required',
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters',
    },
  },
  cardNumber: {
    required: 'Card number is required',
    pattern: {
      value: /^\d{16}$/,
      message: 'Card number must be exactly 16 digits',
    },
  },
  expirationDate: {
    required: 'Date is required',
    pattern: {
      value: /^\d{4}\/(0[1-9]|1[0-2])$/,
      message: 'Date must be in the format yyyy/mm (ej : 2024/01)',
    },
  },
};

export const validateForm = (formData, validationRules) => {
  const newErrors = {};

  Object.keys(validationRules).forEach(field => {
    const value = formData[field]?.trim();
    const { required, pattern } = validationRules[field];

    if (required && !value) {
      newErrors[field] = required;
    } else if (pattern && !pattern.value.test(value)) {
      newErrors[field] = pattern.message;
    }
  });

  return newErrors;
};