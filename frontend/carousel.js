document.addEventListener('DOMContentLoaded', async () => {
    const editForm = document.getElementById('editForm');
    const slideNumberInput = document.getElementById('slideNumber');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    async function fetchSlides() {
        const response = await fetch('/carousel');
        const slides = await response.json();

        slides.forEach(slide => {
            document.getElementById(`title${slide.slideNumber}`).textContent = slide.title;
            document.getElementById(`description${slide.slideNumber}`).textContent = slide.description;
        });
    }

    await fetchSlides();

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            slideNumber: slideNumberInput.value,
            title: titleInput.value,
            description: descriptionInput.value
        };

        await fetch('/carousel/update/' + data.slideNumber, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        await fetchSlides();
    });
});


