/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const calculateBmi = (args: Array<string>): string => {
  let weight = 0;
  let height = 0;

  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    (height = Number(args[2])), (weight = Number(args[3]));
  } else {
    throw new Error("Provided values were not numbers!");
  }

  const bmi: number = weight / ((height / 100) ^ 2);

  if (bmi < 17) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight";
  }
};

try {
  console.log(calculateBmi(process.argv));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
