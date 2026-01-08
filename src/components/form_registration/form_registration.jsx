//First, we import the Zod library to define our schema and validate data.
import * as z from "zod";
import { useState } from "react";
import { userSchema } from "../../schema/registration";
import "./registration_form.css";

function RegistrationForm() {
  //In the app component, we create our usestate hooks for form data
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    phoneNumber: "",
    profileDescription: "",
  });

  //And for errors we create another useState hook
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    let newErrors = { ...errors };

    // Validate just this field
    try {
      userSchema.shape[field].parse(value);
      newErrors[field] = undefined;
    } catch (err) {
      if (err instanceof z.ZodError) {
        newErrors[field] = err.issues[0].message;
      }
    }

    // Special handling for password matching
    if (field === "confirmPassword") {
      if (value !== updatedData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors.confirmPassword = undefined;
      }
    } else if (field === "password") {
      if (
        updatedData.confirmPassword &&
        value !== updatedData.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match";
      } else if (updatedData.confirmPassword) {
        newErrors.confirmPassword = undefined;
      }
    }

    setErrors(newErrors);
  };

  //Next, we create a handleSubmit function that will be called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //We use the parse method to validate the form data against the schema
      userSchema.parse(formData);
      //If validation is successful, we can proceed with form submission logic
      console.log("Form submitted successfully:", formData);
      setErrors({});
    } catch (err) {
      //If validation fails, we catch the error and extract the validation issues
      if (err instanceof z.ZodError) {
        const validationErrors = {};
        //We loop through the issues and map them to our errors state
        err.issues.forEach((error) => {
          const fieldName = error.path[0] || "confirmPassword";
          validationErrors[fieldName] = error.message;
        });
        //We then set the errors state with the validation errors
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form__title">User Registration</h1>
        <div className="form__group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            required
          />
          {errors.userName ? (
            <p className="error">{errors.userName}</p>
          ) : formData.userName !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />

          {errors.firstName ? (
            <p className="error">{errors.firstName}</p>
          ) : formData.firstName !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
          {errors.lastName ? (
            <p className="error">{errors.lastName}</p>
          ) : formData.lastName !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          {errors.email ? (
            <p className="error">{errors.email}</p>
          ) : formData.email !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
          {errors.password ? (
            <p className="error">{errors.password}</p>
          ) : formData.password !== "" && !errors.password ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
          />
          {errors.confirmPassword ? (
            <p className="error">{errors.confirmPassword}</p>
          ) : formData.confirmPassword !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            required
          />
          {errors.dateOfBirth ? (
            <p className="error">{errors.dateOfBirth}</p>
          ) : formData.dateOfBirth !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
          {errors.phoneNumber ? (
            <p className="error">{errors.phoneNumber}</p>
          ) : formData.phoneNumber !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>
        <div className="form__group">
          <label htmlFor="profileDescription">Profile Description:</label>
          <input
            type="text"
            id="profileDescription"
            name="profileDescription"
            value={formData.profileDescription}
            onChange={(e) => handleChange("profileDescription", e.target.value)}
          />
          {errors.profileDescription ? (
            <p className="error">{errors.profileDescription}</p>
          ) : formData.profileDescription !== "" ? (
            <p>Thanks! :D</p>
          ) : null}
        </div>

        <button type="submit" className="form__button">
          Submit
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
