import { seedDatabase } from "../src/lib/seed-data"

seedDatabase()
  .then(() => {
    console.log("Seeding finished successfully.")
    process.exit(0)
  })
  .catch((e) => {
    console.error("Seeding error:", e)
    process.exit(1)
  })
