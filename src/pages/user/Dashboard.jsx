import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>This page is only for authorized users</p>
      <br />
      <Link to="/user/users">Users</Link>
    </>
  );
};

export default Dashboard;
