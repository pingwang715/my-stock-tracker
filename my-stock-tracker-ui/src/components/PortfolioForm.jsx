import React, {useState, useRef, useEffect} from "react";
import { Dialog, DialogPanel, DialogTitle, useClose } from "@headlessui/react";
import apiClient from "../service/apiClient";
import { Form } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";

export default function PortfolioForm({ isOpen, onClose }) {

  const formRef = useRef(null);
  const isSubmitting = navigation.state === "submitting";
  let close = useClose();

  const [date, setDate] = useState(new Date());

  function onChange (date) {
    setDate(date);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(formRef.current);

    const portfolioData = {
      userId: data.get("userId"),
      symbol: data.get("symbol"),
      shares: data.get("shares"),
      purchasePrice: data.get("purchasePrice"),
      purchaseDate: date.toISOString(),
    };

    try {
      apiClient.post("/portfolios", portfolioData);
      toast.success("Submitted portfolio successfully!")
      onClose();
      return { success: true };
    } catch (error) {
      const data = error.response?.data;

      const message =
        typeof data === "string"
          ? data
          : data?.errorMessage || data?.message || error.message || "Failed to submit your portfolio. Please try again.";

      toast.error(message);
    }
  }

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  const buttonStyle =
    "font-primary bg-primary hover:bg-dark text-white flex items-center py-3 px-5 rounded-md";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0" aria-hidden="true"></div>
      <DialogPanel>
        <DialogTitle>Add Your Portfolio</DialogTitle>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Form method="POST" ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-darkbg px-8 py-10 shadow-md rounded-md">
            <div>
              <label htmlFor="userId" className={labelStyle}>User Id</label>
              <input className={textFieldStyle} type="number" id="userId" name="userId" placeholder="1" required minLength={1} maxLength={10} />
            </div>

            <div>
              <label htmlFor="symbol" className={labelStyle}>Stock ticker</label>
              <input className={textFieldStyle} type="text" id="symbol" name="symbol" placeholder="AAPL" required minLength={3} maxLength={20} />
            </div>

            <div>
              <label htmlFor="shares" className={labelStyle}>Shares</label>
              <input className={textFieldStyle} type="number" id="shares" name="shares" placeholder="100" required min={1} max={1000} />
            </div>

            <div>
              <label htmlFor="purchasePice" className={labelStyle}>Purchase price per share</label>
              <input className={textFieldStyle} type="number" id="purchasePrice" name="purchasePrice" placeholder="200.0000" required min={1} maxLength={1000}/>
            </div>

            <div className="calendar">
              <label className={labelStyle} htmlFor="purchaseDate">Purchase date</label>
              <Calendar onChange={onChange} value={date} className="border border-gray-300 p-3"/>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button type="button" onClick={onClose} className={buttonStyle}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className={buttonStyle}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        </div>

      </DialogPanel>
    </Dialog>
  )
}
