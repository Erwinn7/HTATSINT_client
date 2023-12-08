import React, { useState} from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import PrintBill from 'components/Printer/PrintBill';
const ModalApercueFacture = ({ ouvert, toggle, client,facture }) => {
//  const [selectedRow, setSelectedRow] = useState(null);
console.log('le client:',client);
console.log('la facture:',facture);
console.log('la facture:',client.phone_number);

  const newBillData = {
    'payer_phone': client.phone_number,
    'payer_name': client.institute_name,
    'billNumber': facture.invoice_number,
    'payer_email': client.email,
    'payer_address': client.address,
    'total': facture.invoice_amount,
     'paiment_day': new Date().toISOString().slice(0, 10),
     'emit_date_invoice':facture.updated_at,

  };

  //setSelectedRow(newBillData);
    
  


  return (
    <Modal isOpen={ouvert} toggle={toggle}  size="lg">
      <ModalHeader toggle={toggle}>Aperçu de la facture</ModalHeader>
      <ModalBody>
        {/* Contenu de l'aperçu de la facture */}
        <p>Facture payer avec succes</p>

        {
            newBillData &&
            <PDFViewer width="100%" height="600px" >
              <PrintBill myInvoice={newBillData} />
            </PDFViewer>
            }         
      </ModalBody>
    </Modal>
  );
};

export default ModalApercueFacture;