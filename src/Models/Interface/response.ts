/* eslint-disable prettier/prettier */
export class ApiResponse<T> {
  responseCode: string;
  responseDescription: string;
  data: T;

  constructor( respCode = '', respDescr = '', respData: T = null) {
    this.responseCode = respCode;
    this.responseDescription = respDescr;
    this.data = respData;
  }
}



export const getAppointmentResponse = (data)=>{
  const rawData =  data.map((result)=>{
    const { appointment_id, title,name,appointment_description, appointment_date, appointment_time,
      userAuthId: {auth_id, email,fullName,account_type} } =result

      const results ={
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
      }
    return results


})

return rawData

}
