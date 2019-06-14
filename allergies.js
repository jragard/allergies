// Develop an Allergy class which can hold different severities (HIGH, MEDIUM, LOW) and be tied to a Patient to retrieve the allergies associated with that patient and their respective severities.
const patients = []

// Allergy class takes 3 constructor properties for allergy name, severity, and the patient associated with the allergy.
class Allergy {
    constructor(allergy, severity, patientID) {
      this.allergy = allergy;
      this.severity = severity;
      this.patientID = patientID;
    }
  }
  
  // Patient class takes 2 constructor properties 'allergies', which will be a full list of Allergy instances, and 'id', which will be the patient's unique ID number
  class Patient {
    constructor(id, name) {
      this.allergies = [];
      this.id = id;
      this.name = name;
    }
  
    // filters the full list of allergy instances and returns only the allergies associated with this particular patient
    getAllergies() {
      let output = document.getElementById('lookupOutput');
      
      if(this.allergies.length !== 0) {
        output.innerHTML = JSON.stringify(this.allergies);
        // let patientAllergies = this.allergies.filter(allergy => {
        //   return allergy.patientID === this.id;
        // });
        // return patientAllergies
      } else {
        output.innerHTML = 'Patient has no allergies listed';
      }
    }
  
    // adds a list of one or more allergy instances to the patient's existing list of allergies
    addAllergies(id) {
      // let id = document.getElementById('newID').value;
      let allergy = document.getElementById('allergy');
      let severity = document.getElementById('severity');
      let form = document.getElementById('addAllergy');

      let newAllergy = new Allergy(allergy.value, severity.value, id);
      this.allergies.push(newAllergy);
      form.reset();
      
    }
  }

const addAllergy = document.getElementById('addAllergy');

addAllergy.onsubmit = (event) => {
  event.preventDefault();

  let patientId = document.getElementById('newID').value;
  console.log('patientId: ' + patientId);

  let patientIndex = patients.find(patient => {
    return patient.id === patientId;
  });

  patientIndex = patients.indexOf(patientIndex);
  console.log(patientIndex);
  console.log(patients);

  patients[patientIndex].addAllergies(patientId);
  

}

const allergyLookup = document.getElementById('lookup');

allergyLookup.onsubmit = (event) => {
  event.preventDefault();
  // console.log('allergy lookup running');
  // console.log(patients);
  let id = document.getElementById('patientId');
  let queriedPatient = patients.filter(patient => {
    return patient.id === id.value;
  })[0];
  // console.log(queriedPatient)

  queriedPatient.getAllergies();
}

const createPatient = document.getElementById('createPatient');

createPatient.onsubmit = (event) => {
  event.preventDefault();
  let name = document.getElementById('name');
  let id = document.getElementById('id');

  patients.push(new Patient(id.value, name.value));
  name.value = ''
  id.value = '';
  console.log(patients);
}

const clearBtn = document.getElementById('clear');

clearBtn.onclick = () => {
  let lookup = document.getElementById('lookup');
  let add = document.getElementById('addAllergy');
  let createPatient = document.getElementById('createPatient');
  let output = document.getElementById('lookupOutput');

  lookup.reset();
  add.reset();
  createPatient.reset();
  output.innerHTML = '';
}

 