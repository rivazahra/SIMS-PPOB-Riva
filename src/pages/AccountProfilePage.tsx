import { useEffect, type JSX } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useProfile } from "../services/useProfile";
import { useUpdateProfile, useUpdateProfileImage } from "../services/useUpdateProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileValidationSchema } from "../utils/validators";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import type z from "zod";
import { clearSelectedService } from "../store/slice/ServiceSlice";
import { Avatar } from "../assets";
import Navbar from "../components/Navbar";
import ProfileImageUpload from "../components/ProfileImageUpload";
import FormField from "../components/FormField";
import { AtSign, User, UserRound } from "lucide-react";

type UpdateProfileFormData = z.infer<typeof updateProfileValidationSchema>;

const MAX_FILE_SIZE = 100 * 1024; // 100 KB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

const AccountPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nullImage = "https://minio.nutech-integrasi.com/take-home-test/null";


    // API Hooks
    const { data: profile, refetch } = useProfile();
    const { mutate: updateProfile } = useUpdateProfile();
    const { mutate: updateImage, isPending: isUploadingImage } = useUpdateProfileImage();

    // Form
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        reset,
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileValidationSchema),
        mode: "onChange",
    });

    // Initialize form with profile data
    useEffect(() => {
        if (profile) {
            reset({
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
            });
        }
    }, [profile, reset]);

    // Handlers
    const handleUpdateProfile = handleSubmit((data) => {
        updateProfile(data, {
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Gagal update profile");
            },
            onSuccess: (response) => {
                toast.success(response.message || "Profile berhasil diupdate");
                refetch();
            },
        });
    });

    const validateImageFile = (file: File): string | null => {
        if (file.size > MAX_FILE_SIZE) {
            return "Ukuran file maksimal 100 KB";
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return "Hanya file JPG dan PNG yang diperbolehkan";
        }

        return null;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file
        const validationError = validateImageFile(file);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        // Upload image
        updateImage(
            { file },
            {
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Gagal upload gambar");
                },
                onSuccess: (response) => {
                    toast.success(response.message || "Gambar berhasil diupdate");
                    refetch();
                },
            }
        );
    };

    const handleLogout = () => {
        Cookies.remove("auth_token");
        dispatch(clearSelectedService());
        navigate("/login");
    };

    // Render profile image
    const renderProfileImage = () => {
        const hasCustomImage = profile?.profile_image && profile.profile_image !== nullImage;
        const fullName = `${profile?.first_name || ""} ${profile?.last_name || ""}`;

        if (hasCustomImage) {
            return (
                <img
                    src={profile.profile_image}
                    alt={fullName}
                    className="h-full w-full rounded-full object-cover"
                />
            );
        }

        return (
            <img src={Avatar} className="h-full w-full rounded-full object-cover" />
        )

    };

    return (
        <>
            <Navbar />

            <section className="px-4 md:px-12 lg:px-20 grid place-items-center">
                <section className="px-6 py-5  flex flex-col gap-6 md:gap-10 w-full md:min-w-[520px] md:max-w-[560px]">

                    {/* Profile Image Section */}
                    <ProfileImageUpload
                        profileImage={renderProfileImage()}
                        onImageChange={handleImageChange}
                        isUploading={isUploadingImage}
                    />

                    <h1 className="text-center capitalize text-2xl">{profile?.first_name} {profile?.last_name}</h1>

                    {/* Form Section */}
                    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 ">

                        <FormField
                            id="email"
                            label="Email"
                            type="email"
                            icon={<AtSign className="text-gray-400" />}
                            placeholder="Masukan email anda"
                            register={register("email")}
                            error={errors.email?.message}
                        />

                        <FormField
                            id="first_name"
                            label="Nama Depan"
                            type="text"
                            icon={<UserRound className="text-gray-400" />}
                            placeholder="Masukan Nama Depan"
                            register={register("first_name")}
                            error={errors.first_name?.message}
                        />

                        <FormField
                            id="last_name"
                            label="Nama Belakang"
                            type="text"
                            icon={<UserRound className="text-gray-400" />}
                            placeholder="Masukan Nama Belakang"
                            register={register("last_name")}
                            error={errors.last_name?.message}
                        />

                        {/* Action Buttons */}
                        <section className="mt-2 md:mt-4 flex flex-col gap-2 md:gap-4">
                            <button type="submit" className="border border-red-500 rounded-sm p-2 font-semibold text-red-500" disabled={!isValid}>
                                Edit Profil
                            </button>
                            <button type="button" className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={handleLogout}>
                                Logout
                            </button>
                        </section>
                    </form>
                </section>
            </section>
        </>
    );
};

export default AccountPage;