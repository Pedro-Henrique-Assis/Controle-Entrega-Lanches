import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiService } from '../services/apiService';

export default function AuthScreen() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [date, setDate] = useState('');
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Input label="Data da Liberação" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
        
        <Text style={styles.label}>Selecionar Aluno</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedStudentId} onValueChange={setSelectedStudentId} style={styles.picker}>
            <Picker.Item label="Toque para selecionar..." value="" color="#94A3B8" />
            {students.map(s => <Picker.Item key={s.id} label={s.name} value={s.id} color="#1E293B" />)}
          </Picker>
        </View>

        {selectedStudent && (
          <View style={styles.profilePreview}>
            <Image source={{ uri: selectedStudent.photo }} style={styles.photo} />
            <View>
              <Text style={styles.previewName}>{selectedStudent.name}</Text>
              <Text style={styles.previewRa}>RA: {selectedStudent.ra}</Text>
            </View>
          </View>
        )}

        <View style={styles.actionContainer}>
          <Button title="Confirmar Autorização" onPress={handleAuthorize} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8, marginLeft: 4 },
  pickerContainer: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 12, marginBottom: 24, overflow: 'hidden'
  },
  picker: { height: 55 },
  profilePreview: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9',
    padding: 16, borderRadius: 12, marginBottom: 24
  },
  photo: { width: 50, height: 50, borderRadius: 25, marginRight: 16, borderWidth: 1, borderColor: '#CBD5E1' },
  previewName: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  previewRa: { fontSize: 14, color: '#64748B', marginTop: 2 },
  actionContainer: { marginTop: 8 }
});