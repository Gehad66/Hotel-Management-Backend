function isInteger(param) {
    try {
        return Number.isInteger(+param);
    } catch (e) {
        return false;
    }
}

const validateHoterlierId = (hotelier_id) => {
    if(!hotelier_id) throw Error("Error: No Hoterlier ID provided");
    if (!isInteger(hotelier_id)) {
        throw Error("Error: Hoterlier ID must be Integer");
    }
}
const validateItemId = (item_id) => {
    if(!item_id) throw Error("Error: No Item ID provided");
    if (!isInteger(item_id)) {
        throw Error("Error: Item ID must be Integer");
    }
}
const validateStartDate = (start_date) => {
    if(!start_date) throw Error("Error: No Start Date provided");
    const new_date = new Date(start_date);
    if (isNaN(new_date)) {
        throw Error("Error: Start Date must be in format YYYY-MM_DD");
    }
}
const validateEndDate = (end_date) => {
    if(!end_date) throw Error("Error: No End Date provided");
    const new_date = new Date(end_date);
    if (isNaN(new_date)) {
        throw Error("Error: End Date must be in format YYYY-MM_DD");
    }
}
const validateRequestBody = (hotelier_id,
    item_id,
    start_date,
    end_date) => {
        validateHoterlierId(hotelier_id);
        validateItemId(item_id);
        validateStartDate(start_date);
        validateEndDate(end_date);
}
module.exports = {
    validateRequestBody
}