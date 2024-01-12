import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Fonction pour calculer la somme des montants


// Styles pour le document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 30,
  },
  tableHeader: {
    width: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
});


const PrintSettlementByUser = ({paymentTable}) => {
    


}
export default PrintSettlementByUser