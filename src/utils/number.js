const formatter = new Intl.NumberFormat('en-US');

export const formatIntlNumber = (value) => formatter.format(value);

