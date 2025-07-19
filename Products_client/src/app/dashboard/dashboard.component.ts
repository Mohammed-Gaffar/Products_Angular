import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Dashboard stats data
  stats = [
    {
      title: 'Total Revenue',
      value: 124500,
      change: '+12.5%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Products Sold',
      value: 2847,
      change: '+8.2%',
      changeType: 'positive',
      icon: '📦'
    },
    {
      title: 'Active Customers',
      value: 1832,
      change: '+23.1%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Pending Orders',
      value: 47,
      change: '-5.3%',
      changeType: 'negative',
      icon: '⏳'
    }
  ];

  // Recent activities
  recentActivities = [
    {
      action: 'New order #ORD-2024-001 created',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      type: 'order'
    },
    {
      action: 'Product "iPhone 15 Pro" updated',
      user: 'Mike Chen',
      time: '15 minutes ago',
      type: 'product'
    },
    {
      action: 'Customer registration: Emma Wilson',
      user: 'System',
      time: '1 hour ago',
      type: 'customer'
    },
    {
      action: 'Inventory adjustment for "Samsung Galaxy"',
      user: 'John Anderson',
      time: '2 hours ago',
      type: 'inventory'
    }
  ];

  // Top products
  topProducts = [
    {
      name: 'iPhone 15 Pro',
      image: '📱',
      sales: 245,
      revenue: 244500
    },
    {
      name: 'Samsung Galaxy S24',
      image: '📱',
      sales: 189,
      revenue: 188100
    },
    {
      name: 'MacBook Pro M3',
      image: '💻',
      sales: 87,
      revenue: 173400
    },
    {
      name: 'AirPods Pro',
      image: '🎧',
      sales: 156,
      revenue: 38400
    }
  ];

  // Quick actions
  quickActions = [
    {
      title: 'Add Product',
      icon: '➕',
      route: '/products/add',
      color: 'primary'
    },
    {
      title: 'View Orders',
      icon: '📋',
      route: '/orders',
      color: 'secondary'
    },
    {
      title: 'Generate Report',
      icon: '�',
      route: '/reports',
      color: 'tertiary'
    },
    {
      title: 'Manage Users',
      icon: '�',
      route: '/users',
      color: 'quaternary'
    }
  ];
}
