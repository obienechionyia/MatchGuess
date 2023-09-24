import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/matches/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-matches");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/matches/${params.id}`, data);
    toast.success("Match edited successfully");
    return redirect("/dashboard/all-matches");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditMatch = () => {
  const { match } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit match</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="opponent1"
            defaultValue={match.opponent1}
          />
          <FormRow
            type="text"
            name="opponent2"
            defaultValue={match.opponent2}
          />
          <FormRow
            type="text"
            labelText="predicted winner"
            name="predictedWinner"
            defaultValue={match.predictedWinner}
          />
          <FormRow
            type="text"
            labelText="match location"
            name="location"
            defaultValue={match.location}
          />
          <FormRow
            type="text"
            labelText="match date"
            name="matchDate"
            defaultValue={match.matchDate.slice(0, -14)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditMatch;
