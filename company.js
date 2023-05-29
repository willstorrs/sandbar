// Fetch company data from JSON file
fetch('companies.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    // If response is OK, return the JSON data
    return response.json();
  })
  .then(data => {
    // Get company name from URL parameter
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    // Find company in data based on name
    const company = data.find(item => item.name === name);

    // If company is found, display company information
    if (company) {
      document.getElementById('company-name').textContent = company.name;

      const info = document.getElementById('company-info');
      // For each key in the company object, create a paragraph to display the key and value
      Object.keys(company).forEach(key => {
        if (key !== 'name') {
          const p = document.createElement('p');
          p.textContent = `${key}: ${company[key]}`;
          info.appendChild(p);
        }
      });
    } else {
      // If company is not found, redirect to homepage
      window.location.href = 'index.html';
    }
  })
  .catch(function(error) {
    console.log(error);
  });
  
  window.onload = () => {
    let companyData = JSON.parse(localStorage.getItem('selectedCompany'));
  
    if (companyData) {
      // Set the document title to the company name
      document.title = `${companyData.name} - Company Info`;
  
      // Set the header text to the company name
      let header = document.querySelector('header h1');
      if (header) {
        header.textContent = `${companyData.name} - Company Info`;
      }
    }
  };
  