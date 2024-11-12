import apiRequest from './api';
import { 
  GiWeightLiftingUp,     // Pour développé couché
  GiGymBag,           // Pour équipement général
  GiMuscularTorso,    // Pour exercices du torse
  GiMuscleFat,        // Pour biceps/triceps
  GiLeg,              // Pour jambes
  GiArmSling,         // Pour épaules
  GiAbdominalArmor    // Pour abdos
} from 'react-icons/gi';

const exerciseIcons = {
  'Développé couché': GiWeightLiftingUp,
  'Squat': GiLeg,
  'Traction': GiMuscularTorso,
  'Curl biceps': GiMuscleFat,
  'Presse à jambes': GiLeg,
  'Développé épaules': GiArmSling,
  'Crunch': GiAbdominalArmor,
  // Icône par défaut
  'default': GiGymBag
};

const getExerciseIcon = (exerciseName, muscleGroup) => {
  // Par nom d'exercice
  if (exerciseIcons[exerciseName]) {
    return exerciseIcons[exerciseName];
  }

  // Par groupe musculaire si le nom n'est pas trouvé
  switch (muscleGroup?.toLowerCase()) {
    case 'jambes':
      return GiLeg;
    case 'bras':
      return GiMuscleFat;
    case 'poitrine':
      return GiMuscularTorso;
    case 'dos':
      return GiMuscularTorso;
    case 'epaules':
      return GiArmSling;
    case 'abdominaux':
      return GiAbdominalArmor;
    default:
      return GiGymBag; // Icône par défaut
  }
};

export const fetchExercises = async () => {
  try {
    const data = await apiRequest('/exercices', 'GET');
    return data.map(exercise => {
      const IconComponent = getExerciseIcon(exercise.nom, exercise.partieCorps);
      return {
        ...exercise,
        id: exercise.idExercice,
        name: exercise.nom,
        icon: <IconComponent className="h-12 w-12 text-orange-500" />,
        equipment: [exercise.equipementNecessaire.toLowerCase()]
      };
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};