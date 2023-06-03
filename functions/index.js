const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// auth trigger when user creates an account
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  if (
    user.providerData.some((provider) => provider.providerId === "google.com")
  ) {
    return admin.firestore().collection("users").doc(user.uid).set({
      photoUrl: user.photoURL,
      name: user.displayName,
      bio: null,
      phone: user.phoneNumber,
      email: user.email,
    });
  } else {
    return admin.firestore().collection("users").doc(user.uid).set({
      photoUrl: user.photoURL,
      name: user.displayName,
      bio: null,
      phone: user.phoneNumber,
      email: user.email,
    });
  }
});

// callable function when user updates account info
exports.updateUserInfo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Please login to change account info"
    );
  }

  // get the document of logged in user
  const user = admin.firestore().collection("users").doc(context.auth.uid);
  // const doc = await user.get();
  await user.update({
    name: data.name,
    bio: data.bio,
  });
  return "Profile updated successfully";
});
