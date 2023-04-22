import cookie from "cookie";

import profiledata from "../../public/profiledata.json";

export default function login(req, res) {
  const { username, password } = req.body;
  const user = profiledata.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("username", user.username, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
}
