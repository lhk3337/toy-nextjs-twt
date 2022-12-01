import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
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
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const onValid = (data: EditProfileForm) => {
    console.log(data);
  };
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
