document.addEventListener("DOMContentLoaded", function () {
    const sections = {
        overview: document.getElementById("overview-content"),
        users: document.getElementById("users-content"),
        analytics: document.getElementById("analytics-content"),
        settings: document.getElementById("settings-content"),
    };

    const menuItems = {
        overview: document.getElementById("overview"),
        users: document.getElementById("users"),
        analytics: document.getElementById("analytics"),
        settings: document.getElementById("settings"),
    };

    function showSection(sectionId) {
        // Hide all sections
        for (const section in sections) {
            sections[section].classList.add("hidden");
            menuItems[section].classList.remove("active");
        }

        // Show the selected section
        sections[sectionId].classList.remove("hidden");
        menuItems[sectionId].classList.add("active");
    }

    // Event listeners for menu items
    for (const item in menuItems) {
        menuItems[item].addEventListener("click", () => showSection(item));
    }
    document.getElementById('toggleSidebar').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    });

    // Initialize by showing the Overview section
    showSection("overview");
});
