function createArray(size) {
  // Check if the size is a valid positive integer
  if (!Number.isInteger(size) || size <= 0) {
    console.error("Invalid array size. Please provide a positive integer.");
    return null; // Return null to indicate an error
  }

  // Create an array of the specified size, filled with placeholder values
  const newArray = new Array(size).fill(null);

  return newArray;
}

// Example usage:
const myArray = createArray(10); // Create an array of size 10
console.log(myArray); // Output: [null, null, null, null, null, null, null, null, null, null]

function calculateAndPopulateTable() {
  // ... (unchanged code)

  // Get selected values from the form
  const structure = document.getElementById("structureDropdown").value;
  const rigIndex = document.getElementById("rigDropdown").selectedIndex;
  const implantIndex = document.getElementById("implantDropdown").selectedIndex;
  const reprocessingSkillIndex = document.getElementById("reprocessingSkillDropdown").selectedIndex;
  const security = document.getElementById("securityDropdown").value;

  // Loop through reprocessingSkill indices
  for (let reprocessingSkillIndex = 0; reprocessingSkillIndex < values.ReprocessingSkill.length; reprocessingSkillIndex++) {
    // Loop through rig indices
    for (let rigIndex = 0; rigIndex < values.Rig.length; rigIndex++) {
      // Get the dynamic values for C9 and D8 using indices
      const y = values.C9D8Table[reprocessingSkillIndex][rigIndex];
      const x = values.C9D8Table[reprocessingSkillIndex][0]; // Assuming "No Rig" is at index 0


  function calculateAndPopulateTable() {
    // Replace these placeholder values with the actual values from your spreadsheet
    const values = {
      rig: { "No Rig": 0, "TI Rig": 1, "TII Rig": 3 },
      structure: { "Non-Refinery": 0, Athanor: 0.02, Tatara: 0.04 },
      security: { HighSec: 0, LowSec: 0.06, "NullSec/j-space": 0.12 },
      implant: { "No Implant": 0, "Zainou 'Beancounter' Reprocessing RX-801": 0.01, "Zainou 'Beancounter' Reprocessing RX-802": 0.02, "Zainou 'Beancounter' Reprocessing RX-804": 0.04 },
      matrix: createArray(6).map(() => createArray(6)),
      },
    };

          // Add the result to the existing table cell
      const cell = table.rows[reprocessingSkillIndex + 1].cells[rigIndex + 1];
      cell.innerHTML = result.toFixed(4);
    }
  }
}

// Call the function to calculate and populate the table
calculateAndPopulateTable();

    // Get a reference to the existing table
    const table = document.getElementById("yield-table");

const structure = document.getElementById("structureDropdown").value;
const rigDropdown = document.getElementById("rigDropdown");
const reprocessingSkill = document.getElementById("reprocessingSkillDropdown").value;
const security = document.getElementById("securityDropdown").value;
const implant = values.implant.find((e) => e === values.implant).value document.getElementById("implantDropdown").value;

    // Loop through reprocessingSkill
    for (const reprocessingSkill in values.ReprocessingSkill) {
      // Loop through rig
      for (const rig in values.Rig) {
        // Get the dynamic values for C9 and D8
        const y = values.C9D8Table[reprocessingSkill][rig];
        const x = values.C9D8Table[reprocessingSkill]["No Rig"];

        // Translate the spreadsheet formula to JavaScript
        const result =
          (50 + values.Rig[rig]) *
          (1 + values.Structure["Non-Refinery"]) * // Assuming Structure is fixed for all calculations
          (1 + values.Security["HighSec"]) * // Assuming Security is fixed for all calculations
          (1 + 0.03 * values.ReprocessingSkill[reprocessingSkill]) *
          (1 + 0.02 * x) *
          (1 + 0.02 * y) *
          (1 + values.Implant["No Implant"]); // Assuming Implant is fixed for all calculations

          console.log(result);

        // Add the result to the existing table cell
        const cell = table.rows[parseInt(reprocessingSkill) + 1].cells[parseInt(rig) + 1]; // Assuming the first row and column are headers
        cell.innerHTML = result.toFixed(4); // Adjust the precision as needed
      }
    }
  }

  // Call the function to calculate and populate the table
  calculateAndPopulateTable();


function calculateReprocessingValue() {
    // Get selected values from the form
    const structure = document.getElementById("structureDropdown").value;
    const rig = document.getElementById("rigDropdown").value;
    const implant = document.getElementById("implantDropdown").value;
    const reprocessingSkill = document.getElementById("reprocessingSkillDropdown").value;
    const security = document.getElementById("securityDropdown").value;

    // Replace these placeholder values with the actual values from your spreadsheet
    const values = {
      Rig: { "No Rig": 0, "TI Rig": 1, "TII Rig": 3 },
      Structure: { "Non-Refinery": 0, Athanor: 0.02, Tatara: 0.04 },
      Security: { HighSec: 0, LowSec: 0.06, "NullSec/j-space": 0.12 },
      ReprocessingSkill: { "Level 0": 0, "Level 1": 1, "Level 2": 2, "Level 3": 3, "Level 4": 4, "Level 5": 5 },
      D8: 0.02, // Replace with the actual value
      C9: 0.06, // Replace with the actual value
      Implant: { "No Implant": 0, "Zainou 'Beancounter' Reprocessing RX-801": 0.01, "Zainou 'Beancounter' Reprocessing RX-802": 0.02, "Zainou 'Beancounter' Reprocessing RX-804": 0.04 },
    };

    // Translate the spreadsheet formula to JavaScript
    const result =
      (50 + values.Rig[rig]) *
      (1 + values.Structure[structure]) *
      (1 + values.Security[security]) *
      (1 + 0.03 * values.ReprocessingSkill[reprocessingSkill]) *
      (1 + 0.02 * values.D8) *
      (1 + 0.02 * values.C9) *
      (1 + values.Implant[implant]);

    // Log the result (you may want to update this based on your specific requirements)
    console.log("Reprocessing Value:", result);
  }

  // Attach the calculateReprocessingValue function to the form change event
  document.querySelector("form").addEventListener("change", function () {
    calculateReprocessingValue();
  });