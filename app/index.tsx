import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header com título e ícone */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello, Matheus</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color="#444444" />
        </TouchableOpacity>
      </View>

      {/* Box cinza grande */}
      <View style={styles.bigBox}>
        <Text style={styles.bigBoxText}>Resumo</Text>
      </View>

      {/* Primeira linha - 2 caixinhas */}
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
      </View>

      {/* Segunda linha - 2 caixinhas */}
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  addButton: {
    padding: 5,
  },
  bigBox: {
    backgroundColor: '#888888',
    borderRadius: 20,
    height: 180,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  bigBoxText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    backgroundColor: '#444444',
    borderRadius: 20,
    height: 150,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
