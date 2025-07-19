import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Products Dashboard';
  currentRoute = '';

  // Dropdown state management
  dropdownStates: { [key: string]: boolean } = {
    products: false,
    categories: false,
    inventory: false,
    orders: false,
    customers: false,
    reports: false,
    settings: false,
    users: false
  };

  constructor(private router: Router) {
    // Listen to route changes to update page title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  // Toggle dropdown method
  toggleDropdown(dropdown: string): void {
    this.dropdownStates[dropdown] = !this.dropdownStates[dropdown];
    // Close other dropdowns
    Object.keys(this.dropdownStates).forEach(key => {
      if (key !== dropdown) {
        this.dropdownStates[key] = false;
      }
    });
  }

  // Check if dropdown is open
  isDropdownOpen(dropdown: string): boolean {
    return this.dropdownStates[dropdown];
  }

  // Get page title based on current route
  getPageTitle(): string {
    const route = this.currentRoute;
    if (route.includes('/products')) return 'Products Management';
    if (route.includes('/dashboard')) return 'Business Dashboard';
    if (route.includes('/categories')) return 'Categories';
    if (route.includes('/inventory')) return 'Inventory Management';
    if (route.includes('/orders')) return 'Orders Management';
    if (route.includes('/customers')) return 'Customer Management';
    if (route.includes('/reports')) return 'Reports & Analytics';
    if (route.includes('/settings')) return 'Settings';
    if (route.includes('/users')) return 'User Management';
    return 'Dashboard';
  }

  // Get page subtitle based on current route
  getPageSubtitle(): string {
    const route = this.currentRoute;
    if (route.includes('/products')) return 'Manage your product inventory and catalog';
    if (route.includes('/dashboard')) return 'Comprehensive view of your business performance and key metrics';
    if (route.includes('/categories')) return 'Organize and manage product categories';
    if (route.includes('/inventory')) return 'Track stock levels and inventory movements';
    if (route.includes('/orders')) return 'Process and track customer orders';
    if (route.includes('/customers')) return 'Manage customer relationships and data';
    if (route.includes('/reports')) return 'Analyze business data and generate insights';
    if (route.includes('/settings')) return 'Configure system settings and preferences';
    if (route.includes('/users')) return 'Manage user accounts and permissions';
    return 'Welcome to your business management platform';
  }
}
