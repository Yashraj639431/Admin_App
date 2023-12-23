import React from "react";
import { useFormik } from "formik";
import { AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";

const ForgotPassword = () => {
  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <section id="section">
      <div className="form-box">
        <div className="form-value">
          <h3 className="text-center title">Forgot Password</h3>
          <p className="text-center">
            Please enter your register email to get reset password mail.
          </p>
          <form action="" onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <AiOutlineMail className="ion-icon" />
              <input
                type="email"
                label="Email Address"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                autoComplete="off"
                required
              />
              <label for="">Email</label>
            </div>
            <button type="submit">Send Link</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
