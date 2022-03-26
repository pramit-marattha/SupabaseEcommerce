import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  status: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  authenticity: Yup.number().positive().integer().min(1).required(),
  returnPolicy: Yup.number().positive().integer().min(1).required(),
  warranty: Yup.number().positive().integer().min(1).required(),
});

const ListingForm = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/productsImage", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    status: "",
    price: 0,
    authenticity: 1,
    returnPolicy: 1,
    warranty: 1,
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Entire your product name..."
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Enter your product description...."
                disabled={disabled}
                rows={3}
              />

              <Input
                name="status"
                type="text"
                label="Status(new/out-of-stock/used)"
                placeholder="Enter your product status...."
                disabled={disabled}
              />

              <Input
                name="price"
                type="number"
                min="0"
                label="Price of the product..."
                placeholder="100"
                disabled={disabled}
              />

              <div className="justify-center">
                <Input
                  name="authenticity"
                  type="number"
                  min="0"
                  label="authenticity(%)"
                  placeholder="2"
                  disabled={disabled}
                />
                <Input
                  name="returnPolicy"
                  type="number"
                  min="0"
                  label="returnPolicy(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
                <Input
                  name="warranty"
                  type="number"
                  min="0"
                  label="warranty(? years)"
                  placeholder="1"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-success text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-teal-600 focus:ring-opacity-50 hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mb-6 max-w-full">
        <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>
    </div>
  );
};

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    authenticity: PropTypes.number,
    returnPolicy: PropTypes.number,
    warranty: PropTypes.number,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ListingForm;
