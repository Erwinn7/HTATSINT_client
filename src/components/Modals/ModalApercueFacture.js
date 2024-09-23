import React, { useState} from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import PrintBill from 'components/Printer/PrintBill';
const ModalApercueFacture = ({ ouvert, toggle, client,facture, payement }) => {
//  const [selectedRow, setSelectedRow] = useState(null);
console.log('le client:',client);
console.log('la facture:',facture);
console.log('la facture:',client.phone_number);

  const newBillData = {
    'payer_phone': client.phone_number,
    'payer_name': client.institute_name,
    'payer_nom': client.fisrt_name,
    'payer_prenom': client.last_name,
    'billNumber': facture.invoice_number,
    'payer_email': client.email,
    'payer_address': client.address,
    'total': facture.invoice_amount,
     'paiement_day': new Date().toISOString().slice(0, 10),
     'bill_emit_date':facture.updated_at,
     'reduction':payement.discount_amount,
     'restepayer':payement.amount_paid,
     'motif_reduction':payement.discount_raison
  };

  //setSelectedRow(newBillData);

  return (
    <Modal isOpen={ouvert} toggle={toggle}  size="lg">
        {
            newBillData &&
            <PDFViewer width="100%" height="600px" >
              <PrintBill myInvoice={newBillData} />
            </PDFViewer>
            }         
    </Modal>
  );
};

export default ModalApercueFacture;