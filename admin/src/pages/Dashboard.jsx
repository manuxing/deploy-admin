import React, { useEffect } from "react";

// Icons
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components

const Dashboard = () => {
  let dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <div className="md:max-w-6xl md:mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <Link
              to="add-user"
              className="shadow inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg"
            >
              <AddIcon />
              Add User
            </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
