import { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceModal from "./components/InvoiceModal";
import "./App.css";

const currencies = [
  { name: "Dollar", symbol: "$" },
  { name: "Rupee", symbol: "₹" },
  { name: "Pound", symbol: "£" },
  { name: "Euro", symbol: "€" },
  { name: "Won", symbol: "₩" },
  { name: "Renminbi", symbol: "¥" },
  { name: "BTC", symbol: "₿" },
];

const today = new Date().toISOString().slice(0, 10);

const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const emptyInvoice = {
  number: 1,
  date: today,
  dueDate: addDays(7),
  fromName: "",
  fromEmail: "",
  fromPhone: "",
  fromGst: "",
  fromAddress: "",
  toName: "",
  toEmail: "",
  toPhone: "",
  toGst: "",
  toAddress: "",
  currency: "₹",
  taxRate: 18,
  discountRate: 0,
  paymentDetails: "",
  notes: "Thank you for your business!",
};

const emptyItems = [{ id: 1, name: "", qty: 1, price: 0 }];

function App() {
  const [invoice, setInvoice] = useState(() => {
    const saved = localStorage.getItem("invoice");
    return saved ? JSON.parse(saved) : emptyInvoice;
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : emptyItems;
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("invoice", JSON.stringify(invoice));
    localStorage.setItem("items", JSON.stringify(items));
  }, [invoice, items]);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const discount = (subtotal * invoice.discountRate) / 100;
  const tax = ((subtotal - discount) * invoice.taxRate) / 100;
  const total = subtotal - discount + tax;

  const totals = { subtotal, discount, tax, total };

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleNumber = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setInvoice({ ...invoice, [e.target.name]: value });
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", qty: 1, price: 0 }]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const changeItem = (id, field, value) => {
    setItems(
      items.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const handleReview = () => {
    if (!invoice.toName || !invoice.fromName) {
      alert("Please fill Bill to and Bill from names");
      return;
    }
    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }
    setShowModal(true);
  };

  const resetAll = () => {
    if (window.confirm("Clear everything and start a new invoice?")) {
      setInvoice({ ...emptyInvoice, number: Number(invoice.number) + 1 });
      setItems(emptyItems);
    }
  };

  return (
    <div className="app">
      <header className="top">
        <h1>Invoice Generator</h1>
        <p>Create clean and professional invoices in seconds</p>
      </header>

      <div className="layout">
        <InvoiceForm
          invoice={invoice}
          items={items}
          totals={totals}
          handleChange={handleChange}
          handleNumber={handleNumber}
          addItem={addItem}
          deleteItem={deleteItem}
          changeItem={changeItem}
        />

        <aside className="sidebar">
          <button className="btn primary" onClick={handleReview}>
            Review Invoice
          </button>
          <button className="btn outline" onClick={resetAll}>
            New Invoice
          </button>

          <hr />

          <label>Currency</label>
          <select
            name="currency"
            value={invoice.currency}
            onChange={handleChange}
          >
            {currencies.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.name} ({c.symbol})
              </option>
            ))}
          </select>

          <label>Tax rate</label>
          <div className="percent">
            <input
              type="number"
              name="taxRate"
              min="0"
              max="100"
              step="0.01"
              value={invoice.taxRate}
              onChange={handleNumber}
            />
            <span>%</span>
          </div>

          <label>Discount rate</label>
          <div className="percent">
            <input
              type="number"
              name="discountRate"
              min="0"
              max="100"
              step="0.01"
              value={invoice.discountRate}
              onChange={handleNumber}
            />
            <span>%</span>
          </div>
        </aside>
      </div>

      {showModal && (
        <InvoiceModal
          invoice={invoice}
          items={items}
          totals={totals}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;