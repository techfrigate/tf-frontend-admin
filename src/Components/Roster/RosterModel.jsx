import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { format } from "date-fns";

const RosterModel = ({ formData, onClose, setStartTime, setEndTime, handleSaveRoster }) => {
  const [start, setStart] = useState(formData.startTime);
  const [end, setEnd] = useState(formData.endTime);
  const [visitType, setVisitType] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleStartTimeChange = (e) => {
    setStart(e.target.value);
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEnd(e.target.value);
    setEndTime(e.target.value);
  };

  const startTimeOptions = [
    "07:45 am", "08:00 am", "08:15 am", "08:30 am", "08:45 am",
    "09:00 am", "09:15 am", "09:30 am", "09:45 am", "10:00 am",
    "10:15 am", "10:30 am", "10:45 am", "11:00 am", "11:15 am",
    "11:30 am", "11:45 am", "12:00 pm", "12:15 pm", "12:30 pm",
    "12:45 pm", "01:00 pm", "01:15 pm", "01:30 pm", "01:45 pm",  
    "02:00 pm", "02:15 pm", "02:30 pm", "02:45 pm", "03:00 pm"
  ];

  const endTimeOptions = [
    "09:45 am", "10:00 am", "10:15 am", "10:30 am", "10:45 am",
    "11:00 am", "11:15 am", "11:30 am", "11:45 am", "12:00 pm",
    "12:15 pm", "12:30 pm", "12:45 pm", "01:00 pm", "01:15 pm",
    "01:30 pm", "01:45 pm", "02:00 pm", "02:15 pm", "02:30 pm",
    "02:45 pm", "03:00 pm", "03:15 pm", "03:30 pm", "03:45 pm",
    "04:00 pm"
  ];

  const formatDate = (date) => {
    return format(new Date(date), 'EEEE, MMMM d');
  };

  const handleSave = () => {
    const events = [];
    const currentDate = new Date(formData.date);
    const dayOfWeek = currentDate.getDay(); // Get the day of the week (0-6, 0 = Sunday)

    if (repeat === "Repeat for tomorrow") {
      events.push({
        ...formData,
        startTime: start,
        endTime: end,
        visitType,
        date: currentDate
      });

      if (dayOfWeek !== 6) { // If not Saturday
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        events.push({
          ...formData,
          startTime: start,
          endTime: end,
          visitType,
          date: nextDate
        });
      }
    } else if (repeat === "Rest of the week") {
      for (let i = dayOfWeek; i <= 6; i++) { // From the selected day till Sunday
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + (i - dayOfWeek));
        events.push({
          ...formData,
          startTime: start,
          endTime: end,
          visitType,
          date
        });
      }
    } else {
      events.push({
        ...formData,
        startTime: start,
        endTime: end,
        visitType,
        date: currentDate
      });
    }

    handleSaveRoster(events);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-[34rem] h-[25rem] shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">New Roster</h2>
          <button onClick={onClose} className="text-gray-600">
            <MdClose size={24} />
          </button>
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-2 text-gray-600">Visit Type*</label>
          <select
            className="rounded-md w-full py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md focus:shadow-[#64C6B0]/30"
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
          >
            <option value="" disabled>Select</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold text-gray-600">Date and Time</label>
          <div className="flex items-center mb-2">
            <span className="mr-2">{formatDate(formData.date)}</span>
            <div className="flex items-center">
              <select
                value={start}
                onChange={handleStartTimeChange}
                className="rounded-md py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md  focus:shadow-[#64C6B0]/30"
              >
                {startTimeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <span className="mx-2">-</span>
              <select
                value={end}
                onChange={handleEndTimeChange}
                className="rounded-md py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md focus:shadow-[#64C6B0]/30"
              >
                {endTimeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="mb-3 text-gray-600">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</p>
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">Repeat</label>
          <select
            className="rounded-md w-full py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md focus:shadow-[#64C6B0]/30"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Repeat for tomorrow">Repeat for tomorrow</option>
            <option value="Rest of the week">Rest of the week</option>
            <option value="Doesn't repeat">Doesn't repeat</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-[#64C6B0] text-white rounded-md shadow-md" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RosterModel;
