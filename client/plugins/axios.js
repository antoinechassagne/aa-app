const statusCodes = {
  UNAUTHORIZED: 401,
};

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    console.log(error);
    const defaultErrorMessage = "Une erreur s'est produite";
    const { response } = error;
    if (!response) {
      return Promise.reject(defaultErrorMessage);
    }
    const { status } = response;
    const errorMessage = response.data && response.data.error ? response.data.error : defaultErrorMessage;

    if (status === statusCodes.UNAUTHORIZED) {
      redirect("/login");
      return Promise.reject(errorMessage);
    }

    return Promise.reject(errorMessage);
  });
}
