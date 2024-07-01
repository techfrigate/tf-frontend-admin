import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/Topbar/Topbar";
import Workflows from "./Pages/WorkSpace/Workflows/Workflows";
import Workforms from "./Pages/WorkSpace/Workforms/Workforms";
import Workstates from "./Pages/WorkSpace/Workstates/Workstates";
import User from "./Pages/IAM/User/User";
import Roles from "./Pages/IAM/Roles/Roles";
import Groups from "./Pages/IAM/Groups/Groups";
import Organizations from "./Pages/Providers/Organizations/Organizations";
import Locations from "./Pages/Providers/Locations/Locations";
import Ward from "./Pages/Providers/Ward/Ward";
import Agreements from "./Pages/Providers/Agreements/Agreements";
import Patients from "./Pages/Patients/Patients";
import Patient from "./Pages/Apps/Patient/Circle/Circle";
import Roster from "./Pages/Apps/Practitioner/Roster/Roster";
import Studio from "./Pages/Apps/Studio/Studio";
import Admin from "./Pages/Apps/Admin/Admin";
import Trust from "./Pages/Trust/Trust";
import Support from "./Pages/Support/Support";
import Departments from "./Pages/General/Departments/Departments";
import Services from "./Pages/General/Services/Services";
import Patners from "./Pages/Patners/Agreement/Agreement";
import Billing from "./Pages/Billing/Billing";
import Appointments from "./Pages/General/Appointments/Appointments";
import Tariff from "./Pages/General/Tariff/Tariff";
import Diagnostic from "./Pages/General/Diagnostic/Diagnostic";
import Medicines from "./Pages/General/Medicines/Medicines";
import Vitals from "./Pages/General/Vitals/Vitals";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleCreateProviderForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="flex bg-gray-200 h-[100vh]">
      <Sidebar />
      <div className="flex flex-col w-full h-[100vh] box-border overflow-hidden">
        <Topbar
          toggleCreateProviderForm={toggleCreateProviderForm}
          showForm={showForm}
        />
        <div className="px-2 pb-3 w-full">
          <div className="w-full h-[83.7vh] rounded-md bg-white">
            <Routes>
              <Route path="/workSpace/workflows" element={<Workflows />} />
              <Route path="/workSpace/workforms" element={<Workforms />} />
              <Route path="/workSpace/workstates" element={<Workstates />} />
              <Route path="/iam/users" element={<User />} />
              <Route path="/iam/roles" element={<Roles />} />
              <Route path="/iam/groups" element={<Groups />} />
              <Route path="/providers/agreements" element={<Agreements />} />
              <Route
                path="/providers/organizations"
                element={<Organizations showForm={showForm} />}
              />
              <Route
                path="/providers/locations"
                element={
                  <Locations
                    showForm={showForm}
                    toggleCreateProviderForm={toggleCreateProviderForm}
                  />
                }
              />
              <Route path="/providers/ward" element={<Ward />} />
              <Route path="/patners/agreement" element={<Patners />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/apps/practitioner/roster" element={<Roster />} />
              <Route
                path="/apps/patient/circle"
                element={
                  <Patient
                    toggleCreateProviderForm={toggleCreateProviderForm}
                    showForm={showForm}
                    setShowForm={setShowForm}
                  />
                }
              />
              <Route path="/apps/studio" element={<Studio />} />
              <Route path="/apps/admin" element={<Admin />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/support" element={<Support />} />
              <Route path="/general/departments" element={<Departments />} />
              <Route path="/general/services" element={<Services />} />
              <Route path="/general/appointments" element={<Appointments />} />
              <Route path="/general/tariff" element={<Tariff />} />
              <Route path="/general/diagnostic" element={<Diagnostic />} />
              <Route path="/general/medicines" element={<Medicines />} />
              <Route path="/general/vitals" element={<Vitals />} />
              <Route
                path="/"
                element={<Navigate to="/providers/locations" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
