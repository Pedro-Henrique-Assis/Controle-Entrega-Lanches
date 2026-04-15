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
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      loadDeliveries();
      return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, [])
  );

  const loadDeliveries = async () => {
    const auths = await apiService.getAuthorizations();
    setDeliveries(auths.filter(a => a.delivered)); 
  };

  const filtered = deliveries.filter(d => d.date.includes(dateFilter));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateBadge}>{item.date}</Text>
        <Text style={styles.status}>Entregue</Text>
      </View>
      <Text style={styles.studentInfo}>Aluno ID: {item.studentId}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Input placeholder="Filtrar por data..." value={dateFilter} onChangeText={setDateFilter} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  filterContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 8 },
  card: {
    backgroundColor: '#FFFFFF', flex: 1, margin: 8, padding: 20, borderRadius: 16,
    borderLeftWidth: 4, borderLeftColor: '#334155',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dateBadge: { backgroundColor: '#F1F5F9', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, fontSize: 13, fontWeight: '600', color: '#475569' },
  status: { fontSize: 13, color: '#1E293B', fontWeight: '700', textTransform: 'uppercase' },
  studentInfo: { fontSize: 15, color: '#334155', fontWeight: '500' }
});