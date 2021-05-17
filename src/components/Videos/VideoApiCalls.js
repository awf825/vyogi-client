import { API_ROOT } from "../../api-config";
export const handleCodeSubmission = async (token, code) => {
  let options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code: code,
    }),
  };

  let response = await fetch(`${API_ROOT}/video_client`, options),
    payload = await response.json();

  return payload;
};
