document.addEventListener('DOMContentLoaded', () => {

    // 1. Password Visibility Toggle (Auth pages)
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.textContent = '👁️';
            }
        });
    }

    // 2. Templates Category Filter & Carousel Slider (Landing page)
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const sliderContainer = document.getElementById('templates-slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (sliderContainer) {
        let currentSlideIndex = 0;
        let visibleSlides = [];

        // Function to update which slides are visible based on filter
        function filterSlides(category) {
            const slides = Array.from(sliderContainer.querySelectorAll('.template-slide'));
            visibleSlides = [];

            slides.forEach(slide => {
                const slideCat = slide.getAttribute('data-category');
                if (category === 'all' || slideCat === category) {
                    slide.style.display = 'block';
                    visibleSlides.push(slide);
                } else {
                    slide.style.display = 'none';
                }
            });

            currentSlideIndex = 0;
            updateSliderPosition();
        }

        // Initialize visible slides list
        filterSlides('all');

        // Tab click handling
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.getAttribute('data-category');
                filterSlides(category);
            });
        });

        // Function to move the slider
        function updateSliderPosition() {
            if (visibleSlides.length === 0) return;
            const slideWidth = visibleSlides[0].getBoundingClientRect().width;
            const gap = 30; // Matches CSS gap
            const offset = currentSlideIndex * (slideWidth + gap);
            sliderContainer.style.transform = `translateX(-${offset}px)`;
        }

        // Slider navigation button handlers
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const itemsVisibleCount = getItemsVisibleCount();
                if (currentSlideIndex < visibleSlides.length - itemsVisibleCount) {
                    currentSlideIndex++;
                    updateSliderPosition();
                } else {
                    // Loop back to start
                    currentSlideIndex = 0;
                    updateSliderPosition();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlideIndex > 0) {
                    currentSlideIndex--;
                    updateSliderPosition();
                } else {
                    // Loop to end
                    const itemsVisibleCount = getItemsVisibleCount();
                    currentSlideIndex = Math.max(0, visibleSlides.length - itemsVisibleCount);
                    updateSliderPosition();
                }
            });
        }

        // Helper to find how many items fit in the viewport
        function getItemsVisibleCount() {
            const width = window.innerWidth;
            if (width <= 768) return 1;
            if (width <= 1024) return 2;
            return 3;
        }

        // Update slider position on window resize to ensure correct layout sizing
        window.addEventListener('resize', updateSliderPosition);
    }

    // 3. Resumes Created Today Animated Counter (Landing page)
    const counterEl = document.getElementById('created-counter');
    if (counterEl) {
        let currentCount = 95500;
        const targetCount = 95951;
        const duration = 1500; // 1.5 seconds to count up
        const steps = 100;
        const increment = Math.ceil((targetCount - currentCount) / steps);
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(timer);
                
                // Slow live incrementing after initial count-up
                setInterval(() => {
                    currentCount += Math.floor(Math.random() * 3) + 1;
                    counterEl.textContent = currentCount.toLocaleString();
                }, 3000);
            }
            counterEl.textContent = currentCount.toLocaleString();
        }, stepTime);
    }

    // 4. Live Preview Builder Sync (Builder page)
    const inputName = document.getElementById('input-name');
    if (inputName) {
        // Sync items mappings
        const syncMap = [
            { input: 'input-name', preview: 'preview-name', transform: val => val || 'Your Name' },
            { input: 'input-title', preview: 'preview-title', transform: val => val || 'Desired Job Title' },
            { input: 'input-email', preview: 'preview-email', transform: val => val ? `📧 ${val}` : '' },
            { input: 'input-phone', preview: 'preview-phone', transform: val => val ? `📞 ${val}` : '' },
            { input: 'input-summary', preview: 'preview-summary', transform: val => val || 'Write a short professional profile...' },
            { input: 'input-job', preview: 'preview-job', transform: val => val || 'Job Title / Position' },
            { input: 'input-employer', preview: 'preview-employer', transform: val => val || 'Company / School Name' },
            { input: 'input-exp-desc', preview: 'preview-exp-desc', transform: val => val || '- Job duty or achievement' },
            { input: 'input-edu-degree', preview: 'preview-edu-degree', transform: val => val || 'Degree Name' },
            { input: 'input-edu-school', preview: 'preview-edu-school', transform: val => val || 'School Name' },
            { input: 'input-edu-date', preview: 'preview-edu-date', transform: val => val || 'Graduation Date' }
        ];

        // Combined elements for dates
        const startInput = document.getElementById('input-exp-start');
        const endInput = document.getElementById('input-exp-end');
        const datesPreview = document.getElementById('preview-exp-dates');

        function updateDates() {
            if (datesPreview && startInput && endInput) {
                const start = startInput.value.trim();
                const end = endInput.value.trim();
                if (start || end) {
                    datesPreview.textContent = `${start || 'Start Date'} - ${end || 'End Date'}`;
                } else {
                    datesPreview.textContent = '';
                }
            }
        }

        if (startInput) startInput.addEventListener('input', updateDates);
        if (endInput) endInput.addEventListener('input', updateDates);

        // Bind normal mapping events
        syncMap.forEach(item => {
            const inputEl = document.getElementById(item.input);
            const previewEl = document.getElementById(item.preview);
            if (inputEl && previewEl) {
                inputEl.addEventListener('input', () => {
                    previewEl.textContent = item.transform(inputEl.value);
                });
            }
        });
    }

});
