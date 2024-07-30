import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationsForRosters, getRosters, profilesOfLocation, saveRoster } from "../../../../redux/rosters/rosterSlice.js";

export const scheduleData = []

const Roster = () => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [location, setLocation] = useState();
  const [slotsDuration, setSlotsDuration] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState(""); 
  const [rosterData, setRosterData] = useState(scheduleData);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setFormData((pre) => ({ ...pre, startTime }));
  }, [startTime]);

  useEffect(() => {
    setFormData((pre) => ({ ...pre, endTime }));
  }, [endTime]);

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
      if (newDate.getDay() === 0) {
        alert("We do not allow selecting Sundays.");
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
    if (Object.keys(invalid).length) {
      setInvalidFields(invalid);
    } else {
      setFormData({
        location,
        selectedDoctors,
        slotsDuration,
        date: selectedDate,
        startTime,
        endTime,
      });
      setShowModal(true);
    }
  };

  const handleFocus = () => setShowDoctors(true);

  const handleSelectDoctor = (index, id) => {
    const updatedDoctors = [...doctors];
    const doctor = updatedDoctors[index];
    doctor.isSelected = !doctor.isSelected;
    setDoctors((pre)=>   pre.map((elm)=> elm._id===doctor._id?doctor:{...elm,isSelected:false}));

    if (doctor.isSelected) {
      setSelectedDoctors((prev) => [doctor]);
      setInvalidFields((prev) => ({ ...prev, selectedDoctors: false }));
    } else {
      setSelectedDoctors([]);
      setInvalidFields((prev) => ({ ...prev, selectedDoctors: true }));
    }

  
  };

  const handleRemoveEvent = (doctorId) => {
    setRosterData((prevData) =>
      prevData.filter((event) => event._doctorId !== doctorId)
    );
  };

  const handleRemoveDoctor = (id) => {
    setSelectedDoctors([]);
    setDoctors((prev) =>
      prev.map((doc) => (doc._id === id ? { ...doc, isSelected: false } : doc))
    );
    handleRemoveEvent(id);
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
    const offsetMinutes = dateTime.getTimezoneOffset();
    dateTime.setMinutes(dateTime.getMinutes() - offsetMinutes);
    if (isNaN(dateTime.getTime())) {
      throw new Error("Invalid date");
    }

    const isoString = dateTime.toISOString();
    return isoString;
  };

  const handleSaveRoster = () => {
    const { visitType, repeat } = formData;
    const selectedLocation = rosterLocations.find((elm) => elm.name === location);
    const { _id, name, address: { addressLine1, addressLine2, city, country, state, zipCode } } = selectedLocation;

    const createRoster = (date) => {
      selectedDoctors.forEach((elm) => {
        const { firstName, lastName, userType, tenantId, userId, work: { designation, speciality, licenseNumber, hprId, about, qualification } } = elm;
        const rosterData = {
          userId, tenantId, locationId: _id, startDate: convertToISOString(date, startTime), endDate: convertToISOString(date, endTime), visitType, duration: slotsDuration,
          repeat,
          practitionerData: { firstName, lastName, designation, speciality, licenseNumber, hprId, about, qualification, userType },
          locationData: { locationId: _id, name, address: { addressLine1, addressLine2, city, country, state, zipCode } }
        };
        console.log(rosterData, "roster data");
        dispatch(saveRoster(rosterData));
      });
    };

    const currentDate = new Date(selectedDate);
    const dayOfWeek = currentDate.getDay();
    if (repeat == 0) {
      createRoster(selectedDate);
    } else if (repeat == 1) {
      createRoster(selectedDate);
      if (dayOfWeek !== 6) {
        const tomorrow = new Date(selectedDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        createRoster(tomorrow);
      }
    } else if (repeat == 2) {
      for (let i = dayOfWeek; i <= 6; i++) {
        if (i === 0) continue; // Skip Sunday
        const date = new Date(selectedDate);
        date.setDate(currentDate.getDate() + (i - dayOfWeek));
        createRoster(date);
      }
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocationsForRosters());
  }, [dispatch]);

  useEffect(() => {
    if(selectedDoctors.length>0){
      dispatch(getRosters(selectedDoctors[0].userId));
    }else{
      setRosterData([])
    }
 
  }, [dispatch,selectedDoctors]);


  const { rosterLocations, locationDoctors, rostersData } = useSelector((state) => state.rosters);

  useEffect(() => {
    const updatedDoctors = locationDoctors?.map((elm) => ({ ...elm, isSelected: false }));
    setDoctors(() => updatedDoctors);
  }, [locationDoctors]);

  useEffect(() => {
    if (location) {
      setSelectedDoctors([]);
      const selectedLocation = rosterLocations.find((elem) => elem.name === location);
      dispatch(profilesOfLocation(selectedLocation._id));
    }
  }, [location, dispatch, rosterLocations]);

  useEffect(() => {
    const newEvents = rostersData?.map((roster, rosterIndex) => {
      const startTime = new Date(roster.startDate);
      const endTime = new Date(roster.endDate);
      return {
        Id: rostersData.length + 1 + rosterIndex,
        rosterId: roster._id,
        Subject: `Appointment with ${roster.practitionerData.firstName} ${roster.practitionerData.lastName}`,
        StartTime: startTime,
        EndTime: endTime,
        CategoryColor: "#64C6B0",
        Description: `Visit Type: ${roster.visitType}`,
      };
    });

    setRosterData(() => newEvents);
  }, [rostersData]);

  const onDragStop = (args) => {
    const newDate = args.data.StartTime;
    if (newDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (newDate < today) {
        alert("You cannot drop an event on a past date.");
        args.cancel = true;
      }
    }
  };

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
            {rosterLocations.length > 0 && rosterLocations.map((elm) =>
              <option
                value={elm.name}
                className="text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                {elm.name}
              </option>
            )}
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
      </div>
       
      <div className="flex-1 ml-2 rounded-xl overflow-hidden border border-gray-300 shadow-md">
        <ScheduleComponent
          height="100%"
          selectedDate={selectedDate}
          eventSettings={{ dataSource: rosterData }}
          currentView="Month"
          timezone="UTC"  
          popupOpen={onPopupOpen}
          dragStop={onDragStop} 
          cssClass={styles.custom_schedule}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>
      {showModal && (
        <RosterModel
          setFormData={setFormData}
          slotsDuration={slotsDuration}
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

export default Roster;
