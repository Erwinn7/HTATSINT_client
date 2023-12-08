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


const PrintBill = ({myInvoice}) => {
return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* Logo de l'entreprise */}
        <Image src={logo} style={styles.logo} />
        <Text fontweight="bold" >Recu N°:</Text><Text>{myInvoice.billNumber}</Text>
      </View>
      <View style={styles.infoclient}>
        <View>
          {/* Date de facturation */}
          <Text style={{marginRight:"40%"}}>Date du paiement: {myInvoice.billEmitDate}</Text>
        </View>
        <View>
          {/* Numéro de facture et informations client */}
          <Text>DESTINATAIRE</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_name}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_phone}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_address}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_email}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_ifu}</Text>

        </View>
      </View>
      <Text style={styles.slogan}> Total du paiement:{formatNumber(myInvoice.total) }</Text>
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintBill ;