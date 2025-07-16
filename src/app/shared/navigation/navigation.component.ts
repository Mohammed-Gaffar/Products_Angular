import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/dashboard" class="brand-link">
          <span class="brand-icon">🏪</span>
          <span class="brand-text">ProductsApp</span>
        </a>
      </div>
      <div class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📊</span>
          Dashboard
        </a>
        <a routerLink="/products" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📦</span>
          Products
        </a>
        <a routerLink="/orders" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">🛒</span>
          Orders
        </a>
        <a routerLink="/users" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">👥</span>
          Users
        </a>
      </div>
      <div class="nav-actions">
        <button class="nav-btn">
          <span class="nav-icon">🔔</span>
        </button>
        <button class="nav-btn">
          <span class="nav-icon">⚙️</span>
        </button>
        <div class="user-avatar">
          <span class="avatar-icon">👤</span>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-brand {
      display: flex;
      align-items: center;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #2d3748;
      font-weight: 700;
      font-size: 1.25rem;
    }

    .brand-icon {
      font-size: 1.5rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .brand-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #718096;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .nav-link.active {
      color: #667eea;
      background: rgba(102, 126, 234, 0.15);
    }

    .nav-icon {
      font-size: 1rem;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.1rem;
    }

    .nav-btn:hover {
      background: rgba(102, 126, 234, 0.1);
      border-color: #667eea;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .user-avatar:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .nav-links {
        gap: 1rem;
        order: 3;
        width: 100%;
        justify-content: center;
      }

      .nav-link {
        font-size: 0.9rem;
        padding: 0.4rem 0.8rem;
      }

      .nav-actions {
        gap: 0.5rem;
      }
    }
  `]
})
export class NavigationComponent {}
