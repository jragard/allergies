// Develop an Allergy class which can hold different severities (HIGH, MEDIUM, LOW) and be tied to a Patient to retrieve the allergies associated with that patient and their respective severities.
const patients = []

// Allergy class takes 3 constructor properties for allergy name, severity, and the patient associated with the allergy.
class Allergy {
  constructor(allergy, severity) {
    this.allergy = allergy;
    this.severity = severity;
  }
}
  
// Patient class takes 2 constructor properties 'allergies', which will be a full list of Allergy instances, and 'id', which will be the patient's unique ID number
class Patient {
  constructor(id, name) {
    this.allergies = [];
    this.id = id;
    this.name = name;
  }
  
  getAllergies() {
    let output = document.getElementById('lookupOutput');
      
    if(this.allergies.length !== 0) {
      for(let i = 0; i < this.allergies.length; i++) {
        let allergy = document.createElement('h5');
        allergy.innerHTML = 'Allergy: ' + this.allergies[i].allergy + '--- ' + 'Severity: '  + this.allergies[i].severity;
        let linebreak = document.createElement('br');

        output.append(allergy);
        // output.append(linebreak);
      }
    } else {
      output.innerHTML = 'Patient has no allergies listed';
    }
  }
  
  addAllergies(allergy, severity) {
    let newAllergy = new Allergy(allergy, severity);
    this.allergies.push(newAllergy);
  }

}

const addAllergy = document.getElementById('addAllergy');
const patientId = document.getElementById('newID');
const allergy = document.getElementById('allergy');
const severity = document.getElementById('severity');
const allergyLookup = document.getElementById('lookup');
const id = document.getElementById('patientId');
const createPatient = document.getElementById('createPatient');
const name = document.getElementById('name');
const clearBtn = document.getElementById('clear');
const addID = document.getElementById('id');

addAllergy.onsubmit = (event) => {
  event.preventDefault();

  let patientIndex = patients.find(patient => {
    return patient.id === patientId.value;
  });

  patientIndex = patients.indexOf(patientIndex);
  patients[patientIndex].addAllergies(allergy.value, severity.value);

  patientId.value = '';
  allergy.value = '';
  severity.value = '';
}

allergyLookup.onsubmit = (event) => {
  event.preventDefault();

  let queriedPatient = patients.filter(patient => {
    return patient.id === id.value;
  })[0];

  queriedPatient.getAllergies();
  id.value = '';
}

createPatient.onsubmit = (event) => {
  event.preventDefault();
  patients.push(new Patient(addID.value, name.value));
  name.value = '';
  addID.value = '';
}

clearBtn.onclick = () => {
  let output = document.getElementById('lookupOutput');
  output.innerHTML = '';
}

 