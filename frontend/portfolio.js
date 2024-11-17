document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('carousel-container');
    const editForm = document.getElementById('editForm');
    const role = localStorage.getItem('role');

    // Получение текста для карусели
    async function fetchSlides() {
        const response = await fetch('/carousel');
        const slides = await response.json();
        container.innerHTML = '';

        slides.forEach(slide => {
            container.insertAdjacentHTML('beforeend', `
                <div class="carousel-item ${slide.slideNumber === 1 ? 'active' : ''}">
                    <img src="image${slide.slideNumber}.jpg" class="d-block w-100" alt="Slide ${slide.slideNumber}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${slide.title}</h5>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `);
        });
    }

    await fetchSlides();

    // Обработка редактирования текста
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const slideNumber = document.getElementById('slideNumber').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        await fetch(`/carousel/update/${slideNumber}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        await fetchSlides();
    });
});

