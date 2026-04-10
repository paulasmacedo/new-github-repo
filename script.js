const destinationInput = document.getElementById('destination');
const daysInput = document.getElementById('days');
const preferenceSelect = document.getElementById('preference');
const generateBtn = document.getElementById('generateBtn');
const exportBtn = document.getElementById('exportBtn');
const itineraryContainer = document.getElementById('itinerary');

const validPreferences = ['economico', 'cultural', 'aventura'];

const sanitizeInput = (value) => value.replace(/[<>&"'`]/g, '').trim();

const suggestions = {
  economico: [
    'Visitar um mercado local',
    'Caminhar por um bairro histórico',
    'Experimentar comida de rua',
    'Fazer um passeio livre a pé',
    'Aproveitar um parque público',
    'Tour por museus gratuitos'
  ],
  cultural: [
    'Visitar um museu famoso',
    'Conhecer uma galeria de arte',
    'Fazer um tour guiado histórico',
    'Assistir a uma apresentação local',
    'Explorar monumentos importantes',
    'Degustar gastronomia típica'
  ],
  aventura: [
    'Trilha em uma paisagem natural',
    'Passeio de bike pela cidade',
    'Esportes ao ar livre',
    'Visitar uma atração com adrenalina',
    'Canoagem ou passeio de barco',
    'Observação de pontos panorâmicos'
  ]
};

function getRandomActivities(preference, count) {
  const pool = suggestions[preference] || suggestions.economico;
  const items = [...pool];
  const selected = [];

  for (let i = 0; i < count; i += 1) {
    if (items.length === 0) break;
    const index = Math.floor(Math.random() * items.length);
    selected.push(items.splice(index, 1)[0]);
  }

  return selected;
}

function formatItinerary(destination, days, preference) {
  const itinerary = [];

  for (let day = 1; day <= days; day += 1) {
    const activities = getRandomActivities(preference, 3);
    itinerary.push({
      title: `Dia ${day} em ${destination}`,
      details: activities
    });
  }

  return itinerary;
}

function renderItinerary(itinerary) {
  itineraryContainer.innerHTML = '';

  itinerary.forEach((dayPlan) => {
    const dayCard = document.createElement('article');
    dayCard.className = 'day-card';

    const title = document.createElement('h3');
    title.textContent = dayPlan.title;
    dayCard.appendChild(title);

    const list = document.createElement('ul');
    dayPlan.details.forEach((detail) => {
      const item = document.createElement('li');
      item.textContent = detail;
      list.appendChild(item);
    });

    dayCard.appendChild(list);
    itineraryContainer.appendChild(dayCard);
  });
}

function buildPlainText(destination, days, preference, itinerary) {
  const lines = [
    `Roteiro de viagem para ${destination}`,
    `Dias: ${days}`,
    `Preferência: ${preference}`,
    ''
  ];

  itinerary.forEach((dayPlan) => {
    lines.push(dayPlan.title);
    dayPlan.details.forEach((detail) => lines.push(`- ${detail}`));
    lines.push('');
  });

  return lines.join('\n');
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

let currentItinerary = [];

generateBtn.addEventListener('click', () => {
  const destination = sanitizeInput(destinationInput.value) || 'Seu destino';
  let days = Number(daysInput.value);
  if (!Number.isInteger(days) || days < 1 || days > 14) {
    days = 3;
    daysInput.value = days;
  }
  const preferenceValue = preferenceSelect.value;
  const preference = validPreferences.includes(preferenceValue) ? preferenceValue : 'economico';

  currentItinerary = formatItinerary(destination, days, preference);
  renderItinerary(currentItinerary);
  exportBtn.disabled = false;
});

exportBtn.addEventListener('click', () => {
  if (!currentItinerary.length) return;

  const destination = sanitizeInput(destinationInput.value) || 'Seu destino';
  let days = Number(daysInput.value);
  if (!Number.isInteger(days) || days < 1 || days > 14) {
    days = 3;
  }
  const preferenceValue = preferenceSelect.value;
  const preference = validPreferences.includes(preferenceValue) ? preferenceValue : 'economico';
  const text = buildPlainText(destination, days, preference, currentItinerary);

  downloadTextFile('roteiro-de-viagem.txt', text);
});
