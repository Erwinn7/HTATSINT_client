import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Fonction pour formater les nombres avec des virgules pour la lisibilité
const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Styles pour le document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 },
  totals: { marginTop: 10 },
  slogan: { fontSize: 12, textAlign: 'center', marginTop: 30 },
});



const PrintInvoice = ({myInvoice}) => {

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* Logo de l'entreprise */}
        <Image src="assets/img/brand/logo.png" style={styles.logo} />
        {/* Date de facturation */}
        <Text>Date: {myInvoice.date_facture}</Text>
      </View>
      <View style={styles.section}>
        {/* Numéro de facture et informations client */}
        <Text>N° Facture: {myInvoice.numero_facture}</Text>
        <Text>{myInvoice.client}</Text>
      </View>
      <View style={styles.section}>
        {/* Tableau avec les détails de la facture */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Désignation</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nombre de Jours</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Prix Journalier</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {/* Ligne pour chaque article */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{myInvoice.designation}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{myInvoice.nombre_de_jour}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{formatNumber(myInvoice.prix_journalier)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{formatNumber(myInvoice.prix_total)}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Lignes pour le total, la TVA et le total TTC */}
      <View style={styles.totals}>
        <Text>Total: {formatNumber(myInvoice.prix_total)}</Text>
        <Text>TVA: {formatNumber(0)}</Text>
        <Text>Total TTC: {formatNumber(myInvoice.prix_total)}</Text>
      </View>
      {/* Slogan */}
      <Text style={styles.slogan}>Votre slogan ici</Text>
    </Page>
  </Document>

}

export default PrintInvoice ;