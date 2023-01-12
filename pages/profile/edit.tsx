import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "@libs/server/firebase";
import Image from "next/image";

interface EditProfileForm {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: FileList;
  formErrors?: string;
}
interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
export default function EditProfile() {
  const { register, setValue, handleSubmit } = useForm<EditProfileForm>();
  const { user } = useUser();
  const router = useRouter();
  const [previewAvatar, setPreviewAvatar] = useState<string>();
  const [imageFile, setImageFile] = useState<FileList>();
  const [editProfile, { data }] = useMutation<EditProfileResponse>("/api/users/me");

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.bio) setValue("bio", user.bio);
    if (user?.location) setValue("location", user.location);
    if (user?.website) setValue("website", user.website);
    if (user?.avatar) setPreviewAvatar(`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${user.avatar}`);
  }, [user, setValue]);

  const onValid = (data: EditProfileForm) => {
    // firebase image handler
    if (imageFile && imageFile.length > 0) {
      const imageRef = ref(getStorage(firebase), `profile/${user?.userId}/avatar`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              editProfile({ ...data, avatar: url.substring(82) });
            })
            .catch((e) => console.log(e));
        }
      );
    } else {
      editProfile({ ...data, avatar: "" });
    }
    alert("수정되었습니다.");
  };

  // 파일 이미지를 선택시 onChange이벤트로 setImageFile에 파일 정보 저장
  const onChangeAvatar = (e: ChangeEvent) => {
    if (((e.target as HTMLInputElement).files as FileList)[0].size < 500000) {
      //파일 용량 제한하기
      setImageFile((e.target as HTMLInputElement).files as FileList);
    } else {
      alert("500kb보다 작은 사진을 선택헤 주세요");
    }
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/profile/${user?.userId}`);
    }
  }, [data, useRouter]);

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setPreviewAvatar(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  return (
    <Layout title="Edit Profile" canGoBack>
      <form className="px-10 py-10 flex mb-3 flex-col space-y-12" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-10 ">
          {previewAvatar ? (
            <div className="relative h-24 w-24 -z-10">
              <Image
                src={previewAvatar}
                layout="fill"
                className="rounded-full bg-transparent object-cover"
                alt="avatar"
                priority
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md py-2 px-3 text-sm bg-[#1d9bf0] font-medium text-white shadow-md hover:bg-[#1a8cd8]"
          >
            Change
            <input
              {...register("avatar")}
              type="file"
              className="hidden"
              id="picture"
              accept="image/*"
              onChange={onChangeAvatar}
            />
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
