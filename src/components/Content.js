import React from "react";
import * as Realm from "realm-web";
import ItemCard from "./ItemCard";
const app = new Realm.App({ id: "application-0-pcidj" });
const client = app.currentUser.mongoClient("mongodb-atlas");
const Content = ({
  setSentence,
  setUser,
  sentence,
  email,
  setIsLogin,
  setEmail,
  setPassword,
  docs,
  setDocs,
}) => {
  const newItem = {
    email: email,
    sentence: sentence,
  };
  //Adding Docs to DB Logic
  const addToDB = async () => {
    try {
      const rests = client.db("realm_database").collection("realm_users");
      rests
        .insertOne(newItem)
        .then((result) => console.log(`Successfull ${result.insertedId} `))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching sepecifi docs that are related to specific User LOGIC
  const fetchFromDb = async () => {
    const docs = client.db("realm_database").collection("realm_users");

    await docs
      .find({ email: email })
      .then((doc) => {
        setDocs(doc);
        console.log(doc.length);
      })
      .catch((err) => console.log(`Unable to fetch docs ${err}`));
  };

  //LOGOUT LOGIC

  const logOut = async () => {
    await app.currentUser.logOut();
    console.log("Log out Successfull");
    setIsLogin(false);
    setUser(null);
    setEmail("");
    setPassword("");
    setDocs([]);
  };

  return (
    <div>
      <div>
        <label htmlFor="sentence">Sentence</label>
        <input
          type="text"
          id="sentence"
          onChange={(e) => setSentence(e.target.value)}
          value={sentence}
        />
        <button onClick={addToDB}>Add</button>
      </div>
      <button onClick={fetchFromDb}>Fetch From DB</button>
      <ItemCard docs={docs} />
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Content;
