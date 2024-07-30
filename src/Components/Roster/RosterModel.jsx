import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { format, addMinutes, parse, isBefore } from "date-fns";
import { duration } from "moment/moment";

const RosterModel = ({
  formData,
  onClose,
  setStartTime,
  setEndTime,
  handleSaveRoster,
  setFormData,
  slotsDuration,
}) => {
  const [start, setStart] = useState(formData.startTime);
  const [end, setEnd] = useState(formData.endTime);
  const [visitType, setVisitType] = useState("");
  const [repeat, setRepeat] = useState();

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStart(newStartTime);
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;

    if (
      isBefore(
        parse(newEndTime, "hh:mm aa", new Date()),
        parse(start, "hh:mm aa", new Date())
      )
    ) {
      alert("End time cannot be before start time.");
      return;
    }

    const totalDuration = calculateTotalDuration(start, newEndTime);
    console.log(totalDuration,slotsDuration);
    if (totalDuration % slotsDuration !== 0) {
      return alert("duration should beequaly distributed");
    }

    setEnd(newEndTime);
    setEndTime(newEndTime);
  };

  const calculateTotalDuration = (startTime, endTime) => {
    const parsedStartTime = parse(startTime, "hh:mm aa", new Date());
    const parsedEndTime = parse(endTime, "hh:mm aa", new Date());
    return (parsedEndTime - parsedStartTime) / (1000 * 60);
  };

  const startTimeOptions = [
    "07:45 AM","08:00 AM","08:15 AM","08:30 AM","08:45 AM","09:00 AM","09:15 AM","09:30 AM","09:45 AM","10:00 AM","10:15 AM","10:30 AM","10:45 AM","11:00 AM","11:15 AM","11:30 AM","11:45 AM","12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM",
  ];

  const endTimeOptions = ["09:45 AM","10:00 AM","10:15 AM","10:30 AM","10:45 AM","11:00 AM","11:15 AM","11:30 AM","11:45 AM","12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM","03:15 PM","03:30 PM","03:45 PM","04:00 PM",
  ];

  const formatDate = (date) => {
    return format(new Date(date), "EEEE, MMMM d");
  };

  const handleSave = () => {
    const events = [];
    const currentDate = new Date(formData.date);
    const dayOfWeek = currentDate.getDay(); // Get the day of the week (0-6, 0 = Sunday)

  

    handleSaveRoster(events);
    onClose();
  };


  function handleVisitType(e){
    setVisitType(e.target.value);
    setFormData((pre)=>({...pre,visitType:e.target.value}))
  }

  function handleRepeat(e){
    setRepeat(e.target.value)
    setFormData((pre)=>({...pre,repeat:e.target.value}))
  }
   
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
          <label className="block font-semibold mb-2 text-gray-600">
            Visit Type*
          </label>
          <select
            className="rounded-md w-full py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md focus:shadow-[#64C6B0]/30"
            value={visitType}
            onChange={(e) => handleVisitType(e)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold text-gray-600">
            Date and Time
          </label>
          <div className="flex items-center mb-2">
            <span className="mr-2">{formatDate(formData.date)}</span>
            <div className="flex items-center">
              <select
                value={start}
                onChange={handleStartTimeChange}
                className="rounded-md py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md  focus:shadow-[#64C6B0]/30"
              >
                {startTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span className="mx-2">-</span>
              <select
                value={end}
                onChange={handleEndTimeChange}
                className="rounded-md py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md  focus:shadow-[#64C6B0]/30"
              >
                {endTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="mb-3 text-gray-600">
          (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
        </p>
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">
            Repeat
          </label>
          <select
            className="rounded-md w-full py-2 px-3 shadow-inner border border-gray-300 focus:outline-none focus:border-[#64C6B0] focus:shadow-md focus:shadow-[#64C6B0]/30"
            value={repeat}
            onChange={(e) =>handleRepeat(e)}
          >
            <option value="">Select</option>
            <option value="1">Repeat for tomorrow</option>
            <option value="2">Rest of the week</option>
            <option value="0">Doesn't repeat</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-[#64C6B0] text-white rounded-md shadow-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RosterModel;
