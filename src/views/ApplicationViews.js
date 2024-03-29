import { Routes, Route } from "react-router-dom";
import { MainMenu } from "../components/mainmenu/MainMenu";
import { useState, useEffect } from "react";

import { ViewOrders } from "../components/order-details/ViewOrders";

import { AddEmployee } from "../components/forms/AddEmployee";
import { EmployeeList } from "../components/employees/EmployeeList.js";
import { UpdateEmployee } from "../components/forms/UpdateEmployee";
import { SalesReport } from "../components/sales/SalesReport.js";
import { NewOrder } from "../components/neworder/NewOrder.js";
import { OrderDetails } from "../components/order-details/OrderDetails.js";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localNonnaUser = localStorage.getItem("nonna_user");
    const NonnaUserObject = JSON.parse(localNonnaUser);
    setCurrentUser(NonnaUserObject);
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainMenu currentUser={currentUser} />} />
        <Route path="orders" element={<ViewOrders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />

        <Route path="sales" element={<SalesReport />} />

        <Route index element={<MainMenu currentUser={currentUser} />} />

        {/* INSERT ADDITIONAL ROUTES HERE */}
        <Route path="EmployeeList" element={<EmployeeList />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route
          path="update-employee/:employeeId"
          element={<UpdateEmployee />}
        />
        <Route
          path="neworder"
          element={<NewOrder currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
