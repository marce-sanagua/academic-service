const app = require("./src/app");
const db = require("./src/db/db");

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Academic service corriendo en puerto", PORT);
});