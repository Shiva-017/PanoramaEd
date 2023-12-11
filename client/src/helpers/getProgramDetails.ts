
import { Detail } from "../home/CollegeCompare/CollegeCard";
import College, { Program } from "../models/college";
const getProgramDetails = (collegeData: College, programName: string): Detail[] => {
    const programDetails: Detail[] = [
        { title: "Program", value: "" },
        { title: "Location", value: "" },
        { title: "Country", value: "" },
        { title: "Ranking", value: "" },
        { title: "Fee", value: "" },
        { title: "GRE", value: "" },
        { title: "TOEFL", value: "" },
        { title: "IELTS", value: "" },
        { title: "LORs Required", value: "" },
    ];

    let programFound: boolean = false;

    let program: Program;
    collegeData?.programs?.forEach((p: Program) => {
        if (p.name === programName) {
            program = p;
            programDetails[0].value = programName;
            programDetails[1].value = collegeData?.address + ", " + collegeData.state
            programDetails[2].value = collegeData?.country || "";
            programDetails[3].value = program.ranking || "";
            programDetails[4].value = `$ ${program.fee}` || "";
            programDetails[5].value = program.requirements.greScore || "";
            programDetails[6].value = program.requirements.toeflScore || "";
            programDetails[7].value = program.requirements.ieltsScore || "";
            programDetails[8].value = program.requirements.lorRequired.toString() || "";
            programFound = true;
        }
    });
    if (programFound) {
        return programDetails;
    }


    return [];
}

export default getProgramDetails;