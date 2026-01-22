// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты в футере
    const currentDate = new Date().toLocaleDateString('ru-RU');
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate;
    }
    
    // Функционал модального окна
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-secondary'); // Кнопка "Войти"
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('loginModal');
    
    // Открытие модального окна
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл
        });
    }
    
    // Закрытие модального окна
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие по клику на overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Валидация
            if (!email || !password) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            // Имитация запроса на сервер
            showNotification('Вход выполняется...', 'info');
            
            // Здесь будет реальный AJAX запрос
            setTimeout(() => {
                // Успешный вход
                showNotification('Добро пожаловать!', 'success');
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Обновляем кнопку входа
                if (loginBtn) {
                    loginBtn.innerHTML = '<i class="fas fa-user"></i> Личный кабинет';
                    loginBtn.classList.add('logged-in');
                }
            }, 1500);
        });
    }
    
    // Забыли пароль
    const forgotPassword = document.getElementById('forgotPassword');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Функция восстановления пароля временно недоступна', 'info');
        });
    }
    
    // Переход к регистрации
    const goToRegister = document.getElementById('goToRegister');
    if (goToRegister) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            showNotification('Переход к регистрации...', 'info');
            
            // Здесь будет переход на страницу регистрации
            setTimeout(() => {
                // Временная заглушка
                alert('Страница регистрации в разработке');
            }, 500);
        });
    }
    
    // Социальные кнопки
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' :
                           this.classList.contains('vk') ? 'VK' : 'Telegram';
            showNotification(`Вход через ${provider} временно недоступен`, 'info');
        });
    });
    
    // Функционал вкладок
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Удаляем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Функционал фильтров карты
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Фильтруем маркеры
            mapMarkers.forEach(marker => {
                const markerType = marker.querySelector('.marker').classList.contains(filter) ? 
                                 filter : marker.getAttribute('data-country');
                
                if (filter === 'all' || markerType === filter) {
                    marker.style.display = 'block';
                } else {
                    marker.style.display = 'none';
                }
            });
        });
    });
    
    // Обработка формы поиска круизов
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const geography = this.querySelector('[name="geography"]').value;
            const cruiseType = this.querySelector('[name="cruise-type"]').value;
            const availability = this.querySelector('[name="availability"]').value;
            
            // Редирект на страницу с результатами поиска
            window.location.href = `cruises.html?geo=${geography}&type=${cruiseType}&visa=${availability}`;
        });
    }
    
    // Система уведомлений
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Закрытие по клику
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Инициализация карты
    function initMap() {
        console.log('Карта направлений инициализирована');
        // Здесь будет код для интерактивной карты
    }
    
    // Вызов функций инициализации
    initMap();
});

// Модуль для работы с вакансиями
const CareerModule = {
    filterJobs: function(filters) {
        const jobs = document.querySelectorAll('.job-card');
        
        jobs.forEach(job => {
            let shouldShow = true;
            
            if (filters.language && filters.language !== 'any') {
                const jobLanguage = job.getAttribute('data-language');
                if (jobLanguage !== filters.language) {
                    shouldShow = false;
                }
            }
            
            if (filters.location && filters.location !== 'any') {
                const jobLocation = job.getAttribute('data-location');
                if (jobLocation !== filters.location) {
                    shouldShow = false;
                }
            }
            
            if (filters.contract && filters.contract !== 'any') {
                const jobContract = job.getAttribute('data-contract');
                if (jobContract !== filters.contract) {
                    shouldShow = false;
                }
            }
            
            job.style.display = shouldShow ? 'block' : 'none';
        });
    }
};