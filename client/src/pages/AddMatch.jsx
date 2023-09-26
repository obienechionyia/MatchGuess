import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/matches", data);
    toast.success("Job added successfully");
    return redirect("/dashboard/all-matches");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddMatch = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add match</h4>
        <div className="form-center">
          <FormRow type="text" name="opponent1" labelText="opponent 1" />
          <FormRow type="text" name="opponent2" labelText="opponent 2" />
          <FormRow type="text" labelText="match location" name="location" />
          <FormRow type="date" labelText="match date" name="matchDate" />
          <FormRow
            type="text"
            name="predictedWinner"
            labelText="predicted winner"
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddMatch;
