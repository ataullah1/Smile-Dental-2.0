"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  formatDate,
  formatTime,
  incrementTimeByOneHour,
} from "@/lib/dateAndTimeUtils";
import SuccessBox from "./SuccessBox";
import BookingHeader from "./BookingHeader";

function BookingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [created, setCreated] = useState(false);
  const successBoxRef = useRef<HTMLDivElement | null>(null);

  const now = new Date();
  let defaultDate = new Date();

  if (now.getHours() >= 16 || (now.getHours() === 16 && now.getMinutes() > 0)) {
    defaultDate.setDate(now.getDate() + 1);
  }

  if (defaultDate.getDay() === 0) {
    defaultDate.setDate(defaultDate.getDate() + 1);
  } else if (defaultDate.getDay() === 6) {
    defaultDate.setDate(defaultDate.getDate() + 2);
  }

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    () => defaultDate
  );
  const [selectedTime, setSelectedTime] = useState("");

  function filterDates(date: Date) {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return false;
    }
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear() &&
      now.getHours() >= 16
    ) {
      return false;
    }
    return true;
  }

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) =>
    phone.length >= 8 &&
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(phone);
  const isValidName = (name: string) => name.length >= 3;

  useEffect(() => {
    const isEmpty = [firstName, lastName, email, phone, selectedTime].some(
      (x) => x === ""
    );
    setIsDisabled(
      isEmpty ||
        !isValidName(firstName) ||
        !isValidName(lastName) ||
        !isValidEmail(email) ||
        !isValidPhone(phone)
    );
  }, [firstName, lastName, email, phone]);

  useEffect(() => {
    async function fetchAvailableTimes() {
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        if (res.ok) {
          const data = await res.json();
          setAvailableTimes(data.availableTimes);
          if (data.availableTimes.length > 0) {
            setSelectedTime(data.availableTimes[0]);
          }
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchAvailableTimes();
  }, [selectedDate?.valueOf]);

  function handleAppointment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = {
        firstName,
        lastName,
        email,
        phone,
        message,
        date: selectedDate,
        time: selectedTime,
      };
      fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setIsLoading(false);
        setCreated(true);
      });
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (created && successBoxRef.current) {
      successBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [created]);

  return (
    <section className="max-w-3xl w-full min-h-lvh mx-auto flex items-center justify-center p-4">
      <div>
        {created && (
          <SuccessBox ref={successBoxRef}>
            <div className="my-8">
              <h1 className="text-center mb-8 text-3xl font-bold md:text-5xl">
                Appointment created
              </h1>
              <p className="mx-auto text-lg mb-8 mt-4  text-slate-600 md:mb-16">
                Thank you! Your appointment has been successfully booked. <br />
                We look forward to seeing you on{" "}
                {formatDate(selectedDate!.toString())} at{" "}
                {formatTime(selectedTime)} -{" "}
                {incrementTimeByOneHour(selectedTime)}. <br />
                If you have any questions or need to make changes, please
                contact us at <br />
                <span className="font-bold">smiledental.info@gmail.com</span> or
                call us at <span className="font-bold">+1234567890</span>
                <br />
              </p>
            </div>
          </SuccessBox>
        )}
        {!created && (
          <>
            <BookingHeader />
            {error && <p className="text-red-600 text-center ">{error}</p>}

            <form className=" mx-auto" onSubmit={handleAppointment}>
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <label htmlFor="name">
                    First name
                    {!isValidName(firstName) && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </label>
                  <input
                    disabled={isLoading}
                    type="text"
                    id="name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name">
                    Last name
                    {!isValidName(lastName) && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </label>
                  <input
                    disabled={isLoading}
                    type="text"
                    id="name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className=" flex flex-col my-4">
                <label htmlFor="email">
                  Email
                  {!isValidEmail(email) && (
                    <span className="text-red-600 ml-1">*</span>
                  )}
                </label>
                <input
                  disabled={isLoading}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" flex flex-col my-4">
                <label htmlFor="phone">
                  Phone
                  {!isValidPhone(phone) && (
                    <span
                      className="text-red-600 ml-1
					"
                    >
                      *
                    </span>
                  )}
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col">
                  <label htmlFor="date" className="mb-[2px]">
                    Date
                    {!selectedDate && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </label>
                  <DatePicker
                    id="date"
                    disabled={isLoading}
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd MMMM yyyy"
                    filterDate={filterDates}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="time" className="mb-[2px]">
                    Time
                    {!selectedTime && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={isLoading}
                    id="time"
                    className="appearance-none bg-white"
                  >
                    {availableTimes.length > 0 ? (
                      availableTimes.map((time: string) => (
                        <option value={time} key={time}>
                          {formatTime(time)} - {incrementTimeByOneHour(time)}
                        </option>
                      ))
                    ) : (
                      <option disabled>No time available for this date</option>
                    )}
                  </select>
                </div>
              </div>

              <div className=" flex flex-col my-4"></div>
              <div className=" flex flex-col my-4">
                <label htmlFor="message">Message</label>
                <textarea
                  disabled={isLoading}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  id="message"
                  cols={30}
                  rows={10}
                  placeholder="Enter any specific requests or additional information here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className=" rounded px-6 py-3 text-center font-semibold text-white bg-blue-600  hover:bg-blue-800"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Submitting" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
export default BookingForm;
