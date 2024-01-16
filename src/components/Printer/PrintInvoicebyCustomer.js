import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

// Fonction pour formater les nombres avec des virgules pour la lisibilité
// const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
    //flexWrap: 'wrap',
    marginBottom: 5,
    marginTop:10
  },
  logo: {
    width: 60,
    height: 60,
    marginLeft: 0,
    marginRight:"0",
   
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
  tableCellArticle: { margin: 'auto', marginTop: 5, fontSize: 10 ,marginBottom:10},
  totals: { marginTop: 10 ,marginLeft:"75%",fontSize:10},
  slogan: {textAlign: 'center', marginTop: 30 , fontStyle: 'italic'},
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    marginVertical: 10, // Ajustez cet espace vertical selon vos besoins
    borderBottomStyle: 'dotted',
    marginBottom: 5,
    marginTop: 0,
  },
});


const PrintInvoicebyCustomer= ({myInvoice, totalImpayes, destinataire}) => {
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
      <View style={styles.infoclient}>
        <View>
          {/* Date de facturation */}
          {/* <Text fontweight="bold" >Facture N°:{myInvoice.invoiceNumber}</Text>  */}
          <Text style={{marginRight:"40%"}}>Date de facturation: {myInvoice.created_at}</Text>
          
        </View>
        <View>
          {/* Numéro de facture et informations client */}
          <Text>DESTINATAIRE</Text>
          <Text style={{fontSize:10}} >Nom:  {destinataire.institute_name ? destinataire.institute_name : destinataire.last_name+" "+destinataire.first_name}</Text>
          <Text style={{fontSize:10}} >Addresse:  {destinataire.address}</Text>
          <Text style={{fontSize:10}} >Tel:  {destinataire.phone_number}</Text> 
          <Text style={{fontSize:10}} >Email:  {destinataire.email}</Text>
          <Text style={{fontSize:10}} >{destinataire.ifu ? "IFU:  "+destinataire.ifu : ""}</Text>

        </View>
      </View>
      <View style={styles.section}>
      <Text style={{marginRight:"40%", marginBottom:5,fontSize:12}}>LISTE DES FACTURES </Text>

        {/* Tableau avec les détails de la facture */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DATE D'EMSSION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>N° FACTURE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MONTANT(Journalier)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>STATUT</Text>
            </View>
          </View>

          {/* Ligne pour chaque article */}

          {
            myInvoice.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellArticle}>{item.created_at}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellArticle}>{item.invoice_number}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellArticle}>{item.invoice_amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellArticle}>{item.invoice_status ==="Paid" ? "Payé" : "Impayée"}</Text>
                </View>
              </View>     
            ))
          }
   

        </View>
      </View>
      {/* Lignes pour le total, la TVA et le total TTC */}
      <View style={styles.totals}>
        <Text style={{marginBottom: 5}} >Total impayé: {totalImpayes} FCFA</Text>
      </View>
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintInvoicebyCustomer ;