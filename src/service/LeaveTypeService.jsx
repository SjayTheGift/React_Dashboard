export const LeaveTypeService = {
    getLeaveTypeData() {
        return [
            {
            "id": 1,
            "name": "Casual Leave",
            "numberOfDays": 21
            },
            {
            "id": 2,
            "name": "Maternity Leave",
            "numberOfDays": 90
            },
            {
            "id": 3,
            "name": "Parental Leave",
            "numberOfDays": 7
            },
            {
            "id": 4,
            "name": "Sick Leave",
            "numberOfDays": 12
            },
           
        ];
    },

    getLeaveTypes() {
        return Promise.resolve(this.getLeaveTypeData());
    },
}