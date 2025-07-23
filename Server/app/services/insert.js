import mongoose from "mongoose";
import College from "../models/college.js";


async function insertColleges() {
  try {
    await mongoose.connect('mongodb+srv://shivateja:7758015455Ab@cluster0.d4qlwnw.mongodb.net/panoramaed?retryWrites=true&w=majority&appName=Cluster0');
    await College.insertMany([{
    "name": "Harvard University",
    "logo": "https://en.wikipedia.org/wiki/Heraldry_of_Harvard_University#/media/File:Harvard_University_coat_of_arms.svg",
    "background": "https://cdn.britannica.com/69/141169-050-CD5892EB/Baker-Library-Harvard-Business-School-Boston-University.jpg",
    "admissionLink": "https://college.harvard.edu/admissions",
    "address": "Cambridge, MA 02138",
    "ranking": "1",
    "state": "Massachusetts",
    "yearEstd": "1636",
    "country": "USA",
    "content": "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher education in the United States and among the most prestigious in the world.",
    "costOfStudy": "Premium",
    "programs": [
      {
        "name": "Computer Science",
        "ranking": "1",
        "university": "Harvard University",
        "universityLogo": "https://en.wikipedia.org/wiki/Heraldry_of_Harvard_University#/media/File:Harvard_University_coat_of_arms.svg",
        "state": "Massachusetts",
        "fee": "55000",
        "deadline": "2024-12-01",
        "duration": "24",
        "degree": "Masters",
        "requirements": {
          "greScore": "330",
          "toeflScore": "110",
          "ieltsScore": "8.0",
          "cgpa": "3.8",
          "sopRating": 5,
          "lorRequired": 3
        }
      },
      {
        "name": "Business Administration",
        "ranking": "1",
        "university": "Harvard University",
        "universityLogo": "https://en.wikipedia.org/wiki/Heraldry_of_Harvard_University#/media/File:Harvard_University_coat_of_arms.svg",
        "state": "Massachusetts",
        "fee": "73800",
        "deadline": "2024-09-15",
        "duration": "24",
        "degree": "MBA",
        "requirements": {
          "greScore": "325",
          "toeflScore": "109",
          "ieltsScore": "7.5",
          "cgpa": "3.7",
          "sopRating": 5,
          "lorRequired": 3
        }
      }
    ],
    "upcomingEvents": [
      {
        "link": "https://college.harvard.edu/admissions/visit-harvard/information-sessions",
        "videoUrl": "https://www.youtube.com/watch?v=harvard-info",
        "title": "Virtual Information Session",
        "time": "2024-10-15T14:00:00Z",
        "duration": "2h"
      }
    ],
    "shortlistedStudents": []
  },
  {
    "name": "Stanford University",
    "logo": "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Seal_of_Leland_Stanford_Junior_University.svg",
    "background": "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Stanford_Oval_May_2011_panorama.jpg",
    "admissionLink": "https://admission.stanford.edu/",
    "address": "450 Serra Mall, Stanford, CA 94305",
    "ranking": "2",
    "state": "California",
    "yearEstd": "1885",
    "country": "USA",
    "content": "Stanford University is a private research university in Stanford, California. Stanford is known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
    "costOfStudy": "Moderate",
    "programs": [
      {
        "name": "Computer Science",
        "ranking": "1",
        "university": "Stanford University",
        "universityLogo": "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Seal_of_Leland_Stanford_Junior_University.svg",
        "state": "California",
        "fee": "58416",
        "deadline": "2024-12-01",
        "duration": "24",
        "degree": "Masters",
        "requirements": {
          "greScore": "328",
          "toeflScore": "108",
          "ieltsScore": "7.5",
          "cgpa": "3.8",
          "sopRating": 5,
          "lorRequired": 3
        }
      },
      {
        "name": "Electrical Engineering",
        "ranking": "2",
        "university": "Stanford University",
        "universityLogo": "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Seal_of_Leland_Stanford_Junior_University.svg",
        "state": "California",
        "fee": "58416",
        "deadline": "2024-12-15",
        "duration": "24",
        "degree": "Masters",
        "requirements": {
          "greScore": "325",
          "toeflScore": "105",
          "ieltsScore": "7.5",
          "cgpa": "3.7",
          "sopRating": 4,
          "lorRequired": 3
        }
      }
    ],
    "upcomingEvents": [
      {
        "link": "https://admission.stanford.edu/visit/information-sessions",
        "videoUrl": "https://www.youtube.com/watch?v=stanford-tour",
        "title": "Campus Tour & Info Session",
        "time": "2024-10-20T16:00:00Z",
        "duration": "2.5h"
      }
    ],
    "shortlistedStudents": []
  }]);
    console.log("Colleges inserted successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Insertion error:", err);
    process.exit(1);
  }
}

insertColleges();