// components/ProfileImageUpload.tsx
import { Pencil } from "lucide-react";
import {  type FC, type ReactNode } from "react";

interface ProfileImageUploadProps {
	profileImage: ReactNode;
	onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isUploading?: boolean;
}

const ProfileImageUpload: FC<ProfileImageUploadProps> = ({
	profileImage,
	onImageChange,
	isUploading = false,
}) => {
	return (
		<section className="grid place-items-center">
			<section className="bg-gray-100 border-2 border-gray-100 h-28 w-28 relative rounded-full z-10">
				{profileImage}
				
				<label
					htmlFor="image"
					className={`h-7 w-7 absolute z-10 bottom-0 right-1 rounded-full grid place-items-center bg-gray-100 hover:bg-gray-200 transition-all ease-in-out duration-200 border-2 border-gray-50 text-gray-500 text-lg cursor-pointer ${
						isUploading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isUploading ? (
						<span className="animate-spin">⟳</span>
					) : (
						<Pencil/>
					)}
				</label>
				
				<input
					type="file"
					id="image"
					className="hidden"
					accept="image/png, image/jpeg"
					onChange={onImageChange}
					disabled={isUploading}
				/>
               
			</section>
		</section>
	);
};

export default ProfileImageUpload;