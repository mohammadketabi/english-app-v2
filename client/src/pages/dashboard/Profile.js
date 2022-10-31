import React from "react";
import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Name"
            value={name}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormRow
            type="text"
            name="location"
            labelText="Location"
            value={location}
            handleChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
