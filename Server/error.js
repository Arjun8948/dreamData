const error = (status, massage) => {
  const err = new Error();
  err.status = status;
  err.massage = massage;
  return err;
};
/*error function its calls as midelware inside throwing error*/
export default error;
