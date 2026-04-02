import React, { useState, useRef } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import apiClient from "../service/apiClient";
import { Form } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioSchema } from "../schema/portfolioSchema";

export default function PortfolioForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      purchaseDate: new Date().toISOString().split("T")[0],
    },
  });

  const [date, setDate] = useState(new Date());

  function onCalendarChange(selectedDate) {
    setDate(selectedDate);
    setValue("purchaseDate", selectedDate.toISOString().split("T")[0], {
      shouldValidate: true,
    });
  }

  const onSubmit = async (data) => {
    try {
      apiClient.post("/portfolios", data);
      toast.success("Submitted portfolio successfully!");
      onClose();
      return { success: true };
    } catch (error) {
      const data = error.response?.data;

      const message =
        typeof data === "string"
          ? data
          : data?.errorMessage ||
            data?.message ||
            error.message ||
            "Failed to submit your portfolio. Please try again.";

      toast.error(message);
    }
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  const buttonStyle =
    "font-primary bg-primary hover:bg-dark text-white flex items-center py-3 px-5 rounded-md";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0" aria-hidden="true"></div>
      <DialogPanel>
        <DialogTitle>Add Your Portfolio</DialogTitle>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-darkbg px-8 py-10 shadow-md rounded-md"
          >
            <div>
              <label htmlFor="symbol" className={labelStyle}>
                Stock ticker
              </label>
              <input
                className={textFieldStyle}
                type="text"
                id="symbol"
                placeholder="AAPL"
                {...register("symbol")}
              />
              {errors.symbol && <p className={errorStyle}>{errors.symbol.message}</p>}
            </div>

            <div>
              <label htmlFor="shares" className={labelStyle}>
                Shares
              </label>
              <input
                className={textFieldStyle}
                type="number"
                id="shares"
                placeholder="100"
                {...register("shares", {valueAsNumber: true})}
              />
              {errors.shares && <p className={errorStyle}>{errors.shares.message}</p>}
            </div>

            <div>
              <label htmlFor="purchasePice" className={labelStyle}>
                Purchase price per share
              </label>
              <input
                className={textFieldStyle}
                type="number"
                id="purchasePrice"
                placeholder="200.0000"
                step=".0001"
                {...register("purchasePrice", { valueAsNumber: true})}
              />
              {errors.purchasePrice && <p className={errorStyle}>{errors.purchasePrice.message}</p>}
            </div>

            <div className="calendar">
              <label className={labelStyle} htmlFor="purchaseDate">
                Purchase date
              </label>
              <Calendar
                onChange={onCalendarChange}
                value={date}
                maxDate={new Date()}
                className="border border-gray-300 p-3"
              />
              {errors.purchaseDate && <p className={errorStyle}>{errors.purchaseDate.message}</p>}
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button type="button" onClick={onClose} className={buttonStyle}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonStyle}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
