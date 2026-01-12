
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UpdateProfileImgPayload, UpdateProfilePayload, UpdateProfileResponse } from "../types/user.types";
import { api } from "./api";

export const useUpdateProfile = ():UseMutationResult<UpdateProfileResponse, any, UpdateProfilePayload, unknown>=>{
    return useMutation({
     mutationKey:['balance'],
       mutationFn: async (payload: UpdateProfilePayload) => {
			const { data } = await api.put("/profile/update", payload);

			return data;
		},
    })
}
const createFormData = (payload: UpdateProfileImgPayload): FormData => {
	const formData = new FormData();
	formData.append("file", payload.file);
	return formData;
};
export const useUpdateProfileImage = () => {
	return useMutation({
		mutationKey: ["update-profile-image"],
		mutationFn: async (payload: UpdateProfileImgPayload) => {
			const formData = createFormData(payload);
			
			const response = await api.put("/profile/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			
			return response.data as UpdateProfileResponse;
		},
	});
};