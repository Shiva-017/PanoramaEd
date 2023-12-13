interface User {
    _id: string,
    name: string,
    email: string,
    degreeseeking: string,
    intake: string,
    undergradgrade: string,
    undergradcollege: string,
    undergradcourse: string,
    gre: string,
    ielts: string,
    experiencecompany: string,
    experiencedesignation: string,
    experienceduration: string,
    shortlistedcolleges: string[]
}

export default User;