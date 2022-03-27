export const getAuthToken = async ({ request, email = 'aaa@aaa.pl', password = 'nopass' }) => {
  const response = await request.post('/user/login').send({ email, password });

  return { token: response.body.token, refreshToken: response.body.refresh };
};

export default {
  getAuthToken,
};
