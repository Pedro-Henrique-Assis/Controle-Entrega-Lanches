import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Input from '../components/Input';
import { apiService } from '../services/apiService';

export default function AuthScreen() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [date, setDate] = useState(''); // Formato sugerido: YYYY-MM-DD
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  useEffect(() => {
    apiService.getStudents().then(setStudents);
  }, []);

  const handleAuthorize = async () => {
    if (!selectedStudentId || !date) {
      Alert.alert('Erro', 'Preencha a data e selecione um aluno.');
      return;
    }
    try {
      await apiService.addAuthorization({ studentId: selectedStudentId, date });
      Alert.alert('Sucesso', 'Lanche autorizado!');
      setDate('');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Data (Ex: 2026-04-15)" value={date} onChangeText={setDate} />
      
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedStudentId} onValueChange={setSelectedStudentId}>
          <Picker.Item label="Selecione um aluno..." value="" />
          {students.map(s => <Picker.Item key={s.id} label={s.name} value={s.id} />)}
        </Picker>
      </View>

      {selectedStudent && (
        <View style={styles.profilePreview}>
          <Image source={{ uri: selectedStudent.photo }} style={styles.photo} />
          <Text style={styles.previewText}>{selectedStudent.ra}</Text>
        </View>
      )}

      <Button title="Autorizar Lanche" onPress={handleAuthorize} color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  pickerContainer: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, marginBottom: 12 },
  profilePreview: { alignItems: 'center', marginBottom: 20 },
  photo: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  previewText: { color: '#666', fontSize: 14 }
});