export declare class ApiResponse<T> {
    responseCode: string;
    responseDescription: string;
    data: T;
    constructor(respCode?: string, respDescr?: string, respData?: T);
}
export declare const getAppointmentResponse: (data: any) => any;
