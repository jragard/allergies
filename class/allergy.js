module.exports = class Allergy {
    constructor(name, severity, patientId) {
      this.name = name;
      this.severity = severity;
      this.patientId = patientId;
    }
}