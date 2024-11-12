"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    fullName;
    userName;
    password;
    role;
    constructor(item) {
        this.id = item?.id;
        this.fullName = item?.fullName ?? '';
        this.userName = item?.userName ?? '';
        this.password = item?.password;
        this.role = item?.role ?? 'DEVICE';
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map