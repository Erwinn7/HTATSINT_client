import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "assets/img/brand/logo.png";
//const numberToWords = require('number-to-words');

// Fonction pour formater les nombres avec des virgules pour la lisibilité
const formatNumber = (nombre) => {
  console.log("nombre:", nombre);
  if (nombre === undefined) {
      return "N/A"; // Ou n'importe quelle valeur par défaut que vous préférez
  }
  return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}; 
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
    marginRight:"0%"
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
    width: '35%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10, marginBottom:5},
  tableCellArticle: { margin: 'auto', marginTop: 5, fontSize: 10 ,marginBottom:30},
  totals: { marginTop: 10 ,marginLeft:"75%",fontSize:10},
  slogan: {textAlign: 'center', marginTop: 30 , fontStyle: 'italic'},
  souTable1: {textAlign: 'right', marginTop: 30 , fontStyle: 'italic'},
  souTable2: {textAlign: 'left', marginTop: 30 , fontStyle: 'italic'},
  
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    marginVertical: 10, // Ajustez cet espace vertical selon vos besoins
    borderBottomStyle: 'dotted',
    marginBottom: 5,
    marginTop: 0,
  },

 

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








  function convertirEnLettres(nombre) {
    const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const dizaines = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

    function convertirNombre(n) {
        if (n === 0) {
            return '';
        } else if (n < 10) {
            return unites[n];
        } else if (n < 20) {
            return 'dix-' + unites[n - 10];
        } else {
            const unite = n % 10;
            const dizaine = Math.floor(n / 10);
            return dizaines[dizaine] + (unite !== 0 ? '-' + unites[unite] : '');
        }
    }

    if (nombre === 0) {
        return 'zéro';
    } else {
        const milliards = Math.floor(nombre / 1000000000);
        const millions = Math.floor((nombre % 1000000000) / 1000000);
        const milliers = Math.floor((nombre % 1000000) / 1000);
        const unite = nombre % 1000;

        let result = '';

        if (milliards > 0) {
            result += convertirNombre(milliards) + ' milliard' + (milliards > 1 ? 's' : '') + ' ';
        }

        if (millions > 0) {
            result += convertirNombre(millions) + ' million' + (millions > 1 ? 's' : '') + ' ';
        }

        if (milliers > 0) {
            result += convertirNombre(milliers) + ' mille ';
        }

        if (unite > 0) {
            result += convertirNombre(unite);
        }

        return result.trim();
    }
}

// Exemple d'utilisation :
const montantEnLettres = convertirEnLettres(123456789);
console.log(montantEnLettres);  // Output: "cent vingt-trois millions quatre cent cinquante-six mille sept cent quatre-vingt-neuf"


//const total = convertirEnLettres(myInvoice.total);











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
          <Text fontweight="bold" >Recu N°:{myInvoice.billNumber}</Text>
         
          <Text style={{marginRight:"40%"}}>Date d'emission de la facture: {myInvoice.bill_emit_date}</Text>
          <Text style={{marginRight:"40%"}}>Date du paiement: {myInvoice.paiement_day}</Text>
         
        </View>
        <View>
          {/* Numéro de facture et informations client */}
          <Text>CLIENT</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_name}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_nom}{myInvoice.payer_prenom}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_phone}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_address}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_email}</Text>
          <Text style={{fontSize:10}} >{myInvoice.payer_ifu}</Text>

        </View>
      </View>


      <View style={styles.section}>
        {/* Tableau avec les détails de la facture */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MODE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>REFERENCES </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MONTANT</Text>
            </View>
          
          </View>
          {/* Ligne pour chaque article */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>ESPECE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>SEJOUR A L'HOTEL</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellArticle}>{formatNumber(myInvoice.total)}</Text>
            </View>
            
          </View>
        </View>
      </View>




      <View style={styles.totals}>
        <Text style={{marginBottom: 5}} >Total: {formatNumber(myInvoice.total)} FCFA</Text>
        <Text style={{marginBottom: 5}}>Reduction:{formatNumber(myInvoice.reduction) } FCFA</Text>
        <Text style={{marginBottom: 5}} >TVA: {formatNumber(0)} FCFA</Text>
        <Text style={{marginBottom: 5}} >Total payé: {formatNumber(myInvoice.restepayer)} FCFA</Text>
      </View>

     
      {/* Slogan */}
      <Text style={styles.slogan}> "Merci de nous avoir choisi"</Text>
    </Page>
  </Document>
)

}

export default PrintBill ;