
// Retrieve clinicID from local storage
var clinicID = localStorage.getItem("clinicID");
console.log(clinicID);

// Function to write clinic name to the HTML
function writeClinicName() {
    db.collection("clinics").doc(clinicID).get().then((thisClinic) => {
        clinicName = thisClinic.data().clinicName;
        document.getElementById("clinic-name").innerHTML = clinicName;
    });
}

// Call the function to write clinic name
writeClinicName();

// Function to display appointment information
function displayAppointmentInfo() {
    let params = new URL(window.location.href);
    console.log("params is = ", params);

    let aptID = params.searchParams.get("docID");
    console.log(aptID);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userID = user.uid;
            console.log(userID);

            db.collection("users").doc(userID).get().then((doc) => {
                if (doc.exists) {
                    var userAppointment = doc.data();
                    console.log(userAppointment);

                    db.collection("users").doc(userID).update({
                        // Update user document with appointment information
                        userAppointment: doc.data(),
                        userFirstNameAppmt: userAppointment.userFirstName,
                        userMiddletNameAppmt: userAppointment.userMiddleName,
                        userLasttNameAppmt: userAppointment.userLastName,
                        userEmailAppmt: userAppointment.userEmail,
                        userPhoneAppmt: userAppointment.userPhone,
                        userDOBAppmt: userAppointment.userDOB,
                        userGenderAppmt: userAppointment.userGender,
                        userPublicInsurance: userAppointment.userPublicInsurance,
                        userPublicInsuranceNum: userAppointment.userPublicInsuranceNum,
                        userPrivateInsurance: userAppointment.userPrivateInsurance,
                        userPrivateInsuranceNum: userAppointment.userPrivateInsuranceNum,
                        userContactMethodAppmt: userAppointment.userContactMethod,
                        userAppmntTime: userAppointment.userAppmntTime,
                        userDateAppmt: userAppointment.userAppmntDate,
                        userVisitReasonCold: userAppointment.userCold,
                        userVisitReasonAllergies: userAppointment.userAllergies,
                        userVisitReasonSkin: userAppointment.userSkin,
                        userVisitReasonBack: userAppointment.userBack,
                        userVisitReasonJoint: userAppointment.userJoint,
                        userVisitReasonMental: userAppointment.userMental,
                        userVisitReasonHead: userAppointment.userHead,
                        userVisitReasonBlood: userAppointment.userBlood,
                        userVisitReasonWell: userAppointment.userWell,
                        userVisitReasonOthers: userAppointment.userOthers,
                    });
                }
            });
        }
    });
}

// displayAppointmentInfo();

async function clickSubmitAppointment() {
    console.log("click submit button");

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            var userID = user.uid;
            console.log(userID);

            let userFirstNameAppmt = document.getElementById("user-firstname").value;
            let userMiddletNameAppmt = document.getElementById("user-middlename").value;
            let userLasttNameAppmt = document.getElementById("user-lastname").value;
            let userEmailAppmt = document.getElementById("user-email").value;
            let userPhoneAppmt = document.getElementById("user-phone").value;
            let userDOBAppmt = document.getElementById("user-DOB").value;
            let userGender = document.getElementById("user-gender").value;
            let userPublicInsurance = document.getElementById("user-public-insurance").value;
            let userPublicInsuranceNum = document.getElementById("user-public-healthcare-num").value;
            let userPrivateInsurance = document.getElementById("user-private-insurance").value;
            let userPrivateInsuranceNum = document.getElementById("user-private-healthcare-num").value;
            let userContactMethodAppmt = document.getElementById("user-contact").value;
            let userDateAppmt = document.getElementById("user-appmtDate").value;
            let userTimeAppmt = document.getElementById("user-appmtTime").value;
            let userVisitReasonCold = document.getElementById("visit-coldflue").value;
            let userVisitReasonAllergies = document.getElementById("visit-allergies").value;
            let userVisitReasonSkin = document.getElementById("visit-skin").value;
            let userVisitReasonBack = document.getElementById("visit-backpain").value;
            let userVisitReasonJoint = document.getElementById("visit-jointpain").value;
            let userVisitReasonMental = document.getElementById("visit-mental").value;
            let userVisitReasonHead = document.getElementById("visit-headache").value;
            let userVisitReasonBlood = document.getElementById("visit-bloodpressure").value;
            let userVisitReasonWell = document.getElementById("visit-wellness").value;
            let userVisitReasonOthers = document.getElementById("visit-others").value;

            console.log("Form has been made by a user");

            // Get the clinic information
            var clinicID = localStorage.getItem("clinicID");
            var clinicRef = db.collection("clinics").doc(clinicID);
            var clinicData = await clinicRef.get();
            console.log(clinicID);

            // Get the document for the current user.
            var userRef = db.collection("users").doc(userID);
            var userDoc = await userRef.get();

            // Validate certain arrayscontains only numbers
            if (userPublicInsuranceNum !== '' && !/^\d+$/.test(userPublicInsuranceNum)) {
                alert("Please enter only numeric values for the public insurance number.");
                return; // Stop further execution
            }
            if (!/^\d+$/.test(userPhoneAppmt)) {
                alert("Please enter only numeric values for the phone number.");
                return; // Stop further execution
            }
            // Validate that names contain only letters
            if (userFirstNameAppmt.trim() === "") {
                alert("Please enter the first name.");
                return; // Stop further execution
            }
        
            if (userMiddletNameAppmt.trim() !== "" && !/^[A-Za-z]+$/.test(userMiddletNameAppmt)) {
                alert("Please enter only alphabetic characters for the middle name.");
                return; // Stop further execution
            }
        
            if (userLasttNameAppmt.trim() === "") {
                alert("Please enter the last name.");
                return; // Stop further execution
            }

            if (userDoc.exists) {
                // Update existing user document with appointment information
                await userRef.update({
                    appointments: firebase.firestore.FieldValue.arrayUnion({
                        userFirstName: userFirstNameAppmt,
                        userMiddleName: userMiddletNameAppmt,
                        userLastName: userLasttNameAppmt,
                        userEmail: userEmailAppmt,
                        userPhone: userPhoneAppmt,
                        userDOB: userDOBAppmt,
                        userGender: userGender,
                        userPublicInsurance: userPublicInsurance,
                        userPublicInsuranceNum: userPublicInsuranceNum,
                        userPrivateInsurance: userPrivateInsurance,
                        uateInsuranceNum: userPrivateInsuranceNum,
                        userContactMethod: userContactMethodAppmt,
                        userAppmntDate: userDateAppmt,
                        userAppmntTime: userTimeAppmt,
                        userCold: userVisitReasonCold,
                        userAllergies: userVisitReasonAllergies,
                        userSkin: userVisitReasonSkin,
                        userBack: userVisitReasonBack,
                        userJoint: userVisitReasonJoint,
                        userMental: userVisitReasonMental,
                        userHead: userVisitReasonHead,
                        userBlood: userVisitReasonBlood,
                        userWell: userVisitReasonWell,
                        userVisitOthers: userVisitReasonOthers,
                        clinicName: clinicData.data().clinicName,
                        clinicAddress: clinicData.data().address,
                        clinicID: clinicID,
                      
                    }),
                });
            } else {
                // Create a new user document with the first appointment
                await db.collection("users").doc(userID).set({
                    userFirstName: userFirstNameAppmt,
                    userMiddleName: userMiddletNameAppmt,
                    userLastName: userLasttNameAppmt,
                    userEmail: userEmailAppmt,
                    userPhone: userPhoneAppmt,
                    userDOB: userDOBAppmt,
                    userGender: userGender,
                    userPublicInsurance: userPublicInsurance,
                    userPublicInsuranceNum: userPublicInsuranceNum,
                    userPrivateInsurance: userPrivateInsurance,
                    uateInsuranceNum: userPrivateInsuranceNum,
                    userContactMethod: userContactMethodAppmt,
                    appointments: [
                        {
                            userAppmntDate: userDateAppmt,
                            userAppmntTime: userTimeAppmt,
                            userCold: userVisitReasonCold,
                            userAllergies: userVisitReasonAllergies,
                            userSkin: userVisitReasonSkin,
                            userBack: userVisitReasonBack,
                            userJoint: userVisitReasonJoint,
                            userMental: userVisitReasonMental,
                            userHead: userVisitReasonHead,
                            userBlood: userVisitReasonBlood,
                            userWell: userVisitReasonWell,
                            userVisitOthers: userVisitReasonOthers,
                            clinicName: clinicData.data().clinicName,
                            clinicAddress: clinicData.data().address,
                            clinicID: clinicID,
                      
                        },
                    ],
                });
            }

            // Redirect to the thanks page
            window.location.href = "thanks_appointment.html";
        } else {
            console.log("User is not validated");
        }
    });
}

var currentUser;

// Function to populate user information
function populateUserInfo() {
    // Firebase authentication state change listener
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Reference the user document using the user uid
            currentUser = db.collection("users").doc(user.uid);

            // Get the document for the current user
            currentUser.get()
                .then(userInfo => {
                    if (userInfo.exists) {
                        // Check if the user document exists
                        var data = userInfo.data();

                        // Get the data fields of the user
                        var userFirstName = data.userFirstName;
                        var userMiddleName = data.userMiddleName;
                        var userLastName = data.userLastName;
                        var userDOB = data.userDOB;
                        var userGender = data.userGender;
                        var userEmail = data.userEmail;
                        var userPhone = data.userPhone;
                        var userPublicInsurance = data.userPublicInsurance;
                        var userPublicInsuranceNum = data.userPublicInsuranceNum;
                        var userPrivateInsurance = data.userPrivateInsurance;
                        var userPrivateInsuranceNum = data.userPrivateInsuranceNum;
                        var userContactMethodAppmt = data.userContactMethodAppmt;

                        // Populate form fields with user information
                        if (userFirstName != null) {
                            document.getElementById("user-firstname").value = userFirstName;
                        }
                        if (userMiddleName != null) {
                            document.getElementById("user-middlename").value = userMiddleName;
                        }
                        if (userLastName != null) {
                            document.getElementById("user-lastname").value = userLastName;
                        }
                        if (userDOB != null) {
                            document.getElementById("user-DOB").value = userDOB;
                        }
                        if (userPublicInsurance != null) {
                            document.getElementById("user-public-insurance").value = userPublicInsurance;
                        }
                        if (userPublicInsuranceNum != null) {
                            document.getElementById("user-public-healthcare-num").value = userPublicInsuranceNum;
                        }
                        if (userPrivateInsurance != null) {
                            document.getElementById("user-private-insurance").value = userPrivateInsurance;
                        }
                        if (userPrivateInsuranceNum != null) {
                            document.getElementById("user-private-healthcare-num").value = userPrivateInsuranceNum;
                        }
                        if (userGender != null) {
                            document.getElementById("user-gender").value = userGender;
                        }
                        if (userEmail != null) {
                            document.getElementById("user-email").value = userEmail;
                        }
                        if (userPhone != null) {
                            document.getElementById("user-phone").value = userPhone;
                        }

                    } else {
                        console.log("New user!");

                        // Additional logic for new user...
                        currentUser = db.collection("users").doc(user.uid);

                        currentUser.get()
                            .then(userInfo => {
                                if (userInfo.exists) {
                                    // Check if the user document exists
                                    var data = userInfo.data();
                                    // Add a new user document
                                    db.collection("users").add({
                                        userFirstName: user-firstname,
                                        userMiddleName: user-middlename,
                                        userLastName: user-lastname,
                                        userDOB: user-DOB,
                                        userGender: user-gender,
                                        userEmail: user-email,
                                        userPhone: user-phone,
                                    });
                                }
                            })
                            .catch(error => {
                                console.error("Error getting user document:", error);
                            });
                    }
                });
        } else {
            console.log("No user is signed in");
        }
    });
}

// Call the function to run it
populateUserInfo();
