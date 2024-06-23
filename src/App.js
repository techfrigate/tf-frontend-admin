import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/Topbar/Topbar";
import Workflows from "./Pages/WorkSpace/Workflows/Workflows";
import Workforms from "./Pages/WorkSpace/Workforms/Workforms";
import Workstates from "./Pages/WorkSpace/Workstates/Workstates";
import User from "./Pages/IAM/User";
import Roles from "./Pages/IAM/Roles";
import Groups from "./Pages/IAM/Groups";
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
import General from "./Pages/General/General";
import Patners from "./Pages/Patners/Agreement/Agreement";
import Billing from "./Pages/Billing/Billing";

function App() {
  return (
    <div className="flex  bg-gray-200 h-[100vh] ">
      <Sidebar />
      <div className=" flex flex-col w-full h-[100vh] box-border overflow-hidden ">
        <Topbar />
        <div className="px-2 pb-3 w-full">
          <div className={`w-full h-[83.7vh]  rounded-md bg-white`}>
            <Routes>
              <Route path="/workSpace/workflows" element={<Workflows />} />
              <Route path="/workSpace/workforms" element={<Workforms />} />
              <Route path="/workSpace/workstates" element={<Workstates />} />
              <Route path="/iam/users" element={<User />} />
              <Route path="/iam/roles" element={<Roles />} />
              <Route path="/iam/groups" element={<Groups />} />
              <Route path="/providers/Agreements" element={<Agreements />} />
              <Route
                path="/providers/organizations"
                element={<Organizations />}
              />
              <Route path="/providers/locations" element={<Locations />} />
              <Route path="/providers/ward" element={<Ward />} />
              <Route path="/patners/agreement" element={<Patners />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/apps/patient" element={<Patient />} />
              <Route path="/apps/practitioner/roster" element={<Roster />} />
              <Route path="/apps/Patient/circle" element={<Patient />} />
              <Route path="/apps/studio" element={<Studio />} />
              <Route path="/apps/admin" element={<Admin />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/support" element={<Support />} />
              <Route path="/general" element={<General />} />
              <Route path="/apps/admin" element={<Admin />} />
              <Route path="/apps/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
