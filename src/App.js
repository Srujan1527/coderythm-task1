import React, { useState } from "react";
import * as Realm from "realm-web";
import Content from "./components/Content";
const app = new Realm.App({ id: "application-0-pcidj" });
const client = app.currentUser.mongoClient("mongodb-atlas");

const App = () => {
  const [user, setUser] = useState(null);

  const [docs, setDocs] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sentence, setSentence] = useState("");

  // useEffect(() => {
  //   // INSERTING DOCS LOGIC

  //   const getData = async () => {
  //     const rests = client.db("srujan_database").collection("profile_users");
  //     rests
  //       .insertOne(newItem)
  //       .then((result) => console.log(`Successfull ${result.insertedId} `))
  //       .catch((err) => console.log(err));
  //     setRestaurants((await rests.find()).slice(0, 10));
  //   };

  //   getData();
  // }, []);

  // LOGOUT LOGIC

  const registerEmail = async () => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

  // AUTH LOGIC
  const emailAuth = () => {
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      console.log(credentials);
      app.logIn(credentials).then((user) => {
        setUser(user);
        setIsLogin(true);

        console.log(`Logged in with id: ${user.id}`);
      });
    } catch (err) {
      console.log(`No such email exists ${err}`);
    }
  };
  return (
    <div className="container">
      {isLogin ? (
        <Content
          app={app}
          setUser={setUser}
          sentence={sentence}
          setSentence={setSentence}
          client={client}
          email={email}
          setIsLogin={setIsLogin}
          docs={docs}
          setDocs={setDocs}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="button" onClick={emailAuth}>
            Signin{" "}
          </button>
          <button type="button" onClick={registerEmail}>
            Register{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
