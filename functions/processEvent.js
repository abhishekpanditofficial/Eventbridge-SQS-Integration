module.exports.handler =  async (event) => {
 let records = event.Records;
 let batchItemFailures = [];

 if(records.length) {
    for(const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);

        if(typeof parsedBody.detail.vehicleNo !== "string"){
            throw new Error("Vehicle number is not a string");
        }

        console.log("processing vehicle details "+ parsedBody.detail.vehicleNo);
        console.log("processing is successfull "+ record.messageId);
      } catch (error) {
        batchItemFailures.push({
            itemIdentifier: record.messageId
        })
      }
    } 
 }

 return {batchItemFailures};
}