import { usePDF } from 'react-to-pdf';

const PrintInvoice = ({myInvoice}) => {
   const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
   return (
      <div>
         <button onClick={() => toPDF()}>Download PDF</button>
         <div ref={targetRef}>
            {myInvoice.invoice_total_price}
         </div>
      </div>
   )
}

export default PrintInvoice ;