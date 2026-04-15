import { TextInput, StyleSheet } from 'react-native';

export default function Input({ style, ...props }) {
  return <TextInput style={[styles.input, style]} placeholderTextColor="#999" {...props} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
});