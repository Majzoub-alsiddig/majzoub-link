const linksContainer = document.getElementById('linksContainer');
const currentYearSpan = document.getElementById('currentYear');
const _supabaseUrl = 'https://hcjeljdcdshhavvnclso.supabase.co';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjamVsamRjZHNoaGF2dm5jbHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTEzMzIsImV4cCI6MjA4Mzg4NzMzMn0.ZYXQSqBlkxvuTdcVkzpzooHdjfECc8B42Q2wGQmS7oA';
const _supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

let links = [
    {
        id: 0,
        title: 'Telegram',
        url: 'https://t.me/majzoub_siddig',
        icon: 'fab fa-telegram',
        category: ''
    },
    {
        id: 1,
        title: 'Linkedin',
        url: 'https://linkedin.com/in/majzoub-siddig',
        icon: 'fab fa-linkedin',
        category: ''
    }
];

async function fetchlinks() {
    const { data, error } = await _supabase
        .from('links')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('My Data:', data);
        links = data;
        renderLinks();
    }
}


function init() {
    currentYearSpan.textContent = new Date().getFullYear();

    const savedLinks = localStorage.getItem('myLinks');
    if (savedLinks) {
        links = JSON.parse(savedLinks);
    }

    fetchlinks();
    renderLinks();
}

function renderLinks() {

    linksContainer.innerHTML = '';

    links.forEach(link => {
        const linkCard = document.createElement('div');
        linkCard.className = 'link-card';
        linkCard.dataset.id = link.id;
        linkCard.dataset.category = link.category;

        linkCard.innerHTML = `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                    <div class="link-icon">
                        <i class="${link.icon}"></i>
                    </div>
                    <div class="link-content">
                        <h3>${link.title}</h3>
                    </div>
                </a>`;

        linksContainer.appendChild(linkCard);
    });
}

document.addEventListener('DOMContentLoaded', init);