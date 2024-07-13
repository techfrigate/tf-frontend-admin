import React, { useState, useRef, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import styles from "../../../../Css/Roaster/Roster.module.css";
import DoctorSelector from "../../../../Components/Roster/DoctorSelector";
import RosterModel from "../../../../Components/Roster/RosterModel.jsx";

export const scheduleData = []

const Roster = () => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [location, setLocation] = useState("");
  const [slotsDuration, setSlotsDuration] = useState("");
  const [allowedBooking, setAllowedBooking] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rosterData, setRosterData] = useState(scheduleData);

  const onPopupOpen = (args) => {
    const newDate = args.data.StartTime;
    if (newDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (newDate < today) {
        alert("We do not allow selecting a date before today.");
        args.cancel = true;
        return;
      }
      setSelectedDate(() => newDate);
    }
    args.cancel = true;
    const invalid = {};
    if (selectedDoctors.length === 0) invalid.selectedDoctors = true;
    if (!location) invalid.location = true;
    if (!slotsDuration) invalid.slotsDuration = true;
    if (!allowedBooking) invalid.allowedBooking = true;
    if (Object.keys(invalid).length) {
      setInvalidFields(invalid);
    } else {
      setFormData({
        location,
        selectedDoctors,
        slotsDuration,
        allowedBooking,
        date: selectedDate,
        startTime,
        endTime,
      });
      setShowModal(true);
    }
  };

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Dipanshu Verma", role: "Doctor", isSelected: false },
    { id: 2, name: "Dr. Shivam Swami", role: "Doctor", isSelected: false },
    { id: 3, name: "Dr. Dhruv Swami", role: "Doctor", isSelected: false },
    { id: 4, name: "Dr. Rahul Kumar", role: "Doctor", isSelected: false },
    { id: 5, name: "Dr. Suresh Raina", role: "Doctor", isSelected: false },
    { id: 6, name: "Dr. Amit Kumar", role: "Doctor", isSelected: false },
  ]);

  const handleFocus = () => setShowDoctors(true);

  const handleSelectDoctor = (index, id) => {
    const updatedDoctors = [...doctors];
    const doctor = updatedDoctors[index];
    doctor.isSelected = !doctor.isSelected;
    setDoctors(updatedDoctors);

    if (doctor.isSelected) {
      setSelectedDoctors((prev) => [...prev, doctor]);
    } else {
      setSelectedDoctors((prev) => prev.filter((doc) => doc.id !== id));
    }

    setInvalidFields((prev) => ({ ...prev, selectedDoctors: false }));
  };

  const handleRemoveEvent = (doctorId) => {
    setRosterData((prevData) =>
      prevData.filter((event) => event.doctorId !== doctorId)
    );
  };

  const handleRemoveDoctor = (id) => {
    setSelectedDoctors((prev) => prev.filter((doc) => doc.id !== id));
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isSelected: false } : doc))
    );
    handleRemoveEvent(id); // Remove the event when doctor is removed
  };

  const convertToISOString = (date, time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (modifier.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    if (isNaN(dateTime.getTime())) {
      throw new Error("Invalid date");
    }

    return dateTime.toISOString();
  };

  const handleSaveRoster = (newRosters) => {
    const newEvents = newRosters.flatMap((newRoster, rosterIndex) =>
      newRoster.selectedDoctors.map((doctor, index) => ({
        Id: rosterData.length + 1 + rosterIndex * newRoster.selectedDoctors.length + index,
        doctorId: doctor.id, // Store doctorId to identify the event
        Subject: `Appointment with ${doctor.name}`,
        StartTime: new Date(convertToISOString(newRoster.date, newRoster.startTime)),
        EndTime: new Date(convertToISOString(newRoster.date, newRoster.endTime)),
        CategoryColor: "#64C6B0",
        Description: `Visit Type: ${newRoster.visitType}`,
      }))
    );
    setRosterData((prevData) => [...prevData, ...newEvents]);
  };
  

  console.log(rosterData);
  return (
    <div className="flex gap-0 h-full px-2 py-2">
      <div className="bg-white rounded-xl border border-gray-300 shadow-md p-3 w-[26%]">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Roster</h2>
          <button
            className="text-[#64C6B0] border border-gray-500 rounded-md px-3 py-1"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-600">
            Location
          </label>
          <select
            className={`rounded-md w-full py-2 px-3 flex justify-between items-center shadow-inner border outline-none text-[#94999f] ${
              invalidFields.location
                ? "shadow-md border-red-700 shadow-red-700/30"
                : "focus-within:shadow-md focus-within:border-[#64C6B0] focus-within:shadow-[#64C6B0]/30"
            }`}
            value={location}
            onChange={(e) => {
              setInvalidFields((prev) => ({ ...prev, location: false }));
              setLocation(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Location
            </option>
            <option
              value="mohta hospital"
              className="text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Mohta Hospital
            </option>
          </select>
        </div>
        <DoctorSelector
          doctors={doctors}
          selectedDoctors={selectedDoctors}
          showDoctors={showDoctors}
          setShowDoctors={setShowDoctors}
          handleFocus={handleFocus}
          handleSelectDoctor={handleSelectDoctor}
          handleRemoveDoctor={handleRemoveDoctor}
          invalidFields={invalidFields}
        />
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-600">
            Slots Duration (minutes)
          </label>
          <div
            className={`rounded-md w-full py-2 px-3 flex justify-between items-center text-gray-500 shadow-inner border ${
              invalidFields.slotsDuration
                ? "shadow-md border-red-700 shadow-red-700/30"
                : "focus-within:shadow-md focus-within:border-[#64C6B0] focus-within:shadow-[#64C6B0]/30"
            }`}
          >
            <input
              type="number"
              placeholder="Slots Duration"
              value={slotsDuration}
              onChange={(e) => {
                setInvalidFields((prev) => ({ ...prev, slotsDuration: false }));
                setSlotsDuration(e.target.value);
              }}
              className={`border-none w-[86%] outline-none bg-transparent ${styles.roster_placeholder}`}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-600">
            Allowed Booking
          </label>
          <div
            className={`rounded-md w-full py-2 px-3 flex justify-between items-center text-gray-500 shadow-inner border ${
              invalidFields.allowedBooking
                ? "shadow-md border-red-700 shadow-red-700/30"
                : "focus-within:shadow-md focus-within:border-[#64C6B0] focus-within:shadow-[#64C6B0]/30"
            }`}
          >
            <input
              type="number"
              placeholder="Allowed Booking"
              value={allowedBooking}
              onChange={(e) => {
                setInvalidFields((prev) => ({ ...prev, allowedBooking: false }));
                setAllowedBooking(e.target.value);
              }}
              className={`border-none w-[86%] outline-none bg-transparent ${styles.roster_placeholder}`}
            />
          </div>
        </div>
      </div>
      {/* Calendar */}
      <div className="flex-1 ml-2 rounded-xl overflow-hidden border border-gray-300 shadow-md">
      <ScheduleComponent
          height="100%"
          selectedDate={selectedDate}
          eventSettings={{ dataSource: rosterData }}
          currentView="Month"
          popupOpen={onPopupOpen}
          cssClass={styles.custom_schedule}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>
      {/* Modal */}
      {showModal && (
        <RosterModel
          formData={formData}
          onClose={() => setShowModal(false)}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          handleSaveRoster={handleSaveRoster}
        />
      )}
    </div>
  );
};

export default Roster