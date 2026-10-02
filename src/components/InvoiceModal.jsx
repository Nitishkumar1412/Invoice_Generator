import { useRef } from "react";
import html2pdf from "html2pdf.js";

function InvoiceModal({ invoice, items, totals, closeModal }) {
  const printRef = useRef();

  const money = (n) => `${invoice.currency} ${n.toFixed(2)}`;

  const downloadInvoice = () => {
    html2pdf()
      .set({
        margin: 10,
        filename: `invoice-${invoice.number}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(printRef.current)
      .save();
  };

  const sendInvoice = () => {
    const subject = `Invoice #${invoice.number} from ${invoice.fromName}`;
    const body =
      `Hello ${invoice.toName},\n\n` +
      `Please find your invoice details below.\n\n` +
      `Invoice No: ${invoice.number}\n` +
      `Due Date: ${invoice.dueDate}\n` +
      `Total Amount: ${money(totals.total)}\n\n` +
      `${invoice.paymentDetails ? "Payment Details:\n" + invoice.paymentDetails + "\n\n" : ""}` +
      `Regards,\n${invoice.fromName}`;

    window.location.href = `mailto:${invoice.toEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="paper" ref={printRef}>
          <div className="paper-head">
            <div>
              <p className="muted">INVOICE #{invoice.number}</p>
              <h2>{invoice.fromName}</h2>
              <p>{invoice.fromAddress}</p>
              <p>{invoice.fromEmail}</p>
              <p>{invoice.fromPhone}</p>
              {invoice.fromGst && <p>GST: {invoice.fromGst}</p>}
            </div>
            <div className="right">
              <p>
                <b>Issued:</b> {invoice.date}
              </p>
              <p>
                <b>Due:</b> {invoice.dueDate}
              </p>
              <p className="muted">Amount Due</p>
              <h2>{money(totals.total)}</h2>
            </div>
          </div>

          <div className="billed">
            <p className="muted">BILLED TO</p>
            <b>{invoice.toName}</b>
            <p>{invoice.toAddress}</p>
            <p>{invoice.toEmail}</p>
            <p>{invoice.toPhone}</p>
            {invoice.toGst && <p>GST: {invoice.toGst}</p>}
          </div>

          <table className="paper-table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Description</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.qty}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="totals paper-totals">
            <div>
              <span>Subtotal</span>
              <span>{money(totals.subtotal)}</span>
            </div>
            <div>
              <span>Discount ({invoice.discountRate}%)</span>
              <span>- {money(totals.discount)}</span>
            </div>
            <div>
              <span>Tax ({invoice.taxRate}%)</span>
              <span>{money(totals.tax)}</span>
            </div>
            <div className="grand">
              <span>Total</span>
              <span>{money(totals.total)}</span>
            </div>
          </div>

          {invoice.paymentDetails && (
            <div className="note">
              <p className="muted">PAYMENT DETAILS</p>
              <p className="pre">{invoice.paymentDetails}</p>
            </div>
          )}

          <p className="thanks">{invoice.notes}</p>
        </div>

        <div className="modal-buttons">
          <button className="btn primary" onClick={downloadInvoice}>
            Download Invoice
          </button>
          <button className="btn outline" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn outline" onClick={sendInvoice}>
            Send Invoice
          </button>
          <button className="btn outline" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;