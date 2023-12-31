// Entering in Clinics into the database
function writeClinics() {
    //define a variable for the collection you want to create in Firestore to populate data
    var clinicsRef = db.collection("clinics");

    clinicsRef.add({
        clinicName: "City Centre Urgent Primary Care Centre",
        address: "1290 Hornby St",
        contact: "604-416-1811",
        website: "seymourhealth.ca",
        rating: 4.0,
        hours: "Monday ~ Saturday: 8 a.m. - 5 p.m. \n Sunday: 9 a.m. - 5 p.m.",
        walkin_availibility: "Yes",
        wait_time_minutes: 15,        
        distance_metres: 120,      
        lat: 49.277270,
        lng: -123.129370,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    clinicsRef.add({
        clinicName: "Keefer Walk-In and Medical Clinic", 
        address: "118 Keefer St",
        contact: "604-674-7403",
        website: "keefermed.ca",
        rating: 2.7,
        hours: "Monday ~ Saturday: 8:30 a.m. - 5 p.m. \n Sunday and Holidays: Closed",
        walkin_availibility: "Yes",
        wait_time_minutes: 10, 
        distance_metres: 210,      
        lat: 49.279450,
        lng: -123.100620,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    clinicsRef.add({
        clinicName: "TELUS Health Care Centres", 
        address: "808 Nelson St #101",
        contact: "604-681-2400",
        website: "https://www.telus.com/en/health/care-centres/locations/vancouver-hastings?utm_source=google&utm_medium=local&utm_campaign=google-local",
        rating: 3.9,
        hours: "Monday ~ Saturday: 7 a.m. - 4 p.m. \n Sunday and Holidays: Closed",
        walkin_availibility: "Yes",
        wait_time_minutes: 7,        
        distance_metres: 536,      
        lat: 49.28004,
        lng: -123.12491,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}
