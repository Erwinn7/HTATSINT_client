import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

// Fonction pour formater les nombres avec des virgules pour la lisibilité
const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Fonction pour calculer la somme des montants
const calculateTotalAmount = (myInvoice) => {
  return myInvoice.reduce((total, item) => total + item.montant, 0);
};

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

// newInvoicemyInvoice = {
//   invoiceEmitDate: row.invoiceEmitDate ,
//   invoiceNumber: row.invoiceNumber,
//   invoiceStatus: row.invoiceStatus,
//   customerFullname: row.costumerFullname,
//   customerAddress: row.costumerAddress,
//   costumerEmail: row.costumerEmail,
//   costumerIfu: row.costumerIfu,  
//   designation: mymyInvoices.room.room_label,
//   dayly_price: mymyInvoices.room.room_amount,
//   number_of_days: mymyInvoices.number_of_day,
// }


const PrintInvoicebyCustumer = ({myInvoice}) => {
return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}> 
     <Image src={logo} style={styles.logo} />
        {/* Logo de l'entreprise */}
        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
 
            <Text style={{textAlign: "center", width: "100%"}}>CENTRE D'HEBERGEMENT LE PELERIN DE DASSA-ZOUME</Text>
            
          <Text style={{textAlign: "center", width: "100%"}}>IFU: 774158522147852 | RCCM: CZ-774158522147852</Text>
          <Text style={{textAlign: "center", width: "100%"}}>97009328/95887445</Text>
      
        </View>

      </View> 
      <View style={styles.separator} />

      <View style={styles.section}>
          {/* Titre du tableau */}
          <Text style={styles.header}>Tableau des Factures</Text>

          {/* En-tête du tableau */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>DATE D'EMISSION</Text>
            <Text style={styles.tableHeader}>N° FACTURE</Text>
            <Text style={styles.tableHeader}>MONTANT (FCFA)</Text>
            <Text style={styles.tableHeader}>STATUT</Text>
          </View>

          {/* Corps du tableau */}
          {myInvoice.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.created_at}</Text>
              <Text style={styles.tableCell}>{item.invoice_number}</Text>
              <Text style={styles.tableCell}>{item.invoice_amount}</Text>
              <Text style={styles.tableCell}>{item.invoice_status}</Text>
            </View>
          ))}

          {/* Pied du tableau avec le total des montants */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell} />
            <Text style={styles.tableCell} />
            <Text style={styles.tableHeader}>Total Montants:</Text>
            <Text style={styles.tableCell}>{calculateTotalAmount(myInvoice)}</Text>
          </View>
        </View>
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintInvoicebyCustumer ;