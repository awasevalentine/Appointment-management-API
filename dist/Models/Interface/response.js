"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentResponse = exports.ApiResponse = void 0;
class ApiResponse {
    constructor(respCode = '', respDescr = '', respData = null) {
        this.responseCode = respCode;
        this.responseDescription = respDescr;
        this.data = respData;
    }
}
exports.ApiResponse = ApiResponse;
const getAppointmentResponse = (data) => {
    const rawData = data.map((result) => {
        const { appointment_id, title, name, appointment_description, appointment_date, appointment_time, userAuthId: { auth_id, email, fullName, account_type } } = result;
        const results = {
            appointment_id,
            title,
            name,
            appointment_description,
            appointment_date,
            appointment_time,
            userDetails: {
                auth_id,
                email,
                fullName,
                account_type
            }
        };
        return results;
    });
    return rawData;
};
exports.getAppointmentResponse = getAppointmentResponse;
//# sourceMappingURL=response.js.map