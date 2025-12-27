"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import logger from "../../../utils/logger";
import { formatFormData } from "../../../utils/regHelperFns";
import Button from "../../reusable_components/Buttons";
import {
  FormErrors,
  FormWrapper,
  Input,
  Label,
} from "../../reusable_components/FormLayouts";

const ProductForm = ({ hasDefault, availableCategories }) => {
  const { idToken } = useSelector((state) => state.userAuth);
  const [_, reRender] = useState(0);
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      productName: hasDefault?.name ?? "",
      description: hasDefault?.description ?? "",
      price: hasDefault?.price ?? 0,
      category: hasDefault?.category ?? availableCategories[0],
      images: [],
      productStatus: hasDefault?.productStatus ?? "active",
    },
  });

  const submitFn = async (data) => {
    try {
      const formData = formatFormData(data);
      const product = await authApi(idToken).post(
        params.pid === "new"
          ? "/product/vendor"
          : `/product/vendor/${hasDefault?.productId}`,
        formData
      );
      hasDefault = product.data;
      reRender((state) => state + 1);
      toast.success(
        params.pid === "new"
          ? "Product Added Successfully"
          : "Product Updated Successfully"
      );
    } catch (err) {
      logger.error("Failed to save product", err);
      toast.error(
        params.pid === "new"
          ? "Couldn't add product, try again later"
          : "Couldn't update product, try again later"
      );
    }
  };

  const deleteImage = async (id) => {
    try {
      await authApi(idToken).delete(`/product/image/${id}`, {
        params: { productId: hasDefault?.productId, publicId: id },
      });
      hasDefault.images = hasDefault.images.filter(
        ({ publicId }) => publicId !== id
      );
      reRender((state) => state + 1);
      toast.success("Image deleted");
    } catch (err) {
      logger.error("Failed to delete product image", err);
      toast.error("Unable to delete image, try again later");
    }
  };

  const imagesValues = watch("images");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => submitFn(data),
  });

  return (
    <>
      <PageHeader
        headerText={params.pid === "new" ? "Add Product" : "Edit Product"}
      />
      <form onSubmit={handleSubmit(mutateAsync)}>
        <FormWrapper>
          <Label htmlFor="productName">Product Name*</Label>
          <Input
            id="productName"
            {...register("productName", {
              required: "You must add a Product Name",
            })}
          />
          {errors.productName && (
            <FormErrors errorText={errors.productName.message} />
          )}
        </FormWrapper>
        <FormWrapper>
          <Label htmlFor="category">category*</Label>
          <Input
            inputType="select"
            selectOptions={availableCategories}
            id="category"
            {...register("category", { required: "You must add a category" })}
          />
          {errors.category && (
            <FormErrors errorText={errors.category.message} />
          )}
        </FormWrapper>

        {(hasDefault?.images?.length > 0 || imagesValues?.length > 0) && (
          <div className="flex gap-3 justify-start">
            {hasDefault?.images?.length > 0 &&
              hasDefault.images.map(({ url, publicId }) => {
                return (
                  <div className="flex flex-col gap-2">
                    <img className="w-full max-w-20" src={url} />
                    <Button
                      buttonFn={() => deleteImage(publicId)}
                      rounded="6px"
                      width="100%"
                    >
                      <FaTrash /> Remove Image
                    </Button>
                  </div>
                );
              })}
            {imagesValues?.length > 0 &&
              imagesValues.map((value, index) => {
                return (
                  <div className="flex flex-col gap-2">
                    <img
                      className="w-full max-w-20"
                      src={URL.createObjectURL(value.files[0])}
                      alt=""
                    />
                    <Button
                      buttonFn={imagesValues.splice(index, 1)}
                      rounded="6px"
                      width="100%"
                    >
                      <FaTrash /> Remove Image
                    </Button>
                  </div>
                );
              })}
          </div>
        )}

        <FormWrapper>
          <p>Add at least 1 photo</p>
          <label htmlFor="images">
            <input
              id="images"
              {...register("images", {
                validate: () => {
                  if (
                    !imagesValues?.length > 0 &&
                    !hasDefault?.images?.length > 0
                  )
                    return "Product must have at least one image";
                  return true;
                },
              })}
              type="file"
              className="hidden"
            />
            <button className="flex items-center justify-center bg-(--main-primary-light) rounded-md p-5 text-3xl text-(--main-primary) font-normal">
              +
            </button>
          </label>
          {errors.images && <FormErrors errorText={errors.images.message} />}
        </FormWrapper>

        <FormWrapper>
          <Label htmlFor="description">Description</Label>
          <Input
            inputType="textarea"
            className="h-15"
            placeholder="Write a description for your product"
            id="description"
            {...register("description")}
          />
          {errors.description && (
            <FormErrors errorText={errors.description.message} />
          )}
        </FormWrapper>

        <FormWrapper>
          <Label htmlFor="productRegion">Region</Label>
          <Input
            inputType="select"
            selectOptions={["active", "inactive"]}
            id="productRegion"
            {...register("productRegion", {
              required: "You must add a status",
            })}
          />
          {errors.productRegion && (
            <FormErrors errorText={errors.productRegion.message} />
          )}
        </FormWrapper>

        <FormWrapper>
          <Label htmlFor="price">Price*</Label>
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "You must add a Price",
              min: { value: 0, message: "Price cannot be less than 0" },
            })}
          />
          {errors.price && <FormErrors errorText={errors.price.message} />}
        </FormWrapper>

        <Button
          isDisabled={isPending}
          rounded="6px"
          width="100%"
          buttonType="submit"
        >
          {params.pid === "new"
            ? !isPending
              ? "Post Product"
              : "Posting..."
            : !isPending
            ? "Update Product"
            : "Updating..."}
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
