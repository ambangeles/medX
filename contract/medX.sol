pragma solidity >=0.4.10;

contract medX {
    struct patient {
        mapping(string => string) records;
        string[] recordIds;
        uint256 Record;
        uint256 medicalHistory;
        mapping(string => string) medicalHistories;
        string[] medicalHistoriesIds;
    }
    mapping(string => patient) patients;
    // constructor() public{
    //     insertRecord("5e32c9a41d1fcb0974ec5d41", "1", "abc1R");
    //     insertRecord("5e32c9a41d1fcb0974ec5d41", "2", "abc2R");
    //     insertRecord("5e32c9a41d1fcb0974ec5d41", "3", "abc3R");
    //     insertRecord("5e32c9a41d1fcb0974ec5d41", "4", "abc4R");
    //     insertRecord("bR", "2", "abc2R");
    //     insertRecord("cR", "3", "abc3R");
    //     insertMedicalHistory("5e32c9a41d1fcb0974ec5d41", "1", "abc1MH");
    //     insertMedicalHistory("5e32c9a41d1fcb0974ec5d41", "2", "abc1MH");
    //     insertMedicalHistory("5e32c9a41d1fcb0974ec5d41", "3", "abc1MH");
    //     insertMedicalHistory("5e32c9a41d1fcb0974ec5d41", "4", "abc1MH");
    //     insertMedicalHistory("bMH", "2", "abc2MH");
    //     insertMedicalHistory("cMH", "3", "abc3MH");
    // }

    function insertRecord(
        string memory _patientId,
        string memory _recordId,
        string memory _record
    ) public {
        patients[_patientId].records[_recordId] = _record;
        patients[_patientId].recordIds.push(_recordId);
        patients[_patientId].Record++;
    }
    function insertMedicalHistory(
        string memory _patientId,
        string memory _medicalHistoryId,
        string memory _medicalHistory
    ) public {
        patients[_patientId]
            .medicalHistories[_medicalHistoryId] = _medicalHistory;
        patients[_patientId].medicalHistoriesIds.push(_medicalHistoryId);
        patients[_patientId].medicalHistory++;
    }
    function getRecord(string memory _patientId, string memory _recordId)
        public
        view
        returns (string memory)
    {
        return patients[_patientId].records[_recordId];
    }
    function getMedicalHistory(
        string memory _patientId,
        string memory _medicalHistoryId
    ) public view returns (string memory) {
        return patients[_patientId].medicalHistories[_medicalHistoryId];
    }
    function getRecordId(string memory _patientId, uint256 _dataIndex)
        public
        view
        returns (string memory)
    {
        return patients[_patientId].recordIds[_dataIndex];
    }
    function getMedicalHistoryId(string memory _patientId, uint256 _dataIndex)
        public
        view
        returns (string memory)
    {
        return patients[_patientId].medicalHistoriesIds[_dataIndex];
    }
    function totalRecord(string memory _patientId)
        public
        view
        returns (uint256)
    {
        return patients[_patientId].Record;
    }
    function totalMedHis(string memory _patientId)
        public
        view
        returns (uint256)
    {
        return patients[_patientId].medicalHistory;
    }
}
