"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { PageHeader, Cards } from "../../reusable_components/CardsLayouts";
import {
  FormErrors,
  FormWrapper,
  Input,
  Label,
} from "../../reusable_components/FormLayouts";
import { FaUpload, FaTrash } from "react-icons/fa";
import { useState } from "react";
import Button from "../../reusable_components/Buttons";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import { formatFormData } from "../../../utils/regHelperFns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const FormBlocks = ({ children, blockTitle }) => {
  return (
    <Cards className="flex flex-col items-start gap-3 mt-2">
      <h2 className="text-lg text-[var(--text-primary)] font-semibold mb-3">
        {blockTitle}
      </h2>
      {children}
    </Cards>
  );
};

const ProductForm = ({ hasDefault, availableCategories }) => {
  const { idToken } = useSelector((state) => state.userAuth);
  const [_, reRender] = useState(0);
  const params = useParams();
  const {
    register,
    handleSubmit,
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
      console.log(err);
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
      console.log(err);
      toast.error("Unable to delete image, try again later");
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => submitFn(data),
  });

  return (
    <>
      <PageHeader
        headerText={params.pid === "new" ? "Add Product" : "Edit Product"}
      />
      <form onSubmit={handleSubmit(mutateAsync)}>
        <FormBlocks blockTitle="Product Information">
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
            <Label htmlFor="description">Description (optional)</Label>
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
        </FormBlocks>
        <Cards className="flex gap-3 justify-start">
          {hasDefault?.images?.length > 0 &&
            hasDefault.images.map(({ url, publicId }) => {
              return (
                <div className="flex flex-col gap-2">
                  <img className="w-full max-w-20" src={url} />
                  <Button
                    buttonFn={() => deleteImage(publicId)}
                    rounded="md"
                    width="full"
                  >
                    <FaTrash /> Remove Image
                  </Button>
                </div>
              );
            })}
        </Cards>

        <FormBlocks blockTitle="Product Images (select one or more images)">
          <label className="w-full" htmlFor="file_input">
            <Cards className="flex flex-col items-center justify-center gap-2">
              <FaUpload className="text-[var(--text-primary)]" size={45} />
              <p className="text-base text-[var(--text-primary)] font-semibold">
                Click to upload Image*
              </p>
              <p className="text-base text-[var(--main-secondary)] font-semibold">
                PNG, JPG or WEBP (max. 5MB)
              </p>
              <input
                id="file_input"
                type="file"
                {...register("images", {
                  validate: (value) => {
                    if (hasDefault?.images.length < 1 && value?.length < 1)
                      return "Products need at least one image";
                    for (const file of value.files) {
                      if (file.size / (1024 * 1024) > 5)
                        return "Images must be less than 5Mb";
                    }
                    return true;
                  },
                })}
              />
            </Cards>
          </label>
          {errors.images && <FormErrors errorText={errors.images.message} />}
        </FormBlocks>

        <FormBlocks blockTitle="Product Status">
          <FormWrapper>
            <Label htmlFor="productStatus">Status</Label>
            <Input
              inputType="select"
              selectOptions={["active", "inactive"]}
              id="productStatus"
              {...register("productStatus", {
                required: "You must add a status",
              })}
            />
            {errors.productStatus && (
              <FormErrors errorText={errors.productStatus.message} />
            )}
          </FormWrapper>
        </FormBlocks>

        <Cards className="mt-2">
          <Button
            isDisabled={isPending}
            rounded="md"
            width="full"
            buttonType="submit"
          >
            {params.pid === "new"
              ? !isPending
                ? "Add Product"
                : "Adding..."
              : !isPending
              ? "Update Product"
              : "Updating..."}
          </Button>
        </Cards>
      </form>
    </>
  );
};

export default ProductForm;
