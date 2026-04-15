import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from '../components/Input';
import { apiService } from '../services/apiService';

export default function StudentScreen() {
  const [ra, setRa] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleSave = async () => {
    if (!ra || !name || !photo) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    try {
      await apiService.addStudent({ ra, name, photo });
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      setRa(''); setName(''); setPhoto(null);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="RA do Aluno" value={ra} onChangeText={setRa} keyboardType="numeric" />
      <Input placeholder="Nome Compledo" value={name} onChangeText={setName} />
      
      <View style={styles.photoContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <Button title={photo ? "Trocar Foto" : "Selecionar Foto"} onPress={pickImage} color="#000" />
      </View>

      <Button title="Salvar Aluno" onPress={handleSave} color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  photoContainer: { alignItems: 'center', marginBottom: 20 },
  photo: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 }
});