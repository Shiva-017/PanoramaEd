interface College {
    _id: string,
    name: string,
    logo: string,
    background: string,
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
  universityLogo: string;
  state: string;
  fee: string,
  deadline?: string,
  duration?: string,
  degree?: string,
  requirements: Requirements
}

export enum FinanceType{
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


export default College;