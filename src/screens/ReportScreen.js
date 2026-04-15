import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Input from '../components/Input';
import { apiService } from '../services/apiService';

export default function ReportScreen() {
  const [dateFilter, setDateFilter] = useState('');
  const [deliveries, setDeliveries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Força modo paisagem ao entrar na tela
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      loadDeliveries();
      
      // Retorna para retrato ao sair
      return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, [])
  );

  const loadDeliveries = async () => {
    const auths = await apiService.getAuthorizations();
    // Filtra apenas os entregues
    setDeliveries(auths.filter(a => a.delivered)); 
  };

  const filtered = deliveries.filter(d => d.date.includes(dateFilter));

  return (
    <View style={styles.container}>
      <Input placeholder="Filtrar por data..." value={dateFilter} onChangeText={setDateFilter} />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>Data: {item.date}</Text>
            <Text style={styles.cell}>ID Aluno: {item.studentId}</Text>
            <Text style={styles.status}>Entregue</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#EAEAEA' },
  cell: { fontSize: 16, color: '#333' },
  status: { fontSize: 16, color: '#2E7D32', fontWeight: 'bold' }
});