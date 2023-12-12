
const weights = { greScore: 0.1, toeflScore: 0.2, sopRating: 0.35, cgpa: 0.35, ieltsScore: 0.2 };


const minMaxValues = {
    greScore: { min: 0, max: 340 },
    toeflScore: { min: 0, max: 120 },
    sopRating: { min: 0, max: 5.0 },
    cgpa: { min: 0, max: 4.0 },
    ieltsScore: { min: 0, max: 10 }
};


function admitClassifier(studentData, programRequirements, exp = 0, resumeRating = 0) {
    const normalizedStudentData = normalizeData(studentData);
    const normalizedProgramData = normalizeData(programRequirements)
    let totalScore = 0;
    
    for (const key in normalizedStudentData) {
        if (key !== "lorRequired") {
            totalScore += weights[key] * normalizedStudentData[key];
        }

    }
    let requirementScore = 0;
    
    for (const key in normalizedStudentData) {
        if (key !== "lorRequired") {
            requirementScore += weights[key] * normalizedProgramData[key];
        }
    }

    const admissionScore = totalScore / requirementScore;
    const maxExp = exp > 5 ? 5 : exp;
    const combinedScore = (
        (admissionScore * 0.6) +
        (resumeRating / 5 * 0.2) +
        (exp / maxExp * 0.2)
    );


    return combinedScore;
}

function normalizeData(data) {
    const normalizedData = {};
    Object.keys(data).forEach(metric => {
        if (metric !== "lorRequired") {
            const value = data[metric];
            const { min, max } = minMaxValues[metric];
            const normalizedValue = (value - min) / (max - min);
            normalizedData[metric] = normalizedValue;
        }

    });
    return normalizedData;
}

export default admitClassifier;