interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const caculateExercises = (args: Array<string>): result => {
  let trainingDays: number = 0;
  let totaltime: number = 0;
  let rating: number = 0;
  let ratingDescription: string = "";

  const target: number = Number(args[2]);
  const exercisehours: Array<number> = args.slice(3).map(Number);

  const periodLength: number = exercisehours.length;
  exercisehours.forEach((day: number) => {
    if (day !== 0) {
      trainingDays = trainingDays + 1;
    }
    totaltime = totaltime + day;
  });

  let average: number = totaltime / periodLength;

  const success: boolean = average > target ? true : false;

  if (success) {
    rating = 3;
    ratingDescription = "Great Job, Keep up the good work";
  } else if (average > 1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "not bad, but you have to do better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  console.log(caculateExercises(process.argv));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
