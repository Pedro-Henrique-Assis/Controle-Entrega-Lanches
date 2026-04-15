import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiService } from '../services/apiService';

export default function StudentScreen() {
  const [ra, setRa] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.photoSection}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.placeholderText}>Sem foto</Text>
            </View>
          )}
          <Button 
            title={photo ? "Alterar Imagem" : "Selecionar Imagem"} 
            variant="secondary" 
            onPress={pickImage} 
          />
        </View>

        <Input label="Registro Acadêmico (RA)" placeholder="Ex: 123456" value={ra} onChangeText={setRa} keyboardType="numeric" />
        <Input label="Nome Completo" placeholder="Digite o nome do aluno" value={name} onChangeText={setName} />
        
        <View style={styles.actionContainer}>
          <Button title="Salvar Aluno" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  photoSection: { alignItems: 'center', marginBottom: 24 },
  photo: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, borderWidth: 3, borderColor: '#F1F5F9' },
  photoPlaceholder: { 
    width: 120, height: 120, borderRadius: 60, marginBottom: 16, 
    backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#E2E8F0', borderStyle: 'dashed'
  },
  placeholderText: { color: '#94A3B8', fontWeight: '500' },
  actionContainer: { marginTop: 8 }
});