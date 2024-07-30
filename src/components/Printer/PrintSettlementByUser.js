import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";

const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Fonction pour calculer la somme des montants


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
    width: '17%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10, marginBottom:5},
  tableCellArticle: { margin: 'auto', marginTop: 5, fontSize: 10 ,marginBottom:10},
  totals: { marginTop: 10 ,marginLeft:"0%",fontSize:10},
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


const PrintSettlementByUser = ({mypaymentsTable, myuserInfo, myformdata}) => {
  console.log('paymentTable:', mypaymentsTable);
  console.log('userInfo:', myuserInfo);
  console.log('formData:', myformdata);
return (  
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
        <Text fontweight="bold" >Operateur:{myuserInfo.first_name+" "+myuserInfo.last_name}</Text> 
        <Text style={{marginRight:"40%"}}>Periode: {myformdata.start_date} - {myformdata.end_date}</Text>
        
      </View>
      <View>
        {/* Numéro de facture et informations client */}
      
        {/* <Text style={{fontSize:10}} >{myInvoice.customerFullname}</Text>
        <Text style={{fontSize:10}} >{myInvoice.customerAddress}</Text>
        <Text style={{fontSize:10}} >{myInvoice.costumerEmail}</Text>
        <Text style={{fontSize:10}} >{myInvoice.costumerIfu}</Text> */}

      </View>
    </View>
    <View style={styles.section}>
      {/* Tableau avec les détails de la facture */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>NOM</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>PRENOM</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>INSTITUT</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>MONTANT</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>REDUCTION</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ENREGISTRER LE</Text>
          </View>
        </View>

        {/* Ligne pour chaque article */}

        {
          mypaymentsTable.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Nom}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Prenom}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Institut}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Montant}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Reduction}</Text>
              </View>
              
              <View style={styles.tableCol}>
                <Text style={styles.tableCellArticle}>{item.Date}</Text>
              </View>
            </View>     
          ))
        }
 

      </View>
    </View>
    {/* Lignes pour le total, la TVA et le total TTC */}
    <View style={styles.totals}>
      <Text style={{marginBottom: 5}} >Total des paiement recu: {mypaymentsTable[0].Total}FCFA</Text>
      
    </View>
    {/* Slogan */}
    <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
  </Page>
</Document>

)

}
export default PrintSettlementByUser