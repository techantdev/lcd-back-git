import { YearArea } from '../../models/YearAreaModel';
import { YearSubject } from '../../models/YearSubjectModel';

const getYearArea = async (academicYearId: String) => {
  const yearAreas = [];

  const auxiliaryYearAreas = await YearArea.getYearAreas(academicYearId);

  // 2. Se implementa 1 for que itere por cada area y por cada area teniendo el yearAreaID
  for (let index = 0; index < auxiliaryYearAreas.length; index++) {
    const auxiliaryYearAreaId = auxiliaryYearAreas[index].yearAreaId;
    // Se hace un fetch de las yearsubjects de dicha area.
    const auxiliaryYearSubjects = await YearSubject.getYearSubjects(auxiliaryYearAreaId);
    const auxiliaryYearArea = { ...auxiliaryYearAreas[index], yearSubjects: auxiliaryYearSubjects };
    yearAreas.push(auxiliaryYearArea);
  }

  return yearAreas;
};

export default getYearArea;

/*
[
    {
        yearAraaID:'fsdsadfsdfasd',
        name:'Naturales',
        yearSubjects:[
            {
                yearSubjectId:'sadfsafdasfd',
                name:'Fisica'
            },
            {
                yearSubjectId:'sadfsafdasfd',
                name:'Matematicas'
            }
        ]
    }
]

*/
