import fs from "fs";
import path from "path";

export const cleanFileDatabase = (): void => {
  console.log("Cleanup of file database starts...\n\n");
  const db = path.join(process.cwd(), "/tmp/db/");
  const dirs = fs.readdirSync(db);
  for (const dir of dirs) {
    console.log(`Entering db directory ${dir}...`);
    const dirPath = path.join(db, dir);
    const dirFiles = fs.readdirSync(dirPath);
    for (const file of dirFiles) {
      console.log(`Deleting file ${dir}/${file}`);
      fs.unlinkSync(path.join(dirPath, file));
    }
  }
};

cleanFileDatabase();
