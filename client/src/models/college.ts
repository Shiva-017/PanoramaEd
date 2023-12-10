interface College {
    _id: string,
    name: string,
    admissionLink: string,
    address: string,
    ranking: string,
    state: string,
    yearEstd: string,
    country: string,
    content: string,
    programs: Program[],
    upcomingEvents: UpcomingEvents[],
    shortlistedStudents: string[],
    costOfStudy: FinanceType,
}

interface UpcomingEvents {
    link: string,
    videoUrl: string,
    title: string,
    time: string,
    duration: string
}

export interface Program {
  _id:string,
  name: string,
  ranking: string,
  university: string,
  fee: string,
  deadline?: string,
  duration: string,
  requirements: Requirements
}

enum FinanceType{
  "Premium",
  "Moderate",
  "Reasonable"
}

type Requirements = {
  greScore: string,
  toeflScore?: string,
  ieltsScore?: string,
  cgpa: string,
  sopRating: number,
  lorRequired: number
}


  

export const college: College = {
    "_id":"sa218219saajs",
    "name": "Sample University",
    "admissionLink": "https://sampleuniversity.com/admission",
    "address": "123 University Street, Cityville",
    "ranking": "Top 100",
    "state": "Stateville",
    "yearEstd": "1990",
    "content":"  ",
    "country": "Sampleland",
    "costOfStudy": FinanceType.Premium,
    "programs": [
      {
        "requirements": {
          "greScore": "320",
          "toeflScore": "110",
          "ieltsScore": "7.5",
          "cgpa": "3.5",
          "sopRating": 4.5,
          "lorRequired": 2
        },
        "_id": "655ba52ea02a615903eb1214",
        "name": "Computer Science",
        "ranking": "Top 10",
        "university": "Stanford University",
        "fee": "53000",
        "duration": "36 Months",
        
        
      },
      {
        "requirements": {
          "greScore": "310",
          "toeflScore": "105",
          "ieltsScore": "7.0",
          "cgpa": "3.3",
          "sopRating": 4.0,
          "lorRequired": 2
        },
        "_id": "655ba52ea02a615903eb1215",
        "name": "Mechanical Engineering",
        "ranking": "Top 5",
        "university": "Stanford University",
        "fee": "48000",
        "duration": "36 Months",
      },
      {
        "requirements": {
          "greScore": "325",
          "toeflScore": "115",
          "ieltsScore": "7.8",
          "cgpa": "3.7",
          "sopRating": 4.8,
          "lorRequired": 3
        },
        "_id": "655ba52ea02a615903eb1216",
        "name": "Information Systems",
        "ranking": "Top 3",
        "university": "Stanford University",
        "fee": "55000",
        "duration": "36 Months",
      },
      {
        "requirements": {
          "greScore": "330",
          "toeflScore": "120",
          "ieltsScore": "8.0",
          "cgpa": "3.8",
          "sopRating": 4.5,
          "lorRequired": 2
        },
        "_id": "655ba52ea02a615903eb1217",
        "name": "Robotics",
        "ranking": "Top 5",
        "university": "Stanford University",
        "fee": "52000",
        "duration": "36 Months",
      },
      {
        "requirements": {
          "greScore": "330",
          "toeflScore": "120",
          "ieltsScore": "8.0",
          "cgpa": "3.8",
          "sopRating": 4.5,
          "lorRequired": 2
        },
        "_id": "655ba52ea02a615903eb1217",
        "name": "Robotics",
        "ranking": "Top 5",
        "university": "Stanford University",
        "fee": "52000",
        "duration": "36 Months",
      },
      {
        "requirements": {
          "greScore": "335",
          "toeflScore": "125",
          "ieltsScore": "8.5",
          "cgpa": "3.9",
          "sopRating": 4.7,
          "lorRequired": 3
        },
        "_id": "655ba52ea02a615903eb1219",
        "name": "Artificial Intelligence",
        "ranking": "Top 3",
        "university": "Stanford University",
        "fee": "56000",
        "duration": "36 Months",
      }
    ],
    "upcomingEvents": [
      {
        "link": "https://sampleuniversity.com/event1",
        "videoUrl": "https://youtube.com/samplevideo1",
        "title": "Open House",
        "time": "2023-12-01T14:00:00Z",
        "duration": "2 hours"
      },
      {
        "link": "https://sampleuniversity.com/event2",
        "videoUrl": "https://youtube.com/samplevideo2",
        "title": "Career Fair",
        "time": "2023-12-15T10:00:00Z",
        "duration": "3 hours"
      }
    ],
    "shortlistedStudents":[
        'student_1',
        'student_2'
    ]
  };

export default College;