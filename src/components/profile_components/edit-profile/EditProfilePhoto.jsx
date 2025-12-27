"use client"

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import { setUserAuth } from "../../../store_slices/userAuthSlice";
import logger from "../../../utils/logger";
import Button from "../../reusable_components/Buttons";

const EditProfilePhoto = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const dispatch = useDispatch();
  const { userData, idToken } = useSelector((state) => state.userAuth);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    setImgPreview(tempUrl);
  };

  const submitImage = async (type) => {
    try {
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      const route = type === "upload" ? "user/uploads" : "user/uploads/delete";
      const res = authApi(idToken).post(route, formData);
      dispatch(setUserAuth({ stateProp: "userData", value: res.data }));
    } catch (err) {
      logger.error("Failed to update profile photo", err);
    } finally {
      setImgPreview(null);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (type) => submitImage(type),
  });

  return (
    <>
      <div
        onClick={() => fileRef.current.click()}
        className="w-20 sm:w-28 md:36 lg: xl:43 aspect-square rounded-full mb-3"
      >
        <img
          src={imgPreview ?? userData?.profilePicture?.url}
          alt={`${userData.displayName} profile photo`}
          className="object-cover w-full h-full"
        />
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        mutateAsync("upload")
      }}>
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => handleFileChange(e)}
          className="none"
        />
        <div className="flex gap-3">
        <Button
          rounded="6px"
          type="tertiary"
          buttonFn={() => mutateAsync("delete")}
          buttonType="button"
        >
          {isPending ? "Removing..." : "Remove Photo"}
        </Button>
        <Button rounded="6px" buttonType="submit">
          {isPending ? "Saving..." : "Save"}
        </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfilePhoto;
