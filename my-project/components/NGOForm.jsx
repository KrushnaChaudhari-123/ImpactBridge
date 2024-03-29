import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Nav from "./Navbar";
import "./tailwind.css";
import "./NGOReg.css";

const NGOFrom1 = () => {
  return (
    <>
      <div className="flex flex-row mr-6" style={{ overflowX: "hidden" }}>
        <div className="leftside">
          <div className="textfield" >
        Be the Change You Wish To See
        </div>
        </div>
        <div className="rightside">
          <div className="flex form justify-center">
            <RegistrationForm1 />
          </div>
        </div>
      </div>
    </>
  );
};

const RegistrationForm1 = () => {
  const initialValues = {
    organizationName: "",
    organizationType: "",
    contactPersonName: "",
    contactNGOEmail: "",
    contactPersonPhone: "",
    organizationWebsite: "",
    missionStatement: "",
    activitiesDescription: "",
    geographicFocus: "",
    targetBeneficiaryGroups: "",
    registrationNumber: "",
    socialMediaLinks: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    organizationName: Yup.string().required("Required"),
    organizationType: Yup.string().required("Required"),
    contactNGOEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    contactPersonPhone: Yup.number().required("Number is required"),
    organizationWebsite: Yup.string().url("Invalid URL").required("Required"),
    missionStatement: Yup.string().required("Required"),
    activitiesDescription: Yup.string().required("Required"),
    geographicFocus: Yup.string().required("Required"),
    targetBeneficiaryGroups: Yup.string().required("Required"),
    registrationNumber: Yup.number().required("Required"),
    socialMediaLinks: Yup.string().url("Invalid URL").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/api/NGOAccCreation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data
        alert("Success");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        className="mx-auto p-4 rounded-lg border ngo-registration"
        style={{ overflowY: "scroll" }}
      >
        <div className="flex" style={{ margin: "0 auto" }}>
          <label className="font-bold" style={{ fontSize: "36px" }}>
            NGO Registration
          </label>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <Textfield
              label="Organization Name:"
              name="organizationName"
              type="text"
            />
            <Textfield
              label="Organization Type:"
              name="organizationType"
              type="text"
            />
            <Textfield
              label="Mission Statement:"
              name="missionStatement"
              type="text"
            />
            <Textfield
              label="Contact Person Name:"
              name="contactPersonName"
              type="text"
            />

            <Textfield
              label="Contact Person Phone:"
              name="contactPersonPhone"
              type="tel"
            />
            <Textfield
              label="Organization Website:"
              name="organizationWebsite"
              type="url"
            />
            <Textfield
              label="Enter Password:"
              name="password"
              type="password"
            />
          </div>

          <div className="w-1/2">
            <Textfield
              label="Contact NGO Email:"
              name="contactNGOEmail"
              type="email"
            />
            <Textfield
              label="Activities Description:"
              name="activitiesDescription"
              type="text"
            />
            <Textfield
              label="Geographic Focus:"
              name="geographicFocus"
              type="text"
            />
            <Textfield
              label="Target Beneficiary Groups:"
              name="targetBeneficiaryGroups"
              type="text"
            />
            <Textfield
              label="Registration/License Number:"
              name="registrationNumber"
              type="text"
            />
            <Textfield
              label="Social Media Links:"
              name="socialMediaLinks"
              type="text"
            />
            <Textfield
              label="Confirm Password:"
              name="confirmPassword"
              type="password"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-[#c2410c]-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

const Textfield = ({ label, name, type }) => {
  return (
    <div className="mb-2">
      <label className="block font-bold">{label}</label>
      <Field
        type={type}
        name={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ngo-input shadow-md"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default NGOFrom1;
