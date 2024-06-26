import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

// Fonction pour formater les nombres avec des virgules pour la lisibilité
const formatNumber = (nombre) => {
  // console.log("nombre:", nombre);
  if (nombre === undefined) {
      return "N/A"; // Ou n'importe quelle valeur par défaut que vous préférez
  }
  return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Styles pour le document
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginLeft: 0,
    marginRight: 0,
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
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  // **Bold styles for table headers**
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    marginBottom: 5,
    fontWeight: 'bold', // **Bold table headers**
  },
  tableCellArticle: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    marginBottom: 30,
  },
  totals: {
    marginTop: 10,
    marginLeft: "75%",
    fontSize: 10,
  },
  slogan: {
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    marginVertical: 10,
    borderBottomStyle: 'dotted',
    marginBottom: 15,
    marginTop: 0,
  },
});

const PrintBillsOnIMenu = ({myInvoice}) => {
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
      <div className="mb-3"></div>
      <View style={styles.infoclient}>
        <View>
          {/* Date de facturation */}
          <Text fontweight="bold" >Reçu N°:{myInvoice.invoiceNumber}</Text> 
          <Text style={{marginRight:"40%"}}>Date de facturation: {myInvoice.invoiceEmitDate}</Text>
          
        </View>
        <View>
          {/* Numéro de facture et informations client */}
          <Text>CLIENT</Text>
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
              <Text style={styles.tableCell}>MONTANT(Journalier)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MONTANT TOTAL</Text>
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
        <Text style={{marginBottom: 5, fontSize:10}} >Total: {formatNumber(myInvoice.invoiceAmount)} FCFA</Text>
        <Text style={{marginBottom: 5, fontSize:10}} >Réduction: {formatNumber(myInvoice.discount_amount)} FCFA</Text>
        <Text style={{marginBottom: 5, fontSize:10}} >TVA: {formatNumber(0)} FCFA</Text>
        <Text style={{marginBottom: 5, fontSize:10}} >Total TTC: {formatNumber(myInvoice.invoiceAmount)} FCFA</Text>
        <Text style={{marginBottom: 5, fontSize:10}} >Montant payé: {formatNumber(myInvoice.invoiceAmount - myInvoice.discount_amount)} FCFA</Text>

      </View>
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintBillsOnIMenu ;