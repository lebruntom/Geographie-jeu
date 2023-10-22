export const calculateSuccessPercentage = (goodAnswers, totalQuestions) => {
  const successPct = (goodAnswers * 100) / totalQuestions;
  const formattedPct = parseFloat(successPct.toFixed(2));

  return Math.round(formattedPct * 100) / 100;
};
