const endpoint = 'clients.json';
console.log(endpoint);

const clients = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => clients.push(...data));

function findMatches(wordToMatch, clients) {
  return clients.filter(client => {
    // here we need to figure out if the client or type matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return client.client.match(regex) || client.type.match(regex) || client.department.match(regex)
    || client.lead.match(regex) || client.secondContact.match(regex) || client.thirdContact.match(regex) || client.seniorContact.match(regex) 
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, clients);
  const html = matchArray.map(client => {
    const regex = new RegExp(this.value, 'gi');
    const clientName = client.client.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientType = client.type.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientDepartment = client.department.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientLead = client.lead.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientSecondLead = client.secondContact.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientThirdLead = client.thirdContact.replace(regex, `<span class="hl">${this.value}</span>`);
    const clientSeniorLead = client.seniorContact.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name"><h2>${clientName} - Lead: ${(clientLead)}</h2></span>
        <span class="sub-info"><strong>2nd Contact:</strong> ${(clientSecondLead)}</span>
        <span class="sub-info"><strong>3rd Contact:</strong> ${(clientThirdLead)}</span>
        <span class="sub-info"><strong>Senior Contact:</strong> ${(clientSeniorLead)}</span>
        <span class="sub-info"><strong>Lead or Partner:</strong> ${clientType}</span>
        <span class="sub-info"><strong>Department:</strong> ${(clientDepartment)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
