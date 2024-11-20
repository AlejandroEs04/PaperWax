"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatDate;
const date_fns_1 = require("date-fns");
function formatDate(dateString) {
    const date = (0, date_fns_1.parseISO)(dateString);
    console.log(date);
    return (0, date_fns_1.format)(date, "dd/MM/yyyy");
}
//# sourceMappingURL=formatDate.js.map