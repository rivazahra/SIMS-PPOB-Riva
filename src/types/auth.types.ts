export type LoginType ={
    email:string;
    password:string;
}


export type LoginResponse ={
    status:number;
    message:string;
    data:{
        token:string;
    }
}

export type RegisType= {
    email:string;
    first_name:string;
    last_name:string;
    password:string;
 
}

export type RegisResponse = {
    status:number;
    message:string;
    data:unknown;

}