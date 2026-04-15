import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDENTS_KEY = '@students';
const AUTHS_KEY = '@authorizations';

export const apiService = {
  // --- Alunos ---
  async getStudents() {
    const data = await AsyncStorage.getItem(STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  },
  async addStudent(student) {
    const students = await this.getStudents();
    if (students.some(s => s.ra === student.ra)) throw new Error('RA já cadastrado.');
    students.push({ ...student, id: Date.now().toString() });
    await AsyncStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  },

  // --- Autorizações e Entregas ---
  async getAuthorizations() {
    const data = await AsyncStorage.getItem(AUTHS_KEY);
    return data ? JSON.parse(data) : [];
  },
  async addAuthorization(auth) {
    const auths = await this.getAuthorizations();
    const exists = auths.some(a => a.studentId === auth.studentId && a.date === auth.date);
    if (exists) throw new Error('Aluno já autorizado nesta data.');
    
    auths.push({ ...auth, id: Date.now().toString(), delivered: false });
    await AsyncStorage.setItem(AUTHS_KEY, JSON.stringify(auths));
  },
  async markAsDelivered(authId) {
    let auths = await this.getAuthorizations();
    const index = auths.findIndex(a => a.id === authId);
    if (index === -1) throw new Error('Autorização não encontrada.');
    if (auths[index].delivered) throw new Error('Lanche já entregue.');
    
    auths[index].delivered = true;
    await AsyncStorage.setItem(AUTHS_KEY, JSON.stringify(auths));
  }
};