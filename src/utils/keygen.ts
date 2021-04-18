const sequence = () => (Math.random() * 2147483647).toString(16);

export const keygen = () => sequence() + sequence() + '-' + sequence();