
export type UserProfile ={
email:string;
first_name:string;
last_name:string;
profile_image:string;
}

export type UserProfileResponse ={
    status:number;
    message:string;
    data:UserProfile;
}

export type UserBalance = {
    balance:number;
}

export type UserBalanceResponse = {
    status:number;
    message:string;
    data:UserBalance;
}

export type UpdateProfile={
    email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
}

export type UpdateProfileResponse ={
    status:number;
    message:string;
    data: UpdateProfile;
}


export type UpdateProfilePayload = {
	email?: string | null;
	first_name?: string;
	last_name?: string | null;
};
export type UpdateProfileImgPayload = {
	file: File;
};