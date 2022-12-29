import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: FileList;
  formErrors?: string;
}

export default function EditProfile() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const { user } = useUser();
  const router = useRouter();
  const [editProfile, { data }] = useMutation("/api/users/me");

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.bio) setValue("bio", user.bio);
    if (user?.location) setValue("location", user.location);
    if (user?.website) setValue("website", user.website);
  }, [user, setValue]);

  const onValid = (data: EditProfileForm) => {
    editProfile({ ...data });
    alert("수정되었습니다.");
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/profile/${user?.userId}`);
    }
  }, [data, useRouter]);

  return (
    <Layout title="Edit Profile" canGoBack>
      <form className="px-10 py-10 flex mb-3 flex-col space-y-12" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-10 ">
          <div className="h-24 w-24 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md py-2 px-3 text-sm bg-[#1d9bf0] font-medium text-white shadow-md hover:bg-[#1a8cd8]"
          >
            Change
            <input {...register("avatar")} type="file" className="hidden" id="picture" accept="image/*" />
          </label>
        </div>
        <Input id="Name" register={register("name")} />
        <Textarea id="bio" register={register("bio")} />
        <Input id="Location" register={register("location")} />
        <Input id="Website" register={register("website")} />
        <Button btnName="Update Profile" mid />
      </form>
    </Layout>
  );
}
