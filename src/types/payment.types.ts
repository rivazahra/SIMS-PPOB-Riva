export type TopUpResponse = {
	status: number;
	message: string;
	data: {
		balance: number;
	};
};

export type TopUpPayload = {
	top_up_amount: number;
};
export type PayService ={
service_code:string;

}

export type PayServiceResponse = {
    status:number;
    message:string;
    	data: {
		invoice_number: string;
		service_code: string;
		service_name: string;
		transaction_type: string;
		total_amount: number;
		created_on: string;
	};
}