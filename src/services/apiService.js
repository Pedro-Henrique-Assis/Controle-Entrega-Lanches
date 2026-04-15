import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDENTS_KEY = '@students';
const AUTHS_KEY = '@authorizations';

// Classe auxiliar para diferenciar regras de negócio de falhas de sistema
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export const apiService = {
  // --- Alunos ---
  async getStudents() {
    try {
      const data = await AsyncStorage.getItem(STUDENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw new Error('Houve um erro interno no sistema ao carregar os alunos.');
    }
  },

  async addStudent(student) {
    // 1. Validação de Nulos ou Vazios (somente espaços)
    if (!student.ra || student.ra.trim() === '') {
      throw new ValidationError('O RA não pode ser vazio.');
    }
    if (!student.name || student.name.trim() === '') {
      throw new ValidationError('O nome não pode ser vazio.');
    }
    if (!student.photo) {
      throw new ValidationError('É obrigatório selecionar uma foto do aluno.');
    }

    const cleanRa = student.ra.trim();
    const cleanName = student.name.trim();

    // 2. Validação: RA somente números
    // A regex /^\d+$/ garante que a string contenha unicamente os dígitos de 0 a 9 do início ao fim
    if (!/^\d+$/.test(cleanRa)) {
      throw new ValidationError('O RA deve conter apenas números, sem espaços ou caracteres especiais.');
    }

    // 3. Validação: Nome somente letras e espaços
    // A regex [a-zA-ZÀ-ÿ\s] garante que apenas letras (incluindo acentuação em português) e espaços sejam aceitos
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(cleanName)) {
      throw new ValidationError('O nome deve conter apenas letras, sem números ou caracteres especiais.');
    }

    try {
      const students = await this.getStudents();

      // 4. Validação: RA Único
      if (students.some(s => s.ra === cleanRa)) {
        throw new ValidationError('O RA informado já está cadastrado no sistema.');
      }

      // Persistência
      students.push({ 
        ra: cleanRa, 
        name: cleanName, 
        photo: student.photo, 
        id: Date.now().toString() 
      });
      await AsyncStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

    } catch (error) {
      // Se for uma falha de validação nossa, repassamos a mensagem ao usuário
      if (error instanceof ValidationError) {
        throw error;
      }
      // Se for uma exceção do banco (ex: falta de memória do AsyncStorage), disparamos o erro genérico
      throw new Error('Houve um erro interno no sistema ao tentar salvar o aluno.');
    }
  },

  // --- Autorizações e Entregas (com tratamento de exceção genérico aplicado) ---
  async getAuthorizations() {
    try {
      const data = await AsyncStorage.getItem(AUTHS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw new Error('Houve um erro interno no sistema ao carregar as autorizações.');
    }
  },

  async addAuthorization(auth) {
    try {
      const auths = await this.getAuthorizations();
      const exists = auths.some(a => a.studentId === auth.studentId && a.date === auth.date);
      
      if (exists) throw new ValidationError('O aluno já possui autorização para esta data.');
      
      auths.push({ ...auth, id: Date.now().toString(), delivered: false });
      await AsyncStorage.setItem(AUTHS_KEY, JSON.stringify(auths));
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw new Error('Houve um erro interno no sistema ao tentar autorizar o lanche.');
    }
  },

  async markAsDelivered(authId) {
    try {
      let auths = await this.getAuthorizations();
      const index = auths.findIndex(a => a.id === authId);
      
      if (index === -1) throw new ValidationError('Autorização não encontrada no sistema.');
      if (auths[index].delivered) throw new ValidationError('Este lanche já consta como entregue.');
      
      auths[index].delivered = true;
      await AsyncStorage.setItem(AUTHS_KEY, JSON.stringify(auths));
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw new Error('Houve um erro interno no sistema ao registrar a entrega.');
    }
  }
};