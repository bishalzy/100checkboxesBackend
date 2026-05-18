import { CheckBox } from "../src/db/models.js";



async function seed() {
  const count = await CheckBox.countDocuments();

  if (count > 0) {
    console.log("Checkboxes already exist. Skipping seeding.");
    return;
  }
  const checkboxes = [];

  for (let i = 1; i <= 100; i++) {
    checkboxes.push({
      uniqueId: i,
      checked: false
    });
  }

  await CheckBox.insertMany(checkboxes);

  console.log("100 checkboxes inserted");
}

export default seed;