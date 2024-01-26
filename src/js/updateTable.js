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

function calculateAndPopulateTable() {
  console.log("function called")
  const getValue = (e) => {
    console.log(e);
    const value = document.getElementById(e).value;
    console.log(value);
    return value;
  }

  const values = {
    matrix: createArray(6).map(() => createArray(6)),
    rig: parseFloat(getValue("rig-dropdown")), // Parse as float to ensure numeric values
    implant: parseFloat(getValue("implant-dropdown")),
    security: parseFloat(getValue("security-dropdown")),
    structure: parseFloat(getValue("structure-dropdown")),
    reprocessingSkill: parseFloat(getValue("reprocessing-skill-dropdown"))
  };

  // Get a reference to the existing table
  const table = document.getElementById("yield-table");

  const { rig, implant, security, structure, reprocessingSkill } = values;

  // Translate the spreadsheet formula to JavaScript
  const calculateTableValue = (x, y) =>
    (50 + rig) *
    (1 + 0.02 * x) *
    (1 + 0.02 * y) *
    (1 + implant) *
    (1 + 0.03 * reprocessingSkill) *
    (1 + structure) *
    (1 + security);

  // Assuming the first row and column are headers
  // Inside the for loop
  for (let i = 2; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      console.log("Calculating for:", i - 1, j - 1); // Add this line
      const result = calculateTableValue(j - 1, i - 1);
      console.log("Result:", result); // Add this line
      table.rows[i].cells[j].innerHTML = result.toFixed(2);
    }
  }


  // Attach the calculateAndPopulateTable function to the form change event
  document.querySelector("form").addEventListener("change", () => {
    calculateAndPopulateTable();
  });
}
calculateAndPopulateTable();
