class PropertyManager {
    constructor() {
        this.media = [];
        this.currentMediaIndex = -1;
        this.amenities = new Set();
        this.init();
    }

    init() {
        this.initMediaGallery();
        this.initAmenities();
        this.initEventListeners();
        this.loadSampleData();
    }

    initMediaGallery() {
        const thumbnailsContainer = document.querySelector('.thumbnails');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        const updateArrowVisibility = () => {
            const scrollLeft = thumbnailsContainer.scrollLeft;
            const scrollWidth = thumbnailsContainer.scrollWidth;
            const clientWidth = thumbnailsContainer.clientWidth;
            
            leftArrow.disabled = scrollLeft === 0;
            rightArrow.disabled = scrollLeft + clientWidth >= scrollWidth - 5;
        };

        leftArrow.addEventListener('click', () => {
            thumbnailsContainer.scrollBy({ left: -200, behavior: 'smooth' });
            setTimeout(updateArrowVisibility, 300);
        });

        rightArrow.addEventListener('click', () => {
            thumbnailsContainer.scrollBy({ left: 200, behavior: 'smooth' });
            setTimeout(updateArrowVisibility, 300);
        });

        thumbnailsContainer.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);
    }

    initAmenities() {
        const standardAmenities = [
            { text: 'High-Speed WiFi', icon: 'wifi' },
            { text: 'Free Parking', icon: 'parking' },
            { text: 'Air Conditioning', icon: 'snowflake' },
            { text: 'Swimming Pool', icon: 'swimming-pool' }
        ];

        standardAmenities.forEach(amenity => {
            this.addAmenity(amenity.text, amenity.icon);
        });

        document.getElementById('amenity-select').addEventListener('change', (e) => {
            if (e.target.value) {
                const option = e.target.options[e.target.selectedIndex];
                const icon = option.getAttribute('data-icon');
                const text = option.text;
                this.addAmenity(text, icon);
                e.target.value = '';
            }
        });

        document.getElementById('add-custom-amenity').addEventListener('click', () => {
            const input = document.getElementById('custom-amenity-input');
            const text = input.value.trim();
            if (text) {
                this.addAmenity(text, 'plus');
                input.value = '';
            }
        });
    }

    initEventListeners() {
        document.getElementById('upload-image-btn').addEventListener('click', () => {
            document.getElementById('image-upload').click();
        });

        document.getElementById('upload-video-btn').addEventListener('click', () => {
            document.getElementById('video-upload').click();
        });

        document.getElementById('image-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files, 'image');
        });

        document.getElementById('video-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files, 'video');
        });

        document.querySelector('.main-image-prev').addEventListener('click', () => {
            this.showPreviousMedia();
        });

        document.querySelector('.main-image-next').addEventListener('click', () => {
            this.showNextMedia();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.showPreviousMedia();
            } else if (e.key === 'ArrowRight') {
                this.showNextMedia();
            }
        });

        document.querySelector('.save-settings-btn').addEventListener('click', () => {
            this.saveBookingSettings();
        });

        document.getElementById('publish-btn').addEventListener('click', () => {
            this.publishChanges();
        });

        this.setupAutoSave();
    }

    setupAutoSave() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.autoSave();
            });
        });
    }

    handleFileUpload(files, type) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaItem = {
                    id: Date.now() + Math.random(),
                    type: type,
                    name: file.name,
                    url: e.target.result,
                    file: file
                };
                
                this.media.push(mediaItem);
                this.createThumbnail(mediaItem);
                
                if (this.media.length === 1) {
                    this.showMedia(0);
                }
                
                this.updateGalleryButtons();
                this.autoSave();
            };
            reader.readAsDataURL(file);
        });
    }

    createThumbnail(mediaItem) {
        const thumbnailsContainer = document.getElementById('media-thumbnails');
        const thumb = document.createElement('div');
        thumb.className = `media-thumb ${mediaItem.type}-thumb`;
        thumb.setAttribute('data-id', mediaItem.id);

        thumb.innerHTML = `
            ${mediaItem.type === 'image' ? 
                `<img src="${mediaItem.url}" alt="${mediaItem.name}">` : 
                `<div style="width:100%;height:100%;background:#333;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-play-circle" style="color:white;font-size:24px;"></i>
                </div>`
            }
            <button class="delete-thumb" title="Delete">
                <i class="fas fa-times"></i>
            </button>
        `;

        thumb.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-thumb')) {
                const index = this.media.findIndex(m => m.id === mediaItem.id);
                this.showMedia(index);
            }
        });

        const deleteBtn = thumb.querySelector('.delete-thumb');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.confirmDelete(mediaItem.id);
        });

        thumbnailsContainer.appendChild(thumb);
    }

    showMedia(index) {
        if (index >= 0 && index < this.media.length) {
            this.currentMediaIndex = index;
            const mediaItem = this.media[index];
            const mainImage = document.querySelector('.main-image');
            
            mainImage.classList.remove('show-image', 'show-video');
            
            if (mediaItem.type === 'image') {
                const mainMedia = document.getElementById('main-media');
                mainMedia.src = mediaItem.url;
                mainMedia.alt = mediaItem.name;
                mainImage.classList.add('show-image');
            } else {
                const mainVideo = document.getElementById('main-video');
                mainVideo.src = mediaItem.url;
                mainImage.classList.add('show-video');
            }
            
            document.querySelectorAll('.media-thumb').forEach(thumb => {
                thumb.classList.remove('active');
            });
            document.querySelector(`.media-thumb[data-id="${mediaItem.id}"]`).classList.add('active');
            
            this.updateGalleryButtons();
        }
    }

    showPreviousMedia() {
        if (this.currentMediaIndex > 0) {
            this.showMedia(this.currentMediaIndex - 1);
        }
    }

    showNextMedia() {
        if (this.currentMediaIndex < this.media.length - 1) {
            this.showMedia(this.currentMediaIndex + 1);
        }
    }

    updateGalleryButtons() {
        const prevBtn = document.querySelector('.main-image-prev');
        const nextBtn = document.querySelector('.main-image-next');
        
        prevBtn.disabled = this.currentMediaIndex <= 0;
        nextBtn.disabled = this.currentMediaIndex >= this.media.length - 1;
        
        if (this.media.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    confirmDelete(mediaId) {
        const modal = document.getElementById('delete-modal');
        const confirmBtn = document.getElementById('confirm-delete');
        const cancelBtn = document.getElementById('cancel-delete');
        
        modal.style.display = 'flex';
        
        const cleanup = () => {
            modal.style.display = 'none';
            confirmBtn.onclick = null;
            cancelBtn.onclick = null;
        };
        
        confirmBtn.onclick = () => {
            this.deleteMedia(mediaId);
            cleanup();
        };
        
        cancelBtn.onclick = cleanup;
        
        modal.querySelector('.modal-close').onclick = cleanup;
        modal.onclick = (e) => {
            if (e.target === modal) cleanup();
        };
    }

    deleteMedia(mediaId) {
        const mediaIndex = this.media.findIndex(m => m.id === mediaId);
        if (mediaIndex > -1) {
            this.media.splice(mediaIndex, 1);
            
            const thumb = document.querySelector(`.media-thumb[data-id="${mediaId}"]`);
            if (thumb) thumb.remove();
            
            if (this.media.length === 0) {
                document.querySelector('.main-image').classList.remove('show-image', 'show-video');
                this.currentMediaIndex = -1;
            } else if (this.currentMediaIndex >= mediaIndex) {
                const newIndex = Math.max(0, this.currentMediaIndex - 1);
                this.showMedia(newIndex);
            }
            
            this.updateGalleryButtons();
            this.autoSave();
        }
    }

    addAmenity(text, icon) {
        if (this.amenities.has(text)) return;
        
        this.amenities.add(text);
        const container = document.getElementById('selected-amenities');
        
        const tag = document.createElement('div');
        tag.className = 'amenity-tag';
        tag.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${text}</span>
            <i class="fas fa-times"></i>
        `;
        
        tag.querySelector('.fa-times').addEventListener('click', () => {
            this.amenities.delete(text);
            tag.remove();
            this.autoSave();
        });
        
        container.appendChild(tag);
        this.autoSave();
    }

    saveBookingSettings() {
        const settings = {
            minStay: document.getElementById('min-stay').value,
            maxGuests: document.getElementById('max-guests').value,
            checkinTime: document.getElementById('checkin-time').value,
            checkoutTime: document.getElementById('checkout-time').value,
            securityDeposit: document.getElementById('security-deposit').value
        };
        
        console.log('Booking settings saved:', settings);
        this.showSaveStatus();
    }

    publishChanges() {
        const propertyData = this.collectPropertyData();
        console.log('Publishing property data:', propertyData);
        
        setTimeout(() => {
            this.showSaveStatus('Property published successfully!');
        }, 1000);
    }

    collectPropertyData() {
        return {
            title: document.querySelector('.property-title-editable').value,
            location: document.querySelector('.property-location-editable input').value,
            price: document.querySelector('.price-input').value,
            guests: document.querySelector('[data-feature="guests"]').value,
            bedrooms: document.querySelector('[data-feature="bedrooms"]').value,
            bathrooms: document.querySelector('[data-feature="bathrooms"]').value,
            size: document.querySelector('[data-feature="size"]').value,
            description: document.querySelector('.property-description-editable textarea').value,
            amenities: Array.from(this.amenities),
            media: this.media.map(m => ({ type: m.type, name: m.name })),
            booking: {
                minStay: document.getElementById('min-stay').value,
                maxGuests: document.getElementById('max-guests').value,
                checkinTime: document.getElementById('checkin-time').value,
                checkoutTime: document.getElementById('checkout-time').value,
                securityDeposit: document.getElementById('security-deposit').value
            }
        };
    }

    autoSave() {
        const data = this.collectPropertyData();
        localStorage.setItem('property_draft', JSON.stringify(data));
        this.showSaveStatus('Changes saved automatically');
    }

    showSaveStatus(message = 'All changes saved successfully!') {
        const status = document.getElementById('save-status');
        status.querySelector('span').textContent = message;
        status.style.display = 'flex';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }

    loadSampleData() {
        const sampleImages = [
            {
                id: 1,
                type: 'image',
                name: 'Sample Image 1',
                url: 'https://img.gathern.co/1400x0/1/dY6FiVl8LdQ3U_R9dWFoG3idcD21QQUm.jpg'
            },
            {
                id: 2,
                type: 'image', 
                name: 'Sample Image 2',
                url: 'https://www.medina-hotels-sa.com/data/Imgs/OriginalPhoto/13377/1337709/1337709098/img-medina-1.JPEG'
            }
        ];

        sampleImages.forEach(image => {
            this.media.push(image);
            this.createThumbnail(image);
        });

        if (this.media.length > 0) {
            this.showMedia(0);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PropertyManager();
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});