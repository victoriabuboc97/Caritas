import axios from 'axios';

export async function doPayment (amount, id, accessToken) {
  const body = {
    amount: amount,
    tokenId: id,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
//   return axios
//     .post('http://localhost:5000/api/doPayment', body, { headers })
//     .then(({ data }) => {
//       return data;
//     })
//     .catch(error => {
//         console.log('Error in making payment', error);
//     //   return Promise.reject('Error in making paymentttt', error);
//     });
    return fetch('http://localhost:5000/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
  })
    .then((res) => res.json())
    .then((res) => {
        console.log(res.response);
    })
    .catch((error) => {
        console.log(error);
    })
};