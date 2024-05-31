const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./plasticart-cb41e-firebase-adminsdk-gasxn-270b02125b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

app.post("/send-notification", (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(500).send("Error sending notification");
    });
});

const PORT = process.env.PORT || 4000; // Changed the port to 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
