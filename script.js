// --- Supabase initialization and helpers ---
let supabaseClient = null;

// Проверяем загрузку библиотеки
console.log('Проверка загрузки Supabase...');
console.log('Функция supabase доступна:', typeof supabase !== 'undefined');
console.log('SUPABASE_URL доступна:', typeof SUPABASE_URL !== 'undefined');
console.log('SUPABASE_ANON_KEY доступна:', typeof SUPABASE_ANON_KEY !== 'undefined');

function initSupabaseClient() {
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase library not loaded');
        return false;
    }
    
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        console.error('❌ Supabase config not found');
        return false;
    }
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("✓ Supabase клиент инициализирован успешно");
        return true;
    } catch (err) {
        console.error('❌ Ошибка инициализации Supabase:', err);
        return false;
    }
}

// Call initialization when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    if (!initSupabaseClient()) {
        console.error('Failed to initialize Supabase');
        return;
    }
    
    updateAccountMenu();
});

function updateAccountMenu() {
    const user = localStorage.getItem('pbank_current_user');
    const dropdown = document.getElementById('account-dropdown');
    
    if (!dropdown) {
        console.warn('account-dropdown element not found');
        return;
    }
    
    if (user) {
        // Если пользователь в системе
        dropdown.innerHTML = `
            <div style="margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #f0f0f0">
                <span style="font-size:12px; color:#aaa">Пользователь</span><br>
                <b style="font-size:18px; color:#9013FE">${escapeHtml(user)}</b>
            </div>
            <a href="#" class="menu-link" onclick="alert('Раздел в разработке'); return false;">💳 Мой счёт</a>
            <a href="#" class="menu-link" onclick="alert('Раздел в разработке'); return false;">💸 Перево­ды</a>
            <hr style="border:0; border-top:1px solid #eee; margin:10px 0">
            <a href="#" onclick="logout(); return false;" style="color:red; font-size:13px; text-decoration:none; font-weight:600">Выйти из системы</a>
        `;
    } else {
        // Если гость
        dropdown.innerHTML = `
            <p style="font-size:14px; color:#666; margin-bottom:15px">Войдите, чтобы управлять счетами и картами</p>
            <a href="../Auth/auth.html" class="btn-auth-box">Войти</a>
        `;
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function logout() {
    localStorage.removeItem('pbank_current_user');
    location.reload();
}
