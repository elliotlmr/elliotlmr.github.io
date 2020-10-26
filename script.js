/* Function permettant d'afficher les articles disponibles */

const getArticle = fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(response => alert(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));




fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

// Fetch pour POST un JSON-encoded data

  const data = { username: 'example' };

fetch('https://example.com/profile', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});