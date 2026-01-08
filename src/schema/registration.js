import * as z from "zod";

// After importing Zod, the first thing we need to do is define a schema for the data we want to validate.
const userSchema = z
  .object({
    //Must only contain letters, numbers and underscores, minimum 3 characters
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    //Must only contain letters, minimum 2 characters
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters long")
      .regex(/^[A-Za-z]+$/, "First Name can only contain letters"),
    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters long")
      .regex(/^[A-Za-z]+$/, "Last Name can only contain letters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long") //Check for minimum length
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter") //Require at least one uppercase letter
      .regex(/[a-z]/, "Password must contain at least one lowercase letter") //Require at least one lowercase letter
      .regex(/[0-9]/, "Password must contain at least one number") //require at least one number
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ), //require at least one special character
    confirmPassword: z.string(),
    //Verify user is older than 18 years
    dateOfBirth: z.string().refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      return age >= 18;
    }, "You must be at least 18 years old"),
    //Phone number is optional must be exactly 8 digits
    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\d{8}$/.test(val),
        "Phone number must be exactly 8 digits"
      ),
    //Profile description is optional but cannot exceed 200 characters
    profileDescription: z
      .string()
      .max(200, "Profile description must be at most 200 characters long"),
  })
  //We use the refine method to make sure the confirm password matches the password
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the path to indicate the field with the error
  });

export { userSchema };
