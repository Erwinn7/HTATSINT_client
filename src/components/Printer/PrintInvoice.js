import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

// Fonction pour formater les nombres avec des virgules pour la lisibilité
const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Styles pour le document
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop:30
  },
  logo: {
    width: 60,
    height: 60,
    marginLeft: 0,
    marginRight:"60%"
  },
  infoclient: {
    flexDirection: 'row',
    marginBottom: 20,
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
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10, marginBottom:5},
  tableCellArticle: { margin: 'auto', marginTop: 5, fontSize: 10 ,marginBottom:30},
  totals: { marginTop: 10 ,marginLeft:"75%",fontSize:10},
  slogan: {textAlign: 'center', marginTop: 30 , fontStyle: 'italic'},
});

// newInvoiceData = {
//   invoiceEmitDate: row.invoiceEmitDate ,
//   invoiceNumber: row.invoiceNumber,
//   invoiceStatus: row.invoiceStatus,
//   customerFullname: row.costumerFullname,
//   customerAddress: row.costumerAddress,
//   costumerEmail: row.costumerEmail,
//   costumerIfu: row.costumerIfu,  
//   designation: myDatas.room.room_label,
//   dayly_price: myDatas.room.room_amount,
//   number_of_days: myDatas.number_of_day,
// }


const PrintInvoice = ({myInvoice}) => {
return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* Logo de l'entreprise */}
        <Image src={logo} style={styles.logo} />
        <Text fontweight="bold" >Facture N°:</Text><Text>{myInvoice.invoiceNumber}</Text>
      </View>
      <View style={styles.infoclient}>
        <View>
          {/* Date de facturation */}
          <Text style={{marginRight:"40%"}}>Date de facturation: {myInvoice.invoiceEmitDate}</Text>
        </View>
        <View>
          {/* Numéro de facture et informations client */}
          <Text>DESTINATAIRE</Text>
          <Text style={{fontSize:10}} >{myInvoice.customerFullname}</Text>
          <Text style={{fontSize:10}} >{myInvoice.customerAddress}</Text>
          <Text style={{fontSize:10}} >{myInvoice.costumerEmail}</Text>
          <Text style={{fontSize:10}} >{myInvoice.costumerIfu}</Text>

        </View>
      </View>
      <View style={styles.section}>
        {/* Tableau avec les détails de la facture */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DESIGNATION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>NOMBRE DE JOURS</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PRIX(Journalier)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {/* Ligne pour chaque article */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>{myInvoice.designation}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>{myInvoice.number_of_days}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>{formatNumber(myInvoice.dayly_price)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>{formatNumber(myInvoice.dayly_price * myInvoice.number_of_days)}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Lignes pour le total, la TVA et le total TTC */}
      <View style={styles.totals}>
        <Text style={{marginBottom: 5}} >Total: {formatNumber(myInvoice.dayly_price * myInvoice.number_of_days)} FCFA</Text>
        <Text style={{marginBottom: 5}} >TVA: {formatNumber(0)} FCFA</Text>
        <Text style={{marginBottom: 5}} >Total TTC: {formatNumber(myInvoice.dayly_price * myInvoice.number_of_days)} FCFA</Text>
      </View>
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintInvoice ;