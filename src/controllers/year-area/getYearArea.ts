import { YearArea } from '../../models/YearAreaModel';

const getYearArea = async (academicYearId: String) => {
  // TODO: Añadir el query que trae las materias de cada area.

  // 1. se almacenan las areas en 1 variable

  // 2. Se implementa 1 for que itere por cada area y por cada area teniendo el yearAreaID
  // Se hace un fetch de las yearsubjects de dicha area.

  // Se almacena toda la información y se retorna.
  return await YearArea.getYearAreas(academicYearId);
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
