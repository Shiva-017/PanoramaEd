
const weights = { greScore: 0.1, toeflScore: 0.1, sopRating: 0.3, cgpa: 0.3, lorRequired: 0.1, ieltsScore: 0.1 };


const minMaxValues = {
    greScore: { min: 0, max: 340 },
    toeflScore: { min: 0, max: 120 },
    sopRating: { min: 0, max: 5.0 },
    // resume: { min: 0, max: 5.0 },
    // exp: { min: 0, max: 10 },
    cgpa: { min: 0, max: 4.0 },
    lorRequired:{min:0, max:3},
    ieltsScore: {min:0, max:10}
};


function admitClassifier(studentData, programRequirements) {
    const normalizedStudentData = normalizeData(studentData);
    const normalizedProgramData = normalizeData(programRequirements)
    let totalScore = 0;
    for (const key in normalizedStudentData) {
        totalScore += weights[key] * normalizedStudentData[key];
    }

    let requirementScore = 0;
    for (const key in normalizedProgramData) {
        requirementScore += weights[key] * normalizedProgramData[key];
    }

    const admissionScore = totalScore / requirementScore;

    return admissionScore;
}

function normalizeData(data) {
    const normalizedData = {};
    Object.keys(data).forEach(metric => {
        const value = data[metric];
        const { min, max } = minMaxValues[metric];
        const normalizedValue = (value - min) / (max - min);
        normalizedData[metric] = normalizedValue;
    });
    return normalizedData;
}

export default admitClassifier;