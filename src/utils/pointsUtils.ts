type Season = "spring" | "summer" | "autumn" | "winter";

export const getCurrentSeason = (date: Date): Season => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  // Spring: March 1 - May 31
  if (month === 3 || month === 4 || month === 5) return "spring";
  // Summer: June 1 - August 31
  if (month === 6 || month === 7 || month === 8) return "summer";
  // Autumn: September 1 - November 30
  if (month === 9 || month === 10 || month === 11) return "autumn";
  // Winter: December 1 - February 28/29
  return "winter";
};

export const getDayOfSeason = (date: Date): number => {
  const season = getCurrentSeason(date);
  const year = date.getFullYear();

  let seasonStart: Date;

  switch (season) {
    case "spring":
      seasonStart = new Date(year, 2, 1); // March 1
      break;
    case "summer":
      seasonStart = new Date(year, 5, 1); // June 1
      break;
    case "autumn":
      seasonStart = new Date(year, 8, 1); // September 1
      break;
    case "winter":
      // Winter spans across years, so we need to check if we're in Dec or Jan/Feb
      if (date.getMonth() === 11) {
        // December
        seasonStart = new Date(year, 11, 1); // December 1
      } else {
        // January or February
        seasonStart = new Date(year - 1, 11, 1); // December 1 of previous year
      }
      break;
  }

  const diffTime = date.getTime() - seasonStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return Math.max(1, diffDays);
};

export const calculateDailyPoints = (date: Date): number => {
  const dayOfSeason = getDayOfSeason(date);

  if (dayOfSeason === 1) {
    return 2;
  } else if (dayOfSeason === 2) {
    return 3;
  } else {
    // For day 3 and beyond: calculate iteratively to avoid recursion
    let points = [2, 3]; // Points for day 1 and day 2

    for (let day = 3; day <= dayOfSeason; day++) {
      const dayBeforePrevious = points[day - 3]; // day - 3 = index for day before previous
      const previousDay = points[day - 2]; // day - 2 = index for previous day
      const totalPoints = dayBeforePrevious + 0.6 * previousDay;
      points.push(Math.round(totalPoints));
    }

    return points[dayOfSeason - 1]; // Return points for the requested day
  }
};

export const formatPoints = (points: number): string => {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
};
