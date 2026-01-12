
export type ServiceData={
    service_code:string;
    service_name:string;
    service_icon:string;
    service_tariff:number
}

export type ServiceResponse={
    status:number;
    message:string;
    data:ServiceData[];
}



export type TransactionHistoryResponse = {
	status: number;
	message: string;
	data: TransactionHistory;
};

export type TransactionHistory = {
	offset: number;
	limit: number;
	records: RecordHistory[];
};

export interface RecordHistory {
	invoice_number: string;
	transaction_type: string;
	description: string;
	total_amount: number;
	created_on: string;
}