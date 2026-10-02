function InvoiceForm({
  invoice,
  items,
  totals,
  handleChange,
  handleNumber,
  addItem,
  deleteItem,
  changeItem,
}) {
  const money = (n) => `${invoice.currency} ${n.toFixed(2)}`;

  return (
    <div className="card">
      <div className="row between">
        <div>
          <label>Current Date</label>
          <input type="date" name="date" value={invoice.date} onChange={handleChange} />
        </div>
        <div>
          <label>Invoice Number</label>
          <input
            type="number"
            name="number"
            min="1"
            value={invoice.number}
            onChange={handleNumber}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Due Date</label>
          <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleChange} />
        </div>
      </div>

      <hr />

      <div className="row two">
        <div>
          <h3>Bill to</h3>
          <input name="toName" placeholder="Client name" value={invoice.toName} onChange={handleChange} />
          <input name="toEmail" type="email" placeholder="Client email" value={invoice.toEmail} onChange={handleChange} />
          <input name="toPhone" placeholder="Client phone" value={invoice.toPhone} onChange={handleChange} />
          <input name="toGst" placeholder="Client GST / Tax ID (optional)" value={invoice.toGst} onChange={handleChange} />
          <input name="toAddress" placeholder="Client address" value={invoice.toAddress} onChange={handleChange} />
        </div>

        <div>
          <h3>Bill from</h3>
          <input name="fromName" placeholder="Your name or business" value={invoice.fromName} onChange={handleChange} />
          <input name="fromEmail" type="email" placeholder="Your email" value={invoice.fromEmail} onChange={handleChange} />
          <input name="fromPhone" placeholder="Your phone" value={invoice.fromPhone} onChange={handleChange} />
          <input name="fromGst" placeholder="Your GST / Tax ID (optional)" value={invoice.fromGst} onChange={handleChange} />
          <input name="fromAddress" placeholder="Your address" value={invoice.fromAddress} onChange={handleChange} />
        </div>
      </div>

      <hr />

      <table className="items">
        <thead>
          <tr>
            <th>Items</th>
            <th>Qty</th>
            <th>Price / Rate</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => changeItem(item.id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    changeItem(item.id, "qty", Math.max(0, Number(e.target.value)))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) =>
                    changeItem(item.id, "price", Math.max(0, Number(e.target.value)))
                  }
                />
              </td>
              <td className="amount">
                {invoice.currency}
                {(item.qty * item.price).toFixed(2)}
              </td>
              <td>
                <button className="delete" onClick={() => deleteItem(item.id)}>
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn primary small" onClick={addItem}>
        + Add Item
      </button>

      <div className="totals">
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

      <hr />

      <label>Payment Details</label>
      <textarea
        name="paymentDetails"
        placeholder="Bank name, account number, IFSC / UPI ID"
        value={invoice.paymentDetails}
        onChange={handleChange}
      />

      <label>Notes</label>
      <textarea name="notes" value={invoice.notes} onChange={handleChange} />
    </div>
  );
}

export default InvoiceForm;