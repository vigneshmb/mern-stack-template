export const populateJoiMessage = (error) => {
  const msg = error?.details?.[0]?.message || 'The values are not allowed';
};
