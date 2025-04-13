# Installation Guide

Follow these steps to get your environment up and running 🚀:

---

## 1. Install Docker Desktop

-   **Download** and install Docker Desktop from the official website:  
     [Docker Desktop Download](https://www.docker.com/get-started/)  
    <img src="https://img.icons8.com/color/48/000000/docker.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

## 2. Open PowerShell

-   Open PowerShell on your machine and execute the following command to install WSL:
    ```powershell
    wsl --install
    ```
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

## 3. Launch Docker Desktop

-   After installing Docker, **launch** Docker Desktop.  
    <img src="https://static-00.iconduck.com/assets.00/docker-icon-512x438-ga1hb37h.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

## 4. Run Docker Containers

-   In the terminal, **navigate** to your project's root directory and run:
    ```bash
    docker-compose up -d
    ```
    <img src="https://cdn-icons-png.flaticon.com/512/7560/7560719.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

## 5. Access PHP Container

-   To **access** the PHP container's shell, execute the following command:
    ```bash
    docker-compose exec php bash
    ```
    <img src="https://www.php.net/images/logos/new-php-logo.svg" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

## 6. Install Composer Dependencies & Set up Laravel

Inside the PHP container, execute these commands:

1. **Install Composer dependencies**:

    ```bash
    composer install
    ```

    <img src="https://cdn-icons-png.flaticon.com/512/919/919840.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

2. **Regenerate autoload files**:

    ```bash
    composer dump-autoload
    ```

    <img src="https://cdn-icons-png.flaticon.com/512/919/919840.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

3. **Run database migrations**:

    ```bash
    php artisan migrate
    ```

    <img src="https://static-00.iconduck.com/assets.00/laravel-icon-995x1024-dk77ahh4.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

4. **Serve the Laravel app**:
    ```bash
    php artisan serve
    ```
    <img src="https://static-00.iconduck.com/assets.00/laravel-icon-995x1024-dk77ahh4.png" width="50" height="50" style="vertical-align: middle; margin-left: 10px;" />

---

Once you complete these steps, your Laravel app will be up and running! 🎉
