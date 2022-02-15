"use strict";
exports.__esModule = true;
exports.getAppointmentResponse = exports.ApiResponse = void 0;
/* eslint-disable prettier/prettier */
var ApiResponse = /** @class */ (function () {
    function ApiResponse(respCode, respDescr, respData) {
        if (respCode === void 0) { respCode = ''; }
        if (respDescr === void 0) { respDescr = ''; }
        if (respData === void 0) { respData = null; }
        this.responseCode = respCode;
        this.responseDescription = respDescr;
        this.data = respData;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
exports.getAppointmentResponse = function (data) {
    var rawData = data.map(function (result) {
        var appointment_id = result.appointment_id, title = result.title, name = result.name, appointment_description = result.appointment_description, appointment_date = result.appointment_date, appointment_time = result.appointment_time, _a = result.userAuthId, auth_id = _a.auth_id, email = _a.email, fullName = _a.fullName, account_type = _a.account_type;
        var results = {
            appointment_id: appointment_id,
            title: title,
            name: name,
            appointment_description: appointment_description,
            appointment_date: appointment_date,
            appointment_time: appointment_time,
            userDetails: {
                auth_id: auth_id,
                email: email,
                fullName: fullName,
                account_type: account_type
            }
        };
        return results;
    });
    return rawData;
};
